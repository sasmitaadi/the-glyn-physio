USE glyn_physio;

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

INSERT INTO faqs (service_slug, question, answer, sort_order, is_active)
SELECT NULL, 'Berapa lama satu sesi terapi?', 'Umumnya 45–60 menit, menyesuaikan asesmen dan rangkaian latihan.', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM faqs WHERE question='Berapa lama satu sesi terapi?');

INSERT INTO faqs (service_slug, question, answer, sort_order, is_active)
SELECT NULL, 'Berapa sesi yang saya butuhkan?', 'Jumlah sesi ditentukan setelah asesmen dan dapat berubah mengikuti progres Anda.', 2, 1
WHERE NOT EXISTS (SELECT 1 FROM faqs WHERE question='Berapa sesi yang saya butuhkan?');

INSERT INTO faqs (service_slug, question, answer, sort_order, is_active)
SELECT NULL, 'Apakah perlu rujukan dokter?', 'Hubungi tim kami untuk memastikan kebutuhan dokumen sesuai kondisi Anda.', 3, 1
WHERE NOT EXISTS (SELECT 1 FROM faqs WHERE question='Apakah perlu rujukan dokter?');
