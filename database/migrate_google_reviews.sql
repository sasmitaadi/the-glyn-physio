USE glyn_physio;

CREATE TABLE IF NOT EXISTS google_review_settings (
  id TINYINT UNSIGNED PRIMARY KEY DEFAULT 1,
  mode ENUM('manual', 'auto') NOT NULL DEFAULT 'manual',
  place_id VARCHAR(255) NULL,
  rating DECIMAL(2,1) NOT NULL DEFAULT 5.0,
  review_count INT UNSIGNED NOT NULL DEFAULT 0,
  maps_url VARCHAR(1000) NULL,
  last_synced_at DATETIME NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT IGNORE INTO google_review_settings (id, mode, rating, review_count, maps_url)
VALUES (1, 'manual', 5.0, 539, 'https://maps.app.goo.gl/hGmzqtm59Q2mreX16');
