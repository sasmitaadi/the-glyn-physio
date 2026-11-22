ALTER TABLE contents
  ADD COLUMN service_treatments TEXT NULL AFTER body,
  ADD COLUMN sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0 AFTER service_treatments;

UPDATE contents
SET sort_order = CASE slug
  WHEN 'geriatri' THEN 10
  WHEN 'pasca-operasi' THEN 20
  WHEN 'olahraga' THEN 30
  WHEN 'umum' THEN 40
  ELSE sort_order
END
WHERE type = 'service' AND sort_order = 0;

UPDATE contents
SET service_treatments = CASE slug
  WHEN 'geriatri' THEN 'Pengapuran Sendi\nBahu Beku\nPemulihan Pasca Stroke\nPenggantian Lutut & Pinggang'
  WHEN 'pasca-operasi' THEN 'Pemulihan ACL\nPemulihan MCL\nPerbaikan Meniscus\nPemulihan Tulang Punggung'
  WHEN 'olahraga' THEN 'Cedera Mata Kaki & Ligamen\nTennis Elbow\nCedera Rotator Cuff\nCedera Lutut'
  WHEN 'umum' THEN 'HNP Leher & Tulang Punggung Bawah\nNyeri Leher\nNyeri Lutut\nNyeri Pinggul'
  ELSE service_treatments
END
WHERE type = 'service' AND (service_treatments IS NULL OR service_treatments = '');
