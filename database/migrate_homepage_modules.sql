USE glyn_physio;

CREATE TABLE IF NOT EXISTS specialties (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  tagline TEXT NULL,
  treatments TEXT NULL,
  service_slug VARCHAR(255) NULL,
  media_type ENUM('youtube', 'google_drive', 'image') NOT NULL DEFAULT 'youtube',
  media_url VARCHAR(1000) NULL,
  sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  updated_by INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_specialties_status (is_active, sort_order),
  CONSTRAINT fk_specialties_user FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  patient_name VARCHAR(120) NULL,
  patient_role VARCHAR(120) NULL,
  quote_text TEXT NULL,
  media_type ENUM('youtube', 'google_drive', 'image') NOT NULL DEFAULT 'google_drive',
  media_url VARCHAR(1000) NOT NULL,
  sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  updated_by INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_testimonials_status (is_active, sort_order),
  CONSTRAINT fk_testimonials_user FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS therapy_sessions (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(180) NOT NULL,
  caption_text TEXT NULL,
  media_type ENUM('google_drive', 'image', 'youtube') NOT NULL DEFAULT 'google_drive',
  media_url VARCHAR(1000) NOT NULL,
  alt_text VARCHAR(255) NULL,
  sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  updated_by INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_therapy_sessions_status (is_active, sort_order),
  CONSTRAINT fk_therapy_sessions_user FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

SOURCE database/seed.sql;
