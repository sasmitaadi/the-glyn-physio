USE glyn_physio;

ALTER TABLE site_links
  ADD COLUMN display_text VARCHAR(255) NULL AFTER url;
