USE glyn_physio;

CREATE TABLE IF NOT EXISTS pricing (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  service_slug VARCHAR(255) NULL,
  package_name VARCHAR(120) NOT NULL,
  price_amount INT UNSIGNED NOT NULL,
  note VARCHAR(255) NULL,
  sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  updated_by INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_pricing_service_status (service_slug, is_active, sort_order),
  CONSTRAINT fk_pricing_user FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

INSERT INTO pricing (service_slug, package_name, price_amount, note, sort_order, is_active)
SELECT NULL, '1 Sesi', 350000, NULL, 1, 1
WHERE NOT EXISTS (SELECT 1 FROM pricing WHERE service_slug IS NULL AND package_name='1 Sesi');

INSERT INTO pricing (service_slug, package_name, price_amount, note, sort_order, is_active)
SELECT NULL, '3 Sesi', 975000, 'Hemat Rp75.000', 2, 1
WHERE NOT EXISTS (SELECT 1 FROM pricing WHERE service_slug IS NULL AND package_name='3 Sesi');

INSERT INTO pricing (service_slug, package_name, price_amount, note, sort_order, is_active)
SELECT NULL, '6 Sesi', 1800000, 'Hemat Rp300.000', 3, 1
WHERE NOT EXISTS (SELECT 1 FROM pricing WHERE service_slug IS NULL AND package_name='6 Sesi');
