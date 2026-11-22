<?php
declare(strict_types=1);

require __DIR__ . '/config.php';

header('Content-Type: application/xml; charset=UTF-8');
header('Cache-Control: public, max-age=3600');

$origin = 'https://theglynphysio.com';
$urls = [
    ['loc' => $origin . '/', 'priority' => '1.0', 'changefreq' => 'weekly'],
    ['loc' => $origin . '/about-us/', 'priority' => '0.8', 'changefreq' => 'monthly'],
    ['loc' => $origin . '/services/', 'priority' => '0.9', 'changefreq' => 'weekly'],
    ['loc' => $origin . '/article/', 'priority' => '0.8', 'changefreq' => 'weekly'],
    ['loc' => $origin . '/our-clinics/', 'priority' => '0.7', 'changefreq' => 'monthly'],
    ['loc' => $origin . '/contact/', 'priority' => '0.8', 'changefreq' => 'monthly'],
];

$knownServices = ['geriatri', 'pasca-operasi', 'olahraga', 'umum'];
$knownArticles = ['nyeri-punggung', 'cedera-lutut', 'keseimbangan', 'pemulihan-operasi', 'cedera-olahraga', 'postur-kerja', 'nyeri-bahu', 'kaki-dan-pergelangan', 'latihan-rumahan', 'konsultasi-pertama'];
foreach ($knownServices as $slug) $urls[] = ['loc' => $origin . '/services/' . $slug . '/', 'priority' => '0.8', 'changefreq' => 'monthly'];
foreach ($knownArticles as $slug) $urls[] = ['loc' => $origin . '/article/' . $slug . '/', 'priority' => '0.7', 'changefreq' => 'yearly'];
$urlIndexes = [];
foreach ($urls as $index => $url) $urlIndexes[$url['loc']] = $index;

try {
    $rows = db()->query("SELECT type,slug,updated_at FROM contents WHERE status='published' AND type IN ('article','service') ORDER BY type,slug")->fetchAll();
    foreach ($rows as $row) {
        $section = $row['type'] === 'article' ? 'article' : 'services';
        $entry = [
            'loc' => $origin . '/' . $section . '/' . rawurlencode((string) $row['slug']) . '/',
            'lastmod' => date('c', strtotime((string) $row['updated_at'])),
            'priority' => $row['type'] === 'service' ? '0.8' : '0.7',
            'changefreq' => $row['type'] === 'service' ? 'monthly' : 'yearly',
        ];
        if (isset($urlIndexes[$entry['loc']])) $urls[$urlIndexes[$entry['loc']]] = $entry;
        else { $urlIndexes[$entry['loc']] = count($urls); $urls[] = $entry; }
    }
} catch (Throwable $error) {
    // Static URLs remain available if the database is temporarily unavailable.
}

function xmlValue(string $value): string
{
    return htmlspecialchars($value, ENT_XML1 | ENT_QUOTES, 'UTF-8');
}

echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
echo '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">' . "\n";
foreach ($urls as $url) {
    echo "  <url>\n";
    echo '    <loc>' . xmlValue($url['loc']) . "</loc>\n";
    if (!empty($url['lastmod'])) echo '    <lastmod>' . xmlValue($url['lastmod']) . "</lastmod>\n";
    echo '    <changefreq>' . xmlValue($url['changefreq']) . "</changefreq>\n";
    echo '    <priority>' . xmlValue($url['priority']) . "</priority>\n";
    echo "  </url>\n";
}
echo "</urlset>\n";
