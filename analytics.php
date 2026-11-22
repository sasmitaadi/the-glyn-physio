<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
require __DIR__ . '/config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$payload = json_decode(file_get_contents('php://input'), true);
if (!is_array($payload) || empty($payload['event_name']) || empty($payload['page_path'])) {
    http_response_code(422);
    echo json_encode(['ok' => false, 'error' => 'Invalid event']);
    exit;
}
$allowedEvents = ['page_view', 'whatsapp_click', 'maps_click', 'email_click', 'article_click', 'service_click'];
if (!in_array((string) $payload['event_name'], $allowedEvents, true)) {
    jsonResponse(['ok' => false, 'error' => 'Invalid event'], 422);
}

try {
    $pdo = db();
    $statement = $pdo->prepare(
        'INSERT INTO analytics_events (event_name, event_label, page_path, visitor_id) VALUES (:event_name, :event_label, :page_path, :visitor_id)'
    );
    $statement->execute([
        ':event_name' => substr((string) $payload['event_name'], 0, 80),
        ':event_label' => isset($payload['event_label']) ? substr((string) $payload['event_label'], 0, 255) : null,
        ':page_path' => substr((string) $payload['page_path'], 0, 500),
        ':visitor_id' => substr((string) ($payload['visitor_id'] ?? 'anonymous'), 0, 36),
    ]);
    echo json_encode(['ok' => true]);
} catch (Throwable $error) {
    http_response_code(500);
    error_log('Analytics event failed: ' . $error->getMessage());
    echo json_encode(['ok' => false, 'error' => 'Analytics unavailable']);
}
