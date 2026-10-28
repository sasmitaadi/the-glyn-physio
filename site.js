const WHATSAPP = "https://wa.me/6281234567890?text=Halo%20The%20Glyn%20Physio%2C%20saya%20ingin%20konsultasi.";
const DEFAULT_VIDEO = "Hy1qjQomD8Y";

const services = {
  geriatri: { title: "Perawatan geriatri", cardTitle: "Klinik Perawatan Geriatri di Ubud", tagline: "Gerak dengan nyaman di usia lanjut.", description: "Program bertahap untuk menjaga mobilitas, kekuatan, keseimbangan, dan rasa aman dalam aktivitas sehari-hari.", video: "T-FQ2ckFnT0", treatments: ["Pengapuran Sendi", "Bahu Beku", "Pemulihan Pasca Stroke", "Penggantian Lutut & Pinggang"] },
  "pasca-operasi": { title: "Pemulihan pasca operasi", cardTitle: "Pemulihan Pasca Operasi di Ubud", tagline: "Pulihkan kekuatan dan mobilitas anda.", description: "Evaluasi berkala dan latihan progresif membantu memulihkan rentang gerak, kekuatan, serta kepercayaan diri.", video: "Hy1qjQomD8Y", treatments: ["Pemulihan ACL", "Pemulihan MCL", "Perbaikan Meniscus", "Pemulihan Tulang Punggung"] },
  olahraga: { title: "Pemulihan cedera olahraga", cardTitle: "Pemulihan Cedera Olahraga di Ubud", tagline: "Kembalikan performa terbaik anda.", description: "Kami membantu Anda mengelola beban latihan, membangun kapasitas tubuh, dan kembali ke olahraga pilihan.", video: "t26n0kA_zlE", treatments: ["Cedera Mata Kaki & Ligamen", "Tennis Elbow", "Cedera Rotator Cuff", "Cedera Lutut"] },
  umum: { title: "Perawatan kesehatan umum", cardTitle: "Perawatan Kesehatan Umum di Ubud", tagline: "Nikmati aktivitas sehari-hari tanpa sakit.", description: "Solusi personal untuk keluhan nyeri, kaku, dan keterbatasan gerak yang mengganggu keseharian.", video: "t26n0kA_zlE", treatments: ["HNP Leher & Tulang Punggung Bawah", "Nyeri Leher", "Nyeri Lutut", "Nyeri Pinggul"] }
};

const additionalSpecializations = [
  { title: "Sport Massage", tagline: "Dukung pemulihan dan kesiapan tubuh untuk beraktivitas.", treatments: ["Pemulihan otot", "Persiapan aktivitas", "Relaksasi jaringan"], video: DEFAULT_VIDEO },
  { title: "Dry Needling Treatment", tagline: "Pendekatan terarah untuk membantu mengurangi ketegangan otot.", treatments: ["Titik pemicu", "Ketegangan otot", "Mobilitas gerak"], video: "T-FQ2ckFnT0" }
];

const testimonials = [
  { name: "Nama Pasien 01", position: "Profesional aktif", video: DEFAULT_VIDEO, summary: "Program terapi membantu pasien memahami sumber keluhan, kembali bergerak secara bertahap, dan menjalani aktivitas harian dengan lebih percaya diri." },
  { name: "Nama Pasien 02", position: "Atlet rekreasional", video: "t26n0kA_zlE", summary: "Pendampingan berfokus pada penguatan, kontrol gerak, dan peningkatan beban yang terukur sebelum kembali berolahraga." },
  { name: "Nama Pasien 03", position: "Pensiunan aktif", video: "T-FQ2ckFnT0", summary: "Latihan yang disesuaikan membantu pasien meningkatkan keseimbangan dan merasa lebih aman saat melakukan kegiatan sehari-hari." },
  { name: "Nama Pasien 04", position: "Pekerja aktif", video: DEFAULT_VIDEO, summary: "Edukasi dan latihan yang praktis membantu pasien mengelola keluhan serta kembali menjalani rutinitas dengan lebih nyaman." },
  { name: "Nama Pasien 05", position: "Pelari rekreasional", video: "t26n0kA_zlE", summary: "Program progresif membantu pasien membangun kekuatan dan kembali beraktivitas dengan rasa percaya diri." }
];

const driveTestimonials = [
  ["0b65c08a-5ba5-4207-88dd-08302da7f957.MP4", "1O_yUPb17ChvyUHq2jx5MlVf1cMUDv6LP"],
  ["0b32875d-08a5-459a-87ae-3cbc9f74e2bb.mov", "1XcEBTN7kVOsaCv7EVT1EiXvVjacaGHgZ"],
  ["0c8fcbc5-0873-469c-aac7-2da8ea05e39d.mov", "1H-qVA7rg9q6S9qd5bTaPXIrc-wT8aab9"],
  ["01d15f0d-5f28-4be4-9cec-691e4956f445.mov", "16bAebG9ASaexbpKahF4Zg2uiT1whZmwR"],
  ["2d0cbd62-3e39-4ec9-ab1e-95e97c37c3eb.mov", "16WNwQwYL7YiC7kySGAQTRFZ18vYIu08X"],
  ["5b1eeb0a-af9e-4c59-832c-1a2e2be87747.MP4", "17EhMlXUhNpfbVUFtmQkuCf9rRyysFNtE"],
  ["7dc0222f-41e6-4070-9945-c3171eff6f1d.MP4", "1sQm2T-mZycfSAXw8V_lNoa911IqumPVT"],
  ["7dfa41b1-b7f0-4cb6-a8d8-31b26b65fc73.MP4", "1dJjm3XBpl7969f0eIDOtHZNhWJQqhJpB"],
  ["12f277a1-3a7f-41ee-aacc-544f487fc9a6.MP4", "1Ul6myDjpsYbE4HZVc1piGyjDnq_u-ad6"],
  ["29ef1aeb-ae1b-4aff-9f0b-430fa4937405.MP4", "1d10sNnZevz3ckINu_E8_O_PDF84RNnVv"],
  ["71e4e061-8233-40cc-a252-2cbea8c4410d.mov", "11QsXZGGZCNzYnzuYeS_Ez9qSY6HvqY61"],
  ["86accfe4-adb9-42f2-a184-602a2d415939.mov", "1LJS085qhpeFrxSad2j-MZE3aIgvrBp0g"],
  ["87b420f4-2a0d-4d84-b6f3-1f5fe28c617f.MP4", "1KdBzj4RP8d_UmUJV159TfuP42FAYQiry"],
  ["966de051-2d9a-4801-a44c-f17acda44cc1.mov", "1ehQ7fibTpgG_ZI8_-1vjnxz5pRSzeYVH"],
  ["15361f98-6023-4286-a97b-3401cc2d383e.MP4", "1Vl1i8SBnCH5hnONe5dAMxxBfNel07U98"],
  ["63172bc2-09d0-4acf-a029-c6f28eeff465.mov", "1xXsMtJG6tTOoFW4OzmMTwCH9_IomhLO1"],
  ["7102431b-60c4-4790-aeac-61b9f4faa6bd.mov", "15Gj2SG-cQj14DQzV0gaekwb9EPB5nAWW"],
  ["96032580-b44f-4005-b061-47e48a79911b.mov", "1gW0JRekN84EYzzUXEtp7v5F_iPD7G9An"],
  ["af331d15-4cd7-47e7-b2b3-eb911ab52a2d.MP4", "1BRk_mO6niOcUUrd0ujhduUl31E_5vzNp"],
  ["b3a95c72-0478-4478-8368-b3a1de8ded20.MP4", "1ZxYIaGauqjcRKQWsA1QFZc2Gfew9x6OE"],
  ["b08e9ad3-d363-40ef-bf63-1f569e9fa6a6.MP4", "1LpCKIUUpzq2oFWiax8yUeVl-1htAW3gL"],
  ["c11b6fd5-adaf-4003-8f57-dcb1e4db85ce.mov", "12c5jGvOwbjTuCZDcl9U87XtmL1kwLW_D"],
  ["c49b05d4-cda9-4fd6-9a1b-744adddc29fb.mov", "1XQgFgfwDlxd8jzk-NTZA8B5txBdee8ZU"],
  ["f8c3ac49-cf16-4624-bf3a-db3cbcc9d11d.mov", "1RxJb910iyTOvkFEJg40_lmvGHLVkiP36"],
  ["FullSizeRender-compressed.mov", "1w_9G2S9xDt6zFfza3kM9S7Ie5nIr3m_7"],
  ["IMG_0220.mov", "1OGd6kyiHr-Auq5XKXgNDzgigk7_g4NLB"],
  ["IMG_0221.mov", "1BYejv1osayfzgMGhmhqE7GtsjW4Wx4fw"],
  ["IMG_0472.mov", "1-zcSN7a85KPZywNJy6IKjKSaXqmvxUxV"],
  ["IMG_3348.mov", "1lETj7jqsFIVVLO9bTh4vHlfHjZAUFn8F"],
  ["IMG_3490.MOV", "12aJgzBoRqCRArD7fLfPbqcO3a1igv4jF"],
  ["IMG_4860.mov", "1MLvabxKEWSmuTazyQV8O_YOrh-t7GpSJ"],
  ["IMG_5138.MOV", "12ov7wmVzhil1QGl6C2qskSB0TBRqcK06"],
  ["video_20230306_135900~2.mp4", "1WBrR4gwiz-jYeKkV8LnHUe-Pr8vRQb9A"],
  ["video_20230410_123814.mp4", "1Vzlccbo17h7XexNY2rMZxfvhGvf9YkU9"],
  ["video_20230426_120247.mp4", "1QeTMrnwFJDCmymj64LjupYERMhF3YVQt"],
  ["video_20230508_120618~2.mp4", "1QVyHm8p9WfvUYyValdFVlr4iPeyVzKZ1"],
  ["video_20230810_095057~2.mp4", "1VpXr8HtoWxzIy-c-8cjstLrpfAOZ9CqT"],
  ["video_20230810_105504.mp4", "1Vo-nYc4Qbd864XGHaKu-TcPGBlzi5RW6"],
  ["video_20230916_120446.mp4", "1Vm3mFBodykxQVyC4lhhYY3U0ZQV4WVSP"],
  ["video_20231030_095329.mp4", "1Vlyk0Y6HujwkPBnFJrbIuFfBDMHcPcMK"]
].map(([name, id]) => ({ name, id }));

const articles = {
  "nyeri-punggung": { title: "Memahami nyeri punggung dan cara mengelolanya", summary: "Nyeri punggung dapat dipengaruhi kebiasaan, beban, dan kapasitas tubuh. Kenali langkah aman untuk mulai bergerak kembali.", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=82", video: DEFAULT_VIDEO },
  "cedera-lutut": { title: "Mengenal cedera lutut saat beraktivitas", summary: "Pendekatan bertahap dapat membantu mengembalikan fungsi lutut dan mengurangi kekhawatiran saat bergerak.", image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1200&q=82", video: DEFAULT_VIDEO },
  keseimbangan: { title: "Latihan keseimbangan untuk aktivitas harian", summary: "Keseimbangan adalah kemampuan yang bisa dilatih, dimulai dari gerakan sederhana yang sesuai kondisi Anda.", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1200&q=82", video: "T-FQ2ckFnT0" },
  "pemulihan-operasi": { title: "Panduan umum pemulihan setelah operasi", summary: "Pemulihan yang baik membutuhkan komunikasi, konsistensi, dan target realistis bersama fisioterapis.", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=82", video: DEFAULT_VIDEO },
  "cedera-olahraga": { title: "Kembali berolahraga setelah cedera", summary: "Kembali beraktivitas bukan hanya soal rasa nyeri, tetapi juga kesiapan kekuatan dan kontrol gerak.", image: "https://images.unsplash.com/photo-1530143311094-34d807799e8f?auto=format&fit=crop&w=1200&q=82", video: DEFAULT_VIDEO },
  "postur-kerja": { title: "Postur kerja dan kebiasaan bergerak", summary: "Perubahan kecil pada posisi dan jeda bergerak dapat membuat aktivitas kerja terasa lebih nyaman.", image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=82", video: DEFAULT_VIDEO },
  "nyeri-bahu": { title: "Mengatasi keterbatasan gerak bahu", summary: "Bahu membutuhkan kombinasi mobilitas, kontrol, dan kekuatan yang dilatih secara bertahap.", image: "https://images.unsplash.com/photo-1599058917212-d750089bc07e?auto=format&fit=crop&w=1200&q=82", video: "t26n0kA_zlE" },
  "kaki-dan-pergelangan": { title: "Menjaga kesehatan kaki dan pergelangan", summary: "Kaki berperan penting dalam setiap langkah. Perawatan yang tepat membantu Anda tetap aktif.", image: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1200&q=82", video: DEFAULT_VIDEO },
  "latihan-rumahan": { title: "Membangun rutinitas latihan di rumah", summary: "Rutinitas sederhana dan konsisten dapat mendukung hasil terapi di luar ruang klinik.", image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=82", video: "T-FQ2ckFnT0" },
  "konsultasi-pertama": { title: "Apa yang perlu disiapkan sebelum konsultasi?", summary: "Cerita keluhan, tujuan, dan pertanyaan Anda akan membantu sesi pertama berjalan lebih efektif.", image: "https://images.unsplash.com/photo-1666887361002-6e31f6e8e6c9?auto=format&fit=crop&w=1200&q=82", video: DEFAULT_VIDEO }
};

const path = location.pathname.replace(/\\/g, "/");
const route = path.replace(/index\.html$/, "");
const normalizedRoute = route.endsWith("/") ? route : `${route}/`;
const siteSections = new Set(["about-us", "our-clinics", "services", "article", "contact"]);
const firstPathSegment = path.split("/").filter(Boolean)[0];
const isProjectPages = location.protocol !== "file:" && firstPathSegment && !siteSections.has(firstPathSegment);
const isLocalProjectRoot = location.protocol === "file:" && normalizedRoute.endsWith("/glynphysioubud/");
const isProjectRoot = (isProjectPages && normalizedRoute === `/${firstPathSegment}/`) || isLocalProjectRoot;
const isNestedDetail = /\/(services|article)\/[^/]+\/?$/.test(normalizedRoute);
const base = normalizedRoute === "/" || isProjectRoot ? "" : isNestedDetail ? "../../" : "../";

function header() {
  const active = route.includes("/services/") ? "services" : route.includes("/article/") ? "article" : route.endsWith("/about-us/") ? "about" : route.endsWith("/contact/") ? "contact" : "home";
  const navLink = (key, href, label) => `<a class="nav-link ${active === key ? "is-active" : ""}" ${active === key ? 'aria-current="page"' : ""} href="${href}">${label}</a>`;
  const serviceMenu = Object.entries(services).map(([slug, item]) => `<a class="block rounded-xl px-4 py-3 hover:bg-mint hover:text-teal" href="${base}services/${slug}/index.html">${item.title}</a>`).join("");
  return `<header class="sticky top-0 z-40 border-b border-ink/10 bg-sand/95 backdrop-blur-xl"><div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8"><a href="${base}index.html" class="flex items-center" aria-label="The Glyn Physio beranda">  <img class="site-logo h-14 w-auto max-w-[190px] object-contain sm:max-w-[220px]" src="${base}assets/logo.png" alt="The Glyn Physio" width="220" height="144"></a><nav class="hidden items-center gap-7 text-sm font-semibold lg:flex" aria-label="Navigasi utama">${navLink("home", `${base}index.html`, "Beranda")}${navLink("about", `${base}about-us/index.html`, "Tentang kami")}<div class="group relative"><a class="nav-link inline-flex items-center gap-1 ${active === "services" ? "is-active" : ""}" ${active === "services" ? 'aria-current="page"' : ""} href="${base}services/index.html">Layanan <span aria-hidden="true" class="text-[10px]">▾</span></a><div class="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"><div class="rounded-2xl border border-ink/10 bg-white p-2 shadow-soft"><a class="block rounded-xl px-4 py-3 font-extrabold text-teal hover:bg-mint" href="${base}services/index.html">Semua layanan</a>${serviceMenu}</div></div></div>${navLink("article", `${base}article/index.html`, "Artikel")}</nav><div class="flex items-center gap-2"><div id="language-switcher"></div><a href="${base}contact/index.html" class="hidden rounded-full bg-teal px-5 py-3 text-sm font-bold text-white transition hover:bg-ink sm:inline-flex">Hubungi kami</a><button id="menu-button" class="rounded-xl border border-ink/10 p-2 lg:hidden" aria-label="Buka menu" aria-controls="mobile-menu" aria-expanded="false"><span class="block h-0.5 w-5 bg-ink"></span><span class="mt-1.5 block h-0.5 w-5 bg-ink"></span><span class="mt-1.5 block h-0.5 w-5 bg-ink"></span></button></div></div><nav id="mobile-menu" class="hidden border-t border-ink/10 px-5 pb-5 pt-4 lg:hidden" aria-label="Navigasi seluler"><div class="flex flex-col gap-4 text-sm font-semibold">${navLink("home", `${base}index.html`, "Beranda")}${navLink("about", `${base}about-us/index.html`, "Tentang kami")}${navLink("services", `${base}services/index.html`, "Layanan")}<div class="ml-3 flex flex-col gap-3 border-l-2 border-mint pl-4 text-xs text-ink/70">${serviceMenu}</div>${navLink("article", `${base}article/index.html`, "Artikel")}</div></nav></header>`;
}

function footer() {
  return `<footer class="border-t border-ink/10 bg-ink text-white"><div class="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-[1.2fr_.8fr_1fr_1fr_1.2fr] lg:px-8"><div><p class="text-lg font-extrabold">THE GLYN <span class="text-[#8ed9f5]">PHYSIO</span></p><p class="mt-4 max-w-xs text-sm leading-7 text-white/60">Pendampingan fisioterapi personal untuk membantu Anda bergerak lebih nyaman dan percaya diri.</p><div class="mt-6 flex flex-wrap gap-3"><a class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-[#8ed9f5] hover:text-[#8ed9f5]" href="https://www.instagram.com/theglynphysio" target="_blank" rel="noopener" aria-label="Instagram">${socialIcon("instagram")}</a><a class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-[#8ed9f5] hover:text-[#8ed9f5]" href="https://www.facebook.com/theglynphysio" target="_blank" rel="noopener" aria-label="Facebook">${socialIcon("facebook")}</a><a class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-[#8ed9f5] hover:text-[#8ed9f5]" href="https://www.youtube.com/@theglynphysio" target="_blank" rel="noopener" aria-label="YouTube">${socialIcon("youtube")}</a><a class="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 hover:border-[#8ed9f5] hover:text-[#8ed9f5]" href="https://www.tiktok.com/@theglynphysio" target="_blank" rel="noopener" aria-label="TikTok">${socialIcon("tiktok")}</a></div></div><div><p class="text-sm font-bold text-white">Peta situs</p><nav class="mt-4 flex flex-col gap-3 text-sm text-white/60"><a class="hover:text-white" href="${base}index.html">Beranda</a><a class="hover:text-white" href="${base}about-us/index.html">Tentang kami</a><a class="hover:text-white" href="${base}services/index.html">Layanan</a><a class="hover:text-white" href="${base}article/index.html">Artikel</a></nav></div><div><p class="text-sm font-bold text-white">Lokasi & kontak</p><div class="mt-4 space-y-3 text-sm leading-6 text-white/60"><a class="block hover:text-white" href="https://maps.app.goo.gl/hGmzqtm59Q2mreX16" target="_blank" rel="noopener">Ubud, Bali</a><a class="block hover:text-white" href="tel:+6281234567890">+62 812-3456-7890</a><a class="block break-all hover:text-white" href="mailto:hello@theglynphysio.com">hello@theglynphysio.com</a></div></div><div><p class="text-sm font-bold text-white">Jam buka</p><div class="mt-4 space-y-3 text-sm text-white/60"><div class="flex justify-between gap-4"><span>Senin–Jumat</span><span class="text-white">08.00–20.00</span></div><div class="flex justify-between gap-4"><span>Sabtu</span><span class="text-white">08.00–18.00</span></div><div class="flex justify-between gap-4"><span>Minggu</span><span class="text-white">Dengan janji</span></div></div><a href="${WHATSAPP}" class="mt-6 inline-flex rounded-full bg-coral px-5 py-3 text-xs font-bold text-white hover:bg-[#155f91]">Hubungi via WhatsApp</a></div><div><p class="text-sm font-bold text-white">Google Maps</p><div class="mt-4 overflow-hidden rounded-2xl border border-white/10"><iframe class="h-32 w-full border-0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.139406547566!2d115.24846430000001!3d-8.4858234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd223c21dd3d7d9%3A0x688ced0c832ba707!2sPhysiotherapy%20Ubud%20(THE%20GLYN%20PHYSIO)!5e0!3m2!1sid!2sid!4v1792619062331!5m2!1sid!2sid" title="Google Maps The Glyn Physio di Ubud" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div><a class="mt-3 block text-sm text-[#8ed9f5] hover:text-white" href="https://maps.app.goo.gl/hGmzqtm59Q2mreX16" target="_blank" rel="noopener">Buka di Google Maps &#8599;</a><div class="mt-3 flex items-center gap-2" aria-label="Rating Google 5 dari 5"><span class="text-lg tracking-widest text-amber-300" aria-hidden="true">★★★★★</span>  <span class="text-xs text-white/60">5.0 (539 ulasan)</span></div></div></div><div class="border-t border-white/10 px-5 py-5 text-center text-xs text-white/40">© ${new Date().getFullYear()} The Glyn Physio. All rights reserved.</div></footer>`;
}

function videoThumb(video, title, extra = "") {
  return `<button type="button" class="media-cover group block w-full text-left ${extra}" data-video="${video}" data-video-title="${title}"><img class="h-full w-full object-cover" src="https://i.ytimg.com/vi/${video}/hqdefault.jpg" alt="Video ${title}" loading="lazy"><span class="play-button absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl text-teal transition group-hover:scale-110" aria-hidden="true">▶</span><span class="absolute bottom-4 left-5 z-10 text-sm font-bold text-white">Tonton video</span></button>`;
}

function youtubeLinkedThumb(video, title, extra = "") {
  return `<button type="button" data-video="${video}" data-video-title="${title}" class="media-cover group block w-full text-left ${extra}" aria-label="Tonton ${title}"><img class="h-full w-full object-cover" src="https://i.ytimg.com/vi/${video}/hqdefault.jpg" alt="Thumbnail ${title}" loading="lazy"><span class="play-button absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl text-teal transition group-hover:scale-110" aria-hidden="true">▶</span><span class="absolute bottom-4 left-5 z-10 text-sm font-bold text-white">Tonton video</span></button>`;
}

function videoModal() {
  return `<div id="video-modal" class="video-modal fixed inset-0 z-[70] hidden items-center justify-center bg-ink/90 p-3 sm:p-4" role="dialog" aria-modal="true" aria-labelledby="video-modal-title"><div class="video-modal-dialog w-full max-w-5xl"><div class="mb-3 flex items-center justify-between text-white"><h2 id="video-modal-title" class="font-bold">Video</h2><button id="video-close" class="rounded-full bg-white/10 px-4 py-2 text-sm font-bold hover:bg-white/20">Tutup ×</button></div><div class="video-modal-player overflow-hidden rounded-2xl bg-black"><iframe id="video-frame" class="h-full w-full border-0" src="" title="Video fisioterapi" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div></div></div>`;
}

function socialIcon(name) {
  const paths = {
    instagram: '<rect x="3" y="3" width="18" height="18" rx="5"></rect><circle cx="12" cy="12" r="4"></circle><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"></circle>',
    facebook: '<path d="M14 8h3V4h-3c-3.3 0-5 1.8-5 5v3H6v4h3v4h4v-4h3l1-4h-4V9c0-.7.3-1 1-1Z" fill="currentColor" stroke="none"></path>',
    youtube: '<path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.8 4.7 12 4.7 12 4.7s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z" fill="currentColor" stroke="none"></path>',
    tiktok: '<path d="M15 4h3c.2 1.7 1.1 2.7 3 3v3c-1.1 0-2.1-.3-3-1v5.5a5.5 5.5 0 1 1-5.5-5.5c.3 0 .7 0 1 .1v3.1a2.5 2.5 0 1 0 1.5 2.3V4Z" fill="currentColor" stroke="none"></path>'
  };
  return `<svg class="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">${paths[name]}</svg>`;
}

function shell(content, title) {
  document.title = `${title} | The Glyn Physio`;
  document.body.innerHTML = `${header()}<main>${content}</main>${footer()}${videoModal()}`;
  setupAOS();
  setupInteractions();
}

function setupAOS() {
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = "https://unpkg.com/aos@2.3.4/dist/aos.css";
  document.head.appendChild(stylesheet);

  const animatedItems = [...document.querySelectorAll("main > section, main > article, main section article")];
  animatedItems.forEach((item, index) => {
    item.dataset.aos = item.matches("article") ? "fade-up" : "fade-in";
    item.dataset.aosDelay = String((index % 5) * 70);
  });

  const script = document.createElement("script");
  script.src = "https://unpkg.com/aos@2.3.4/dist/aos.js";
  script.onload = () => window.AOS?.init({
    duration: 650,
    easing: "ease-out-cubic",
    once: true,
    offset: 80,
    disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  });
  document.body.appendChild(script);
}

function serviceCards() {
  const cards = Object.entries(services).map(([slug, item]) => ({ ...item, href: `${base}services/${slug}/index.html`, linkLabel: "Selengkapnya" }));
  const additionalCards = additionalSpecializations.map(item => ({ ...item, cardTitle: item.title, href: `${base}contact/index.html`, linkLabel: "Konsultasi" }));
  return [...cards, ...additionalCards].map(item => `<article class="service-card flex h-full flex-col">${videoThumb(item.video, item.cardTitle, "h-44 shrink-0 rounded-xl")}<div class="flex flex-1 flex-col pt-4"><h3 class="text-sm font-bold leading-5 text-ink">${item.cardTitle}</h3><p class="mt-2 text-sm leading-6 text-ink">${item.tagline}</p><p class="mt-1 text-xs leading-5 text-ink/55">${item.treatments.join(", ")}.</p><a class="mt-auto inline-flex items-center gap-1 pt-6 text-[11px] font-extrabold uppercase tracking-wider text-teal" href="${item.href}">${item.linkLabel} <span aria-hidden="true">❯</span></a></div></article>`).join("");
}

function testimonialSection() {
  const cards = driveTestimonials.map((item, index) => `<article class="overflow-hidden rounded-2xl bg-white/10 p-1"><button type="button" class="media-cover group block aspect-square w-full rounded-xl text-left" data-drive-video="${item.id}" data-video-title="Video testimoni ${index + 1}" aria-label="Tonton video testimoni ${index + 1}"><img class="h-full w-full object-cover" src="https://drive.google.com/thumbnail?id=${item.id}&sz=w600" alt="Thumbnail video testimoni ${index + 1}" loading="lazy"></button></article>`).join("");
  return `<div class="mt-12"><div class="mb-8 flex items-end justify-between gap-5"><div><p class="text-sm font-bold uppercase tracking-[.18em] text-[#9ddbf3]">Testimoni pasien</p><h3 class="mt-3 font-display text-3xl sm:text-4xl">Pengalaman pasien bersama kami.</h3></div><p class="hidden text-xs text-white/45 sm:block">${driveTestimonials.length} video testimoni</p></div><div class="grid grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-5" aria-label="Galeri video testimoni">${cards}</div></div>`;
}

function homeArticlesSection() {
  const featuredArticles = Object.entries(articles).slice(0, 3).map(([slug, item]) => `<article class="service-card flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm"><a href="article/${slug}/index.html" class="block h-52 overflow-hidden"><img class="h-full w-full object-cover transition duration-500 hover:scale-105" src="${item.image}" alt="${item.title}" loading="lazy"></a><div class="flex flex-1 flex-col p-6"><p class="text-xs font-bold uppercase tracking-widest text-coral">Artikel pilihan</p><h3 class="mt-3 text-xl font-bold leading-7"><a href="article/${slug}/index.html">${item.title}</a></h3><p class="mt-3 text-sm leading-7 text-ink/60">${item.summary}</p><a class="mt-auto inline-flex pt-6 text-sm font-bold text-teal" href="article/${slug}/index.html">Baca selengkapnya →</a></div></article>`).join("");
  return `<section class="bg-white/55"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Artikel terbaru</p><h2 class="mt-4 max-w-3xl font-display text-4xl sm:text-5xl">Wawasan untuk mendukung perjalanan pemulihan.</h2></div><a class="text-sm font-bold text-teal" href="article/index.html">Lihat semua artikel →</a></div><div class="mt-10 grid gap-6 md:grid-cols-3">${featuredArticles}</div></div></section>`;
}

function homePage() {
  shell(`<section class="hero-grid overflow-hidden"><div class="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24"><div><p class="inline-flex rounded-full bg-mint px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-teal">Fisioterapi personal berbasis bukti</p><h1 class="mt-6 max-w-2xl font-display text-5xl leading-[1.07] sm:text-6xl lg:text-7xl">Kembali bergerak. <span class="text-teal">Kembali menjadi diri Anda.</span></h1><p class="mt-6 max-w-xl text-lg leading-8 text-ink/70">Pendampingan fisioterapi yang hangat, terarah, dan disusun sesuai aktivitas serta tujuan pemulihan Anda.</p><div class="mt-8 flex flex-col gap-3 sm:flex-row"><a href="${WHATSAPP}" class="rounded-full bg-teal px-6 py-4 text-center text-sm font-bold text-white shadow-xl shadow-teal/20 hover:bg-ink">Konsultasi sekarang →</a><a href="#spesialisasi" class="rounded-full border border-ink/20 px-6 py-4 text-center text-sm font-bold hover:border-teal hover:text-teal">Lihat spesialisasi</a></div></div><div class="relative"><div class="overflow-hidden rounded-[2.5rem] rounded-bl-[7rem] bg-teal p-3 shadow-soft"><img class="h-[31rem] w-full rounded-[2rem] rounded-bl-[5.5rem] object-cover" src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85" alt="Fisioterapis mendampingi pasien"></div><div class="absolute bottom-7 left-7 rounded-2xl bg-white/95 p-5 shadow-xl"><p class="text-xs font-bold uppercase tracking-widest text-coral">Pendekatan personal</p><p class="mt-1 font-display text-2xl">Satu tujuan, satu rencana.</p></div></div></div></section>
  <section id="spesialisasi" class="bg-mint/65"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Spesialisasi kami</p><h2 class="mt-4 font-display text-4xl sm:text-5xl">Perawatan untuk setiap tahap pemulihan.</h2></div><p class="max-w-md text-sm leading-7 text-ink/65">Klik video pada setiap spesialisasi untuk melihat gambaran latihan dan pendekatannya.</p></div><div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">${serviceCards()}</div></div></section>
  <section class="bg-ink text-white"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">${testimonialSection()}</div></section>
  <section class="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">${youtubeLinkedThumb("T-FQ2ckFnT0", "Simak Sesi Terapi Kami", "aspect-video rounded-[2rem] shadow-soft")}<div><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Simak Sesi Terapi Kami</p><h2 class="mt-4 font-display text-4xl sm:text-5xl">Lihat bagaimana sesi terapi berlangsung.</h2><p class="mt-6 leading-8 text-ink/70">Amati bagaimana fisioterapis mendampingi latihan, menjelaskan setiap tahapan, dan menyesuaikan program dengan kebutuhan pasien.</p><button type="button" data-video="T-FQ2ckFnT0" data-video-title="Simak Sesi Terapi Kami" class="mt-7 inline-flex rounded-full bg-teal px-6 py-4 text-sm font-bold text-white hover:bg-ink">Tonton video di YouTube</button></div></section>

  ${homeArticlesSection()}
  <section class="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div class="overflow-hidden rounded-[2.5rem] bg-[#ddf3fc] px-7 py-12 sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16"><div><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Mulai langkah pertama</p><h2 class="mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">Siap kembali bergerak dengan lebih percaya diri?</h2><p class="mt-5 max-w-xl text-sm leading-7 text-ink/65">Ceritakan keluhan dan tujuan Anda. Tim kami akan membantu memilih layanan serta lokasi yang paling sesuai.</p></div><div class="mt-8 flex shrink-0 flex-col gap-3 sm:flex-row lg:ml-10 lg:mt-0 lg:flex-col"><a href="${WHATSAPP}" class="inline-flex justify-center rounded-full bg-ink px-7 py-4 text-sm font-bold text-white hover:bg-teal">Buat janji via WhatsApp →</a><a href="https://maps.app.goo.gl/hGmzqtm59Q2mreX16" target="_blank" rel="noopener" class="inline-flex justify-center rounded-full border border-ink/20 px-7 py-4 text-sm font-bold text-ink hover:border-teal hover:text-teal">Lihat lokasi kami</a></div></div></section>`, "Beranda");
}

function servicesPage() {
  shell(`<section class="hero-grid"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Layanan</p><h1 class="mt-4 max-w-4xl font-display text-5xl sm:text-6xl">Perawatan yang mendukung setiap langkah Anda.</h1><p class="mt-6 max-w-2xl text-lg leading-8 text-ink/70">Pilih spesialisasi untuk melihat perawatan, video, paket, dan informasi yang sesuai kebutuhan Anda.</p><div class="mt-12 grid gap-6 md:grid-cols-2">${serviceCards()}</div></div></section>${physiotherapyPackageSection()} `, "Layanan");
}

function physiotherapyPackageSection() {
  const prices = [["1 Sesi", "Rp350.000"], ["3 Sesi", "Rp975.000"], ["6 Sesi", "Rp1.800.000"]];
  return `<section class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><div class="mb-10 max-w-3xl"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Paket fisioterapi</p><h2 class="mt-4 font-display text-4xl sm:text-5xl">Pilih jumlah sesi sesuai kebutuhan pemulihan Anda.</h2><p class="mt-5 text-sm leading-7 text-ink/60">Perawatan personal oleh fisioterapis terlatih. Rekomendasi jumlah sesi diberikan setelah asesmen awal.</p></div><div class="overflow-hidden rounded-3xl bg-white shadow-soft"><div class="grid grid-cols-1 lg:grid-cols-[.9fr_1.7fr_auto] lg:items-stretch"><div class="bg-ink p-6 text-white lg:p-7"><p class="text-xs font-bold uppercase tracking-widest text-[#9ddbf3]">Paket reguler</p><h3 class="mt-3 text-2xl font-bold">Physiotherapy Package</h3><p class="mt-3 text-sm leading-6 text-white/60">Program personal sesuai kondisi dan target aktivitas pasien.</p></div><div class="grid grid-cols-1 divide-y divide-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">${prices.map(([session, price]) => `<div class="flex items-center justify-between gap-4 px-6 py-4 text-left sm:flex-col sm:justify-center sm:px-5 sm:py-5 sm:text-center"><p class="text-xs font-bold uppercase tracking-wider text-ink/45">${session}</p><p class="text-base font-extrabold text-teal sm:mt-2 sm:text-lg">${price}</p></div>`).join("")}</div><div class="flex items-center p-5 lg:p-6"><a href="${WHATSAPP}" class="inline-flex w-full justify-center whitespace-nowrap rounded-full bg-coral px-5 py-3 text-sm font-bold text-white hover:bg-[#155f91]">Pilih paket →</a></div></div></div><p class="mt-4 text-xs leading-6 text-ink/45">Harga dapat berubah. Konfirmasikan ketersediaan paket dan ketentuan penggunaannya kepada tim kami.</p></section>`;
}

function serviceDetail(slug) {
  const item = services[slug] || services.umum;
  const treatmentCards = item.treatments.map(t => `<button type="button" data-video="${item.video}" data-video-title="${t}" class="group rounded-2xl border border-ink/10 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-teal/30 hover:shadow-soft"><span class="flex items-center justify-between"><span class="font-bold">${t}</span><span class="flex h-9 w-9 items-center justify-center rounded-full bg-mint text-xs text-teal group-hover:bg-teal group-hover:text-white">▶</span></span><span class="mt-3 block text-sm leading-6 text-ink/60">Klik untuk melihat video perawatan</span></button>`).join("");
  shell(`<section class="hero-grid"><div class="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24"><a class="text-sm font-bold text-teal" href="../index.html">← Semua layanan</a><div class="mt-10 grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center"><div><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Layanan fisioterapi</p><h1 class="mt-4 font-display text-5xl sm:text-6xl">${item.title}</h1><p class="mt-5 text-xl leading-9 text-ink/70">${item.tagline}</p><a href="${WHATSAPP}" class="mt-8 inline-flex rounded-full bg-teal px-6 py-4 text-sm font-bold text-white">Konsultasi sekarang →</a></div>${videoThumb(item.video, item.title, "aspect-video rounded-3xl shadow-soft")}</div></div></section>
  <section class="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div class="max-w-2xl"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Perawatan yang tersedia</p><h2 class="mt-4 font-display text-4xl">Klik perawatan untuk melihat videonya.</h2></div><div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">${treatmentCards}</div></section>
  ${physiotherapyPackageSection()}
  <section class="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8"><div><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Pendekatan kami</p><h2 class="mt-4 font-display text-4xl">Terukur, bertahap, dan relevan untuk keseharian.</h2><p class="mt-6 leading-8 text-ink/70">${item.description}</p></div><div class="space-y-4"><div class="rounded-2xl bg-white p-5 shadow-sm"><b>01 · Asesmen</b><p class="mt-2 text-sm leading-7 text-ink/60">Memahami keluhan, pola gerak, dan tujuan aktivitas.</p></div><div class="rounded-2xl bg-white p-5 shadow-sm"><b>02 · Program</b><p class="mt-2 text-sm leading-7 text-ink/60">Menggabungkan terapi manual, latihan, dan edukasi.</p></div><div class="rounded-2xl bg-white p-5 shadow-sm"><b>03 · Evaluasi</b><p class="mt-2 text-sm leading-7 text-ink/60">Meninjau progres dan menyesuaikan tingkat latihan.</p></div></div></section>
  <section class="mx-auto max-w-4xl px-5 pb-20 lg:px-8"><h2 class="font-display text-4xl">Pertanyaan umum</h2><div class="mt-8 divide-y divide-ink/10 rounded-3xl bg-white px-6 shadow-sm"><details class="py-5"><summary class="cursor-pointer font-bold">Berapa lama satu sesi terapi?</summary><p class="mt-3 text-sm leading-7 text-ink/65">Umumnya 45–60 menit, menyesuaikan asesmen dan rangkaian latihan.</p></details><details class="py-5"><summary class="cursor-pointer font-bold">Berapa sesi yang saya butuhkan?</summary><p class="mt-3 text-sm leading-7 text-ink/65">Jumlah sesi ditentukan setelah asesmen dan dapat berubah mengikuti progres Anda.</p></details><details class="py-5"><summary class="cursor-pointer font-bold">Apakah perlu rujukan dokter?</summary><p class="mt-3 text-sm leading-7 text-ink/65">Hubungi tim kami untuk memastikan kebutuhan dokumen sesuai kondisi Anda.</p></details></div></section>`, item.title);
}

function aboutPage() {
  const methods = [
    ["Pemijatan", "Membantu membebaskan jaringan yang kaku untuk meningkatkan kenyamanan gerak.", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=82"],
    ["Peregangan", "Meningkatkan fleksibilitas otot untuk mendukung rentang gerak yang optimal.", "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=82"],
    ["Modalitas", "Mendukung efektivitas terapi dan membantu pengelolaan keluhan sesuai indikasi.", "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=82"],
    ["Pelatihan", "Mengembalikan kekuatan, kontrol gerak, dan daya tahan tubuh secara bertahap.", "https://images.unsplash.com/photo-1530143311094-34d807799e8f?auto=format&fit=crop&w=900&q=82"]
  ];
  const team = [
    ["Lead Physiotherapist", "Program pemulihan kompleks dan perencanaan terapi personal.", "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=82"],
    ["Fisioterapis Ortopedi", "Pemulihan cedera otot, sendi, serta kondisi pasca operasi.", "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=82"],
    ["Fisioterapis Olahraga", "Kembali berlatih dan berolahraga dengan aman dan terukur.", "https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&w=800&q=82"],
    ["Fisioterapis Geriatri", "Mobilitas, keseimbangan, dan kemandirian pasien lanjut usia.", "https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=800&q=82"]
  ];
  const equipment = [
    ["Ultrasound Therapy", "Mendukung penanganan jaringan sesuai indikasi.", "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=82"],
    ["TENS", "Membantu manajemen nyeri pada program tertentu.", "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=82"],
    ["Resistance Equipment", "Mendukung latihan kekuatan secara bertahap.", "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=82"],
    ["Balance Tools", "Melatih kontrol gerak dan stabilitas.", "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=82"],
    ["Mobility Support", "Mendukung latihan fungsi dan pola berjalan.", "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=82"],
    ["Private Treatment Area", "Ruang nyaman untuk asesmen dan terapi personal.", "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=900&q=82"]
  ];
  shell(`<section class="hero-grid"><div class="mx-auto max-w-7xl px-5 py-20 text-center lg:px-8 lg:py-24"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Tentang kami</p><h1 class="mx-auto mt-4 max-w-4xl font-display text-5xl leading-tight sm:text-6xl">Tentang Klinik Fisioterapi The Glyn Physio</h1><p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink/70">Perawatan personal, hangat, dan terarah untuk membantu Anda kembali melakukan hal yang penting dalam kehidupan.</p></div></section>
  <section class="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24"><div><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Kehidupan sehat untuk semua</p><h2 class="mt-4 font-display text-4xl leading-tight sm:text-5xl">Kesehatan fisik adalah bagian penting dari hidup yang bermakna.</h2><p class="mt-6 text-base leading-8 text-ink/70">Kami menghadirkan layanan fisioterapi yang mudah dipahami dan disesuaikan dengan kebutuhan setiap orang. Tujuan kami bukan hanya mengurangi keluhan, tetapi membantu Anda kembali bergerak dengan aman dan percaya diri.</p></div><img class="h-[29rem] w-full rounded-[2.5rem] rounded-bl-[7rem] object-cover shadow-soft" src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=85" alt="Fisioterapis mendampingi pasien"></section>
  <section class="bg-mint/65"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><div class="max-w-3xl"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Metode fisioterapi</p><h2 class="mt-4 font-display text-4xl sm:text-5xl">Terapi manual berbasis sains dan teknologi modern.</h2><p class="mt-5 leading-8 text-ink/65">Setiap metode dipilih berdasarkan hasil asesmen, kebutuhan gerak, dan tujuan pemulihan Anda.</p></div><div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">${methods.map(([name, desc, image]) => `<article class="overflow-hidden rounded-3xl bg-white shadow-sm"><img class="h-48 w-full object-cover" src="${image}" alt="Metode ${name}" loading="lazy"><div class="p-6"><h3 class="text-xl font-bold">${name}</h3><p class="mt-3 text-sm leading-7 text-ink/60">${desc}</p></div></article>`).join("")}</div><a href="${base}services/index.html" class="mt-8 inline-flex rounded-full bg-teal px-6 py-4 text-sm font-bold text-white hover:bg-ink">Pelajari layanan kami →</a></div></section>
  <section class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><div class="grid overflow-hidden rounded-[2.5rem] bg-ink text-white lg:grid-cols-[.85fr_1.15fr]"><img class="h-full min-h-[25rem] w-full object-cover opacity-85" src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=85" alt="Komitmen tim fisioterapi"><div class="flex flex-col justify-center p-8 sm:p-12 lg:p-16"><p class="text-sm font-bold uppercase tracking-[.18em] text-[#9ddbf3]">Komitmen kami</p><h2 class="mt-4 font-display text-4xl leading-tight">Berkomitmen memberikan pengalaman pemulihan terbaik.</h2><blockquote class="mt-7 text-lg leading-8 text-white/70">“Tim fisioterapis kami terdiri dari praktisi yang terlatih untuk memberikan program pemulihan sesuai kebutuhan, aktivitas, dan tujuan setiap pasien.”</blockquote><div class="mt-7 border-l-4 border-[#8ed9f5] pl-4"><p class="font-bold">The Glyn Physio</p><p class="mt-1 text-sm text-white/50">Founder & Chief Physiotherapist</p></div></div></div></section>
  <section class="bg-white/60"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Fisioterapis kami</p><h2 class="mt-4 font-display text-4xl sm:text-5xl">Tim yang mendampingi perjalanan Anda.</h2><div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">${team.map(([role, focus, image], index) => `<article class="overflow-hidden rounded-3xl bg-white shadow-sm"><div class="relative"><img class="h-64 w-full object-cover object-top" src="${image}" alt="${role}" loading="lazy"><span class="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 font-display text-lg text-teal shadow-lg">0${index + 1}</span></div><div class="p-6"><h3 class="text-lg font-bold">${role}</h3><p class="mt-3 text-sm leading-7 text-ink/60">${focus}</p></div></article>`).join("")}</div><p class="mt-6 text-xs text-ink/45">Nama, foto, pengalaman, dan spesialisasi anggota tim dapat diisi menggunakan profil resmi klinik.</p></div></section>
  <section class="bg-mint/65"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><div><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Kelengkapan alat kami</p><h2 class="mt-4 max-w-3xl font-display text-4xl sm:text-5xl">Peralatan yang mendukung asesmen dan progres latihan.</h2></div><div class="mt-10 grid grid-cols-4 gap-2 sm:gap-5">${equipment.map(([name, desc, image]) => `<article class="overflow-hidden rounded-2xl bg-white p-1 shadow-sm"><img class="aspect-square w-full rounded-xl object-cover" src="${image}" alt="${name}" loading="lazy"></article>`).join("")}</div></div></section>
  `, "Tentang kami");
}

function articlesPage() {
  const cards = Object.entries(articles).map(([slug, item]) => `<article class="service-card overflow-hidden rounded-3xl bg-white shadow-sm"><a href="${slug}/index.html" class="block h-52 overflow-hidden"><img class="h-full w-full object-cover transition duration-500 hover:scale-105" src="${item.image}" alt="${item.title}" loading="lazy"></a><div class="p-6"><p class="text-xs font-bold uppercase tracking-widest text-coral">Insight kesehatan</p><h2 class="mt-3 text-xl font-bold leading-7"><a href="${slug}/index.html">${item.title}</a></h2><p class="mt-3 text-sm leading-7 text-ink/65">${item.summary}</p><div class="mt-5 flex gap-4"><a class="text-sm font-bold text-teal" href="${slug}/index.html">Baca artikel →</a><button class="text-sm font-bold text-coral" data-video="${item.video}" data-video-title="${item.title}">Tonton video ▶</button></div></div></article>`).join("");
  shell(`<section class="hero-grid"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Artikel</p><h1 class="mt-4 max-w-3xl font-display text-5xl sm:text-6xl">Ruang belajar untuk tubuh yang lebih aktif.</h1><p class="mt-6 max-w-2xl text-lg leading-8 text-ink/70">Panduan ringan seputar nyeri, pemulihan, latihan, dan kebiasaan bergerak—setiap artikel dilengkapi foto atau video.</p><div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">${cards}</div></div></section>`, "Artikel");
}

function articleDetail(slug) {
  const item = articles[slug] || articles["nyeri-punggung"];
  shell(`<article class="mx-auto max-w-4xl px-5 py-16 lg:px-8 lg:py-20"><a class="text-sm font-bold text-teal" href="../index.html">← Kembali ke artikel</a><p class="mt-10 text-sm font-bold uppercase tracking-[.18em] text-coral">Insight kesehatan</p><h1 class="mt-4 font-display text-5xl leading-tight sm:text-6xl">${item.title}</h1><p class="mt-6 text-xl leading-9 text-ink/70">${item.summary}</p><a class="media-cover mt-10 block aspect-video rounded-3xl shadow-soft" href="https://www.youtube.com/watch?v=${item.video}" target="_blank" rel="noopener"><img class="h-full w-full object-cover" src="${item.image}" alt="${item.title}"><span class="play-button absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl text-teal">▶</span><span class="absolute bottom-5 left-6 z-10 font-bold text-white">Tonton video terkait di YouTube ↗</span></a><div class="mt-12 space-y-7 text-base leading-8 text-ink/75"><h2 class="font-display text-3xl text-ink">Mengapa hal ini perlu diperhatikan?</h2><p>Keluhan gerak sering dipengaruhi oleh beberapa hal sekaligus: beban aktivitas, kualitas istirahat, riwayat cedera, kekuatan, dan rasa percaya diri saat bergerak. Karena itu, satu latihan belum tentu cocok untuk setiap orang.</p><h2 class="font-display text-3xl text-ink">Langkah awal yang aman</h2><p>Mulailah dari aktivitas yang masih terasa nyaman, naikkan beban secara bertahap, dan catat respons tubuh setelahnya. Pemeriksaan tenaga profesional membantu menentukan prioritas dan dosis latihan yang lebih tepat.</p><div class="rounded-3xl bg-mint p-7"><b>Catatan penting</b><p class="mt-2 text-sm leading-7">Materi ini bersifat edukatif dan bukan pengganti diagnosis. Segera cari pertolongan medis bila keluhan berat, muncul mendadak, atau disertai gejala lain yang mengkhawatirkan.</p></div></div><a href="${WHATSAPP}" class="mt-10 inline-flex rounded-full bg-coral px-6 py-4 text-sm font-bold text-white">Diskusikan kebutuhan Anda →</a></article>`, item.title);
}

function clinicsPage() {
  const clinics = ["The Glyn Physio Ubud", "Layanan home visit"];
  shell(`<section class="hero-grid"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Klinik kami</p><h1 class="mt-4 max-w-3xl font-display text-5xl sm:text-6xl">Temukan lokasi yang dekat dengan Anda.</h1><p class="mt-6 max-w-2xl text-lg leading-8 text-ink/70">Pilih lokasi yang nyaman, lalu hubungi tim kami untuk memastikan jadwal dan ketersediaan layanan.</p><div class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">${clinics.map((name, i) => `<article class="rounded-3xl bg-white p-7 shadow-sm"><span class="text-sm font-bold text-coral">0${i + 1}</span><h2 class="mt-5 text-xl font-bold">${name}</h2><p class="mt-3 text-sm leading-7 text-ink/60">Layanan tersedia berdasarkan reservasi dan kebutuhan perawatan.</p><a class="mt-6 inline-flex text-sm font-bold text-teal" href="${WHATSAPP}">Tanyakan jadwal →</a></article>`).join("")}</div></div></section>`, "Klinik kami");
}

function contactPage() {
  shell(`<section class="hero-grid"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Hubungi kami</p><h1 class="mt-4 max-w-3xl font-display text-5xl sm:text-6xl">Mari mulai langkah pemulihan Anda.</h1><p class="mt-6 max-w-2xl text-lg leading-8 text-ink/70">Tim The Glyn Physio siap membantu menjawab pertanyaan dan mengatur jadwal konsultasi Anda di Ubud, Bali.</p><div class="mt-12 grid gap-8 lg:grid-cols-[1.1fr_.9fr] lg:items-start"><div class="overflow-hidden rounded-3xl bg-white shadow-soft"><iframe class="h-[28rem] w-full border-0" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.139406547566!2d115.24846430000001!3d-8.4858234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd223c21dd3d7d9%3A0x688ced0c832ba707!2sPhysiotherapy%20Ubud%20(THE%20GLYN%20PHYSIO)!5e0!3m2!1sid!2sid!4v1792619062331!5m2!1sid!2sid" title="Peta lokasi The Glyn Physio di Ubud, Bali" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div><div class="rounded-3xl bg-white p-8 shadow-soft sm:p-10"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Kontak</p><h2 class="mt-4 font-display text-4xl">Kami siap membantu.</h2><div class="mt-8 space-y-4"><a class="flex items-center gap-4 rounded-2xl bg-mint p-5 transition hover:bg-[#d8eef9]" href="${WHATSAPP}" target="_blank" rel="noopener"><span class="text-2xl" aria-hidden="true">◉</span><span><strong class="block text-sm">WhatsApp</strong><span class="mt-1 block text-sm text-ink/65">+62 812-3456-7890</span></span></a><a class="flex items-center gap-4 rounded-2xl bg-mint p-5 transition hover:bg-[#d8eef9]" href="mailto:hello@theglynphysio.com"><span class="text-2xl" aria-hidden="true">@</span><span><strong class="block text-sm">Email</strong><span class="mt-1 block break-all text-sm text-ink/65">hello@theglynphysio.com</span></span></a><div class="rounded-2xl border border-ink/10 p-5"><strong class="block text-sm">Lokasi</strong><span class="mt-1 block text-sm leading-6 text-ink/65">Ubud, Bali, Indonesia</span></div></div></div></div></div></section>`, "Hubungi kami");
}

function setupInteractions() {
  const menuButton = document.querySelector("#menu-button");
  const mobileMenu = document.querySelector("#mobile-menu");
  menuButton?.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menuButton.setAttribute("aria-label", open ? "Buka menu" : "Tutup menu");
    mobileMenu.classList.toggle("hidden", open);
  });
  const modal = document.querySelector("#video-modal");
  const frame = document.querySelector("#video-frame");
  const modalTitle = document.querySelector("#video-modal-title");
  let videoTrigger = null;
  const closeVideo = () => { modal.classList.add("hidden"); modal.classList.remove("flex"); frame.src = ""; document.body.classList.remove("modal-open"); videoTrigger?.focus(); };
  document.querySelectorAll("[data-video], [data-drive-video]").forEach(button => button.addEventListener("click", () => {
    videoTrigger = button;
    modalTitle.textContent = button.dataset.videoTitle || "Video fisioterapi";
    frame.src = button.dataset.driveVideo
      ? `https://drive.google.com/file/d/${button.dataset.driveVideo}/preview`
      : `https://www.youtube.com/embed/${button.dataset.video}?autoplay=1&rel=0`;
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.classList.add("modal-open");
    document.querySelector("#video-close")?.focus();
  }));
  document.querySelector("#video-close")?.addEventListener("click", closeVideo);
  modal?.addEventListener("click", event => { if (event.target === modal) closeVideo(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") closeVideo(); });
  const testimonialSlides = [...document.querySelectorAll("[data-testimonial-slide]")];
  const testimonialStatus = document.querySelector("#testimonial-status");
  let testimonialIndex = 0;
  const showTestimonial = nextIndex => {
    if (!testimonialSlides.length) return;
    testimonialIndex = (nextIndex + testimonialSlides.length) % testimonialSlides.length;
    testimonialSlides.forEach((slide, index) => slide.classList.toggle("hidden", index !== testimonialIndex));
    if (testimonialStatus) testimonialStatus.textContent = `${testimonialIndex + 1} / ${testimonialSlides.length}`;
  };
  document.querySelector("[data-testimonial-prev]")?.addEventListener("click", () => showTestimonial(testimonialIndex - 1));
  document.querySelector("[data-testimonial-next]")?.addEventListener("click", () => showTestimonial(testimonialIndex + 1));
}

if (route.includes("/services/") && !route.endsWith("/services/")) serviceDetail(route.split("/").filter(Boolean).pop());
else if (route.includes("/article/") && !route.endsWith("/article/")) articleDetail(route.split("/").filter(Boolean).pop());
else if (route.endsWith("/services/")) servicesPage();
else if (route.endsWith("/article/")) articlesPage();
else if (route.endsWith("/about-us/")) aboutPage();
else if (route.endsWith("/our-clinics/")) clinicsPage();
else if (route.endsWith("/contact/")) contactPage();
else homePage();

const siteScript = document.querySelector('script[src$="site.js"]');
if (siteScript) {
  const languageScript = document.createElement("script");
  languageScript.src = new URL("language.js", siteScript.src).href;
  document.body.appendChild(languageScript);
}
