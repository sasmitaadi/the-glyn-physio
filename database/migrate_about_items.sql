USE glyn_physio;

CREATE TABLE IF NOT EXISTS about_items (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  section_key ENUM('methods', 'commitments', 'therapists', 'equipment') NOT NULL,
  title VARCHAR(180) NOT NULL,
  subtitle VARCHAR(180) NULL,
  description TEXT NULL,
  detail_text VARCHAR(255) NULL,
  media_type ENUM('image', 'google_drive_image', 'google_drive_video', 'youtube') NOT NULL DEFAULT 'image',
  media_url VARCHAR(1000) NOT NULL,
  alt_text VARCHAR(255) NULL,
  sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  updated_by INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_about_items_section (section_key, is_active, sort_order),
  CONSTRAINT fk_about_items_user FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

SOURCE database/seed.sql;
