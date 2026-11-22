USE glyn_physio;

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

INSERT IGNORE INTO business_hours (day_key, day_label, open_time, close_time, is_closed, note, sort_order) VALUES
('monday', 'Senin', '08:00:00', '20:00:00', 0, NULL, 1),
('tuesday', 'Selasa', '08:00:00', '20:00:00', 0, NULL, 2),
('wednesday', 'Rabu', '08:00:00', '20:00:00', 0, NULL, 3),
('thursday', 'Kamis', '08:00:00', '20:00:00', 0, NULL, 4),
('friday', 'Jumat', '08:00:00', '20:00:00', 0, NULL, 5),
('saturday', 'Sabtu', '08:00:00', '18:00:00', 0, NULL, 6),
('sunday', 'Minggu', NULL, NULL, 1, 'Dengan janji', 7);
