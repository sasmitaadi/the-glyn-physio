<?php
declare(strict_types=1);

/**
 * Read a value from the server environment or the local .env file.
 *
 * Server environment variables take precedence so the same code works on
 * managed infrastructure as well as shared hosting.
 */
function glynEnv(string $key, string $default = ''): string
{
    $serverValue = getenv($key);
    if ($serverValue !== false) {
        return (string) $serverValue;
    }

    static $fileValues;
    if (!is_array($fileValues)) {
        $fileValues = [];
        $envFile = __DIR__ . '/.env';

        if (is_readable($envFile)) {
            $lines = file($envFile, FILE_IGNORE_NEW_LINES);
            foreach ($lines ?: [] as $line) {
                $line = trim($line);
                if ($line === '' || strpos($line, '#') === 0 || strpos($line, '=') === false) {
                    continue;
                }

                [$name, $value] = explode('=', $line, 2);
                $name = trim($name);
                $value = trim($value);
                if (!preg_match('/^[A-Z_][A-Z0-9_]*$/i', $name)) {
                    continue;
                }

                $length = strlen($value);
                if ($length >= 2) {
                    $first = $value[0];
                    $last = $value[$length - 1];
                    if (($first === '"' && $last === '"') || ($first === "'" && $last === "'")) {
                        $value = substr($value, 1, -1);
                    }
                }

                $fileValues[$name] = $value;
            }
        }
    }

    return array_key_exists($key, $fileValues) ? (string) $fileValues[$key] : $default;
}

function db(): PDO
{
    static $pdo;
    if ($pdo instanceof PDO) {
        return $pdo;
    }

    $pdo = new PDO(
        glynEnv('GLYN_DB_DSN', 'mysql:host=127.0.0.1;dbname=glyn_physio;charset=utf8mb4'),
        glynEnv('GLYN_DB_USER', 'root'),
        glynEnv('GLYN_DB_PASSWORD'),
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_EMULATE_PREPARES => false,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
    return $pdo;
}

function startSecureSession(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }
    session_name('glyn_admin');
    session_save_path(__DIR__ . '/database/sessions');
    ini_set('session.cookie_samesite', 'Strict');
    session_set_cookie_params(0, '/', '', !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off', true);
    session_start();
}

function currentUser(): ?array
{
    startSecureSession();
    return isset($_SESSION['user']) && is_array($_SESSION['user']) ? $_SESSION['user'] : null;
}

function requireUser(array $roles = []): array
{
    $user = currentUser();
    if (!$user) {
        jsonResponse(['ok' => false, 'error' => 'Sesi berakhir. Silakan masuk kembali.'], 401);
    }
    if ($roles && !in_array($user['role'], $roles, true)) {
        jsonResponse(['ok' => false, 'error' => 'Anda tidak memiliki izin untuk tindakan ini.'], 403);
    }
    return $user;
}

function verifyCsrf(): void
{
    startSecureSession();
    $token = isset($_SERVER['HTTP_X_CSRF_TOKEN']) ? (string) $_SERVER['HTTP_X_CSRF_TOKEN'] : '';
    if (!$token || empty($_SESSION['csrf']) || !hash_equals($_SESSION['csrf'], $token)) {
        jsonResponse(['ok' => false, 'error' => 'Token keamanan tidak valid. Muat ulang dashboard.'], 419);
    }
}

function slugify(string $value): string
{
    $value = strtolower(trim($value));
    $value = preg_replace('/[^a-z0-9]+/', '-', $value);
    return trim((string) $value, '-');
}

function jsonResponse($data, int $status = 200)
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function requestData(): array
{
    $data = json_decode(file_get_contents('php://input'), true);
    return is_array($data) ? $data : $_POST;
}

function requiredString(array $data, string $key, int $max = 255): string
{
    $value = trim((string) ($data[$key] ?? ''));
    if ($value === '') {
        jsonResponse(['ok' => false, 'error' => "{$key} wajib diisi"], 422);
    }
    return substr($value, 0, $max);
}
