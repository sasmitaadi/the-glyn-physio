USE glyn_physio;

INSERT INTO site_links (label, link_type, url, display_text, placement, is_active, sort_order)
SELECT 'Nomor telepon klinik', 'phone', 'tel:+6281234567890', '+62 812-3456-7890', 'contact,footer', 1, 4
WHERE NOT EXISTS (SELECT 1 FROM site_links WHERE link_type = 'phone');
