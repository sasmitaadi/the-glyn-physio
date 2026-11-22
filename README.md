# The Glyn Physio

Website publik dan dashboard manajemen berbasis PHP 7.2+, MySQL, HTML, dan JavaScript tanpa build step.

## Menjalankan lokal

Cara tercepat di Windows/Laragon:

```powershell
.\start-local.ps1
```

Atau klik dua kali `start-local.cmd`. Script akan menyalakan MySQL Laragon bila tersedia, menjalankan PHP di `http://localhost:8080`, dan menampilkan alamat website serta dashboard.

Cara manual:

1. Pastikan Apache/Nginx, PHP, dan MySQL aktif.
2. Impor `database/schema.sql`, lalu `database/seed.sql`.
3. Buka `/glynphysioubud/` untuk website dan `/glynphysioubud/admin/login.html` untuk dashboard.

Kredensial awal dashboard:

- Email: `admin@theglynphysio.com`
- Kata sandi: `GlynLaunch2026!`

Segera ubah kata sandi lewat menu **Pengguna** setelah login pertama. Untuk server produksi, koneksi database dapat diatur memakai `GLYN_DB_DSN`, `GLYN_DB_USER`, dan `GLYN_DB_PASSWORD` sebagai environment variable server atau dalam file `.env` yang disalin dari `.env.example`. Environment variable server selalu diprioritaskan.

Pastikan folder `uploads/` dapat ditulis oleh PHP. Instalasi lama dapat menjalankan migration pada folder `database/`, termasuk `migrate_service_management.sql`, masing-masing satu kali sesuai versi yang belum pernah diterapkan.

Google Review dapat memakai nilai manual atau sinkronisasi Places API (New). Untuk mode otomatis, aktifkan Places API (New), billing, pembatasan API key, lalu set `GLYN_GOOGLE_PLACES_API_KEY` pada environment server. Rating dan jumlah ulasan di-cache selama 12 jam.

## Deployment melalui GitLab CI

Pipeline `.gitlab-ci.yml` memeriksa sintaks seluruh file PHP dan JavaScript, kemudian mengunggah branch default ke server produksi melalui SSH/rsync. File upload pengguna dan session PHP tidak dihapus atau ditimpa saat deployment.

Tambahkan variabel berikut melalui **GitLab → Settings → CI/CD → Variables**:

| Variable | Isi | Pengaturan |
| --- | --- | --- |
| `DEPLOY_HOST` | Hostname atau IP server | Protected |
| `DEPLOY_USER` | Pengguna SSH deployment | Protected |
| `DEPLOY_PATH` | Path absolut document root, contoh `/home/user/public_html` | Protected |
| `DEPLOY_PORT` | Port SSH, biasanya `22` | Protected, opsional |
| `DEPLOY_URL` | URL produksi, contoh `https://theglynphysio.com` | Protected |
| `SSH_PRIVATE_KEY` | Private key deployment | Protected, Masked, tipe **File** disarankan |
| `SSH_KNOWN_HOSTS` | Hasil `ssh-keyscan -H nama-host` | Protected, tipe File tidak diperlukan |

Public key pasangan `SSH_PRIVATE_KEY` harus dipasang pada `~/.ssh/authorized_keys` milik `DEPLOY_USER`. Pastikan pengguna tersebut memiliki izin tulis ke `DEPLOY_PATH`. Konfigurasi database produksi (`GLYN_DB_DSN`, `GLYN_DB_USER`, dan `GLYN_DB_PASSWORD`) tetap diatur pada server hosting dan tidak disimpan di GitLab repository.

Push atau merge ke branch default akan menjalankan deployment otomatis setelah kedua pemeriksaan sintaks berhasil. Migration database tetap dijalankan satu kali secara manual agar perubahan skema tidak dilakukan tanpa pemeriksaan administrator.

## SEO

- Canonical, Open Graph, Twitter Card, meta description, dan robots meta dibuat dinamis per halaman.
- Structured data mencakup `MedicalClinic`, `LocalBusiness`, `WebSite`, `BreadcrumbList`, `Article`, dan `Service`.
- Sitemap tersedia di `/sitemap.xml` dan otomatis memuat artikel serta layanan berstatus published.
- `robots.txt` mengizinkan halaman publik dan mencegah dashboard/API ikut diindeks.
- URL produksi SEO dikonfigurasi sebagai `https://theglynphysio.com`.

## Data website

- `contents`: artikel, card layanan, detail layanan, dan halaman; hanya status `published` yang tampil ke pengunjung.
- Media unggulan artikel mendukung upload JPG/PNG/WebP, URL foto, foto/video Google Drive, atau video YouTube dengan preview.
- `site_sections`: teks section seperti hero, CTA, dan lokasi.
- `site_links`: WhatsApp, Google Maps, email, telepon, sosial, dan link lain.
- `specialties`: kartu Spesialisasi Kami pada beranda.
- `testimonials`: foto, video, dan cerita Testimoni Pasien.
- `therapy_sessions`: foto Google Drive, URL gambar, atau video untuk Simak Sesi Terapi Kami.
- `about_items`: metode fisioterapi, komitmen, fisioterapis, serta kelengkapan alat.
- `business_hours`: jam buka Senin–Minggu, status tutup, dan catatan khusus yang tampil di footer.
- `analytics_events`: page view dan klik CTA selama 30 hari terakhir.
