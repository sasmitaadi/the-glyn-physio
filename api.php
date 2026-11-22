<?php
declare(strict_types=1);

require __DIR__ . '/config.php';

$action = (string) ($_GET['action'] ?? 'public');
$method = (string) ($_SERVER['REQUEST_METHOD'] ?? 'GET');

function idParam(): int
{
    $id = (int) ($_GET['id'] ?? 0);
    if ($id < 1) jsonResponse(['ok' => false, 'error' => 'ID tidak valid.'], 422);
    return $id;
}

function mutableRequest(): array
{
    requireUser(['admin', 'editor']);
    verifyCsrf();
    return requestData();
}

function uniqueContentSlug(PDO $pdo, string $title, int $excludeId = 0): string
{
    $base = slugify($title);
    if ($base === '') jsonResponse(['ok' => false, 'error' => 'Judul tidak dapat dibuat menjadi slug.'], 422);
    $slug = $base;
    $suffix = 2;
    $statement = $pdo->prepare('SELECT id FROM contents WHERE slug=:slug AND id<>:id LIMIT 1');
    while (true) {
        $statement->execute([':slug' => $slug, ':id' => $excludeId]);
        if (!$statement->fetchColumn()) return $slug;
        $slug = $base . '-' . $suffix;
        $suffix++;
    }
}

function normalizeFeaturedMedia(?string $type, string $value): array
{
    $value = trim($value);
    if (!$type || $value === '') return [null, null];
    if ($type === 'youtube') {
        if (preg_match('~(?:youtu\.be/|youtube\.com/(?:watch\?v=|embed/|shorts/))([A-Za-z0-9_-]{6,})~', $value, $match)) $value = $match[1];
        if (!preg_match('/^[A-Za-z0-9_-]{6,}$/', $value)) jsonResponse(['ok' => false, 'error' => 'Link atau ID YouTube tidak valid.'], 422);
    }
    if ($type === 'google_drive') {
        if (preg_match('~(?:/d/|[?&]id=)([-\w]{10,})~', $value, $match)) $value = $match[1];
        if (!preg_match('/^[-\w]{10,}$/', $value)) jsonResponse(['ok' => false, 'error' => 'Link atau ID Google Drive tidak valid.'], 422);
    }
    if ($type === 'image' && !preg_match('~^(?:(?:uploads|assets)/[A-Za-z0-9._-]+|https?://.+)$~', $value)) {
        jsonResponse(['ok' => false, 'error' => 'Lokasi gambar tidak valid.'], 422);
    }
    return [$type, substr($value, 0, 1000)];
}

function normalizeDisplayMedia(string $type, string $value): array
{
    $allowed = ['image', 'google_drive_image', 'google_drive_video', 'youtube'];
    if (!in_array($type, $allowed, true)) $type = 'image';
    $validationType = strpos($type, 'google_drive_') === 0 ? 'google_drive' : $type;
    list(, $normalized) = normalizeFeaturedMedia($validationType, $value);
    return [$type, $normalized];
}

function validateSiteLink(string $type, string $url): string
{
    $url = trim($url);
    $valid = false;
    if ($type === 'email') $valid = strpos($url, 'mailto:') === 0;
    elseif ($type === 'phone') $valid = strpos($url, 'tel:') === 0;
    elseif ($type === 'whatsapp') $valid = preg_match('~^https://(?:wa\.me|api\.whatsapp\.com)/~', $url) === 1;
    else $valid = preg_match('~^https://~', $url) === 1;
    if (!$valid) jsonResponse(['ok' => false, 'error' => 'Format URL tidak sesuai dengan tipe kontak.'], 422);
    return substr($url, 0, 1000);
}

function getGoogleReviewSettings(PDO $pdo, bool $forceRefresh = false): array
{
    $settings = $pdo->query('SELECT * FROM google_review_settings WHERE id=1')->fetch();
    if (!$settings) {
        $pdo->exec("INSERT INTO google_review_settings (id,mode,rating,review_count) VALUES (1,'manual',5.0,0)");
        $settings = $pdo->query('SELECT * FROM google_review_settings WHERE id=1')->fetch();
    }
    $apiKey = trim((string) getenv('GLYN_GOOGLE_PLACES_API_KEY'));
    $lastCheck = $settings['last_synced_at'] ?: $settings['updated_at'];
    $stale = !$lastCheck || strtotime($lastCheck) < time() - 43200;
    if ($settings['mode'] === 'auto' && $apiKey && $settings['place_id'] && ($forceRefresh || $stale)) {
        $pdo->exec('UPDATE google_review_settings SET updated_at=NOW() WHERE id=1');
        $curl = curl_init('https://places.googleapis.com/v1/places/' . rawurlencode($settings['place_id']));
        curl_setopt_array($curl, [CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 8, CURLOPT_HTTPHEADER => ['X-Goog-Api-Key: ' . $apiKey, 'X-Goog-FieldMask: rating,userRatingCount']]);
        $response = curl_exec($curl);
        $status = (int) curl_getinfo($curl, CURLINFO_HTTP_CODE);
        curl_close($curl);
        $payload = is_string($response) ? json_decode($response, true) : null;
        if ($status === 200 && is_array($payload) && isset($payload['rating'], $payload['userRatingCount'])) {
            $update = $pdo->prepare('UPDATE google_review_settings SET rating=:rating,review_count=:review_count,last_synced_at=NOW() WHERE id=1');
            $update->execute([':rating' => min(5, max(0, (float) $payload['rating'])), ':review_count' => max(0, (int) $payload['userRatingCount'])]);
            $settings = $pdo->query('SELECT * FROM google_review_settings WHERE id=1')->fetch();
        } elseif ($forceRefresh) {
            jsonResponse(['ok' => false, 'error' => 'Sinkronisasi Google gagal. Periksa Place ID, API key, billing, dan pembatasan key.'], 502);
        }
    }
    $settings['api_configured'] = $apiKey !== '';
    return $settings;
}

function getBusinessHours(PDO $pdo): array
{
    return $pdo->query('SELECT id,day_key,day_label,open_time,close_time,is_closed,note,sort_order,updated_at FROM business_hours ORDER BY sort_order,id')->fetchAll();
}

try {
    $pdo = db();

    if ($action === 'public' && $method === 'GET') {
        $contents = $pdo->query("SELECT id,type,title,slug,summary,body,service_treatments,sort_order,meta_title,meta_description,featured_media_type,featured_media_url,updated_at FROM contents WHERE status='published' ORDER BY sort_order,id")->fetchAll();
        $servicesManaged = (int) $pdo->query("SELECT COUNT(*) FROM contents WHERE type='service'")->fetchColumn() > 0;
        $links = $pdo->query('SELECT id,label,link_type,url,display_text,placement FROM site_links WHERE is_active=1 ORDER BY sort_order,id')->fetchAll();
        $sections = $pdo->query('SELECT page_key,section_key,title,content_json,sort_order FROM site_sections WHERE is_visible=1 ORDER BY page_key,sort_order,id')->fetchAll();
        $faqs = $pdo->query('SELECT id,service_slug,question,answer,sort_order FROM faqs WHERE is_active=1 ORDER BY sort_order,id')->fetchAll();
        $pricing = $pdo->query('SELECT id,service_slug,package_name,price_amount,note,sort_order FROM pricing WHERE is_active=1 ORDER BY sort_order,id')->fetchAll();
        $specialties = $pdo->query('SELECT id,title,tagline,treatments,service_slug,media_type,media_url,sort_order FROM specialties WHERE is_active=1 ORDER BY sort_order,id')->fetchAll();
        $testimonials = $pdo->query('SELECT id,patient_name,patient_role,quote_text,media_type,media_url,sort_order FROM testimonials WHERE is_active=1 ORDER BY sort_order,id')->fetchAll();
        $therapySessions = $pdo->query('SELECT id,title,caption_text,media_type,media_url,alt_text,sort_order FROM therapy_sessions WHERE is_active=1 ORDER BY sort_order,id')->fetchAll();
        $aboutItems = $pdo->query('SELECT id,section_key,title,subtitle,description,detail_text,media_type,media_url,alt_text,sort_order FROM about_items WHERE is_active=1 ORDER BY section_key,sort_order,id')->fetchAll();
        $businessHours = getBusinessHours($pdo);
        foreach ($sections as &$section) {
            $section['content'] = json_decode($section['content_json'], true) ?: [];
            unset($section['content_json']);
        }
        $googleReview = getGoogleReviewSettings($pdo);
        jsonResponse(['ok' => true, 'contents' => $contents, 'services_managed' => $servicesManaged, 'links' => $links, 'sections' => $sections, 'faqs' => $faqs, 'pricing' => $pricing, 'specialties' => $specialties, 'testimonials' => $testimonials, 'therapy_sessions' => $therapySessions, 'about_items' => $aboutItems, 'google_review' => $googleReview, 'business_hours' => $businessHours]);
    }

    if ($action === 'login' && $method === 'POST') {
        startSecureSession();
        $data = requestData();
        $statement = $pdo->prepare('SELECT id,name,email,password_hash,role FROM users WHERE email=:email AND is_active=1 LIMIT 1');
        $statement->execute([':email' => strtolower(trim((string) ($data['email'] ?? '')))]);
        $account = $statement->fetch();
        if (!$account || !password_verify((string) ($data['password'] ?? ''), $account['password_hash'])) {
            jsonResponse(['ok' => false, 'error' => 'Email atau kata sandi tidak benar.'], 422);
        }
        session_regenerate_id(true);
        $_SESSION['user'] = ['id' => (int) $account['id'], 'name' => $account['name'], 'email' => $account['email'], 'role' => $account['role']];
        $_SESSION['csrf'] = bin2hex(random_bytes(24));
        jsonResponse(['ok' => true, 'user' => $_SESSION['user'], 'csrf' => $_SESSION['csrf']]);
    }

    if ($action === 'session' && $method === 'GET') {
        $user = requireUser();
        startSecureSession();
        if (empty($_SESSION['csrf'])) $_SESSION['csrf'] = bin2hex(random_bytes(24));
        jsonResponse(['ok' => true, 'user' => $user, 'csrf' => $_SESSION['csrf']]);
    }

    if ($action === 'logout' && $method === 'POST') {
        requireUser();
        verifyCsrf();
        startSecureSession();
        $_SESSION = [];
        session_destroy();
        jsonResponse(['ok' => true]);
    }

    $user = requireUser();

    if ($action === 'business-contact') {
        if ($method !== 'POST') jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
        $data = mutableRequest();
        $email = strtolower(trim((string) ($data['email'] ?? '')));
        $phoneDisplay = trim((string) ($data['phone'] ?? ''));
        $address = trim((string) ($data['address'] ?? ''));
        $mapsUrl = trim((string) ($data['maps_url'] ?? ''));
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) jsonResponse(['ok' => false, 'error' => 'Alamat email tidak valid.'], 422);
        if ($address === '') jsonResponse(['ok' => false, 'error' => 'Alamat klinik wajib diisi.'], 422);
        if (!preg_match('~^https://~', $mapsUrl)) jsonResponse(['ok' => false, 'error' => 'Link Google Maps harus diawali https://.'], 422);
        $phoneNumber = preg_replace('/[^\d+]/', '', $phoneDisplay);
        if (strpos($phoneNumber, '0') === 0) $phoneNumber = '+62' . substr($phoneNumber, 1);
        elseif (strpos($phoneNumber, '62') === 0) $phoneNumber = '+' . $phoneNumber;
        if (!preg_match('/^\+\d{8,15}$/', $phoneNumber)) jsonResponse(['ok' => false, 'error' => 'Nomor HP tidak valid. Gunakan format +62 atau 08.'], 422);
        $items = [
            ['email', 'Email klinik', 'mailto:' . $email, $email, 3],
            ['phone', 'Nomor telepon klinik', 'tel:' . $phoneNumber, $phoneDisplay, 4],
            ['google_maps', 'Lokasi Google Maps', $mapsUrl, substr($address, 0, 255), 2]
        ];
        $find = $pdo->prepare('SELECT id FROM site_links WHERE link_type=:link_type ORDER BY id LIMIT 1');
        $update = $pdo->prepare('UPDATE site_links SET label=:label,url=:url,display_text=:display_text,placement=:placement,is_active=1,sort_order=:sort_order WHERE id=:id');
        $insert = $pdo->prepare('INSERT INTO site_links (label,link_type,url,display_text,placement,is_active,sort_order) VALUES (:label,:link_type,:url,:display_text,:placement,1,:sort_order)');
        $pdo->beginTransaction();
        try {
            foreach ($items as $item) {
                list($linkType, $label, $url, $displayText, $sortOrder) = $item;
                $find->execute([':link_type' => $linkType]);
                $id = (int) $find->fetchColumn();
                $params = [':label' => $label, ':url' => $url, ':display_text' => $displayText, ':placement' => 'contact,footer', ':sort_order' => $sortOrder];
                if ($id) { $params[':id'] = $id; $update->execute($params); }
                else { $params[':link_type'] = $linkType; $insert->execute($params); }
            }
            $pdo->commit();
        } catch (Throwable $exception) {
            $pdo->rollBack();
            throw $exception;
        }
        jsonResponse(['ok' => true, 'data' => $pdo->query('SELECT * FROM site_links ORDER BY sort_order,id')->fetchAll()]);
    }

    if ($action === 'business-hours') {
        if ($method === 'GET') jsonResponse(['ok' => true, 'data' => getBusinessHours($pdo)]);
        if ($method !== 'POST') jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
        $data = mutableRequest();
        $days = $data['days'] ?? null;
        $allowedDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
        if (!is_array($days) || count($days) !== 7) jsonResponse(['ok' => false, 'error' => 'Data jam buka harus berisi Senin sampai Minggu.'], 422);
        $receivedDays = [];
        foreach ($days as $day) {
            if (!is_array($day) || !in_array($day['day_key'] ?? '', $allowedDays, true) || in_array($day['day_key'], $receivedDays, true)) {
                jsonResponse(['ok' => false, 'error' => 'Susunan hari pada jam buka tidak valid.'], 422);
            }
            $receivedDays[] = $day['day_key'];
        }
        $statement = $pdo->prepare('UPDATE business_hours SET day_label=:day_label,open_time=:open_time,close_time=:close_time,is_closed=:is_closed,note=:note,sort_order=:sort_order WHERE day_key=:day_key');
        $pdo->beginTransaction();
        try {
            foreach ($days as $index => $day) {
                $isClosed = !empty($day['is_closed']);
                $openTime = trim((string) ($day['open_time'] ?? ''));
                $closeTime = trim((string) ($day['close_time'] ?? ''));
                if (!$isClosed && (!preg_match('/^([01]\d|2[0-3]):[0-5]\d$/', $openTime) || !preg_match('/^([01]\d|2[0-3]):[0-5]\d$/', $closeTime))) {
                    throw new InvalidArgumentException('Jam buka dan tutup wajib diisi dengan format yang benar.');
                }
                if (!$isClosed && strcmp($openTime, $closeTime) >= 0) throw new InvalidArgumentException('Jam tutup harus lebih akhir dari jam buka.');
                $statement->execute([
                    ':day_key' => $day['day_key'],
                    ':day_label' => substr(trim((string) ($day['day_label'] ?? '')), 0, 40),
                    ':open_time' => $isClosed ? null : $openTime . ':00',
                    ':close_time' => $isClosed ? null : $closeTime . ':00',
                    ':is_closed' => $isClosed ? 1 : 0,
                    ':note' => substr(trim((string) ($day['note'] ?? '')), 0, 120) ?: null,
                    ':sort_order' => $index + 1
                ]);
            }
            $pdo->commit();
        } catch (InvalidArgumentException $exception) {
            $pdo->rollBack();
            jsonResponse(['ok' => false, 'error' => $exception->getMessage()], 422);
        } catch (Throwable $exception) {
            $pdo->rollBack();
            throw $exception;
        }
        jsonResponse(['ok' => true, 'data' => getBusinessHours($pdo)]);
    }

    if ($action === 'google-review') {
        if ($method === 'GET') jsonResponse(['ok' => true, 'data' => getGoogleReviewSettings($pdo)]);
        $data = mutableRequest();
        if ($method !== 'POST') jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
        $mode = ($data['mode'] ?? '') === 'auto' ? 'auto' : 'manual';
        $placeId = substr(trim((string) ($data['place_id'] ?? '')), 0, 255);
        if ($mode === 'auto' && $placeId === '') jsonResponse(['ok' => false, 'error' => 'Place ID wajib diisi untuk mode otomatis.'], 422);
        $rating = min(5, max(0, (float) ($data['rating'] ?? 0)));
        $reviewCount = max(0, (int) ($data['review_count'] ?? 0));
        $mapsUrl = trim((string) ($data['maps_url'] ?? ''));
        if ($mapsUrl && !preg_match('~^https://~', $mapsUrl)) jsonResponse(['ok' => false, 'error' => 'Link Google Maps harus diawali https://.'], 422);
        $statement = $pdo->prepare('UPDATE google_review_settings SET mode=:mode,place_id=:place_id,rating=:rating,review_count=:review_count,maps_url=:maps_url WHERE id=1');
        $statement->execute([':mode' => $mode, ':place_id' => $placeId ?: null, ':rating' => $rating, ':review_count' => $reviewCount, ':maps_url' => substr($mapsUrl, 0, 1000)]);
        jsonResponse(['ok' => true, 'data' => getGoogleReviewSettings($pdo, $mode === 'auto')]);
    }

    if ($action === 'google-review-refresh' && $method === 'POST') {
        requireUser(['admin', 'editor']); verifyCsrf();
        $settings = getGoogleReviewSettings($pdo);
        if (!$settings['api_configured']) jsonResponse(['ok' => false, 'error' => 'API key Google Places belum dikonfigurasi di server.'], 422);
        jsonResponse(['ok' => true, 'data' => getGoogleReviewSettings($pdo, true)]);
    }

    if ($action === 'upload' && $method === 'POST') {
        requireUser(['admin', 'editor']);
        verifyCsrf();
        if (!isset($_FILES['file']) || !is_uploaded_file($_FILES['file']['tmp_name'])) {
            jsonResponse(['ok' => false, 'error' => 'File gambar belum dipilih.'], 422);
        }
        $file = $_FILES['file'];
        if ((int) $file['error'] !== UPLOAD_ERR_OK) jsonResponse(['ok' => false, 'error' => 'Upload gambar gagal.'], 422);
        if ((int) $file['size'] > 5 * 1024 * 1024) jsonResponse(['ok' => false, 'error' => 'Ukuran gambar maksimal 5 MB.'], 422);
        $imageInfo = @getimagesize($file['tmp_name']);
        $extensions = ['image/jpeg' => 'jpg', 'image/png' => 'png', 'image/webp' => 'webp'];
        $mime = is_array($imageInfo) ? (string) ($imageInfo['mime'] ?? '') : '';
        if (!isset($extensions[$mime])) jsonResponse(['ok' => false, 'error' => 'Format gambar harus JPG, PNG, atau WebP.'], 422);
        $filename = date('Ymd-His') . '-' . bin2hex(random_bytes(6)) . '.' . $extensions[$mime];
        $destination = __DIR__ . '/uploads/' . $filename;
        if (!move_uploaded_file($file['tmp_name'], $destination)) jsonResponse(['ok' => false, 'error' => 'Gambar tidak dapat disimpan di server.'], 500);
        jsonResponse(['ok' => true, 'url' => 'uploads/' . $filename]);
    }

    if ($action === 'contents') {
        if ($method === 'GET') jsonResponse(['ok' => true, 'data' => $pdo->query('SELECT * FROM contents ORDER BY updated_at DESC')->fetchAll()]);
        $data = mutableRequest();
        if ($method === 'DELETE') {
            $pdo->prepare('DELETE FROM contents WHERE id=:id')->execute([':id' => idParam()]);
            jsonResponse(['ok' => true]);
        }
        $contentId = $method === 'PUT' ? idParam() : 0;
        if ($contentId) {
            $slugStatement = $pdo->prepare('SELECT slug FROM contents WHERE id=:id');
            $slugStatement->execute([':id' => $contentId]);
            $slug = (string) $slugStatement->fetchColumn();
            if ($slug === '') jsonResponse(['ok' => false, 'error' => 'Konten tidak ditemukan.'], 404);
        } else {
            $slug = uniqueContentSlug($pdo, (string) ($data['title'] ?? ''));
        }
        $mediaType = in_array($data['featured_media_type'] ?? '', ['image','youtube','google_drive','google_drive_image','google_drive_video'], true) ? $data['featured_media_type'] : null;
        if ($mediaType === 'google_drive_image' || $mediaType === 'google_drive_video') {
            $originalType = $mediaType;
            list(, $mediaUrl) = normalizeFeaturedMedia('google_drive', (string) ($data['featured_media_url'] ?? ''));
            $mediaType = $originalType;
        } else {
            list($mediaType, $mediaUrl) = normalizeFeaturedMedia($mediaType, (string) ($data['featured_media_url'] ?? ''));
        }
        $params = [':type' => in_array($data['type'] ?? '', ['page','article','service'], true) ? $data['type'] : 'page', ':title' => requiredString($data, 'title'), ':slug' => $slug, ':summary' => trim((string) ($data['summary'] ?? '')), ':body' => trim((string) ($data['body'] ?? '')), ':service_treatments' => trim((string) ($data['service_treatments'] ?? '')), ':sort_order' => max(0, (int) ($data['sort_order'] ?? 0)), ':status' => ($data['status'] ?? '') === 'published' ? 'published' : 'draft', ':meta_title' => substr(trim((string) ($data['meta_title'] ?? '')), 0, 255), ':meta_description' => substr(trim((string) ($data['meta_description'] ?? '')), 0, 320), ':featured_media_type' => $mediaType, ':featured_media_url' => $mediaUrl ?: null, ':updated_by' => $user['id']];
        if ($method === 'POST') $statement = $pdo->prepare('INSERT INTO contents (type,title,slug,summary,body,service_treatments,sort_order,status,meta_title,meta_description,featured_media_type,featured_media_url,updated_by) VALUES (:type,:title,:slug,:summary,:body,:service_treatments,:sort_order,:status,:meta_title,:meta_description,:featured_media_type,:featured_media_url,:updated_by)');
        elseif ($method === 'PUT') {
            $statement = $pdo->prepare('UPDATE contents SET type=:type,title=:title,slug=:slug,summary=:summary,body=:body,service_treatments=:service_treatments,sort_order=:sort_order,status=:status,meta_title=:meta_title,meta_description=:meta_description,featured_media_type=:featured_media_type,featured_media_url=:featured_media_url,updated_by=:updated_by WHERE id=:id');
            $params[':id'] = $contentId;
        } else jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
        $statement->execute($params);
        jsonResponse(['ok' => true, 'id' => $method === 'POST' ? (int) $pdo->lastInsertId() : $contentId]);
    }

    if ($action === 'faqs') {
        if ($method === 'GET') jsonResponse(['ok' => true, 'data' => $pdo->query('SELECT * FROM faqs ORDER BY sort_order,id')->fetchAll()]);
        $data = mutableRequest();
        if ($method === 'DELETE') {
            $pdo->prepare('DELETE FROM faqs WHERE id=:id')->execute([':id' => idParam()]);
            jsonResponse(['ok' => true]);
        }
        $serviceSlug = trim((string) ($data['service_slug'] ?? ''));
        if ($serviceSlug !== '' && !preg_match('/^[a-z0-9-]+$/', $serviceSlug)) jsonResponse(['ok' => false, 'error' => 'Layanan FAQ tidak valid.'], 422);
        $params = [
            ':service_slug' => $serviceSlug === '' ? null : substr($serviceSlug, 0, 255),
            ':question' => requiredString($data, 'question'),
            ':answer' => requiredString($data, 'answer', 5000),
            ':sort_order' => max(0, (int) ($data['sort_order'] ?? 0)),
            ':is_active' => empty($data['is_active']) ? 0 : 1,
            ':updated_by' => $user['id']
        ];
        if ($method === 'POST') $statement = $pdo->prepare('INSERT INTO faqs (service_slug,question,answer,sort_order,is_active,updated_by) VALUES (:service_slug,:question,:answer,:sort_order,:is_active,:updated_by)');
        elseif ($method === 'PUT') {
            $statement = $pdo->prepare('UPDATE faqs SET service_slug=:service_slug,question=:question,answer=:answer,sort_order=:sort_order,is_active=:is_active,updated_by=:updated_by WHERE id=:id');
            $params[':id'] = idParam();
        } else jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
        $statement->execute($params);
        jsonResponse(['ok' => true, 'id' => $method === 'POST' ? (int) $pdo->lastInsertId() : idParam()]);
    }

    if ($action === 'pricing') {
        if ($method === 'GET') jsonResponse(['ok' => true, 'data' => $pdo->query('SELECT * FROM pricing ORDER BY sort_order,id')->fetchAll()]);
        $data = mutableRequest();
        if ($method === 'DELETE') {
            $pdo->prepare('DELETE FROM pricing WHERE id=:id')->execute([':id' => idParam()]);
            jsonResponse(['ok' => true]);
        }
        $serviceSlug = trim((string) ($data['service_slug'] ?? ''));
        if ($serviceSlug !== '' && !preg_match('/^[a-z0-9-]+$/', $serviceSlug)) jsonResponse(['ok' => false, 'error' => 'Layanan harga tidak valid.'], 422);
        $priceAmount = (int) ($data['price_amount'] ?? 0);
        if ($priceAmount < 1) jsonResponse(['ok' => false, 'error' => 'Harga harus lebih dari 0.'], 422);
        $params = [
            ':service_slug' => $serviceSlug === '' ? null : substr($serviceSlug, 0, 255),
            ':package_name' => requiredString($data, 'package_name', 120),
            ':price_amount' => $priceAmount,
            ':note' => substr(trim((string) ($data['note'] ?? '')), 0, 255) ?: null,
            ':sort_order' => max(0, (int) ($data['sort_order'] ?? 0)),
            ':is_active' => empty($data['is_active']) ? 0 : 1,
            ':updated_by' => $user['id']
        ];
        if ($method === 'POST') $statement = $pdo->prepare('INSERT INTO pricing (service_slug,package_name,price_amount,note,sort_order,is_active,updated_by) VALUES (:service_slug,:package_name,:price_amount,:note,:sort_order,:is_active,:updated_by)');
        elseif ($method === 'PUT') {
            $statement = $pdo->prepare('UPDATE pricing SET service_slug=:service_slug,package_name=:package_name,price_amount=:price_amount,note=:note,sort_order=:sort_order,is_active=:is_active,updated_by=:updated_by WHERE id=:id');
            $params[':id'] = idParam();
        } else jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
        $statement->execute($params);
        jsonResponse(['ok' => true, 'id' => $method === 'POST' ? (int) $pdo->lastInsertId() : idParam()]);
    }

    if ($action === 'specialties') {
        if ($method === 'GET') jsonResponse(['ok' => true, 'data' => $pdo->query('SELECT * FROM specialties ORDER BY sort_order,id')->fetchAll()]);
        $data = mutableRequest();
        if ($method === 'DELETE') {
            $pdo->prepare('DELETE FROM specialties WHERE id=:id')->execute([':id' => idParam()]);
            jsonResponse(['ok' => true]);
        }
        $mediaType = in_array($data['media_type'] ?? '', ['youtube','google_drive','image'], true) ? $data['media_type'] : 'youtube';
        list($mediaType, $mediaUrl) = normalizeFeaturedMedia($mediaType, requiredString($data, 'media_url', 1000));
        $serviceSlug = trim((string) ($data['service_slug'] ?? ''));
        if ($serviceSlug !== '' && !preg_match('/^[a-z0-9-]+$/', $serviceSlug)) jsonResponse(['ok' => false, 'error' => 'Tujuan halaman layanan tidak valid.'], 422);
        $params = [
            ':title' => requiredString($data, 'title', 180),
            ':tagline' => substr(trim((string) ($data['tagline'] ?? '')), 0, 2000),
            ':treatments' => substr(trim((string) ($data['treatments'] ?? '')), 0, 4000),
            ':service_slug' => $serviceSlug ?: null,
            ':media_type' => $mediaType,
            ':media_url' => $mediaUrl,
            ':sort_order' => max(0, (int) ($data['sort_order'] ?? 0)),
            ':is_active' => empty($data['is_active']) ? 0 : 1,
            ':updated_by' => $user['id']
        ];
        if ($method === 'POST') $statement = $pdo->prepare('INSERT INTO specialties (title,tagline,treatments,service_slug,media_type,media_url,sort_order,is_active,updated_by) VALUES (:title,:tagline,:treatments,:service_slug,:media_type,:media_url,:sort_order,:is_active,:updated_by)');
        elseif ($method === 'PUT') { $statement = $pdo->prepare('UPDATE specialties SET title=:title,tagline=:tagline,treatments=:treatments,service_slug=:service_slug,media_type=:media_type,media_url=:media_url,sort_order=:sort_order,is_active=:is_active,updated_by=:updated_by WHERE id=:id'); $params[':id'] = idParam(); }
        else jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
        $statement->execute($params);
        jsonResponse(['ok' => true, 'id' => $method === 'POST' ? (int) $pdo->lastInsertId() : idParam()]);
    }

    if ($action === 'testimonials') {
        if ($method === 'GET') jsonResponse(['ok' => true, 'data' => $pdo->query('SELECT * FROM testimonials ORDER BY sort_order,id')->fetchAll()]);
        $data = mutableRequest();
        if ($method === 'DELETE') {
            $pdo->prepare('DELETE FROM testimonials WHERE id=:id')->execute([':id' => idParam()]);
            jsonResponse(['ok' => true]);
        }
        $mediaType = in_array($data['media_type'] ?? '', ['youtube','google_drive','image'], true) ? $data['media_type'] : 'google_drive';
        list($mediaType, $mediaUrl) = normalizeFeaturedMedia($mediaType, requiredString($data, 'media_url', 1000));
        $params = [
            ':patient_name' => substr(trim((string) ($data['patient_name'] ?? '')), 0, 120) ?: null,
            ':patient_role' => substr(trim((string) ($data['patient_role'] ?? '')), 0, 120) ?: null,
            ':quote_text' => substr(trim((string) ($data['quote_text'] ?? '')), 0, 4000) ?: null,
            ':media_type' => $mediaType,
            ':media_url' => $mediaUrl,
            ':sort_order' => max(0, (int) ($data['sort_order'] ?? 0)),
            ':is_active' => empty($data['is_active']) ? 0 : 1,
            ':updated_by' => $user['id']
        ];
        if ($method === 'POST') $statement = $pdo->prepare('INSERT INTO testimonials (patient_name,patient_role,quote_text,media_type,media_url,sort_order,is_active,updated_by) VALUES (:patient_name,:patient_role,:quote_text,:media_type,:media_url,:sort_order,:is_active,:updated_by)');
        elseif ($method === 'PUT') { $statement = $pdo->prepare('UPDATE testimonials SET patient_name=:patient_name,patient_role=:patient_role,quote_text=:quote_text,media_type=:media_type,media_url=:media_url,sort_order=:sort_order,is_active=:is_active,updated_by=:updated_by WHERE id=:id'); $params[':id'] = idParam(); }
        else jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
        $statement->execute($params);
        jsonResponse(['ok' => true, 'id' => $method === 'POST' ? (int) $pdo->lastInsertId() : idParam()]);
    }

    if ($action === 'therapy-sessions') {
        if ($method === 'GET') jsonResponse(['ok' => true, 'data' => $pdo->query('SELECT * FROM therapy_sessions ORDER BY sort_order,id')->fetchAll()]);
        $data = mutableRequest();
        if ($method === 'DELETE') {
            $pdo->prepare('DELETE FROM therapy_sessions WHERE id=:id')->execute([':id' => idParam()]);
            jsonResponse(['ok' => true]);
        }
        $mediaType = in_array($data['media_type'] ?? '', ['youtube','google_drive','image'], true) ? $data['media_type'] : 'google_drive';
        list($mediaType, $mediaUrl) = normalizeFeaturedMedia($mediaType, requiredString($data, 'media_url', 1000));
        $params = [
            ':title' => requiredString($data, 'title', 180),
            ':caption_text' => substr(trim((string) ($data['caption_text'] ?? '')), 0, 4000) ?: null,
            ':media_type' => $mediaType,
            ':media_url' => $mediaUrl,
            ':alt_text' => substr(trim((string) ($data['alt_text'] ?? '')), 0, 255) ?: null,
            ':sort_order' => max(0, (int) ($data['sort_order'] ?? 0)),
            ':is_active' => empty($data['is_active']) ? 0 : 1,
            ':updated_by' => $user['id']
        ];
        if ($method === 'POST') $statement = $pdo->prepare('INSERT INTO therapy_sessions (title,caption_text,media_type,media_url,alt_text,sort_order,is_active,updated_by) VALUES (:title,:caption_text,:media_type,:media_url,:alt_text,:sort_order,:is_active,:updated_by)');
        elseif ($method === 'PUT') { $statement = $pdo->prepare('UPDATE therapy_sessions SET title=:title,caption_text=:caption_text,media_type=:media_type,media_url=:media_url,alt_text=:alt_text,sort_order=:sort_order,is_active=:is_active,updated_by=:updated_by WHERE id=:id'); $params[':id'] = idParam(); }
        else jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
        $statement->execute($params);
        jsonResponse(['ok' => true, 'id' => $method === 'POST' ? (int) $pdo->lastInsertId() : idParam()]);
    }

    if ($action === 'about-items') {
        if ($method === 'GET') jsonResponse(['ok' => true, 'data' => $pdo->query('SELECT * FROM about_items ORDER BY section_key,sort_order,id')->fetchAll()]);
        $data = mutableRequest();
        if ($method === 'DELETE') {
            $pdo->prepare('DELETE FROM about_items WHERE id=:id')->execute([':id' => idParam()]);
            jsonResponse(['ok' => true]);
        }
        $sectionKey = in_array($data['section_key'] ?? '', ['methods','commitments','therapists','equipment'], true) ? $data['section_key'] : '';
        if ($sectionKey === '') jsonResponse(['ok' => false, 'error' => 'Bagian halaman tidak valid.'], 422);
        list($mediaType, $mediaUrl) = normalizeDisplayMedia((string) ($data['media_type'] ?? 'image'), requiredString($data, 'media_url', 1000));
        $params = [
            ':section_key' => $sectionKey,
            ':title' => requiredString($data, 'title', 180),
            ':subtitle' => substr(trim((string) ($data['subtitle'] ?? '')), 0, 180) ?: null,
            ':description' => substr(trim((string) ($data['description'] ?? '')), 0, 5000) ?: null,
            ':detail_text' => substr(trim((string) ($data['detail_text'] ?? '')), 0, 255) ?: null,
            ':media_type' => $mediaType,
            ':media_url' => $mediaUrl,
            ':alt_text' => substr(trim((string) ($data['alt_text'] ?? '')), 0, 255) ?: null,
            ':sort_order' => max(0, (int) ($data['sort_order'] ?? 0)),
            ':is_active' => empty($data['is_active']) ? 0 : 1,
            ':updated_by' => $user['id']
        ];
        if ($method === 'POST') $statement = $pdo->prepare('INSERT INTO about_items (section_key,title,subtitle,description,detail_text,media_type,media_url,alt_text,sort_order,is_active,updated_by) VALUES (:section_key,:title,:subtitle,:description,:detail_text,:media_type,:media_url,:alt_text,:sort_order,:is_active,:updated_by)');
        elseif ($method === 'PUT') { $statement = $pdo->prepare('UPDATE about_items SET section_key=:section_key,title=:title,subtitle=:subtitle,description=:description,detail_text=:detail_text,media_type=:media_type,media_url=:media_url,alt_text=:alt_text,sort_order=:sort_order,is_active=:is_active,updated_by=:updated_by WHERE id=:id'); $params[':id'] = idParam(); }
        else jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
        $statement->execute($params);
        jsonResponse(['ok' => true, 'id' => $method === 'POST' ? (int) $pdo->lastInsertId() : idParam()]);
    }

    if ($action === 'media' || $action === 'links') {
        $table = $action === 'media' ? 'media' : 'site_links';
        if ($method === 'GET') jsonResponse(['ok' => true, 'data' => $pdo->query("SELECT * FROM {$table} ORDER BY id DESC")->fetchAll()]);
        $data = mutableRequest();
        if ($method === 'DELETE') {
            $pdo->prepare("DELETE FROM {$table} WHERE id=:id")->execute([':id' => idParam()]);
            jsonResponse(['ok' => true]);
        }
        if ($action === 'media') {
            $params = [':name' => requiredString($data, 'name'), ':media_type' => in_array($data['media_type'] ?? '', ['image','youtube','google_drive','document'], true) ? $data['media_type'] : 'image', ':url' => requiredString($data, 'url', 1000), ':thumbnail_url' => substr(trim((string) ($data['thumbnail_url'] ?? '')), 0, 1000), ':alt_text' => substr(trim((string) ($data['alt_text'] ?? '')), 0, 255), ':created_by' => $user['id']];
            $sql = $method === 'POST' ? 'INSERT INTO media (name,media_type,url,thumbnail_url,alt_text,created_by) VALUES (:name,:media_type,:url,:thumbnail_url,:alt_text,:created_by)' : 'UPDATE media SET name=:name,media_type=:media_type,url=:url,thumbnail_url=:thumbnail_url,alt_text=:alt_text,created_by=:created_by WHERE id=:id';
        } else {
            $linkType = in_array($data['link_type'] ?? '', ['whatsapp','google_maps','email','phone','social','custom'], true) ? $data['link_type'] : 'custom';
            $params = [':label' => requiredString($data, 'label', 120), ':link_type' => $linkType, ':url' => validateSiteLink($linkType, requiredString($data, 'url', 1000)), ':display_text' => substr(trim((string) ($data['display_text'] ?? '')), 0, 255), ':placement' => substr(trim((string) ($data['placement'] ?? 'footer')), 0, 80), ':is_active' => empty($data['is_active']) ? 0 : 1, ':sort_order' => max(0, (int) ($data['sort_order'] ?? 0))];
            $sql = $method === 'POST' ? 'INSERT INTO site_links (label,link_type,url,display_text,placement,is_active,sort_order) VALUES (:label,:link_type,:url,:display_text,:placement,:is_active,:sort_order)' : 'UPDATE site_links SET label=:label,link_type=:link_type,url=:url,display_text=:display_text,placement=:placement,is_active=:is_active,sort_order=:sort_order WHERE id=:id';
        }
        if ($method === 'PUT') $params[':id'] = idParam();
        elseif ($method !== 'POST') jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
        $pdo->prepare($sql)->execute($params);
        jsonResponse(['ok' => true, 'id' => $method === 'POST' ? (int) $pdo->lastInsertId() : idParam()]);
    }

    if ($action === 'analytics' && $method === 'GET') {
        $counts = $pdo->query("SELECT event_name,COUNT(*) total FROM analytics_events WHERE created_at>=DATE_SUB(NOW(),INTERVAL 30 DAY) GROUP BY event_name")->fetchAll();
        $events = $pdo->query("SELECT event_name,event_label,page_path,COUNT(*) total FROM analytics_events WHERE created_at>=DATE_SUB(NOW(),INTERVAL 30 DAY) GROUP BY event_name,event_label,page_path ORDER BY total DESC LIMIT 20")->fetchAll();
        $daily = $pdo->query("SELECT DATE(created_at) day,COUNT(*) total FROM analytics_events WHERE event_name='page_view' AND created_at>=DATE_SUB(CURDATE(),INTERVAL 29 DAY) GROUP BY DATE(created_at) ORDER BY day")->fetchAll();
        $visitors = (int) $pdo->query("SELECT COUNT(DISTINCT visitor_id) FROM analytics_events WHERE event_name='page_view' AND created_at>=DATE_SUB(NOW(),INTERVAL 30 DAY)")->fetchColumn();
        jsonResponse(['ok' => true, 'visitors' => $visitors, 'counts' => $counts, 'events' => $events, 'daily' => $daily]);
    }

    if ($action === 'users') {
        requireUser(['admin']);
        if ($method === 'GET') jsonResponse(['ok' => true, 'data' => $pdo->query('SELECT id,name,email,role,is_active,created_at FROM users ORDER BY created_at DESC')->fetchAll()]);
        $data = mutableRequest();
        if ($method === 'DELETE') {
            if (idParam() === (int) $user['id']) jsonResponse(['ok' => false, 'error' => 'Akun yang sedang dipakai tidak dapat dihapus.'], 422);
            $pdo->prepare('DELETE FROM users WHERE id=:id')->execute([':id' => idParam()]);
            jsonResponse(['ok' => true]);
        }
        $params = [':name' => requiredString($data, 'name', 120), ':email' => strtolower(requiredString($data, 'email', 190)), ':role' => in_array($data['role'] ?? '', ['admin','editor','analyst'], true) ? $data['role'] : 'editor', ':is_active' => empty($data['is_active']) ? 0 : 1];
        if ($method === 'POST') {
            $password = (string) ($data['password'] ?? '');
            if (strlen($password) < 10) jsonResponse(['ok' => false, 'error' => 'Kata sandi minimal 10 karakter.'], 422);
            $params[':password_hash'] = password_hash($password, PASSWORD_DEFAULT);
            $statement = $pdo->prepare('INSERT INTO users (name,email,password_hash,role,is_active) VALUES (:name,:email,:password_hash,:role,:is_active)');
        } elseif ($method === 'PUT') {
            $params[':id'] = idParam();
            $password = (string) ($data['password'] ?? '');
            if ($password !== '') {
                if (strlen($password) < 10) jsonResponse(['ok' => false, 'error' => 'Kata sandi minimal 10 karakter.'], 422);
                $params[':password_hash'] = password_hash($password, PASSWORD_DEFAULT);
                $statement = $pdo->prepare('UPDATE users SET name=:name,email=:email,password_hash=:password_hash,role=:role,is_active=:is_active WHERE id=:id');
            } else $statement = $pdo->prepare('UPDATE users SET name=:name,email=:email,role=:role,is_active=:is_active WHERE id=:id');
        } else jsonResponse(['ok' => false, 'error' => 'Method not allowed'], 405);
        $statement->execute($params);
        jsonResponse(['ok' => true, 'id' => $method === 'POST' ? (int) $pdo->lastInsertId() : idParam()]);
    }

    jsonResponse(['ok' => false, 'error' => 'Unknown action'], 404);
} catch (PDOException $error) {
    error_log('API database error: ' . $error->getMessage());
    jsonResponse(['ok' => false, 'error' => $error->getCode() === '23000' ? 'Data duplikat. Periksa slug atau email.' : 'Database/API tidak tersedia.'], 500);
} catch (Throwable $error) {
    error_log('API error: ' . $error->getMessage());
    jsonResponse(['ok' => false, 'error' => 'Terjadi kesalahan pada server.'], 500);
}
