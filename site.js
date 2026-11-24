let WHATSAPP = "https://wa.me/6281234567890?text=Halo%20The%20Glyn%20Physio%2C%20saya%20ingin%20konsultasi.";
let managedLinks = [];
let managedSections = [];
let managedGoogleReview = { rating: 5, review_count: 539, maps_url: "" };
let managedBusinessHours = [];
let managedFaqs = [];
let faqDataAvailable = false;
let managedPricing = [];
let pricingDataAvailable = false;
let managedSpecialties = [];
let managedTestimonials = [];
let managedTherapySessions = [];
let managedAboutItems = [];
const DEFAULT_VIDEO = "Hy1qjQomD8Y";
const SEO_SITE_URL = "https://theglynphysio.com";
const SEO_DEFAULT_IMAGE = `${SEO_SITE_URL}/assets/logo.png`;

const defaultFaqs = [
  { service_slug: "", question: "Berapa lama satu sesi terapi?", answer: "Umumnya 45–60 menit, menyesuaikan asesmen dan rangkaian latihan." },
  { service_slug: "", question: "Berapa sesi yang saya butuhkan?", answer: "Jumlah sesi ditentukan setelah asesmen dan dapat berubah mengikuti progres Anda." },
  { service_slug: "", question: "Apakah perlu rujukan dokter?", answer: "Hubungi tim kami untuk memastikan kebutuhan dokumen sesuai kondisi Anda." }
];

const defaultPricing = [
  { service_slug: "", package_name: "1 Sesi", price_amount: 350000, note: "" },
  { service_slug: "", package_name: "3 Sesi", price_amount: 975000, note: "Hemat Rp75.000" },
  { service_slug: "", package_name: "6 Sesi", price_amount: 1800000, note: "Hemat Rp300.000" }
];

let services = {
  geriatri: { title: "Perawatan geriatri", cardTitle: "Klinik Perawatan Geriatri di Ubud", tagline: "Gerak dengan nyaman di usia lanjut.", description: "Program bertahap untuk menjaga mobilitas, kekuatan, keseimbangan, dan rasa aman dalam aktivitas sehari-hari.", video: "T-FQ2ckFnT0", treatments: ["Pengapuran Sendi", "Bahu Beku", "Pemulihan Pasca Stroke", "Penggantian Lutut & Pinggang"] },
  "pasca-operasi": { title: "Pemulihan pasca operasi", cardTitle: "Pemulihan Pasca Operasi di Ubud", tagline: "Pulihkan kekuatan dan mobilitas anda.", description: "Evaluasi berkala dan latihan progresif membantu memulihkan rentang gerak, kekuatan, serta kepercayaan diri.", video: "Hy1qjQomD8Y", treatments: ["Pemulihan ACL", "Pemulihan MCL", "Perbaikan Meniscus", "Pemulihan Tulang Punggung"] },
  olahraga: { title: "Pemulihan cedera olahraga", cardTitle: "Pemulihan Cedera Olahraga di Ubud", tagline: "Kembalikan performa terbaik anda.", description: "Kami membantu Anda mengelola beban latihan, membangun kapasitas tubuh, dan kembali ke olahraga pilihan.", video: "t26n0kA_zlE", treatments: ["Cedera Mata Kaki & Ligamen", "Tennis Elbow", "Cedera Rotator Cuff", "Cedera Lutut"] },
  umum: { title: "Perawatan kesehatan umum", cardTitle: "Perawatan Kesehatan Umum di Ubud", tagline: "Nikmati aktivitas sehari-hari tanpa sakit.", description: "Solusi personal untuk keluhan nyeri, kaku, dan keterbatasan gerak yang mengganggu keseharian.", video: "t26n0kA_zlE", treatments: ["HNP Leher & Tulang Punggung Bawah", "Nyeri Leher", "Nyeri Lutut", "Nyeri Pinggul"] }
};

let additionalSpecializations = [
  { title: "Sport Massage", tagline: "Dukung pemulihan dan kesiapan tubuh untuk beraktivitas.", treatments: ["Pemulihan otot", "Persiapan aktivitas", "Relaksasi jaringan"], video: DEFAULT_VIDEO },
  { title: "Dry Needling Treatment", tagline: "Pendekatan terarah untuk membantu mengurangi ketegangan otot.", treatments: ["Titik pemicu", "Ketegangan otot", "Mobilitas gerak"], video: "T-FQ2ckFnT0" }
];

let testimonials = [
  { name: "Nama Pasien 01", position: "Profesional aktif", video: DEFAULT_VIDEO, summary: "Program terapi membantu pasien memahami sumber keluhan, kembali bergerak secara bertahap, dan menjalani aktivitas harian dengan lebih percaya diri." },
  { name: "Nama Pasien 02", position: "Atlet rekreasional", video: "t26n0kA_zlE", summary: "Pendampingan berfokus pada penguatan, kontrol gerak, dan peningkatan beban yang terukur sebelum kembali berolahraga." },
  { name: "Nama Pasien 03", position: "Pensiunan aktif", video: "T-FQ2ckFnT0", summary: "Latihan yang disesuaikan membantu pasien meningkatkan keseimbangan dan merasa lebih aman saat melakukan kegiatan sehari-hari." },
  { name: "Nama Pasien 04", position: "Pekerja aktif", video: DEFAULT_VIDEO, summary: "Edukasi dan latihan yang praktis membantu pasien mengelola keluhan serta kembali menjalani rutinitas dengan lebih nyaman." },
  { name: "Nama Pasien 05", position: "Pelari rekreasional", video: "t26n0kA_zlE", summary: "Program progresif membantu pasien membangun kekuatan dan kembali beraktivitas dengan rasa percaya diri." }
];

let driveTestimonials = [
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

let articles = {};

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
  return `<header class="sticky top-0 z-40 border-b border-ink/10 bg-sand/95 backdrop-blur-xl"><div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 lg:px-8"><a href="${base}index.html" class="flex items-center" aria-label="The Glyn Physio beranda">  <img class="site-logo h-14 w-auto max-w-[190px] object-contain sm:max-w-[220px]" src="${base}assets/logo.png" alt="The Glyn Physio" width="220" height="144"></a><nav class="hidden items-center gap-7 text-sm font-semibold lg:flex" aria-label="Navigasi utama">${navLink("home", `${base}index.html`, "Beranda")}${navLink("about", `${base}about-us/index.html`, "Tentang kami")}<div class="group relative"><a class="nav-link inline-flex items-center gap-1 ${active === "services" ? "is-active" : ""}" ${active === "services" ? 'aria-current="page"' : ""} href="${base}services/index.html">Layanan <span aria-hidden="true" class="text-[10px]">▾</span></a><div class="invisible absolute left-1/2 top-full w-72 -translate-x-1/2 pt-4 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"><div class="rounded-2xl border border-ink/10 bg-white p-2 shadow-soft"><a class="block rounded-xl px-4 py-3 font-extrabold text-teal hover:bg-mint" href="${base}services/index.html">Semua layanan</a>${serviceMenu}</div></div></div>${navLink("article", `${base}article/index.html`, "Artikel")}</nav><div class="flex items-center gap-2"><div id="language-switcher" class="language-switcher notranslate" translate="no"><button type="button" class="language-flag-button" aria-label="Pilih bahasa" aria-haspopup="true" aria-expanded="false"><span data-active-language-flag aria-hidden="true">🇮🇩</span><span class="language-caret" aria-hidden="true"></span></button><div class="language-options" role="menu" hidden><button type="button" role="menuitemradio" data-language="id"><span aria-hidden="true">🇮🇩</span><span>Bahasa Indonesia</span><b aria-hidden="true">✓</b></button><button type="button" role="menuitemradio" data-language="en"><span aria-hidden="true">🇬🇧</span><span>English</span><b aria-hidden="true">✓</b></button></div><div class="gtranslate_wrapper" aria-hidden="true"></div></div><a href="${base}contact/index.html" class="hidden rounded-full bg-teal px-5 py-3 text-sm font-bold text-white transition hover:bg-ink sm:inline-flex">Hubungi kami</a><button id="menu-button" class="rounded-xl border border-ink/10 p-2 lg:hidden" aria-label="Buka menu" aria-controls="mobile-menu" aria-expanded="false"><span class="block h-0.5 w-5 bg-ink"></span><span class="mt-1.5 block h-0.5 w-5 bg-ink"></span><span class="mt-1.5 block h-0.5 w-5 bg-ink"></span></button></div></div><nav id="mobile-menu" class="hidden border-t border-ink/10 px-5 pb-5 pt-4 lg:hidden" aria-label="Navigasi seluler"><div class="flex flex-col gap-4 text-sm font-semibold">${navLink("home", `${base}index.html`, "Beranda")}${navLink("about", `${base}about-us/index.html`, "Tentang kami")}${navLink("services", `${base}services/index.html`, "Layanan")}<div class="ml-3 flex flex-col gap-3 border-l-2 border-mint pl-4 text-xs text-ink/70">${serviceMenu}</div>${navLink("article", `${base}article/index.html`, "Artikel")}</div></nav></header>`;
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
  applyManagedSections();
  applyManagedLinks();
  applyGoogleReview();
  applyBusinessHours();
  setupAOS();
  setupInteractions();
  setupAnalytics();
}

function applyGoogleReview() {
  const ratingBox = document.querySelector('footer [aria-label^="Rating Google"]');
  if (!ratingBox) return;
  const rating = Number(managedGoogleReview.rating || 0).toFixed(1);
  const count = Number(managedGoogleReview.review_count || 0).toLocaleString("id-ID");
  ratingBox.setAttribute("aria-label", `Rating Google ${rating} dari 5 berdasarkan ${count} ulasan`);
  const text = ratingBox.querySelector("span.text-white\\/60");
  if (text) text.textContent = `${rating} (${count} ulasan)`;
  if (managedGoogleReview.maps_url) document.querySelectorAll('footer a[href*="maps"]').forEach(link => { link.href = managedGoogleReview.maps_url; });
}

function applyBusinessHours() {
  if (!managedBusinessHours.length) return;
  const heading = [...document.querySelectorAll("footer p")].find(item => item.textContent.trim().toLowerCase() === "jam buka");
  const container = heading?.parentElement?.querySelector(".space-y-3");
  if (!container) return;
  container.replaceChildren(...managedBusinessHours.map(item => {
    const row = document.createElement("div");
    row.className = "flex justify-between gap-4";
    const day = document.createElement("span");
    day.textContent = item.day_label;
    const value = document.createElement("span");
    value.className = "text-right text-white";
    const openTime = String(item.open_time || "").slice(0, 5).replace(":", ".");
    const closeTime = String(item.close_time || "").slice(0, 5).replace(":", ".");
    value.textContent = String(item.is_closed) === "1" ? (item.note || "Tutup") : `${openTime}–${closeTime}${item.note ? ` · ${item.note}` : ""}`;
    row.append(day, value);
    return row;
  }));
}

function applyManagedLinks() {
  const rules = [
    ["whatsapp", 'a[href*="wa.me"]'],
    ["google_maps", 'a[href*="maps.app.goo.gl"], a[href*="google.com/maps"]'],
    ["email", 'a[href^="mailto:"]'],
    ["phone", 'a[href^="tel:"]']
  ];
  rules.forEach(([type, selector]) => {
    const link = managedLinks.find(item => item.link_type === type);
    if (link) document.querySelectorAll(selector).forEach(anchor => {
      anchor.href = link.url;
      if (link.display_text) {
        const detail = anchor.querySelector("span.text-ink\\/65, span.text-white\\/60");
        if (detail) detail.textContent = link.display_text;
        else if (type !== "whatsapp" && anchor.childElementCount === 0 && !(type === "google_maps" && /buka di google maps/i.test(anchor.textContent))) anchor.textContent = link.display_text;
      }
    });
  });
  const phone = managedLinks.find(item => item.link_type === "phone");
  const emailAnchor = document.querySelector('main a[href^="mailto:"]');
  if (phone && emailAnchor && !document.querySelector("[data-managed-phone]")) {
    const phoneAnchor = document.createElement("a");
    phoneAnchor.className = emailAnchor.className;
    phoneAnchor.href = phone.url;
    phoneAnchor.dataset.managedPhone = "true";
    const icon = document.createElement("span");
    icon.className = "text-2xl";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "☎";
    const copy = document.createElement("span");
    const label = document.createElement("strong");
    label.className = "block text-sm";
    label.textContent = "Nomor HP";
    const detail = document.createElement("span");
    detail.className = "mt-1 block text-sm text-ink/65";
    detail.textContent = phone.display_text || phone.url.replace(/^tel:/, "");
    copy.append(label, detail);
    phoneAnchor.append(icon, copy);
    emailAnchor.insertAdjacentElement("afterend", phoneAnchor);
  }
  const maps = managedLinks.find(item => item.link_type === "google_maps");
  if (maps?.display_text) {
    const locationLabel = [...document.querySelectorAll("main strong")].find(item => item.textContent.trim() === "Lokasi");
    const locationDetail = locationLabel?.parentElement?.querySelector("span");
    if (locationDetail) locationDetail.textContent = maps.display_text;
  }
  managedLinks.filter(item => item.link_type === "social").forEach(link => {
    const label = String(link.label || "").toLowerCase();
    document.querySelectorAll(`a[aria-label]`).forEach(anchor => {
      if (anchor.getAttribute("aria-label").toLowerCase() === label) anchor.href = link.url;
    });
  });
}

function applyManagedSections() {
  const main = document.querySelector("main");
  if (!main || !managedSections.length) return;
  if (!route.includes("/services/") && !route.includes("/article/") && !route.endsWith("/contact/") && !route.endsWith("/about-us/") && !route.endsWith("/our-clinics/")) {
    const hero = sectionData("home", "hero");
    const heroSection = main.querySelector("section:first-child");
    if (heroSection && hero.eyebrow) heroSection.querySelector("p")?.replaceChildren(document.createTextNode(hero.eyebrow));
    if (heroSection && hero.title) heroSection.querySelector("h1")?.replaceChildren(document.createTextNode(hero.title));
    if (heroSection && hero.description) heroSection.querySelector("h1 + p")?.replaceChildren(document.createTextNode(hero.description));
    const cta = sectionData("home", "cta");
    const ctaSection = main.querySelector("section:last-child");
    if (ctaSection && cta.title) ctaSection.querySelector("h2")?.replaceChildren(document.createTextNode(cta.title));
    if (ctaSection && cta.description) ctaSection.querySelector("h2 + p")?.replaceChildren(document.createTextNode(cta.description));
    if (ctaSection && cta.button) ctaSection.querySelector("a")?.replaceChildren(document.createTextNode(`${cta.button} →`));
  }
  if (route.endsWith("/contact/")) {
    const location = sectionData("contact", "location");
    if (location.city) {
      const locationText = [...main.querySelectorAll("span")].find(node => node.textContent.includes("Ubud, Bali"));
      if (locationText) locationText.textContent = location.city;
    }
  }
}

function setupAnalytics() {
  const visitorKey = "glyn-visitor-id";
  let visitorId = localStorage.getItem(visitorKey);
  if (!visitorId) {
    visitorId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
    localStorage.setItem(visitorKey, visitorId);
  }
  const track = (eventName, eventLabel = "") => {
    if (location.protocol === "file:") return;
    navigator.sendBeacon(
      `${base}analytics.php`,
      new Blob([JSON.stringify({ event_name: eventName, event_label: eventLabel, page_path: location.pathname, visitor_id: visitorId })], { type: "application/json" })
    );
  };
  track("page_view", document.title);
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;
    const href = link.href || "";
    const label = link.textContent.trim().slice(0, 120);
    if (href.includes("wa.me")) track("whatsapp_click", label);
    else if (href.includes("maps.app.goo.gl") || href.includes("google.com/maps")) track("maps_click", label);
    else if (href.startsWith("mailto:")) track("email_click", label);
    else if (link.pathname.includes("/article/")) track("article_click", link.pathname);
    else if (link.pathname.includes("/services/")) track("service_click", link.pathname);
  });
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

function specialtyCards() {
  if (managedSpecialties.length) {
    return managedSpecialties.map(item => {
      const title = escapePublic(item.title);
      const treatments = String(item.treatments || "").split(/\r?\n/).map(value => value.trim()).filter(Boolean);
      const href = item.service_slug ? `${base}services/${encodeURIComponent(item.service_slug)}/index.html` : `${base}contact/index.html`;
      let media = "";
      if (item.media_type === "google_drive") media = `<button type="button" class="media-cover group block h-44 w-full shrink-0 overflow-hidden rounded-xl text-left" data-drive-video="${escapePublic(item.media_url)}" data-video-title="${title}"><img class="h-full w-full object-cover" src="https://drive.google.com/thumbnail?id=${encodeURIComponent(item.media_url)}&sz=w900" alt="${title}" loading="lazy"></button>`;
      else if (item.media_type === "image") media = `<img class="h-44 w-full shrink-0 rounded-xl object-cover" src="${escapePublic(item.media_url)}" alt="${title}" loading="lazy">`;
      else media = videoThumb(item.media_url || DEFAULT_VIDEO, title, "h-44 shrink-0 rounded-xl");
      return `<article class="service-card flex h-full flex-col rounded-3xl bg-white p-5 shadow-sm">${media}<div class="flex flex-1 flex-col pt-4"><h3 class="text-sm font-bold leading-5 text-ink">${title}</h3><p class="mt-2 text-sm leading-6 text-ink">${escapePublic(item.tagline || "")}</p>${treatments.length ? `<p class="mt-1 text-xs leading-5 text-ink/55">${treatments.map(escapePublic).join(", ")}.</p>` : ""}<a class="mt-auto inline-flex items-center gap-1 pt-6 text-[11px] font-extrabold uppercase tracking-wider text-teal" href="${href}">${item.service_slug ? "Selengkapnya" : "Konsultasi"} <span aria-hidden="true">❯</span></a></div></article>`;
    }).join("");
  }
  const cards = Object.entries(services).map(([slug, item]) => ({ video: DEFAULT_VIDEO, treatments: [], tagline: item.summary || item.description || "", cardTitle: item.title, ...item, href: `${base}services/${slug}/index.html`, linkLabel: "Selengkapnya" }));
  const additionalCards = additionalSpecializations.map(item => ({ ...item, cardTitle: item.title, href: `${base}contact/index.html`, linkLabel: "Konsultasi" }));
  return [...cards, ...additionalCards].map(item => `<article class="service-card flex h-full flex-col rounded-3xl bg-white p-5 shadow-sm">${videoThumb(item.video, item.cardTitle, "h-44 shrink-0 rounded-xl")}<div class="flex flex-1 flex-col pt-4"><h3 class="text-sm font-bold leading-5 text-ink">${item.cardTitle}</h3><p class="mt-2 text-sm leading-6 text-ink">${item.tagline}</p><p class="mt-1 text-xs leading-5 text-ink/55">${item.treatments.join(", ")}.</p><a class="mt-auto inline-flex items-center gap-1 pt-6 text-[11px] font-extrabold uppercase tracking-wider text-teal" href="${item.href}">${item.linkLabel} <span aria-hidden="true">❯</span></a></div></article>`).join("");
}

function serviceCards() {
  return Object.entries(services).sort(([, a], [, b]) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0)).map(([slug, item]) => {
    const title = escapePublic(item.cardTitle || item.title);
    const treatments = Array.isArray(item.treatments) ? item.treatments : [];
    const mediaItem = { media_type: item.media_type || "youtube", media_url: item.media_url || item.video || DEFAULT_VIDEO, alt_text: title };
    const media = aboutMedia(mediaItem, "h-44 shrink-0 rounded-xl", title);
    return `<article class="service-card flex h-full flex-col rounded-3xl bg-white p-5 shadow-sm">${media}<div class="flex flex-1 flex-col pt-4"><h3 class="text-sm font-bold leading-5 text-ink">${title}</h3><p class="mt-2 text-sm leading-6 text-ink">${escapePublic(item.tagline || "")}</p>${treatments.length ? `<p class="mt-1 text-xs leading-5 text-ink/55">${treatments.map(escapePublic).join(", ")}.</p>` : ""}<a class="mt-auto inline-flex items-center gap-1 pt-6 text-[11px] font-extrabold uppercase tracking-wider text-teal" href="${base}services/${encodeURIComponent(slug)}/index.html">Selengkapnya <span aria-hidden="true">❯</span></a></div></article>`;
  }).join("");
}

function escapePublic(value) {
  return String(value ?? "").replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

function sectionData(page, key, fallback = {}) {
  const section = managedSections.find(item => item.page_key === page && item.section_key === key);
  return section ? { ...fallback, ...(section.content || {}) } : fallback;
}

function richText(value) {
  return String(value || "").split(/\n{2,}/).filter(Boolean).map(paragraph => `<p>${escapePublic(paragraph).replace(/\n/g, "<br>")}</p>`).join("");
}

function testimonialSection() {
  if (managedTestimonials.length) {
    const cards = managedTestimonials.map((item, index) => {
      const title = escapePublic(item.patient_name || `Testimoni pasien ${index + 1}`);
      let media = "";
      if (item.media_type === "google_drive") media = `<button type="button" class="media-cover group block aspect-square w-full rounded-xl text-left" data-drive-video="${escapePublic(item.media_url)}" data-video-title="${title}" aria-label="Tonton ${title}"><img class="h-full w-full object-cover" src="https://drive.google.com/thumbnail?id=${encodeURIComponent(item.media_url)}&sz=w600" alt="${title}" loading="lazy"></button>`;
      else if (item.media_type === "youtube") media = videoThumb(item.media_url || DEFAULT_VIDEO, title, "aspect-square rounded-xl");
      else media = `<img class="aspect-square w-full rounded-xl object-cover" src="${escapePublic(item.media_url)}" alt="${title}" loading="lazy">`;
      return `<article class="overflow-hidden rounded-2xl bg-white/10 p-1 sm:p-2">${media}<div class="px-1 pb-1 pt-2 sm:px-2 sm:pb-2 sm:pt-3"><strong class="block text-[10px] leading-tight text-white sm:text-sm">${title}</strong>${item.patient_role ? `<small class="mt-1 hidden text-white/55 sm:block">${escapePublic(item.patient_role)}</small>` : ""}${item.quote_text ? `<p class="mt-3 hidden text-xs leading-5 text-white/70 sm:block">${escapePublic(item.quote_text)}</p>` : ""}</div></article>`;
    }).join("");
    return `<div class="mt-12"><div class="mb-8 flex items-end justify-between gap-5"><div><p class="text-sm font-bold uppercase tracking-[.18em] text-[#9ddbf3]">Testimoni pasien</p><h3 class="mt-3 font-display text-3xl sm:text-4xl">Pengalaman pasien bersama kami.</h3></div><p class="hidden text-xs text-white/45 sm:block">${managedTestimonials.length} testimoni</p></div><div class="grid grid-cols-4 gap-2 sm:gap-4 lg:gap-5" aria-label="Testimoni pasien">${cards}</div></div>`;
  }
  const cards = driveTestimonials.map((item, index) => `<article class="overflow-hidden rounded-2xl bg-white/10 p-1"><button type="button" class="media-cover group block aspect-square w-full rounded-xl text-left" data-drive-video="${item.id}" data-video-title="Video testimoni ${index + 1}" aria-label="Tonton video testimoni ${index + 1}"><img class="h-full w-full object-cover" src="https://drive.google.com/thumbnail?id=${item.id}&sz=w600" alt="Thumbnail video testimoni ${index + 1}" loading="lazy"></button></article>`).join("");
  return `<div class="mt-12"><div class="mb-8 flex items-end justify-between gap-5"><div><p class="text-sm font-bold uppercase tracking-[.18em] text-[#9ddbf3]">Testimoni pasien</p><h3 class="mt-3 font-display text-3xl sm:text-4xl">Pengalaman pasien bersama kami.</h3></div><p class="hidden text-xs text-white/45 sm:block">${driveTestimonials.length} video testimoni</p></div><div class="grid grid-cols-4 gap-2 sm:gap-5" aria-label="Galeri video testimoni">${cards}</div></div>`;
}

function therapySessionSection() {
  if (!managedTherapySessions.length) return `<section class="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24">${youtubeLinkedThumb("T-FQ2ckFnT0", "Simak Sesi Terapi Kami", "aspect-video rounded-[2rem] shadow-soft")}<div><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Simak Sesi Terapi Kami</p><h2 class="mt-4 font-display text-4xl sm:text-5xl">Lihat bagaimana sesi terapi berlangsung.</h2><p class="mt-6 leading-8 text-ink/70">Amati bagaimana fisioterapis mendampingi latihan, menjelaskan setiap tahapan, dan menyesuaikan program dengan kebutuhan pasien.</p></div></section>`;
  const gallery = managedTherapySessions.map(item => {
    const title = escapePublic(item.title);
    if (item.media_type === "youtube") return `<article>${youtubeLinkedThumb(item.media_url, title, "aspect-video rounded-2xl shadow-soft")}<p class="mt-3 text-sm font-bold">${title}</p></article>`;
    const source = item.media_type === "google_drive" ? `https://drive.google.com/thumbnail?id=${encodeURIComponent(item.media_url)}&sz=w1200` : escapePublic(item.media_url);
    const image = `<img class="aspect-[4/3] w-full rounded-2xl object-cover shadow-soft" src="${source}" alt="${escapePublic(item.alt_text || item.title)}" loading="lazy">`;
    return `<article>${item.media_type === "google_drive" ? `<a href="https://drive.google.com/file/d/${encodeURIComponent(item.media_url)}/view" target="_blank" rel="noopener">${image}</a>` : image}<p class="mt-3 text-sm font-bold">${title}</p>${item.caption_text ? `<p class="mt-1 text-xs leading-5 text-ink/60">${escapePublic(item.caption_text)}</p>` : ""}</article>`;
  }).join("");
  return `<section class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><div class="max-w-3xl"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Simak Sesi Terapi Kami</p><h2 class="mt-4 font-display text-4xl sm:text-5xl">Lihat bagaimana sesi terapi berlangsung.</h2><p class="mt-6 leading-8 text-ink/70">Foto dan video kegiatan terapi bersama tim The Glyn Physio.</p></div><div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">${gallery}</div></section>`;
}

function homeArticlesSection() {
  const featuredArticles = Object.entries(articles).slice(0, 3).map(([slug, item]) => `<article class="service-card flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-sm"><a href="article/${slug}/index.html" class="block h-52 overflow-hidden"><img class="h-full w-full object-cover transition duration-500 hover:scale-105" src="${item.image}" alt="${item.title}" loading="lazy"></a><div class="flex flex-1 flex-col p-6"><p class="text-xs font-bold uppercase tracking-widest text-coral">Artikel pilihan</p><h3 class="mt-3 text-xl font-bold leading-7"><a href="article/${slug}/index.html">${item.title}</a></h3><p class="mt-3 text-sm leading-7 text-ink/60">${item.summary}</p><a class="mt-auto inline-flex pt-6 text-sm font-bold text-teal" href="article/${slug}/index.html">Baca selengkapnya →</a></div></article>`).join("");
  if (!featuredArticles) return "";
  return `<section class="bg-white/55"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Artikel terbaru</p><h2 class="mt-4 max-w-3xl font-display text-4xl sm:text-5xl">Wawasan untuk mendukung perjalanan pemulihan.</h2></div><a class="text-sm font-bold text-teal" href="article/index.html">Lihat semua artikel →</a></div><div class="mt-10 grid gap-6 md:grid-cols-3">${featuredArticles}</div></div></section>`;
}

function homePage() {
  shell(`<section class="hero-grid overflow-hidden"><div class="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24"><div><p class="inline-flex rounded-full bg-mint px-4 py-2 text-xs font-bold uppercase tracking-[.18em] text-teal">Fisioterapi personal berbasis bukti</p><h1 class="mt-6 max-w-2xl font-display text-5xl leading-[1.07] sm:text-6xl lg:text-7xl">Kembali bergerak. <span class="text-teal">Kembali menjadi diri Anda.</span></h1><p class="mt-6 max-w-xl text-lg leading-8 text-ink/70">Pendampingan fisioterapi yang hangat, terarah, dan disusun sesuai aktivitas serta tujuan pemulihan Anda.</p><div class="mt-8 flex flex-col gap-3 sm:flex-row"><a href="${WHATSAPP}" class="rounded-full bg-teal px-6 py-4 text-center text-sm font-bold text-white shadow-xl shadow-teal/20 hover:bg-ink">Konsultasi sekarang →</a><a href="#spesialisasi" class="rounded-full border border-ink/20 px-6 py-4 text-center text-sm font-bold hover:border-teal hover:text-teal">Lihat spesialisasi</a></div></div><div class="relative"><div class="overflow-hidden rounded-[2.5rem] rounded-bl-[7rem] bg-teal p-3 shadow-soft"><img class="h-[31rem] w-full rounded-[2rem] rounded-bl-[5.5rem] object-cover object-top" src="${base}assets/team1.jpg" alt="Fisioterapis mendampingi pasien"></div><div class="absolute bottom-7 left-7 rounded-2xl bg-white/95 p-5 shadow-xl"><p class="text-xs font-bold uppercase tracking-widest text-coral">Pendekatan personal</p><p class="mt-1 font-display text-2xl">Satu tujuan, satu rencana.</p></div></div></div></section>
  <section id="spesialisasi" class="bg-mint/65"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><div class="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Spesialisasi kami</p><h2 class="mt-4 font-display text-4xl sm:text-5xl">Perawatan untuk setiap tahap pemulihan.</h2></div><p class="max-w-md text-sm leading-7 text-ink/65">Klik video pada setiap spesialisasi untuk melihat gambaran latihan dan pendekatannya.</p></div><div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">${specialtyCards()}</div></div></section>
  <section class="bg-ink text-white"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">${testimonialSection()}</div></section>
  ${therapySessionSection()}

  ${homeArticlesSection()}
  <section class="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div class="overflow-hidden rounded-[2.5rem] bg-[#ddf3fc] px-7 py-12 sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16"><div><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Mulai langkah pertama</p><h2 class="mt-4 max-w-2xl font-display text-4xl leading-tight sm:text-5xl">Siap kembali bergerak dengan lebih percaya diri?</h2><p class="mt-5 max-w-xl text-sm leading-7 text-ink/65">Ceritakan keluhan dan tujuan Anda. Tim kami akan membantu memilih layanan serta lokasi yang paling sesuai.</p></div><div class="mt-8 flex shrink-0 flex-col gap-3 sm:flex-row lg:ml-10 lg:mt-0 lg:flex-col"><a href="${WHATSAPP}" class="inline-flex justify-center rounded-full bg-ink px-7 py-4 text-sm font-bold text-white hover:bg-teal">Buat janji via WhatsApp →</a><a href="https://maps.app.goo.gl/hGmzqtm59Q2mreX16" target="_blank" rel="noopener" class="inline-flex justify-center rounded-full border border-ink/20 px-7 py-4 text-sm font-bold text-ink hover:border-teal hover:text-teal">Lihat lokasi kami</a></div></div></section>`, "Beranda");
}

function servicesPage() {
  shell(`<section class="hero-grid"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Layanan</p><h1 class="mt-4 max-w-4xl font-display text-5xl sm:text-6xl">Perawatan yang mendukung setiap langkah Anda.</h1><p class="mt-6 max-w-2xl text-lg leading-8 text-ink/70">Pilih spesialisasi untuk melihat perawatan, video, paket, dan informasi yang sesuai kebutuhan Anda.</p><div class="mt-12 grid gap-6 md:grid-cols-2">${serviceCards()}</div></div></section>${physiotherapyPackageSection()} `, "Layanan");
}

function physiotherapyPackageSection(slug = "") {
  const source = pricingDataAvailable ? managedPricing : defaultPricing;
  const specific = slug ? source.filter(item => item.service_slug === slug) : [];
  const prices = specific.length ? specific : source.filter(item => !item.service_slug);
  if (!prices.length) return "";
  const formatPrice = amount => `Rp${Number(amount || 0).toLocaleString("id-ID")}`;
  return `<section class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><div class="mb-10 max-w-3xl"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Paket fisioterapi</p><h2 class="mt-4 font-display text-4xl sm:text-5xl">Pilih jumlah sesi sesuai kebutuhan pemulihan Anda.</h2><p class="mt-5 text-sm leading-7 text-ink/60">Perawatan personal oleh fisioterapis terlatih. Rekomendasi jumlah sesi diberikan setelah asesmen awal.</p></div><div class="overflow-hidden rounded-3xl bg-white shadow-soft"><div class="grid grid-cols-1 lg:grid-cols-[.9fr_1.7fr_auto] lg:items-stretch"><div class="bg-ink p-6 text-white lg:p-7"><p class="text-xs font-bold uppercase tracking-widest text-[#9ddbf3]">Paket reguler</p><h3 class="mt-3 text-2xl font-bold">Physiotherapy Package</h3><p class="mt-3 text-sm leading-6 text-white/60">Program personal sesuai kondisi dan target aktivitas pasien.</p></div><div class="grid grid-cols-1 divide-y divide-ink/10 sm:grid-cols-3 sm:divide-x sm:divide-y-0">${prices.map(item => `<div class="flex items-center justify-between gap-4 px-6 py-4 text-left sm:flex-col sm:justify-center sm:px-5 sm:py-5 sm:text-center"><p class="text-xs font-bold uppercase tracking-wider text-ink/45">${escapePublic(item.package_name)}</p><p class="text-base font-extrabold text-teal sm:mt-2 sm:text-lg">${formatPrice(item.price_amount)}</p>${item.note ? `<p class="text-[10px] font-bold text-emerald-600">${escapePublic(item.note)}</p>` : ""}</div>`).join("")}</div><div class="flex items-center p-5 lg:p-6"><a href="${WHATSAPP}" class="inline-flex w-full justify-center whitespace-nowrap rounded-full bg-coral px-5 py-3 text-sm font-bold text-white hover:bg-[#155f91]">Pilih paket →</a></div></div></div><p class="mt-4 text-xs leading-6 text-ink/45">Harga dapat berubah. Konfirmasikan ketersediaan paket dan ketentuan penggunaannya kepada tim kami.</p></section>`;
}

function faqSection(slug) {
  const source = faqDataAvailable ? managedFaqs : defaultFaqs;
  const items = source.filter(item => !item.service_slug || item.service_slug === slug);
  if (!items.length) return "";
  const rows = items.map(item => `<details class="py-5"><summary class="cursor-pointer font-bold">${escapePublic(item.question)}</summary><p class="mt-3 text-sm leading-7 text-ink/65">${escapePublic(item.answer)}</p></details>`).join("");
  return `<section class="mx-auto max-w-4xl px-5 pb-20 lg:px-8"><h2 class="font-display text-4xl">Pertanyaan umum</h2><div class="mt-8 divide-y divide-ink/10 rounded-3xl bg-white px-6 shadow-sm">${rows}</div></section>`;
}

function serviceDetail(slug) {
  const item = services[slug] || services.umum;
  const treatmentCards = (item.treatments || []).map(t => `<button type="button" data-video="${item.video || DEFAULT_VIDEO}" data-video-title="${t}" class="group rounded-2xl border border-ink/10 bg-white p-5 text-left transition hover:-translate-y-1 hover:border-teal/30 hover:shadow-soft"><span class="flex items-center justify-between"><span class="font-bold">${t}</span><span class="flex h-9 w-9 items-center justify-center rounded-full bg-mint text-xs text-teal group-hover:bg-teal group-hover:text-white">▶</span></span><span class="mt-3 block text-sm leading-6 text-ink/60">Klik untuk melihat video perawatan</span></button>`).join("");
  const serviceMedia = aboutMedia({ media_type: item.media_type || "youtube", media_url: item.media_url || item.video || DEFAULT_VIDEO, alt_text: item.title }, "aspect-video rounded-3xl shadow-soft", item.title);
  shell(`<section class="hero-grid"><div class="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24"><a class="text-sm font-bold text-teal" href="../index.html">← Semua layanan</a><div class="mt-10 grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-center"><div><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Layanan fisioterapi</p><h1 class="mt-4 font-display text-5xl sm:text-6xl">${item.title}</h1><p class="mt-5 text-xl leading-9 text-ink/70">${item.tagline}</p><a href="${WHATSAPP}" class="mt-8 inline-flex rounded-full bg-teal px-6 py-4 text-sm font-bold text-white">Konsultasi sekarang →</a></div>${serviceMedia}</div></div></section>
  <section class="mx-auto max-w-7xl px-5 py-20 lg:px-8"><div class="max-w-2xl"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Perawatan yang tersedia</p><h2 class="mt-4 font-display text-4xl">Klik perawatan untuk melihat videonya.</h2></div><div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">${treatmentCards}</div></section>
  ${physiotherapyPackageSection(slug)}
  <section class="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8"><div><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Pendekatan kami</p><h2 class="mt-4 font-display text-4xl">Terukur, bertahap, dan relevan untuk keseharian.</h2><p class="mt-6 leading-8 text-ink/70">${item.description}</p></div><div class="space-y-4"><div class="rounded-2xl bg-white p-5 shadow-sm"><b>01 · Asesmen</b><p class="mt-2 text-sm leading-7 text-ink/60">Memahami keluhan, pola gerak, dan tujuan aktivitas.</p></div><div class="rounded-2xl bg-white p-5 shadow-sm"><b>02 · Program</b><p class="mt-2 text-sm leading-7 text-ink/60">Menggabungkan terapi manual, latihan, dan edukasi.</p></div><div class="rounded-2xl bg-white p-5 shadow-sm"><b>03 · Evaluasi</b><p class="mt-2 text-sm leading-7 text-ink/60">Meninjau progres dan menyesuaikan tingkat latihan.</p></div></div></section>
  ${faqSection(slug)}`, item.title);
}

function aboutMedia(item, classes, label) {
  const title = escapePublic(label || item.title || "Media");
  if (item.media_type === "youtube") return videoThumb(item.media_url || DEFAULT_VIDEO, title, classes);
  if (item.media_type === "google_drive_video") return `<button type="button" class="media-cover group block w-full overflow-hidden ${classes}" data-drive-video="${escapePublic(item.media_url)}" data-video-title="${title}"><img class="h-full w-full object-cover" src="https://drive.google.com/thumbnail?id=${encodeURIComponent(item.media_url)}&sz=w1000" alt="${escapePublic(item.alt_text || title)}" loading="lazy"></button>`;
  const source = item.media_type === "google_drive_image" ? `https://drive.google.com/thumbnail?id=${encodeURIComponent(item.media_url)}&sz=w1200` : (/^https?:/.test(item.media_url) ? item.media_url : `${base}${String(item.media_url).replace(/^\//, "")}`);
  return `<img class="w-full object-cover ${classes}" src="${escapePublic(source)}" alt="${escapePublic(item.alt_text || title)}" loading="lazy">`;
}

function aboutPage() {
  const fallbackAboutItems = [
    { section_key: "methods", title: "Pemijatan", description: "Membantu membebaskan jaringan yang kaku untuk meningkatkan kenyamanan gerak.", media_type: "image", media_url: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=900&q=82" },
    { section_key: "methods", title: "Peregangan", description: "Meningkatkan fleksibilitas otot untuk mendukung rentang gerak yang optimal.", media_type: "image", media_url: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=82" },
    { section_key: "methods", title: "Modalitas", description: "Mendukung efektivitas terapi sesuai indikasi.", media_type: "image", media_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=82" },
    { section_key: "methods", title: "Pelatihan", description: "Mengembalikan kekuatan dan kontrol gerak secara bertahap.", media_type: "image", media_url: "https://images.unsplash.com/photo-1530143311094-34d807799e8f?auto=format&fit=crop&w=900&q=82" },
    { section_key: "commitments", title: "Berkomitmen memberikan pengalaman pemulihan terbaik.", subtitle: "The Glyn Physio", description: "Tim fisioterapis kami memberikan program sesuai kebutuhan, aktivitas, dan tujuan setiap pasien.", detail_text: "Founder & Chief Physiotherapist", media_type: "image", media_url: "assets/team1.jpg" },
    { section_key: "therapists", title: "Dewa Angga. S. Fis., Ftr., OMTC", description: "Lead Physiotherapist — program pemulihan kompleks dan perencanaan terapi personal.", media_type: "image", media_url: "assets/team1.jpg" },
    { section_key: "therapists", title: "Ni Kadek Ari Kusuma Dewi, S.Kes., Ftr.", description: "Pemulihan cedera otot, sendi, serta kondisi pasca operasi.", media_type: "image", media_url: "assets/team2.png" },
    { section_key: "therapists", title: "Ida Bagus Gde Putra Keniten, S.Kes., Ftr", description: "Manual therapy, musculoskeletal, dan sport therapy.", media_type: "image", media_url: "assets/team3.png" },
    { section_key: "therapists", title: "Dewa Ayu Krisnika, S.Kes., Ftr.", description: "Rehabilitasi post-op dan geriatri.", media_type: "image", media_url: "assets/team4.png" },
    { section_key: "equipment", title: "Ultrasound Therapy", description: "Mendukung penanganan jaringan sesuai indikasi.", media_type: "image", media_url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=82" },
    { section_key: "equipment", title: "TENS", description: "Membantu manajemen nyeri pada program tertentu.", media_type: "image", media_url: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=82" },
    { section_key: "equipment", title: "Resistance Equipment", description: "Mendukung latihan kekuatan secara bertahap.", media_type: "image", media_url: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=900&q=82" },
    { section_key: "equipment", title: "Balance Tools", description: "Melatih kontrol gerak dan stabilitas.", media_type: "image", media_url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=900&q=82" }
  ];
  const aboutSource = managedAboutItems.length ? managedAboutItems : fallbackAboutItems;
  const bySection = key => aboutSource.filter(item => item.section_key === key);
  const methods = bySection("methods");
  const commitments = bySection("commitments");
  const team = bySection("therapists");
  const equipment = bySection("equipment");
  const commitment = commitments[0] || { title: "Berkomitmen memberikan pengalaman pemulihan terbaik.", subtitle: "The Glyn Physio", description: "Tim fisioterapis kami terdiri dari praktisi yang terlatih untuk memberikan program pemulihan sesuai kebutuhan, aktivitas, dan tujuan setiap pasien.", detail_text: "Founder & Chief Physiotherapist", media_type: "image", media_url: "assets/team1.jpg", alt_text: "Komitmen tim fisioterapi" };
  const methodCards = methods.map(item => `<article class="overflow-hidden rounded-3xl bg-white shadow-sm">${aboutMedia(item, "h-48", `Metode ${item.title}`)}<div class="p-6"><h3 class="text-xl font-bold">${escapePublic(item.title)}</h3>${item.subtitle ? `<p class="mt-2 text-xs font-bold uppercase tracking-wider text-teal">${escapePublic(item.subtitle)}</p>` : ""}<p class="mt-3 text-sm leading-7 text-ink/60">${escapePublic(item.description || "")}</p></div></article>`).join("");
  const teamCards = team.map((item, index) => `<article class="overflow-hidden rounded-3xl bg-white shadow-sm"><div class="relative">${aboutMedia(item, "h-64 object-top", item.title)}<span class="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white/95 font-display text-lg text-teal shadow-lg">${String(index + 1).padStart(2, "0")}</span></div><div class="p-6"><h3 class="text-lg font-bold">${escapePublic(item.title)}</h3>${item.subtitle ? `<p class="mt-1 text-xs font-bold text-teal">${escapePublic(item.subtitle)}</p>` : ""}<p class="mt-3 text-sm leading-7 text-ink/60">${escapePublic(item.description || "")}</p></div></article>`).join("");
  const equipmentCards = equipment.map(item => `<article class="overflow-hidden rounded-2xl bg-white p-1 shadow-sm">${aboutMedia(item, "aspect-square rounded-xl", item.title)}<div class="px-3 pb-3 pt-4"><h3 class="text-sm font-bold">${escapePublic(item.title)}</h3>${item.description ? `<p class="mt-1 text-xs leading-5 text-ink/55">${escapePublic(item.description)}</p>` : ""}</div></article>`).join("");
  shell(`<section class="hero-grid"><div class="mx-auto max-w-7xl px-5 py-20 text-center lg:px-8 lg:py-24"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Tentang kami</p><h1 class="mx-auto mt-4 max-w-4xl font-display text-5xl leading-tight sm:text-6xl">Tentang Klinik Fisioterapi The Glyn Physio</h1><p class="mx-auto mt-6 max-w-2xl text-lg leading-8 text-ink/70">Perawatan personal, hangat, dan terarah untuk membantu Anda kembali melakukan hal yang penting dalam kehidupan.</p></div></section>
  <section class="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-24"><div><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Kehidupan sehat untuk semua</p><h2 class="mt-4 font-display text-4xl leading-tight sm:text-5xl">Kesehatan fisik adalah bagian penting dari hidup yang bermakna.</h2><p class="mt-6 text-base leading-8 text-ink/70">Kami menghadirkan layanan fisioterapi yang mudah dipahami dan disesuaikan dengan kebutuhan setiap orang. Tujuan kami bukan hanya mengurangi keluhan, tetapi membantu Anda kembali bergerak dengan aman dan percaya diri.</p></div><img class="h-[29rem] w-full rounded-[2.5rem] rounded-bl-[7rem] object-cover shadow-soft" src="https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=85" alt="Fisioterapis mendampingi pasien"></section>
  ${methods.length ? `<section class="bg-mint/65"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><div class="max-w-3xl"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Metode fisioterapi</p><h2 class="mt-4 font-display text-4xl sm:text-5xl">Terapi manual berbasis sains dan teknologi modern.</h2><p class="mt-5 leading-8 text-ink/65">Setiap metode dipilih berdasarkan hasil asesmen, kebutuhan gerak, dan tujuan pemulihan Anda.</p></div><div class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">${methodCards}</div><a href="${base}services/index.html" class="mt-8 inline-flex rounded-full bg-teal px-6 py-4 text-sm font-bold text-white hover:bg-ink">Pelajari layanan kami →</a></div></section>` : ""}
  <section class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><div class="grid overflow-hidden rounded-[2.5rem] bg-ink text-white lg:grid-cols-[.85fr_1.15fr]">${aboutMedia(commitment, "h-full min-h-[25rem] opacity-85 object-top", "Komitmen tim fisioterapi")}<div class="flex flex-col justify-center p-8 sm:p-12 lg:p-16"><p class="text-sm font-bold uppercase tracking-[.18em] text-[#9ddbf3]">Komitmen kami</p><h2 class="mt-4 font-display text-4xl leading-tight">${escapePublic(commitment.title)}</h2><blockquote class="mt-7 text-lg leading-8 text-white/70">“${escapePublic(commitment.description || "")}”</blockquote><div class="mt-7 border-l-4 border-[#8ed9f5] pl-4"><p class="font-bold">${escapePublic(commitment.subtitle || "The Glyn Physio")}</p><p class="mt-1 text-sm text-white/50">${escapePublic(commitment.detail_text || "")}</p></div></div></div></section>
  ${team.length ? `<section class="bg-white/60"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Fisioterapis kami</p><h2 class="mt-4 font-display text-4xl sm:text-5xl">Tim yang mendampingi perjalanan Anda.</h2><div class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">${teamCards}</div></div></section>` : ""}
  ${equipment.length ? `<section class="bg-mint/65"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><div><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Kelengkapan alat kami</p><h2 class="mt-4 max-w-3xl font-display text-4xl sm:text-5xl">Peralatan yang mendukung asesmen dan progres latihan.</h2></div><div class="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">${equipmentCards}</div></div></section>` : ""}
  `, "Tentang kami");
}

function articleWatchButton(item) {
  if (["image", "google_drive_image"].includes(item.featuredMediaType)) return "";
  if (["google_drive", "google_drive_video"].includes(item.featuredMediaType)) return `<button class="text-sm font-bold text-coral" data-drive-video="${item.driveVideo}" data-video-title="${item.title}">Tonton video ▶</button>`;
  return `<button class="text-sm font-bold text-coral" data-video="${item.video || DEFAULT_VIDEO}" data-video-title="${item.title}">Tonton video ▶</button>`;
}

function configureArticleFeaturedMedia(item) {
  const cover = document.querySelector("article .media-cover");
  if (!cover) return;
  const image = cover.querySelector("img");
  if (image) image.src = item.image;
  if (["image", "google_drive_image"].includes(item.featuredMediaType)) {
    cover.removeAttribute("href"); cover.removeAttribute("target"); cover.removeAttribute("rel");
    cover.querySelectorAll(".play-button, span:last-child").forEach(element => element.remove());
    cover.classList.remove("media-cover");
    return;
  }
  cover.href = "#video-artikel"; cover.removeAttribute("target"); cover.removeAttribute("rel");
  const label = cover.querySelector("span:last-child");
  if (label) label.textContent = ["google_drive", "google_drive_video"].includes(item.featuredMediaType) ? "Putar video Google Drive" : "Putar video YouTube";
  cover.addEventListener("click", event => {
    event.preventDefault();
    const modal = document.querySelector("#video-modal");
    const frame = document.querySelector("#video-frame");
    document.querySelector("#video-modal-title").textContent = item.title;
    frame.src = ["google_drive", "google_drive_video"].includes(item.featuredMediaType) ? `https://drive.google.com/file/d/${item.driveVideo}/preview` : `https://www.youtube.com/embed/${item.video || DEFAULT_VIDEO}?autoplay=1&rel=0`;
    modal.classList.remove("hidden"); modal.classList.add("flex"); document.body.classList.add("modal-open");
  });
}

function articlesPage() {
  const cards = Object.entries(articles).map(([slug, item]) => `<article class="service-card overflow-hidden rounded-3xl bg-white shadow-sm"><a href="${slug}/index.html" class="block h-52 overflow-hidden"><img class="h-full w-full object-cover transition duration-500 hover:scale-105" src="${item.image}" alt="${item.title}" loading="lazy"></a><div class="p-6"><p class="text-xs font-bold uppercase tracking-widest text-coral">Insight kesehatan</p><h2 class="mt-3 text-xl font-bold leading-7"><a href="${slug}/index.html">${item.title}</a></h2><p class="mt-3 text-sm leading-7 text-ink/65">${item.summary}</p><div class="mt-5 flex gap-4"><a class="text-sm font-bold text-teal" href="${slug}/index.html">Baca artikel →</a>${articleWatchButton(item)}</div></div></article>`).join("");
  shell(`<section class="hero-grid"><div class="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Artikel</p><h1 class="mt-4 max-w-3xl font-display text-5xl sm:text-6xl">Ruang belajar untuk tubuh yang lebih aktif.</h1><p class="mt-6 max-w-2xl text-lg leading-8 text-ink/70">Panduan ringan seputar nyeri, pemulihan, latihan, dan kebiasaan bergerak—setiap artikel dilengkapi foto atau video.</p><div class="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">${cards}</div></div></section>`, "Artikel");
}

function articleDetail(slug) {
  const item = articles[slug];
  if (!item) {
    shell('<section class="mx-auto max-w-4xl px-5 py-24 text-center lg:px-8"><p class="text-sm font-bold uppercase tracking-[.18em] text-coral">Artikel</p><h1 class="mt-4 font-display text-5xl">Artikel tidak ditemukan.</h1><p class="mt-5 text-ink/60">Artikel ini tidak tersedia atau belum dipublikasikan.</p><a class="mt-8 inline-flex rounded-full bg-teal px-6 py-3 text-sm font-bold text-white" href="../index.html">Kembali ke daftar artikel</a></section>', "Artikel tidak ditemukan");
    return;
  }
  shell(`<article class="mx-auto max-w-4xl px-5 py-16 lg:px-8 lg:py-20"><a class="text-sm font-bold text-teal" href="../index.html">← Kembali ke artikel</a><p class="mt-10 text-sm font-bold uppercase tracking-[.18em] text-coral">Insight kesehatan</p><h1 class="mt-4 font-display text-5xl leading-tight sm:text-6xl">${item.title}</h1><p class="mt-6 text-xl leading-9 text-ink/70">${item.summary}</p><a class="media-cover mt-10 block aspect-video rounded-3xl shadow-soft" href="https://www.youtube.com/watch?v=${item.video}" target="_blank" rel="noopener"><img class="h-full w-full object-cover" src="${item.image}" alt="${item.title}"><span class="play-button absolute left-1/2 top-1/2 z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl text-teal">▶</span><span class="absolute bottom-5 left-6 z-10 font-bold text-white">Tonton video terkait di YouTube ↗</span></a><div class="mt-12 space-y-7 text-base leading-8 text-ink/75"><h2 class="font-display text-3xl text-ink">Mengapa hal ini perlu diperhatikan?</h2><p>Keluhan gerak sering dipengaruhi oleh beberapa hal sekaligus: beban aktivitas, kualitas istirahat, riwayat cedera, kekuatan, dan rasa percaya diri saat bergerak. Karena itu, satu latihan belum tentu cocok untuk setiap orang.</p><h2 class="font-display text-3xl text-ink">Langkah awal yang aman</h2><p>Mulailah dari aktivitas yang masih terasa nyaman, naikkan beban secara bertahap, dan catat respons tubuh setelahnya. Pemeriksaan tenaga profesional membantu menentukan prioritas dan dosis latihan yang lebih tepat.</p><div class="rounded-3xl bg-mint p-7"><b>Catatan penting</b><p class="mt-2 text-sm leading-7">Materi ini bersifat edukatif dan bukan pengganti diagnosis. Segera cari pertolongan medis bila keluhan berat, muncul mendadak, atau disertai gejala lain yang mengkhawatirkan.</p></div></div><a href="${WHATSAPP}" class="mt-10 inline-flex rounded-full bg-coral px-6 py-4 text-sm font-bold text-white">Diskusikan kebutuhan Anda →</a></article>`, item.title);
  configureArticleFeaturedMedia(item);
  if (item.body) {
    const bodyContainer = document.querySelector("article .mt-12.space-y-7");
    if (bodyContainer) bodyContainer.innerHTML = richText(item.body);
  }
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

function setSeoMeta(attribute, key, content) {
  if (!content) return;
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);
  if (!element) { element = document.createElement("meta"); element.setAttribute(attribute, key); document.head.appendChild(element); }
  element.content = content;
}

function seoAbsoluteImage(value) {
  const image = String(value || "").trim();
  if (/^https?:\/\//.test(image)) return image;
  const clean = image.replace(/^(?:\.\.\/|\.\/|\/)+/g, "");
  return clean ? `${SEO_SITE_URL}/${clean}` : SEO_DEFAULT_IMAGE;
}

function seoCanonicalUrl() {
  let pathname = location.pathname.replace(/index\.html$/i, "");
  if (isProjectPages && firstPathSegment) pathname = pathname.replace(new RegExp(`^/${firstPathSegment}`), "") || "/";
  if (!pathname.endsWith("/") && !/\.[a-z0-9]+$/i.test(pathname)) pathname += "/";
  return `${SEO_SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}

function upsertStructuredData(id, data) {
  let script = document.querySelector(`#${id}`);
  if (!script) { script = document.createElement("script"); script.id = id; script.type = "application/ld+json"; document.head.appendChild(script); }
  script.textContent = JSON.stringify(data).replace(/</g, "\\u003c");
}

function clinicStructuredData() {
  const phone = managedLinks.find(item => item.link_type === "phone")?.display_text || "+62 812-3456-7890";
  const email = managedLinks.find(item => item.link_type === "email")?.display_text || "hello@theglynphysio.com";
  const dayMap = { monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday", thursday: "Thursday", friday: "Friday", saturday: "Saturday", sunday: "Sunday" };
  const openingHours = managedBusinessHours.filter(item => String(item.is_closed) !== "1" && item.open_time && item.close_time).map(item => ({ "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${dayMap[item.day_key]}`, opens: String(item.open_time).slice(0, 5), closes: String(item.close_time).slice(0, 5) }));
  return {
    "@context": "https://schema.org",
    "@type": ["MedicalClinic", "LocalBusiness"],
    "@id": `${SEO_SITE_URL}/#clinic`,
    name: "The Glyn Physio",
    url: `${SEO_SITE_URL}/`,
    logo: SEO_DEFAULT_IMAGE,
    image: `${SEO_SITE_URL}/assets/team1.jpg`,
    description: "Klinik fisioterapi di Ubud, Bali dengan perawatan personal untuk pemulihan gerak, cedera olahraga, pasca operasi, dan geriatri.",
    telephone: phone,
    email,
    priceRange: "RpRp",
    address: { "@type": "PostalAddress", addressLocality: "Ubud", addressRegion: "Bali", addressCountry: "ID" },
    areaServed: { "@type": "City", name: "Ubud" },
    sameAs: ["https://www.instagram.com/theglynphysio", "https://www.facebook.com/theglynphysio", "https://www.youtube.com/@theglynphysio", "https://www.tiktok.com/@theglynphysio"],
    ...(openingHours.length ? { openingHoursSpecification: openingHours } : {})
  };
}

function breadcrumbStructuredData(canonical, title) {
  const items = [{ "@type": "ListItem", position: 1, name: "Beranda", item: `${SEO_SITE_URL}/` }];
  if (route.includes("/services/") && !route.endsWith("/services/")) items.push({ "@type": "ListItem", position: 2, name: "Layanan", item: `${SEO_SITE_URL}/services/` });
  if (route.includes("/article/") && !route.endsWith("/article/")) items.push({ "@type": "ListItem", position: 2, name: "Artikel", item: `${SEO_SITE_URL}/article/` });
  if (canonical !== `${SEO_SITE_URL}/`) items.push({ "@type": "ListItem", position: items.length + 1, name: title, item: canonical });
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items };
}

function applyPageSeo() {
  const slug = route.split("/").filter(Boolean).pop();
  const isServiceDetail = route.includes("/services/") && !route.endsWith("/services/");
  const isArticleDetail = route.includes("/article/") && !route.endsWith("/article/");
  const item = isServiceDetail ? services[slug] : isArticleDetail ? articles[slug] : null;
  const defaults = route.endsWith("/about-us/")
    ? ["Tentang Klinik Fisioterapi di Ubud | The Glyn Physio", "Kenali metode fisioterapi, komitmen, tim fisioterapis, dan fasilitas The Glyn Physio di Ubud, Bali."]
    : route.endsWith("/services/")
      ? ["Layanan Fisioterapi di Ubud | The Glyn Physio", "Layanan fisioterapi personal di Ubud untuk geriatri, pemulihan pasca operasi, cedera olahraga, dan kesehatan gerak umum."]
      : route.endsWith("/article/")
        ? ["Artikel Fisioterapi dan Pemulihan | The Glyn Physio", "Artikel edukasi mengenai nyeri, latihan, cedera, mobilitas, dan pemulihan dari tim The Glyn Physio."]
        : route.endsWith("/contact/")
          ? ["Kontak Klinik Fisioterapi Ubud | The Glyn Physio", "Hubungi The Glyn Physio untuk konsultasi dan reservasi layanan fisioterapi di Ubud, Bali."]
          : route.endsWith("/our-clinics/")
            ? ["Lokasi Klinik Fisioterapi Ubud | The Glyn Physio", "Temukan lokasi dan layanan The Glyn Physio di Ubud serta pilihan layanan home visit."]
            : ["Klinik Fisioterapi di Ubud, Bali | The Glyn Physio", "Fisioterapi personal di Ubud untuk membantu Anda pulih dari nyeri, cedera, operasi, dan kembali bergerak dengan percaya diri."];
  const title = item?.metaTitle || (item ? `${item.title} di Ubud | The Glyn Physio` : defaults[0]);
  const description = item?.metaDescription || item?.summary || item?.description || defaults[1];
  const canonical = seoCanonicalUrl();
  const image = seoAbsoluteImage(item?.image || "assets/team1.jpg");
  document.title = title;
  document.documentElement.lang = "id";
  setSeoMeta("name", "description", description.slice(0, 320));
  setSeoMeta("name", "robots", "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1");
  setSeoMeta("name", "author", "The Glyn Physio");
  setSeoMeta("property", "og:site_name", "The Glyn Physio");
  setSeoMeta("property", "og:locale", "id_ID");
  setSeoMeta("property", "og:type", isArticleDetail ? "article" : "website");
  setSeoMeta("property", "og:title", title);
  setSeoMeta("property", "og:description", description.slice(0, 320));
  setSeoMeta("property", "og:url", canonical);
  setSeoMeta("property", "og:image", image);
  setSeoMeta("name", "twitter:card", "summary_large_image");
  setSeoMeta("name", "twitter:title", title);
  setSeoMeta("name", "twitter:description", description.slice(0, 320));
  setSeoMeta("name", "twitter:image", image);
  let canonicalLink = document.head.querySelector('link[rel="canonical"]');
  if (!canonicalLink) { canonicalLink = document.createElement("link"); canonicalLink.rel = "canonical"; document.head.appendChild(canonicalLink); }
  canonicalLink.href = canonical;
  upsertStructuredData("seo-website-schema", { "@context": "https://schema.org", "@type": "WebSite", "@id": `${SEO_SITE_URL}/#website`, url: `${SEO_SITE_URL}/`, name: "The Glyn Physio", alternateName: "Glyn Physio", inLanguage: "id-ID" });
  upsertStructuredData("seo-business-schema", clinicStructuredData());
  upsertStructuredData("seo-breadcrumb-schema", breadcrumbStructuredData(canonical, item?.title || defaults[0].split(" |")[0]));
  if (isArticleDetail && item) upsertStructuredData("seo-page-schema", { "@context": "https://schema.org", "@type": "Article", headline: item.title, description, image: [image], mainEntityOfPage: canonical, author: { "@type": "Organization", name: "The Glyn Physio", url: `${SEO_SITE_URL}/about-us/` }, publisher: { "@type": "Organization", name: "The Glyn Physio", logo: { "@type": "ImageObject", url: SEO_DEFAULT_IMAGE } }, ...(item.updatedAt ? { dateModified: item.updatedAt } : {}) });
  else if (isServiceDetail && item) upsertStructuredData("seo-page-schema", { "@context": "https://schema.org", "@type": "Service", name: item.title, description, url: canonical, image, areaServed: "Ubud, Bali", provider: { "@id": `${SEO_SITE_URL}/#clinic` } });
  else document.querySelector("#seo-page-schema")?.remove();
}

function renderCurrentPage() {
  if (route.includes("/services/") && !route.endsWith("/services/")) serviceDetail(route.split("/").filter(Boolean).pop());
  else if (route.includes("/article/") && !route.endsWith("/article/")) articleDetail(route.split("/").filter(Boolean).pop());
  else if (route.endsWith("/services/")) servicesPage();
  else if (route.endsWith("/article/")) articlesPage();
  else if (route.endsWith("/about-us/")) aboutPage();
  else if (route.endsWith("/our-clinics/")) clinicsPage();
  else if (route.endsWith("/contact/")) contactPage();
  else homePage();
  applyPageSeo();
}

async function loadManagedContent() {
  if (location.protocol === "file:") return;
  try {
    const response = await fetch(`${base}api.php?action=public`, { headers: { Accept: "application/json" } });
    if (!response.ok) return;
    const payload = await response.json();
    const managedServices = Object.fromEntries((payload.contents || []).filter(item => item.type === "service").map(item => {
      const existing = services[item.slug] || {};
      const mediaType = item.featured_media_type === "google_drive" ? "google_drive_video" : (item.featured_media_type || existing.media_type || "youtube");
      const mediaUrl = item.featured_media_url || existing.media_url || existing.video || DEFAULT_VIDEO;
      return [item.slug, {
        ...existing,
        title: escapePublic(item.title),
        cardTitle: escapePublic(item.title),
        tagline: escapePublic(item.summary || "Program fisioterapi personal."),
        description: escapePublic(item.body || item.summary || ""),
        summary: escapePublic(item.summary || ""),
        treatments: String(item.service_treatments || "").split(/\r?\n/).map(value => value.trim()).filter(Boolean),
        sortOrder: Number(item.sort_order || 0),
        media_type: mediaType,
        media_url: mediaUrl,
        video: mediaType === "youtube" ? mediaUrl : (existing.video || DEFAULT_VIDEO),
        metaTitle: item.meta_title || "",
        metaDescription: item.meta_description || ""
      }];
    }));
    const managedArticles = Object.fromEntries((payload.contents || []).filter(item => item.type === "article").map(item => {
      const existing = articles[item.slug] || {};
      const mediaType = item.featured_media_type || "";
      const mediaValue = item.featured_media_url || "";
      let image = existing.image || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1200&q=82";
      let video = existing.video || DEFAULT_VIDEO;
      let driveVideo = "";
      if (mediaType === "image" && mediaValue) image = /^https?:\/\//.test(mediaValue) ? mediaValue : `${base}${mediaValue.replace(/^\//, "")}`;
      if (mediaType === "youtube" && mediaValue) { video = mediaValue; image = `https://i.ytimg.com/vi/${mediaValue}/hqdefault.jpg`; }
      if (["google_drive", "google_drive_video"].includes(mediaType) && mediaValue) { driveVideo = mediaValue; image = `https://drive.google.com/thumbnail?id=${mediaValue}&sz=w1200`; }
      if (mediaType === "google_drive_image" && mediaValue) image = `https://drive.google.com/thumbnail?id=${mediaValue}&sz=w1200`;
      return [item.slug, {
        ...existing, image, video, driveVideo, featuredMediaType: mediaType,
        title: escapePublic(item.title), summary: escapePublic(item.summary || ""), body: item.body || "",
        metaTitle: item.meta_title || "", metaDescription: item.meta_description || "", updatedAt: item.updated_at || ""
      }];
    }));
    services = payload.services_managed ? managedServices : { ...services, ...managedServices };
    articles = managedArticles;
    if (Array.isArray(payload.specialties)) managedSpecialties = payload.specialties;
    if (Array.isArray(payload.testimonials)) managedTestimonials = payload.testimonials;
    if (Array.isArray(payload.therapy_sessions)) managedTherapySessions = payload.therapy_sessions;
    if (Array.isArray(payload.about_items)) managedAboutItems = payload.about_items;
    managedLinks = payload.links || [];
    managedGoogleReview = payload.google_review || managedGoogleReview;
    managedBusinessHours = payload.business_hours || [];
    if (Array.isArray(payload.faqs)) { managedFaqs = payload.faqs; faqDataAvailable = true; }
    if (Array.isArray(payload.pricing)) { managedPricing = payload.pricing; pricingDataAvailable = true; }
    const whatsapp = managedLinks.find(item => item.link_type === "whatsapp");
    if (whatsapp) WHATSAPP = whatsapp.url;
    managedSections = payload.sections || [];
  } catch (error) {
    console.warn("Managed content unavailable; using static content.", error);
  }
}

function initGTranslate() {
  const switcher = document.querySelector("#language-switcher");
  if (!switcher || document.querySelector("#gtranslate-widget-script")) return;

  const trigger = switcher.querySelector(".language-flag-button");
  const menu = switcher.querySelector(".language-options");
  const cookieLanguage = document.cookie.match(/(?:^|;\s*)googtrans=\/id\/([a-z-]+)/i)?.[1];
  let selectedLanguage = ["id", "en"].includes(cookieLanguage) ? cookieLanguage : (localStorage.getItem("glyn-language-choice") || "id");
  const renderLanguage = language => {
    selectedLanguage = ["id", "en"].includes(language) ? language : "id";
    const activeFlag = switcher.querySelector("[data-active-language-flag]");
    activeFlag.dataset.language = selectedLanguage;
    activeFlag.textContent = "";
    trigger.setAttribute("aria-label", selectedLanguage === "id" ? "Bahasa Indonesia. Pilih bahasa" : "English. Choose language");
    switcher.querySelectorAll("[data-language]").forEach(option => {
      const active = option.dataset.language === selectedLanguage;
      option.classList.toggle("active", active);
      option.setAttribute("aria-checked", String(active));
    });
  };
  const closeMenu = () => { menu.hidden = true; trigger.setAttribute("aria-expanded", "false"); };
  const applyLanguage = (language, attempt = 0) => {
    const selector = switcher.querySelector(".gtranslate_wrapper select");
    if (!selector && attempt < 30) { setTimeout(() => applyLanguage(language, attempt + 1), 150); return; }
    if (!selector) return;
    const option = [...selector.options].find(item => item.value === language || item.value.split("|").pop() === language || item.value.split("/").pop() === language);
    if (!option) return;
    selector.value = option.value;
    selector.dispatchEvent(new Event("change", { bubbles: true }));
  };
  renderLanguage(selectedLanguage);
  trigger.addEventListener("click", event => {
    event.stopPropagation();
    const open = menu.hidden;
    menu.hidden = !open;
    trigger.setAttribute("aria-expanded", String(open));
    if (open) menu.querySelector(`[data-language="${selectedLanguage}"]`)?.focus();
  });
  menu.querySelectorAll("[data-language]").forEach(option => option.addEventListener("click", () => {
    const language = option.dataset.language;
    localStorage.setItem("glyn-language-choice", language);
    renderLanguage(language);
    closeMenu();
    applyLanguage(language);
  }));
  document.addEventListener("click", event => { if (!switcher.contains(event.target)) closeMenu(); });
  document.addEventListener("keydown", event => { if (event.key === "Escape") { closeMenu(); trigger.focus(); } });

  window.gtranslateSettings = {
    default_language: "id",
    languages: ["id", "en"],
    native_language_names: true,
    wrapper_selector: ".gtranslate_wrapper"
  };

  const script = document.createElement("script");
  script.id = "gtranslate-widget-script";
  script.src = "https://cdn.gtranslate.net/widgets/latest/dropdown.js";
  script.defer = true;
  script.addEventListener("load", () => {
    switcher.classList.add("translation-ready");
    renderLanguage(selectedLanguage);
  });
  script.addEventListener("error", () => {
    trigger.title = "Terjemahan tidak tersedia. Periksa koneksi internet.";
    switcher.classList.add("translation-error");
  });
  document.body.appendChild(script);
}

loadManagedContent().finally(() => {
  renderCurrentPage();
  initGTranslate();
});
