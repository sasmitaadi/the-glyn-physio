USE glyn_physio;

ALTER TABLE contents
  ADD COLUMN featured_media_type ENUM('image', 'youtube', 'google_drive') NULL AFTER meta_description,
  ADD COLUMN featured_media_url VARCHAR(1000) NULL AFTER featured_media_type;
