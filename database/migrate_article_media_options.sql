USE glyn_physio;

ALTER TABLE contents
  MODIFY COLUMN featured_media_type ENUM('image', 'youtube', 'google_drive', 'google_drive_image', 'google_drive_video') NULL;
