CREATE DATABASE IF NOT EXISTS glyn_physio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE glyn_physio;

CREATE TABLE IF NOT EXISTS users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'editor', 'analyst') NOT NULL DEFAULT 'editor',
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS contents (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type ENUM('page', 'article', 'service') NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  summary TEXT NULL,
  body MEDIUMTEXT NULL,
  service_treatments TEXT NULL,
  sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
  meta_title VARCHAR(255) NULL,
  meta_description VARCHAR(320) NULL,
  featured_media_type ENUM('image', 'youtube', 'google_drive', 'google_drive_image', 'google_drive_video') NULL,
  featured_media_url VARCHAR(1000) NULL,
  updated_by INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_contents_user FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS site_sections (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  page_key VARCHAR(60) NOT NULL,
  section_key VARCHAR(80) NOT NULL,
  title VARCHAR(255) NOT NULL,
  content_json JSON NOT NULL,
  sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  is_visible TINYINT(1) NOT NULL DEFAULT 1,
  updated_by INT UNSIGNED NULL,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_page_section (page_key, section_key),
  CONSTRAINT fk_sections_user FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS media (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  media_type ENUM('image', 'youtube', 'google_drive', 'document') NOT NULL,
  url VARCHAR(1000) NOT NULL,
  thumbnail_url VARCHAR(1000) NULL,
  alt_text VARCHAR(255) NULL,
  created_by INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_media_user FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS site_links (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(120) NOT NULL,
  link_type ENUM('whatsapp', 'google_maps', 'email', 'phone', 'social', 'custom') NOT NULL,
  url VARCHAR(1000) NOT NULL,
  display_text VARCHAR(255) NULL,
  placement VARCHAR(80) NOT NULL DEFAULT 'footer',
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS analytics_events (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  event_name VARCHAR(80) NOT NULL,
  event_label VARCHAR(255) NULL,
  page_path VARCHAR(500) NOT NULL,
  visitor_id CHAR(36) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_events_name_date (event_name, created_at),
  INDEX idx_events_page_date (page_path(120), created_at)
);

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

CREATE TABLE IF NOT EXISTS business_hours (
  id TINYINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  day_key ENUM('monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday') NOT NULL UNIQUE,
  day_label VARCHAR(40) NOT NULL,
  open_time TIME NULL,
  close_time TIME NULL,
  is_closed TINYINT(1) NOT NULL DEFAULT 0,
  note VARCHAR(120) NULL,
  sort_order TINYINT UNSIGNED NOT NULL DEFAULT 0,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS faqs (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  service_slug VARCHAR(255) NULL,
  question VARCHAR(255) NOT NULL,
  answer TEXT NOT NULL,
  sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  updated_by INT UNSIGNED NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_faq_service_status (service_slug, is_active, sort_order),
  CONSTRAINT fk_faq_user FOREIGN KEY (updated_by) REFERENCES users(id) ON DELETE SET NULL
);

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
