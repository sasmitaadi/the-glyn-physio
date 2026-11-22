USE glyn_physio;

INSERT IGNORE INTO google_review_settings (id, mode, rating, review_count, maps_url) VALUES
(1, 'manual', 5.0, 539, 'https://maps.app.goo.gl/hGmzqtm59Q2mreX16');

INSERT IGNORE INTO business_hours (day_key, day_label, open_time, close_time, is_closed, note, sort_order) VALUES
('monday', 'Senin', '08:00:00', '20:00:00', 0, NULL, 1),
('tuesday', 'Selasa', '08:00:00', '20:00:00', 0, NULL, 2),
('wednesday', 'Rabu', '08:00:00', '20:00:00', 0, NULL, 3),
('thursday', 'Kamis', '08:00:00', '20:00:00', 0, NULL, 4),
('friday', 'Jumat', '08:00:00', '20:00:00', 0, NULL, 5),
('saturday', 'Sabtu', '08:00:00', '18:00:00', 0, NULL, 6),
('sunday', 'Minggu', NULL, NULL, 1, 'Dengan janji', 7);

-- Ganti kata sandi admin setelah login pertama. Kredensial awal didokumentasikan di README.md.
INSERT IGNORE INTO users (name, email, password_hash, role, is_active) VALUES
('Site Admin', 'admin@theglynphysio.com', '$2y$10$HFwcf0afO9GiqflXMH2Y7eSe1wLOzm7QN4jhs57E1ISZbklm0OLKK', 'admin', 1);

INSERT IGNORE INTO contents (type, title, slug, summary, body, status, meta_title, meta_description) VALUES
('service', 'Perawatan geriatri', 'geriatri', 'Program bertahap untuk menjaga mobilitas, kekuatan, dan keseimbangan.', 'Program bertahap untuk menjaga mobilitas, kekuatan, keseimbangan, dan rasa aman dalam aktivitas sehari-hari.', 'published', 'Perawatan Geriatri di Ubud', 'Fisioterapi geriatri personal di Ubud.'),
('service', 'Pemulihan pasca operasi', 'pasca-operasi', 'Evaluasi berkala dan latihan progresif untuk memulihkan gerak.', 'Evaluasi berkala dan latihan progresif membantu memulihkan rentang gerak, kekuatan, serta kepercayaan diri.', 'published', 'Pemulihan Pasca Operasi di Ubud', 'Program fisioterapi pasca operasi di Ubud.'),
('service', 'Pemulihan cedera olahraga', 'olahraga', 'Program pemulihan untuk kembali ke olahraga pilihan.', 'Kami membantu Anda mengelola beban latihan, membangun kapasitas tubuh, dan kembali ke olahraga pilihan.', 'published', 'Pemulihan Cedera Olahraga di Ubud', 'Fisioterapi cedera olahraga di Ubud.'),
('service', 'Perawatan kesehatan umum', 'umum', 'Solusi personal untuk nyeri, kaku, dan keterbatasan gerak.', 'Solusi personal untuk keluhan nyeri, kaku, dan keterbatasan gerak yang mengganggu keseharian.', 'published', 'Fisioterapi Umum di Ubud', 'Perawatan fisioterapi umum di Ubud.'),
('article', 'Memahami nyeri punggung dan cara mengelolanya', 'nyeri-punggung', 'Kenali langkah aman untuk mulai bergerak kembali.', 'Nyeri punggung dapat dipengaruhi kebiasaan, beban, dan kapasitas tubuh.', 'published', 'Nyeri Punggung dan Cara Mengelolanya', 'Panduan memahami dan mengelola nyeri punggung.'),
('article', 'Mengenal cedera lutut saat beraktivitas', 'cedera-lutut', 'Pendekatan bertahap dapat membantu mengembalikan fungsi lutut.', 'Pendekatan bertahap dapat membantu mengembalikan fungsi lutut dan mengurangi kekhawatiran saat bergerak.', 'published', 'Mengenal Cedera Lutut', 'Informasi cedera lutut saat beraktivitas.'),
('article', 'Latihan keseimbangan untuk aktivitas harian', 'keseimbangan', 'Keseimbangan adalah kemampuan yang bisa dilatih.', 'Keseimbangan adalah kemampuan yang bisa dilatih, dimulai dari gerakan sederhana.', 'published', 'Latihan Keseimbangan', 'Latihan keseimbangan untuk aktivitas harian.');

INSERT IGNORE INTO media (name, media_type, url, alt_text) VALUES
('Testimonial pasien 01', 'google_drive', '1O_yUPb17ChvyUHq2jx5MlVf1cMUDv6LP', 'Video testimonial pasien'),
('Video layanan geriatri', 'youtube', 'T-FQ2ckFnT0', 'Video layanan geriatri');

INSERT IGNORE INTO site_links (label, link_type, url, display_text, placement, sort_order) VALUES
('WhatsApp konsultasi', 'whatsapp', 'https://wa.me/6281234567890?text=Halo%20The%20Glyn%20Physio', '+62 812-3456-7890', 'header,footer', 1),
('Lokasi Google Maps', 'google_maps', 'https://maps.app.goo.gl/hGmzqtm59Q2mreX16', 'Ubud, Bali', 'contact,footer', 2),
('Email klinik', 'email', 'mailto:hello@theglynphysio.com', 'hello@theglynphysio.com', 'contact,footer', 3),
('Nomor telepon klinik', 'phone', 'tel:+6281234567890', '+62 812-3456-7890', 'contact,footer', 4),
('Instagram', 'social', 'https://www.instagram.com/theglynphysio', '@theglynphysio', 'footer', 4);

INSERT IGNORE INTO site_sections (page_key, section_key, title, content_json, sort_order) VALUES
('home', 'hero', 'Hero homepage', JSON_OBJECT('eyebrow', 'Fisioterapi berbasis bukti', 'title', 'Bergerak lebih baik, hidup lebih berarti.'), 1),
('home', 'cta', 'CTA konsultasi', JSON_OBJECT('title', 'Siap bergerak?', 'button', 'Konsultasi sekarang'), 90),
('contact', 'location', 'Kontak dan lokasi', JSON_OBJECT('city', 'Ubud, Bali, Indonesia'), 1);

INSERT INTO faqs (service_slug, question, answer, sort_order, is_active)
SELECT NULL, 'Berapa lama satu sesi terapi?', 'Umumnya 45–60 menit, menyesuaikan asesmen dan rangkaian latihan.', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM faqs WHERE question='Berapa lama satu sesi terapi?');
INSERT INTO faqs (service_slug, question, answer, sort_order, is_active)
SELECT NULL, 'Berapa sesi yang saya butuhkan?', 'Jumlah sesi ditentukan setelah asesmen dan dapat berubah mengikuti progres Anda.', 2, 1
WHERE NOT EXISTS (SELECT 1 FROM faqs WHERE question='Berapa sesi yang saya butuhkan?');
INSERT INTO faqs (service_slug, question, answer, sort_order, is_active)
SELECT NULL, 'Apakah perlu rujukan dokter?', 'Hubungi tim kami untuk memastikan kebutuhan dokumen sesuai kondisi Anda.', 3, 1
WHERE NOT EXISTS (SELECT 1 FROM faqs WHERE question='Apakah perlu rujukan dokter?');

INSERT INTO pricing (service_slug, package_name, price_amount, note, sort_order, is_active)
SELECT NULL, '1 Sesi', 350000, NULL, 1, 1
WHERE NOT EXISTS (SELECT 1 FROM pricing WHERE service_slug IS NULL AND package_name='1 Sesi');
INSERT INTO pricing (service_slug, package_name, price_amount, note, sort_order, is_active)
SELECT NULL, '3 Sesi', 975000, 'Hemat Rp75.000', 2, 1
WHERE NOT EXISTS (SELECT 1 FROM pricing WHERE service_slug IS NULL AND package_name='3 Sesi');
INSERT INTO pricing (service_slug, package_name, price_amount, note, sort_order, is_active)
SELECT NULL, '6 Sesi', 1800000, 'Hemat Rp300.000', 3, 1
WHERE NOT EXISTS (SELECT 1 FROM pricing WHERE service_slug IS NULL AND package_name='6 Sesi');

INSERT INTO specialties (title, tagline, treatments, service_slug, media_type, media_url, sort_order, is_active)
SELECT 'Klinik Perawatan Geriatri di Ubud', 'Gerak dengan nyaman di usia lanjut.', 'Pengapuran Sendi\nBahu Beku\nPemulihan Pasca Stroke\nPenggantian Lutut & Pinggang', 'geriatri', 'youtube', 'T-FQ2ckFnT0', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM specialties WHERE service_slug='geriatri');
INSERT INTO specialties (title, tagline, treatments, service_slug, media_type, media_url, sort_order, is_active)
SELECT 'Pemulihan Pasca Operasi di Ubud', 'Pulihkan kekuatan dan mobilitas Anda.', 'Pemulihan ACL\nPemulihan MCL\nPerbaikan Meniscus\nPemulihan Tulang Punggung', 'pasca-operasi', 'youtube', 'Hy1qjQomD8Y', 2, 1
WHERE NOT EXISTS (SELECT 1 FROM specialties WHERE service_slug='pasca-operasi');
INSERT INTO specialties (title, tagline, treatments, service_slug, media_type, media_url, sort_order, is_active)
SELECT 'Pemulihan Cedera Olahraga di Ubud', 'Kembalikan performa terbaik Anda.', 'Cedera Mata Kaki & Ligamen\nTennis Elbow\nCedera Rotator Cuff\nCedera Lutut', 'olahraga', 'youtube', 't26n0kA_zlE', 3, 1
WHERE NOT EXISTS (SELECT 1 FROM specialties WHERE service_slug='olahraga');
INSERT INTO specialties (title, tagline, treatments, service_slug, media_type, media_url, sort_order, is_active)
SELECT 'Perawatan Kesehatan Umum di Ubud', 'Nikmati aktivitas sehari-hari tanpa sakit.', 'HNP Leher & Tulang Punggung Bawah\nNyeri Leher\nNyeri Lutut\nNyeri Pinggul', 'umum', 'youtube', 't26n0kA_zlE', 4, 1
WHERE NOT EXISTS (SELECT 1 FROM specialties WHERE service_slug='umum');
INSERT INTO specialties (title, tagline, treatments, service_slug, media_type, media_url, sort_order, is_active)
SELECT 'Sport Massage', 'Dukung pemulihan dan kesiapan tubuh untuk beraktivitas.', 'Pemulihan otot\nPersiapan aktivitas\nRelaksasi jaringan', NULL, 'youtube', 'Hy1qjQomD8Y', 5, 1
WHERE NOT EXISTS (SELECT 1 FROM specialties WHERE title='Sport Massage');
INSERT INTO specialties (title, tagline, treatments, service_slug, media_type, media_url, sort_order, is_active)
SELECT 'Dry Needling Treatment', 'Pendekatan terarah untuk membantu mengurangi ketegangan otot.', 'Titik pemicu\nKetegangan otot\nMobilitas gerak', NULL, 'youtube', 'T-FQ2ckFnT0', 6, 1
WHERE NOT EXISTS (SELECT 1 FROM specialties WHERE title='Dry Needling Treatment');

INSERT INTO testimonials (patient_name, patient_role, quote_text, media_type, media_url, sort_order, is_active)
SELECT 'Pasien The Glyn Physio', NULL, 'Pengalaman pasien bersama The Glyn Physio.', 'google_drive', '1O_yUPb17ChvyUHq2jx5MlVf1cMUDv6LP', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM testimonials WHERE media_url='1O_yUPb17ChvyUHq2jx5MlVf1cMUDv6LP');

INSERT INTO therapy_sessions (title, caption_text, media_type, media_url, alt_text, sort_order, is_active)
SELECT 'Simak Sesi Terapi Kami', 'Fisioterapis mendampingi latihan dan menyesuaikan program dengan kebutuhan pasien.', 'youtube', 'T-FQ2ckFnT0', 'Sesi terapi The Glyn Physio', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM therapy_sessions WHERE title='Simak Sesi Terapi Kami');

INSERT INTO about_items (section_key,title,description,media_type,media_url,alt_text,sort_order,is_active)
SELECT 'methods','Pemijatan','Membantu membebaskan jaringan yang kaku untuk meningkatkan kenyamanan gerak.','image','https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=82','Metode pemijatan',1,1 WHERE NOT EXISTS (SELECT 1 FROM about_items WHERE section_key='methods' AND title='Pemijatan');
INSERT INTO about_items (section_key,title,description,media_type,media_url,alt_text,sort_order,is_active)
SELECT 'methods','Peregangan','Meningkatkan fleksibilitas otot untuk mendukung rentang gerak yang optimal.','image','https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=82','Metode peregangan',2,1 WHERE NOT EXISTS (SELECT 1 FROM about_items WHERE section_key='methods' AND title='Peregangan');
INSERT INTO about_items (section_key,title,description,media_type,media_url,alt_text,sort_order,is_active)
SELECT 'methods','Modalitas','Mendukung efektivitas terapi dan membantu pengelolaan keluhan sesuai indikasi.','image','https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=82','Modalitas fisioterapi',3,1 WHERE NOT EXISTS (SELECT 1 FROM about_items WHERE section_key='methods' AND title='Modalitas');
INSERT INTO about_items (section_key,title,description,media_type,media_url,alt_text,sort_order,is_active)
SELECT 'methods','Pelatihan','Mengembalikan kekuatan, kontrol gerak, dan daya tahan tubuh secara bertahap.','image','https://images.unsplash.com/photo-1530143311094-34d807799e8f?auto=format&fit=crop&w=900&q=82','Pelatihan fisioterapi',4,1 WHERE NOT EXISTS (SELECT 1 FROM about_items WHERE section_key='methods' AND title='Pelatihan');

INSERT INTO about_items (section_key,title,subtitle,description,detail_text,media_type,media_url,alt_text,sort_order,is_active)
SELECT 'commitments','Berkomitmen memberikan pengalaman pemulihan terbaik.','The Glyn Physio','Tim fisioterapis kami terdiri dari praktisi yang terlatih untuk memberikan program pemulihan sesuai kebutuhan, aktivitas, dan tujuan setiap pasien.','Founder & Chief Physiotherapist','image','assets/team1.jpg','Komitmen tim fisioterapi',1,1 WHERE NOT EXISTS (SELECT 1 FROM about_items WHERE section_key='commitments');

INSERT INTO about_items (section_key,title,description,media_type,media_url,alt_text,sort_order,is_active)
SELECT 'therapists','Dewa Angga. S. Fis., Ftr., OMTC','Lead Physiotherapist — program pemulihan kompleks dan perencanaan terapi personal.','image','assets/team1.jpg','Dewa Angga',1,1 WHERE NOT EXISTS (SELECT 1 FROM about_items WHERE section_key='therapists' AND title='Dewa Angga. S. Fis., Ftr., OMTC');
INSERT INTO about_items (section_key,title,description,media_type,media_url,alt_text,sort_order,is_active)
SELECT 'therapists','Ni Kadek Ari Kusuma Dewi, S.Kes., Ftr.','Pemulihan cedera otot, sendi, serta kondisi pasca operasi.','image','assets/team2.png','Ni Kadek Ari Kusuma Dewi',2,1 WHERE NOT EXISTS (SELECT 1 FROM about_items WHERE section_key='therapists' AND title='Ni Kadek Ari Kusuma Dewi, S.Kes., Ftr.');
INSERT INTO about_items (section_key,title,description,media_type,media_url,alt_text,sort_order,is_active)
SELECT 'therapists','Ida Bagus Gde Putra Keniten, S.Kes., Ftr','Manual therapy, musculoskeletal, dan sport therapy.','image','assets/team3.png','Ida Bagus Gde Putra Keniten',3,1 WHERE NOT EXISTS (SELECT 1 FROM about_items WHERE section_key='therapists' AND title='Ida Bagus Gde Putra Keniten, S.Kes., Ftr');
INSERT INTO about_items (section_key,title,description,media_type,media_url,alt_text,sort_order,is_active)
SELECT 'therapists','Dewa Ayu Krisnika, S.Kes., Ftr.','Rehabilitasi post-op dan geriatri.','image','assets/team4.png','Dewa Ayu Krisnika',4,1 WHERE NOT EXISTS (SELECT 1 FROM about_items WHERE section_key='therapists' AND title='Dewa Ayu Krisnika, S.Kes., Ftr.');

INSERT INTO about_items (section_key,title,description,media_type,media_url,alt_text,sort_order,is_active)
SELECT 'equipment','Ultrasound Therapy','Mendukung penanganan jaringan sesuai indikasi.','image','https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=82','Ultrasound Therapy',1,1 WHERE NOT EXISTS (SELECT 1 FROM about_items WHERE section_key='equipment' AND title='Ultrasound Therapy');
INSERT INTO about_items (section_key,title,description,media_type,media_url,alt_text,sort_order,is_active)
SELECT 'equipment','TENS','Membantu manajemen nyeri pada program tertentu.','image','https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=82','TENS',2,1 WHERE NOT EXISTS (SELECT 1 FROM about_items WHERE section_key='equipment' AND title='TENS');
INSERT INTO about_items (section_key,title,description,media_type,media_url,alt_text,sort_order,is_active)
SELECT 'equipment','Resistance Equipment','Mendukung latihan kekuatan secara bertahap.','image','https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=82','Resistance Equipment',3,1 WHERE NOT EXISTS (SELECT 1 FROM about_items WHERE section_key='equipment' AND title='Resistance Equipment');
INSERT INTO about_items (section_key,title,description,media_type,media_url,alt_text,sort_order,is_active)
SELECT 'equipment','Balance Tools','Melatih kontrol gerak dan stabilitas.','image','https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=82','Balance Tools',4,1 WHERE NOT EXISTS (SELECT 1 FROM about_items WHERE section_key='equipment' AND title='Balance Tools');
INSERT INTO about_items (section_key,title,description,media_type,media_url,alt_text,sort_order,is_active)
SELECT 'equipment','Mobility Support','Mendukung latihan fungsi dan pola berjalan.','image','https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=82','Mobility Support',5,1 WHERE NOT EXISTS (SELECT 1 FROM about_items WHERE section_key='equipment' AND title='Mobility Support');
INSERT INTO about_items (section_key,title,description,media_type,media_url,alt_text,sort_order,is_active)
SELECT 'equipment','Private Treatment Area','Ruang nyaman untuk asesmen dan terapi personal.','image','https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=82','Private Treatment Area',6,1 WHERE NOT EXISTS (SELECT 1 FROM about_items WHERE section_key='equipment' AND title='Private Treatment Area');
