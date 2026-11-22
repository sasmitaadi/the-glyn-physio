<?php
declare(strict_types=1);

$path = (string) parse_url($_SERVER['REQUEST_URI'] ?? '/', PHP_URL_PATH);
$root = realpath(__DIR__);
$candidate = realpath(__DIR__ . DIRECTORY_SEPARATOR . ltrim(str_replace('/', DIRECTORY_SEPARATOR, $path), DIRECTORY_SEPARATOR));

if ($path !== '/' && $candidate && $root && strpos($candidate, $root . DIRECTORY_SEPARATOR) === 0 && is_file($candidate)) {
    return false;
}

if ($path === '/sitemap.xml') {
    require __DIR__ . '/sitemap.php';
    return true;
}

if (preg_match('#^/(?:article|services)/[^/]+(?:/index\.html)?/?$#', $path)) {
    header('Content-Type: text/html; charset=UTF-8');
    readfile(__DIR__ . '/index.html');
    return true;
}

return false;
