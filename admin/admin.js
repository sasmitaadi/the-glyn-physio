const apiUrl = "../api.php";
const titles = { overview: "Ringkasan", content: "Artikel", "services-management": "Manajemen Layanan", faqs: "FAQ Management", pricing: "Pricing Management", specialties: "Spesialisasi Kami", testimonials: "Testimoni Pasien", "therapy-sessions": "Sesi Terapi", "about-management": "Tentang, Tim & Fasilitas", contacts: "Kontak & sosial", analytics: "Analytics", users: "Pengguna", settings: "Pengaturan & panduan" };
const descriptions = { overview: "Ringkasan aktivitas dan performa website.", content: "Tulis, tayangkan, dan perbarui artikel atau halaman website.", "services-management": "Kelola card dan detail layanan fisioterapi.", faqs: "Kelola pertanyaan umum pada halaman layanan.", pricing: "Kelola harga paket pada halaman layanan.", specialties: "Kelola kartu Spesialisasi Kami pada beranda.", testimonials: "Kelola foto, video, dan cerita pasien.", "therapy-sessions": "Kelola foto atau video untuk bagian Simak Sesi Terapi Kami.", "about-management": "Kelola metode, komitmen, profil fisioterapis, dan peralatan.", contacts: "Kelola kontak klinik dan akun sosial yang tampil di website.", analytics: "Pantau interaksi pengunjung selama 30 hari.", users: "Kelola akses pengguna dashboard.", settings: "Manual book penggunaan dashboard The Glyn Physio." };
const state = { csrf: "", user: null, contents: [], faqs: [], pricing: [], specialties: [], testimonials: [], therapySessions: [], aboutItems: [], links: [], users: [], analytics: null, googleReview: null, businessHours: [] };

function setSidebarOpen(open) {
  const sidebar = document.querySelector("#sidebar");
  const toggle = document.querySelector("#menu-toggle");
  const backdrop = document.querySelector("#sidebar-backdrop");
  if (!sidebar || !toggle) return;
  sidebar.classList.toggle("open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
  if (backdrop) backdrop.hidden = !open;
  document.body.classList.toggle("sidebar-open", open);
}

function setNavGroupOpen(group, open) {
  const toggle = group?.querySelector(":scope > .nav-group-toggle");
  const submenu = group?.querySelector(":scope > .nav-submenu");
  if (!toggle || !submenu) return;
  toggle.setAttribute("aria-expanded", String(open));
  submenu.hidden = !open;
  group.classList.toggle("open", open);
}

function setupSidebarGroups() {
  document.querySelectorAll(".nav-group-toggle").forEach(toggle => toggle.addEventListener("click", () => {
    const group = toggle.closest(".nav-group");
    const willOpen = toggle.getAttribute("aria-expanded") !== "true";
    document.querySelectorAll(".nav-group").forEach(item => setNavGroupOpen(item, item === group && willOpen));
  }));
}

function revealActiveNavGroup(view) {
  const activeItem = document.querySelector(`.nav-item[data-view="${view}"]`);
  const activeGroup = activeItem?.closest(".nav-group");
  document.querySelectorAll(".nav-group").forEach(group => {
    group.classList.toggle("has-active", group === activeGroup);
    setNavGroupOpen(group, group === activeGroup);
  });
}

const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
const formatDate = value => value ? new Date(String(value).replace(" ", "T")).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" }) : "-";
const typeLabel = value => ({ article: "Artikel", service: "Layanan", page: "Halaman" }[value] || value);
const statusLabel = value => value === "published" ? "Tayang" : "Draft";
const publicContentUrl = item => item.type === "article" ? `../article/${item.slug}/index.html` : item.type === "service" ? `../services/${item.slug}/index.html` : "../index.html";

async function api(action, options = {}) {
  const headers = { Accept: "application/json", ...(options.headers || {}) };
  if (options.body && !headers["Content-Type"]) headers["Content-Type"] = "application/json";
  if (options.method && options.method !== "GET") headers["X-CSRF-Token"] = state.csrf;
  const response = await fetch(`${apiUrl}?action=${action}`, { ...options, headers });
  const payload = await response.json().catch(() => ({ ok: false, error: "Respons server tidak valid." }));
  if (response.status === 401) { location.href = "login.html"; throw new Error("Sesi berakhir"); }
  if (!response.ok || !payload.ok) throw new Error(payload.error || "Permintaan gagal.");
  return payload;
}

function showView(name) {
  const view = titles[name] ? name : "overview";
  document.querySelectorAll(".view").forEach(item => item.classList.toggle("active", item.id === view));
  document.querySelectorAll(".nav-item").forEach(item => item.classList.toggle("active", item.dataset.view === view));
  revealActiveNavGroup(view);
  document.querySelector("#page-title").textContent = titles[view];
  const context = document.querySelector("#page-context"); if (context) context.textContent = descriptions[view];
  setSidebarOpen(false);
  history.replaceState(null, "", `#${view}`);
}

function prepareDashboardUX() {
  const title = document.querySelector("#page-title");
  if (!document.querySelector("#page-context")) title.insertAdjacentHTML("afterend", '<p class="page-context" id="page-context"></p>');
  const welcome = document.querySelector("#overview .welcome");
  welcome.querySelector(".eyebrow").textContent = new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" }).format(new Date());
  welcome.querySelector("[data-view-target=content]")?.remove();
  welcome.insertAdjacentHTML("afterend", `<div class="quick-actions" aria-label="Aksi cepat"><div><strong>Aksi cepat</strong><span>Buat atau perbarui data tanpa mencari menu.</span></div><button type="button" data-quick-action="content">Artikel baru</button><button type="button" data-quick-action="link">Tambah kontak</button></div>`);
  const contactsView = document.createElement("section");
  contactsView.className = "view"; contactsView.id = "contacts";
  contactsView.innerHTML = `<div class="section-heading"><div><p class="eyebrow">KONTAK & SOSIAL</p><h2>Kontak dan sosial media</h2><p class="muted">Informasi aktif di sini digunakan langsung pada website pengunjung.</p></div><button class="button primary" id="new-contact">+ Tambah kontak</button></div><article class="business-profile-card" id="business-profile-card"><div><p class="eyebrow">INFORMASI KLINIK</p><h3>Memuat kontak…</h3><p class="muted">Email, nomor HP, alamat, dan Google Maps.</p></div><button type="button" class="button primary" id="manage-business-contact">Kelola informasi</button></article><article class="google-review-card" id="google-review-card"><div><p class="eyebrow">GOOGLE REVIEW</p><h3>Memuat rating…</h3><p class="muted">Rating yang tampil di footer website.</p></div><div class="google-review-actions"><button type="button" class="button secondary" id="refresh-google-review">Sinkronkan</button><button type="button" class="button primary" id="manage-google-review">Kelola review</button></div></article><article class="business-hours-card" id="business-hours-card"><div><p class="eyebrow">JAM BUKA</p><h3>Memuat jadwal…</h3><p class="muted">Jadwal operasional yang tampil di footer website.</p></div><button type="button" class="button primary" id="manage-business-hours">Kelola jam buka</button></article><div class="contact-summary" id="contact-summary"></div><article class="panel"><div class="table-wrap"><table><thead><tr><th>Nama</th><th>Tipe</th><th>Teks tampil</th><th>URL / tujuan</th><th>Penempatan</th><th>Status</th><th></th></tr></thead><tbody id="contact-rows"><tr><td colspan="7">Memuat data…</td></tr></tbody></table></div></article></section>`;
  document.querySelector("#analytics").before(contactsView);
  const toolbar = document.querySelector("#content .toolbar");
  const contentHeaders = document.querySelectorAll("#content thead th"); if (contentHeaders[2]) contentHeaders[2].textContent = "Preview";
  const statusOptions = toolbar.querySelectorAll("select")[1]?.options; if (statusOptions?.[1]) statusOptions[1].textContent = "Tayang";
  toolbar.insertAdjacentHTML("beforeend", '<button type="button" class="filter-reset" id="content-filter-reset">Reset filter</button><span class="result-count" id="content-result-count">0 konten</span>');
  document.querySelector("#content-filter-reset").addEventListener("click", () => {
    toolbar.querySelector("input").value = ""; toolbar.querySelectorAll("select").forEach(select => { select.selectedIndex = 0; }); renderContents();
  });
  document.querySelectorAll("[data-quick-action]").forEach(button => button.addEventListener("click", () => {
    const action = button.dataset.quickAction;
    if (action === "content") openContentForm();
    if (action === "link") openResourceForm("links");
  }));
  document.querySelector("#new-contact").addEventListener("click", () => openResourceForm("links"));
  document.querySelector("#manage-google-review").addEventListener("click", openGoogleReviewForm);
  document.querySelector("#refresh-google-review").addEventListener("click", refreshGoogleReview);
  document.querySelector("#manage-business-hours").addEventListener("click", openBusinessHoursForm);
  document.querySelector("#manage-business-contact").addEventListener("click", openBusinessContactForm);
  document.querySelector("#settings .manual-grid").insertAdjacentHTML("beforeend", '<article class="manual-card"><span>04</span><h3>FAQ</h3><p>Pertanyaan umum pada halaman layanan.</p><button type="button" data-view-target="faqs">Buka FAQ →</button></article>');
  document.querySelector("#settings .manual-grid").insertAdjacentHTML("beforeend", '<article class="manual-card"><span>05</span><h3>Pricing</h3><p>Harga dan paket fisioterapi.</p><button type="button" data-view-target="pricing">Buka pricing →</button></article>');
  document.querySelector("#settings .manual-grid").insertAdjacentHTML("beforeend", '<article class="manual-card"><span>06</span><h3>Beranda</h3><p>Spesialisasi, testimoni, dan sesi terapi.</p><button type="button" data-view-target="specialties">Buka spesialisasi →</button></article>');
  document.querySelector("#settings .manual-grid").insertAdjacentHTML("beforeend", '<article class="manual-card"><span>07</span><h3>Tentang & Tim</h3><p>Metode, komitmen, fisioterapis, dan alat.</p><button type="button" data-view-target="about-management">Buka pengelolaan →</button></article>');
  document.querySelector("#settings .manual-grid").insertAdjacentHTML("beforeend", '<article class="manual-card"><span>08</span><h3>Layanan</h3><p>Card Services dan detail setiap layanan.</p><button type="button" data-view-target="services-management">Buka layanan →</button></article>');
  document.querySelector("#settings .manual-book").insertAdjacentHTML("beforeend", '<details><summary><span>6</span> Cara mengelola FAQ</summary><div class="manual-detail"><ol><li>Buka menu <strong>FAQ</strong>.</li><li>Klik <strong>Tambah FAQ</strong> atau pilih <strong>Edit</strong> pada pertanyaan yang tersedia.</li><li>Isi pertanyaan, jawaban, halaman layanan, urutan, dan status tampil.</li><li>Pilih <strong>Semua halaman layanan</strong> jika pertanyaan berlaku untuk seluruh layanan.</li><li>Klik <strong>Simpan</strong>, lalu periksa halaman layanan terkait.</li></ol></div></details>');
  document.querySelector("#settings .manual-book").insertAdjacentHTML("beforeend", '<details><summary><span>7</span> Cara mengelola pricing</summary><div class="manual-detail"><ol><li>Buka menu <strong>Pricing</strong>.</li><li>Klik <strong>Tambah harga</strong> atau pilih <strong>Edit</strong> pada paket yang tersedia.</li><li>Isi nama paket, nominal harga tanpa titik, catatan opsional, layanan, urutan, dan status.</li><li>Pilih <strong>Semua halaman layanan</strong> untuk harga reguler yang berlaku umum.</li><li>Harga khusus layanan akan menggantikan harga umum pada halaman layanan tersebut.</li></ol></div></details>');
  document.querySelector("#settings .manual-book").insertAdjacentHTML("beforeend", '<details><summary><span>8</span> Spesialisasi, testimoni, dan sesi terapi</summary><div class="manual-detail"><ol><li>Gunakan menu <strong>Spesialisasi</strong> untuk kartu layanan pada beranda.</li><li>Gunakan menu <strong>Testimoni</strong> untuk foto/video dan cerita pasien.</li><li>Gunakan menu <strong>Sesi terapi</strong> untuk foto Google Drive, URL gambar, atau video YouTube.</li><li>Untuk Google Drive, tempel link berbagi atau ID file dan pastikan aksesnya <strong>Siapa saja yang memiliki link</strong>.</li><li>Atur urutan dan status, kemudian klik <strong>Simpan</strong>.</li></ol></div></details>');
  document.querySelector("#settings .manual-book").insertAdjacentHTML("beforeend", '<details><summary><span>9</span> Metode, komitmen, fisioterapis, dan alat</summary><div class="manual-detail"><ol><li>Buka menu <strong>Tentang, tim & alat</strong>.</li><li>Pilih tombol tambah pada kelompok yang ingin dikelola.</li><li>Pilih media berupa upload foto, URL foto, foto/video Google Drive, atau YouTube.</li><li>Preview media akan muncul sebelum data disimpan.</li><li>Pastikan file Google Drive dapat diakses oleh siapa saja yang memiliki link.</li></ol></div></details>');
  document.querySelector("#settings .manual-book").insertAdjacentHTML("beforeend", '<details><summary><span>10</span> Cara mengelola layanan</summary><div class="manual-detail"><ol><li>Buka menu <strong>Konten & layanan → Layanan</strong>.</li><li>Klik <strong>Tambah layanan</strong> atau pilih Edit pada layanan yang tersedia.</li><li>Isi nama, tagline card, deskripsi halaman, dan daftar perawatan.</li><li>Pilih media berupa upload foto, URL foto, Google Drive, atau YouTube.</li><li>Atur urutan dan status Tayang, lalu klik <strong>Simpan</strong>.</li></ol></div></details>');
}

function formPanel(id, title, fields, submitLabel = "Simpan") {
  return `<form id="${id}" class="dashboard-modal-card content-form" role="document"><div class="modal-heading"><div><p class="eyebrow">MANAJEMEN DATA</p><h3>${escapeHtml(title)}</h3><p class="muted">Perubahan tersimpan langsung ke database.</p></div><button type="button" class="modal-close" data-close-form aria-label="Tutup modal">×</button></div><div class="modal-body"><div class="form-grid">${fields}</div></div><div class="modal-actions"><button type="button" class="button secondary" data-close-form>Batal</button><button class="button primary" type="submit">${escapeHtml(submitLabel)}</button></div></form>`;
}

function closeModal() {
  document.querySelector(".dashboard-modal-backdrop")?.remove();
  document.body.classList.remove("modal-open");
}

function insertForm(html, onSubmit) {
  closeModal();
  const backdrop = document.createElement("div");
  backdrop.className = "dashboard-modal-backdrop";
  backdrop.setAttribute("role", "dialog");
  backdrop.setAttribute("aria-modal", "true");
  backdrop.innerHTML = html;
  document.body.appendChild(backdrop);
  document.body.classList.add("modal-open");
  const form = backdrop.querySelector(".content-form");
  const close = () => closeModal();
  backdrop.querySelectorAll("[data-close-form]").forEach(button => button.addEventListener("click", close));
  backdrop.addEventListener("click", event => { if (event.target === backdrop) close(); });
  form.querySelector("input, select, textarea")?.focus();
  setupFieldCounters(form);
  form.addEventListener("submit", async event => {
    event.preventDefault();
    const button = form.querySelector("button[type=submit]");
    const originalLabel = button.textContent;
    button.disabled = true; button.textContent = "Menyimpan…";
    try { await onSubmit(form); close(); notify("Data berhasil disimpan.", "success"); }
    catch (error) { notify(error.message, "error"); button.disabled = false; button.textContent = originalLabel; }
  });
}

function setupFieldCounters(form) {
  form.querySelectorAll("textarea[data-counter], input[data-counter]").forEach(field => {
    if (field.dataset.counterReady) return;
    field.dataset.counterReady = "1";
    const counter = document.createElement("small"); counter.className = "field-counter";
    const update = () => { counter.textContent = `${field.value.length}${field.maxLength > 0 ? ` / ${field.maxLength}` : ""} karakter`; };
    field.closest("label")?.appendChild(counter); field.addEventListener("input", update); update();
  });
}

function notify(message, type = "success") {
  document.querySelector(".dashboard-toast")?.remove();
  const toast = document.createElement("div");
  toast.className = `dashboard-toast ${type}`;
  toast.setAttribute("role", type === "error" ? "alert" : "status");
  toast.innerHTML = `<span>${type === "success" ? "✓" : "!"}</span><p>${escapeHtml(message)}</p><button type="button" aria-label="Tutup">×</button>`;
  document.body.appendChild(toast);
  toast.querySelector("button").addEventListener("click", () => toast.remove());
  window.setTimeout(() => toast.remove(), 4500);
}

function confirmDelete(label = "data ini") {
  return new Promise(resolve => {
    closeModal();
    const backdrop = document.createElement("div");
    backdrop.className = "dashboard-modal-backdrop";
    backdrop.setAttribute("role", "alertdialog");
    backdrop.setAttribute("aria-modal", "true");
    backdrop.innerHTML = `<div class="confirm-card"><span class="confirm-icon">!</span><h3>Hapus ${escapeHtml(label)}?</h3><p>Data yang sudah dihapus tidak dapat dikembalikan.</p><div class="modal-actions"><button type="button" class="button secondary" data-cancel>Batal</button><button type="button" class="button danger" data-confirm>Ya, hapus</button></div></div>`;
    document.body.appendChild(backdrop); document.body.classList.add("modal-open");
    const onEscape = event => { if (event.key === "Escape") finish(false); };
    const finish = value => { document.removeEventListener("keydown", onEscape); closeModal(); resolve(value); };
    backdrop.querySelector("[data-cancel]").addEventListener("click", () => finish(false));
    backdrop.querySelector("[data-confirm]").addEventListener("click", () => finish(true));
    backdrop.addEventListener("click", event => { if (event.target === backdrop) finish(false); });
    document.addEventListener("keydown", onEscape);
    backdrop.querySelector("[data-confirm]").focus();
  });
}

function contentFields(item = {}) {
  const mediaType = item.featured_media_type || "";
  const mediaUrl = item.featured_media_url || "";
  const selectedType = mediaType === "image" && /^https?:/.test(mediaUrl) ? "image_url" : mediaType === "google_drive" ? "google_drive_video" : mediaType;
  const linkedTypes = ["image_url", "youtube", "google_drive_image", "google_drive_video"];
  return `<label>Judul artikel<input name="title" value="${escapeHtml(item.title)}" required></label><label>Slug URL<output class="slug-preview" data-slug-preview>${escapeHtml(item.slug || slugFromTitle(item.title || "judul-artikel"))}</output><small>${item.id ? "Dipertahankan agar link lama tidak rusak." : "Dibuat otomatis berdasarkan judul."}</small></label><input type="hidden" name="type" value="article"><label>Status<select name="status"><option value="draft" ${item.status !== "published" ? "selected" : ""}>Draft</option><option value="published" ${item.status === "published" ? "selected" : ""}>Published</option></select></label><label class="wide">Ringkasan<textarea name="summary" rows="3">${escapeHtml(item.summary)}</textarea></label><label class="wide">Isi / deskripsi<textarea name="body" rows="8">${escapeHtml(item.body)}</textarea></label><div class="wide featured-media-box"><div class="featured-media-heading"><div><strong>Thumbnail / media artikel</strong><small>Gunakan upload foto, URL foto, Google Drive, atau YouTube.</small></div><select name="featured_media_type"><option value="" ${!selectedType ? "selected" : ""}>Tanpa media khusus</option><option value="image" ${selectedType === "image" ? "selected" : ""}>Upload foto</option><option value="image_url" ${selectedType === "image_url" ? "selected" : ""}>URL foto langsung</option><option value="google_drive_image" ${selectedType === "google_drive_image" ? "selected" : ""}>Foto Google Drive</option><option value="google_drive_video" ${selectedType === "google_drive_video" ? "selected" : ""}>Video Google Drive</option><option value="youtube" ${selectedType === "youtube" ? "selected" : ""}>Video YouTube</option></select></div><div data-media-fields="image"><label>Upload JPG, PNG, atau WebP (maks. 5 MB)<input name="featured_image" type="file" accept="image/jpeg,image/png,image/webp"></label></div><div data-media-fields="linked"><label>Link atau ID media<input name="featured_media_input" value="${escapeHtml(linkedTypes.includes(selectedType) ? mediaUrl : "")}" placeholder="Tempel link atau ID media"></label><p class="media-help" data-media-help></p></div><input name="featured_media_url" type="hidden" value="${escapeHtml(mediaUrl)}"><div class="featured-media-preview" data-featured-media-preview><span>Preview media akan tampil di sini.</span></div></div><label>Meta title<input name="meta_title" value="${escapeHtml(item.meta_title)}"></label><label>Meta description<input name="meta_description" value="${escapeHtml(item.meta_description)}"></label>`;
}

function slugFromTitle(value) {
  return String(value || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "judul-konten";
}

function parseMediaReference(type, value) {
  const input = String(value || "").trim();
  const mediaName = type === "youtube" ? "YouTube" : "Google Drive";
  if (!input) return { id: "", error: `Tempel link atau ID ${mediaName} terlebih dahulu.` };
  const rawPattern = type === "youtube" ? /^[A-Za-z0-9_-]{11}$/ : /^[A-Za-z0-9_-]{10,}$/;
  if (rawPattern.test(input)) return { id: input, error: "" };
  let parsed;
  try {
    const candidate = /^(?:www\.|youtube\.com|youtu\.be|drive\.google\.com|docs\.google\.com)/i.test(input) ? `https://${input}` : input;
    parsed = new URL(candidate);
  } catch {
    return { id: "", error: `Format link ${mediaName} tidak dapat dibaca. Salin link lengkap dari tombol Bagikan.` };
  }
  const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
  if (type === "youtube") {
    const allowed = host === "youtu.be" || host === "youtube.com" || host.endsWith(".youtube.com") || host === "youtube-nocookie.com" || host.endsWith(".youtube-nocookie.com");
    if (!allowed) return { id: "", error: "Link bukan berasal dari YouTube. Gunakan link youtube.com atau youtu.be." };
    const pathParts = parsed.pathname.split("/").filter(Boolean);
    const id = host === "youtu.be" ? pathParts[0] : parsed.searchParams.get("v") || (["embed", "shorts", "live"].includes(pathParts[0]) ? pathParts[1] : "");
    if (!/^[A-Za-z0-9_-]{11}$/.test(id || "")) return { id: "", error: "ID video YouTube tidak ditemukan. Buka videonya, pilih Bagikan, lalu salin link yang diberikan YouTube." };
    return { id, error: "" };
  }
  if (!(host === "drive.google.com" || host === "docs.google.com")) return { id: "", error: "Link bukan berasal dari Google Drive. Gunakan link yang disalin dari menu Bagikan di Drive." };
  const match = parsed.pathname.match(/\/d\/([A-Za-z0-9_-]{10,})/) || [null, parsed.searchParams.get("id")];
  if (!/^[A-Za-z0-9_-]{10,}$/.test(match[1] || "")) return { id: "", error: "ID file Google Drive tidak ditemukan. Pilih file, klik Bagikan, lalu salin link file tersebut (bukan link folder)." };
  return { id: match[1], error: "" };
}

function extractVideoId(type, value) { return parseMediaReference(type, value).id; }

function showMediaPreviewError(preview, message) {
  preview.innerHTML = `<div class="media-preview-error"><strong>Preview belum dapat ditampilkan</strong><span>${escapeHtml(message)}</span></div>`;
}

function renderMediaPreview(preview, kind, value, alt = "Preview media") {
  if (!value) { preview.innerHTML = "<span>Preview media akan tampil di sini setelah link diisi.</span>"; return; }
  if (kind === "youtube" || kind === "google_drive_video") {
    const type = kind === "youtube" ? "youtube" : "google_drive";
    const result = parseMediaReference(type, value);
    if (!result.id) { showMediaPreviewError(preview, result.error); return; }
    const src = type === "youtube" ? `https://www.youtube.com/embed/${escapeHtml(result.id)}` : `https://drive.google.com/file/d/${escapeHtml(result.id)}/preview`;
    const note = type === "google_drive" ? '<small class="media-preview-note">Jika preview meminta login atau akses, ubah akses Drive menjadi “Siapa saja yang memiliki link — Pelihat”.</small>' : '<small class="media-preview-note">Jika video tidak dapat diputar, pastikan pemilik video mengizinkan penyematan (embed).</small>';
    preview.innerHTML = `<iframe src="${src}" title="${escapeHtml(alt)}" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>${note}`;
    return;
  }
  let src = value;
  if (kind === "google_drive_image") {
    const result = parseMediaReference("google_drive", value);
    if (!result.id) { showMediaPreviewError(preview, result.error); return; }
    src = `https://drive.google.com/thumbnail?id=${encodeURIComponent(result.id)}&sz=w1000`;
  } else if (!/^(?:https?:|blob:)/.test(value)) src = `../${value}`;
  preview.innerHTML = `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}">`;
  preview.querySelector("img").addEventListener("error", () => showMediaPreviewError(preview, kind === "google_drive_image" ? "File tidak dapat diakses. Pastikan link menuju file gambar dan akses Drive diatur ke “Siapa saja yang memiliki link — Pelihat”." : "Gambar tidak dapat dimuat. Periksa kembali URL dan pastikan gambar dapat diakses publik."), { once: true });
}

async function uploadFeaturedImage(file) {
  const body = new FormData(); body.append("file", file);
  const response = await fetch(`${apiUrl}?action=upload`, { method: "POST", headers: { Accept: "application/json", "X-CSRF-Token": state.csrf }, body });
  const payload = await response.json().catch(() => ({ ok: false, error: "Respons upload tidak valid." }));
  if (!response.ok || !payload.ok) throw new Error(payload.error || "Gambar gagal diunggah.");
  return payload.url;
}

function setupFeaturedMediaForm(form) {
  const type = form.querySelector("[name=featured_media_type]");
  const imageFields = form.querySelector('[data-media-fields="image"]');
  const linkedFields = form.querySelector('[data-media-fields="linked"]');
  const input = form.querySelector("[name=featured_media_input]");
  const help = form.querySelector("[data-media-help]");
  const fileInput = form.querySelector("[name=featured_image]");
  const current = form.querySelector("[name=featured_media_url]").value;
  const preview = form.querySelector("[data-featured-media-preview]");
  const renderPreview = (kind, value) => renderMediaPreview(preview, kind, value, "Preview media artikel");
  const update = () => {
    imageFields.hidden = type.value !== "image";
    linkedFields.hidden = !["image_url", "youtube", "google_drive_image", "google_drive_video"].includes(type.value);
    input.placeholder = type.value === "youtube" ? "https://youtu.be/... atau ID video" : type.value === "image_url" ? "https://domain.com/gambar.jpg" : "https://drive.google.com/file/d/.../view atau ID file";
    help.textContent = type.value.startsWith("google_drive") ? "Pastikan file Google Drive dapat diakses oleh siapa pun yang memiliki link." : type.value === "youtube" ? "Video dapat diputar pada halaman artikel." : type.value === "image_url" ? "Gunakan URL gambar langsung yang diawali https://." : "";
    if (type.value === "image") renderPreview("image", fileInput.files[0] ? URL.createObjectURL(fileInput.files[0]) : current);
    else if (type.value) renderPreview(type.value, input.value.trim());
    else renderPreview("", "");
  };
  type.addEventListener("change", update); input.addEventListener("input", update); fileInput.addEventListener("change", update); update();
}

function addContentFormSections(form) {
  const grid = form.querySelector(".form-grid");
  const add = (before, title, description) => {
    const heading = document.createElement("div"); heading.className = "form-section-title wide";
    heading.innerHTML = `<strong>${escapeHtml(title)}</strong><span>${escapeHtml(description)}</span>`;
    grid.insertBefore(heading, before);
  };
  add(form.querySelector("[name=title]").closest("label"), "Informasi utama", "Judul, tipe, status tayang, dan isi konten.");
  add(form.querySelector(".featured-media-box"), "Media unggulan", "Pilih gambar atau video yang akan dilihat pengunjung.");
  add(form.querySelector("[name=meta_title]").closest("label"), "Pengaturan SEO", "Opsional. Membantu judul dan deskripsi tampil lebih baik di mesin pencari.");
  form.querySelector("[name=summary]").setAttribute("data-counter", "");
  form.querySelector("[name=meta_title]").maxLength = 255; form.querySelector("[name=meta_title]").setAttribute("data-counter", "");
  form.querySelector("[name=meta_description]").maxLength = 320; form.querySelector("[name=meta_description]").setAttribute("data-counter", "");
  setupFieldCounters(form);
}

async function prepareFeaturedMedia(form, data) {
  const imageFile = form.querySelector("[name=featured_image]").files[0];
  if (data.featured_media_type === "image") {
    if (imageFile) data.featured_media_url = await uploadFeaturedImage(imageFile);
    if (!data.featured_media_url) throw new Error("Pilih gambar yang akan digunakan.");
  } else if (data.featured_media_type === "image_url") {
    data.featured_media_type = "image";
    data.featured_media_url = String(data.featured_media_input || "").trim();
    if (!/^https?:\/\//.test(data.featured_media_url)) throw new Error("Masukkan URL gambar yang valid.");
  } else if (["youtube", "google_drive_image", "google_drive_video"].includes(data.featured_media_type)) {
    const extractType = data.featured_media_type === "youtube" ? "youtube" : "google_drive";
    const reference = parseMediaReference(extractType, data.featured_media_input);
    data.featured_media_url = reference.id;
    if (!data.featured_media_url) throw new Error(reference.error);
  } else data.featured_media_url = "";
  delete data.featured_image; delete data.featured_media_input;
}

function openContentForm(item = null) {
  insertForm(formPanel("content-form", item ? "Edit content" : "Tambah content", contentFields(item || {})), async form => {
    const data = Object.fromEntries(new FormData(form));
    await prepareFeaturedMedia(form, data);
    await api(`contents${item ? `&id=${item.id}` : ""}`, { method: item ? "PUT" : "POST", body: JSON.stringify(data) });
    await loadContents();
  });
  setupFeaturedMediaForm(document.querySelector("#content-form"));
  addContentFormSections(document.querySelector("#content-form"));
  const titleInput = document.querySelector("#content-form [name=title]");
  const preview = document.querySelector("#content-form [data-slug-preview]");
  if (!item) titleInput?.addEventListener("input", () => { preview.textContent = slugFromTitle(titleInput.value); });
}

function serviceFields(item = {}) {
  const mediaType = item.featured_media_type || "";
  const mediaUrl = item.featured_media_url || "";
  const selectedType = mediaType === "image" && /^https?:/.test(mediaUrl) ? "image_url" : mediaType === "google_drive" ? "google_drive_video" : mediaType;
  const linkedTypes = ["image_url", "youtube", "google_drive_image", "google_drive_video"];
  const mediaOptions = [["", "Tanpa media"],["image", "Upload foto"],["image_url", "URL foto langsung"],["google_drive_image", "Foto Google Drive"],["google_drive_video", "Video Google Drive"],["youtube", "Video YouTube"]].map(([value, label]) => `<option value="${value}" ${selectedType === value ? "selected" : ""}>${label}</option>`).join("");
  return `<input type="hidden" name="type" value="service"><label class="wide">Nama layanan<input name="title" maxlength="255" value="${escapeHtml(item.title)}" required></label><label>Slug URL<output class="slug-preview" data-slug-preview>${escapeHtml(item.slug || slugFromTitle(item.title || "layanan-baru"))}</output><small>${item.id ? "Dipertahankan agar link lama tetap berfungsi." : "Dibuat otomatis dari nama layanan."}</small></label><label>Status<select name="status"><option value="published" ${item.status === "published" ? "selected" : ""}>Tayang</option><option value="draft" ${item.status !== "published" ? "selected" : ""}>Draft / sembunyikan</option></select></label><label class="wide">Tagline card<textarea name="summary" rows="3" maxlength="500" required>${escapeHtml(item.summary)}</textarea><small>Teks singkat yang tampil pada card layanan.</small></label><label class="wide">Deskripsi halaman layanan<textarea name="body" rows="6" required>${escapeHtml(item.body)}</textarea></label><label class="wide">Daftar perawatan<textarea name="service_treatments" rows="6" placeholder="Satu perawatan per baris">${escapeHtml(item.service_treatments)}</textarea><small>Tulis satu jenis perawatan per baris.</small></label><label>Urutan card<input name="sort_order" type="number" min="0" value="${Number(item.sort_order || 0)}"></label><div class="wide featured-media-box"><div class="featured-media-heading"><div><strong>Media card dan halaman layanan</strong><small>Pilih foto atau video. Preview muncul sebelum disimpan.</small></div><select name="featured_media_type">${mediaOptions}</select></div><div data-media-fields="image"><label>Upload JPG, PNG, atau WebP (maks. 5 MB)<input name="featured_image" type="file" accept="image/jpeg,image/png,image/webp"></label></div><div data-media-fields="linked"><label>Link atau ID media<input name="featured_media_input" value="${escapeHtml(linkedTypes.includes(selectedType) ? mediaUrl : "")}" placeholder="Tempel link atau ID media"></label><p class="media-help" data-media-help></p></div><input name="featured_media_url" type="hidden" value="${escapeHtml(mediaUrl)}"><div class="featured-media-preview" data-featured-media-preview><span>Preview media akan tampil di sini.</span></div></div><label>Meta title<input name="meta_title" maxlength="255" value="${escapeHtml(item.meta_title)}"></label><label>Meta description<input name="meta_description" maxlength="320" value="${escapeHtml(item.meta_description)}"></label>`;
}

function openServiceForm(item = null) {
  insertForm(formPanel("service-form", item ? "Edit layanan" : "Tambah layanan", serviceFields(item || {})), async form => {
    const data = Object.fromEntries(new FormData(form));
    await prepareFeaturedMedia(form, data);
    await api(`contents${item ? `&id=${item.id}` : ""}`, { method: item ? "PUT" : "POST", body: JSON.stringify(data) });
    await loadContents();
  });
  const form = document.querySelector("#service-form");
  setupFeaturedMediaForm(form);
  setupFieldCounters(form);
  const titleInput = form.querySelector("[name=title]");
  const slugPreview = form.querySelector("[data-slug-preview]");
  if (!item) titleInput.addEventListener("input", () => { slugPreview.textContent = slugFromTitle(titleInput.value); });
}

function renderServices() {
  const rows = document.querySelector("#service-rows");
  if (!rows) return;
  const services = state.contents.filter(item => item.type === "service").sort((a, b) => Number(a.sort_order) - Number(b.sort_order) || Number(a.id) - Number(b.id));
  rows.innerHTML = services.length ? services.map(item => {
    const treatmentCount = String(item.service_treatments || "").split(/\r?\n/).filter(value => value.trim()).length;
    return `<tr><td><strong>${escapeHtml(item.title)}</strong><small class="table-subtitle">/services/${escapeHtml(item.slug)}/</small></td><td>${escapeHtml(item.featured_media_type ? item.featured_media_type.replace(/_/g, " ") : "Tanpa media")}</td><td>${treatmentCount} perawatan</td><td>${Number(item.sort_order || 0)}</td><td><span class="status ${item.status}">${statusLabel(item.status)}</span></td><td class="row-actions"><a class="text-button" href="../services/${encodeURIComponent(item.slug)}/" target="_blank" rel="noopener">Preview</a><button class="text-button" data-edit-service="${item.id}">Edit</button><button class="text-button delete-button" data-delete-service="${item.id}">Hapus</button></td></tr>`;
  }).join("") : '<tr><td colspan="6"><div class="table-empty"><strong>Belum ada layanan</strong><span>Tambahkan layanan pertama untuk halaman Services.</span></div></td></tr>';
}

function renderContents() {
  const rows = document.querySelector("#content-rows");
  const query = document.querySelector("#content .toolbar input").value.trim().toLowerCase();
  const selects = document.querySelectorAll("#content .toolbar select");
  const typeMap = { artikel: "article" };
  const selectedType = typeMap[selects[0].value.toLowerCase()] || "";
  const selectedStatus = ["published", "draft"].includes(selects[1].value.toLowerCase()) ? selects[1].value.toLowerCase() : "";
  const filtered = state.contents.filter(item => item.type === "article" && (!query || `${item.title} ${item.slug}`.toLowerCase().includes(query)) && (!selectedType || item.type === selectedType) && (!selectedStatus || item.status === selectedStatus));
  rows.innerHTML = filtered.length ? filtered.map(item => `<tr><td><strong>${escapeHtml(item.title)}</strong><small class="table-subtitle">/${escapeHtml(item.slug)}</small></td><td>${escapeHtml(typeLabel(item.type))}</td><td><a class="preview-link" href="${publicContentUrl(item)}" target="_blank" rel="noopener">Preview ↗</a></td><td><span class="status ${item.status}">${statusLabel(item.status)}</span></td><td>${formatDate(item.updated_at)}</td><td class="row-actions"><button class="text-button" data-edit-content="${item.id}">Edit</button><button class="text-button delete-button" data-delete-content="${item.id}">Hapus</button></td></tr>`).join("") : '<tr><td colspan="6"><div class="table-empty"><strong>Tidak ada konten yang cocok</strong><span>Coba ubah kata pencarian atau filter.</span></div></td></tr>';
  const count = document.querySelector("#content-result-count");
  if (count) count.textContent = `${filtered.length} dari ${state.contents.filter(item => item.type === "article").length} artikel`;
}

async function loadContents() { state.contents = (await api("contents")).data; renderContents(); renderServices(); renderOverview(); }

const defaultServiceOptions = [
  ["", "Semua halaman layanan"],
  ["geriatri", "Perawatan geriatri"],
  ["pasca-operasi", "Pemulihan pasca operasi"],
  ["olahraga", "Pemulihan cedera olahraga"],
  ["umum", "Perawatan kesehatan umum"]
];

function faqServiceOptions() {
  const managed = state.contents.filter(item => item.type === "service").sort((a, b) => Number(a.sort_order) - Number(b.sort_order)).map(item => [item.slug, item.title]);
  return [["", "Semua halaman layanan"], ...(managed.length ? managed : defaultServiceOptions.slice(1))];
}

function faqServiceLabel(value) {
  return faqServiceOptions().find(([slug]) => slug === String(value || ""))?.[1] || value;
}

function faqFields(item = {}) {
  const options = faqServiceOptions().map(([value, label]) => `<option value="${value}" ${String(item.service_slug || "") === value ? "selected" : ""}>${label}</option>`).join("");
  return `<label class="wide">Pertanyaan<input name="question" maxlength="255" value="${escapeHtml(item.question)}" required></label><label class="wide">Jawaban<textarea name="answer" rows="6" maxlength="5000" required>${escapeHtml(item.answer)}</textarea></label><label>Ditampilkan pada<select name="service_slug">${options}</select></label><label>Urutan<input name="sort_order" type="number" min="0" value="${Number(item.sort_order || 0)}"></label><label>Status<select name="is_active"><option value="1" ${String(item.is_active ?? 1) === "1" ? "selected" : ""}>Tampil</option><option value="0" ${String(item.is_active) === "0" ? "selected" : ""}>Disembunyikan</option></select></label>`;
}

function openFaqForm(item = null) {
  insertForm(formPanel("faq-form", item ? "Edit FAQ" : "Tambah FAQ", faqFields(item || {})), async form => {
    const data = Object.fromEntries(new FormData(form));
    await api(`faqs${item ? `&id=${item.id}` : ""}`, { method: item ? "PUT" : "POST", body: JSON.stringify(data) });
    await loadFaqs();
  });
  const form = document.querySelector("#faq-form");
  form.querySelector("[name=question]").setAttribute("data-counter", "");
  form.querySelector("[name=answer]").setAttribute("data-counter", "");
  setupFieldCounters(form);
}

function renderFaqs() {
  const body = document.querySelector("#faq-rows");
  const toolbar = document.querySelector("#faqs .faq-toolbar");
  const query = toolbar.querySelector("input").value.trim().toLowerCase();
  const service = toolbar.querySelectorAll("select")[0].value;
  const status = toolbar.querySelectorAll("select")[1].value;
  const filtered = state.faqs.filter(item => {
    const matchesQuery = !query || `${item.question} ${item.answer}`.toLowerCase().includes(query);
    const matchesService = !service || (service === "general" ? !item.service_slug : item.service_slug === service);
    const matchesStatus = status === "" || String(item.is_active) === status;
    return matchesQuery && matchesService && matchesStatus;
  });
  body.innerHTML = filtered.length ? filtered.map(item => `<tr><td><strong>${escapeHtml(item.question)}</strong><small class="table-subtitle">${escapeHtml(item.answer)}</small></td><td>${escapeHtml(faqServiceLabel(item.service_slug))}</td><td>${Number(item.sort_order)}</td><td><span class="status ${String(item.is_active) === "1" ? "published" : "draft"}">${String(item.is_active) === "1" ? "Tampil" : "Disembunyikan"}</span></td><td>${formatDate(item.updated_at)}</td><td class="row-actions"><button class="text-button" data-edit-faq="${item.id}">Edit</button><button class="text-button delete-button" data-delete-faq="${item.id}">Hapus</button></td></tr>`).join("") : '<tr><td colspan="6"><div class="table-empty"><strong>Belum ada FAQ yang cocok</strong><span>Tambah FAQ atau ubah filter pencarian.</span></div></td></tr>';
  document.querySelector("#faq-result-count").textContent = `${filtered.length} dari ${state.faqs.length} FAQ`;
}

async function loadFaqs() { state.faqs = (await api("faqs")).data; renderFaqs(); }

function formatRupiah(value) { return `Rp${Number(value || 0).toLocaleString("id-ID")}`; }

function pricingFields(item = {}) {
  const options = faqServiceOptions().map(([value, label]) => `<option value="${value}" ${String(item.service_slug || "") === value ? "selected" : ""}>${value ? label : "Semua halaman layanan"}</option>`).join("");
  return `<label>Nama paket<input name="package_name" maxlength="120" value="${escapeHtml(item.package_name)}" placeholder="Contoh: 3 Sesi" required></label><label>Harga (Rupiah)<input name="price_amount" type="number" min="1" step="1" value="${Number(item.price_amount || 0)}" required><small>Masukkan angka tanpa titik, contoh 350000.</small></label><label class="wide">Catatan<input name="note" maxlength="255" value="${escapeHtml(item.note)}" placeholder="Opsional, contoh: Hemat Rp75.000"></label><label>Ditampilkan pada<select name="service_slug">${options}</select></label><label>Urutan<input name="sort_order" type="number" min="0" value="${Number(item.sort_order || 0)}"></label><label>Status<select name="is_active"><option value="1" ${String(item.is_active ?? 1) === "1" ? "selected" : ""}>Tampil</option><option value="0" ${String(item.is_active) === "0" ? "selected" : ""}>Disembunyikan</option></select></label>`;
}

function openPricingForm(item = null) {
  insertForm(formPanel("pricing-form", item ? "Edit harga" : "Tambah harga", pricingFields(item || {})), async form => {
    const data = Object.fromEntries(new FormData(form));
    await api(`pricing${item ? `&id=${item.id}` : ""}`, { method: item ? "PUT" : "POST", body: JSON.stringify(data) });
    await loadPricing();
  });
}

function renderPricing() {
  const body = document.querySelector("#pricing-rows");
  const toolbar = document.querySelector("#pricing .pricing-toolbar");
  const query = toolbar.querySelector("input").value.trim().toLowerCase();
  const service = toolbar.querySelectorAll("select")[0].value;
  const status = toolbar.querySelectorAll("select")[1].value;
  const filtered = state.pricing.filter(item => {
    const matchesQuery = !query || `${item.package_name} ${item.note || ""}`.toLowerCase().includes(query);
    const matchesService = !service || (service === "general" ? !item.service_slug : item.service_slug === service);
    const matchesStatus = status === "" || String(item.is_active) === status;
    return matchesQuery && matchesService && matchesStatus;
  });
  body.innerHTML = filtered.length ? filtered.map(item => `<tr><td><strong>${escapeHtml(item.package_name)}</strong><small class="table-subtitle">${escapeHtml(item.note || "Tanpa catatan")}</small></td><td><strong class="price-value">${formatRupiah(item.price_amount)}</strong></td><td>${escapeHtml(faqServiceLabel(item.service_slug))}</td><td>${Number(item.sort_order)}</td><td><span class="status ${String(item.is_active) === "1" ? "published" : "draft"}">${String(item.is_active) === "1" ? "Tampil" : "Disembunyikan"}</span></td><td class="row-actions"><button class="text-button" data-edit-price="${item.id}">Edit</button><button class="text-button delete-button" data-delete-price="${item.id}">Hapus</button></td></tr>`).join("") : '<tr><td colspan="6"><div class="table-empty"><strong>Belum ada harga yang cocok</strong><span>Tambah paket atau ubah filter pencarian.</span></div></td></tr>';
  document.querySelector("#pricing-result-count").textContent = `${filtered.length} dari ${state.pricing.length} harga`;
}

async function loadPricing() { state.pricing = (await api("pricing")).data; renderPricing(); }

function homepageMediaFields(item = {}, driveLabel = "Google Drive") {
  const url = String(item.media_url || "");
  const selectedSource = item.media_type === "image" ? (url.startsWith("uploads/") ? "upload" : "image_url") : (item.media_type || "upload");
  const option = (value, label) => `<option value="${value}" ${selectedSource === value ? "selected" : ""}>${label}</option>`;
  return `<input type="hidden" name="current_media_url" value="${escapeHtml(url)}"><label>Jenis media<select name="media_source">${option("upload", "Upload foto")}${option("image_url", "URL foto langsung")}${option("google_drive", driveLabel)}${option("youtube", "Video YouTube")}</select></label><label class="wide homepage-upload-field">Pilih file foto<input name="media_file" type="file" accept="image/jpeg,image/png,image/webp"><small>JPG, PNG, atau WebP, maksimal 5 MB.</small></label><label class="wide homepage-link-field"><span data-homepage-media-label>URL atau ID media</span><input name="media_input" inputmode="url" autocomplete="url" value="${selectedSource === "upload" ? "" : escapeHtml(url)}"><small data-homepage-media-help></small></label><div class="wide about-media-preview" data-homepage-media-preview><span>Preview media akan tampil di sini.</span></div>`;
}

function commonHomepageFields(item = {}) {
  return `<label>Urutan<input name="sort_order" type="number" min="0" value="${Number(item.sort_order || 0)}"></label><label>Status<select name="is_active"><option value="1" ${String(item.is_active ?? 1) === "1" ? "selected" : ""}>Tampil</option><option value="0" ${String(item.is_active) === "0" ? "selected" : ""}>Disembunyikan</option></select></label>`;
}

function specialtyFields(item = {}) {
  const services = [["", "Tanpa halaman tujuan"], ...faqServiceOptions().slice(1)].map(([value, label]) => `<option value="${value}" ${String(item.service_slug || "") === value ? "selected" : ""}>${label}</option>`).join("");
  return `<label class="wide">Judul spesialisasi<input name="title" maxlength="180" value="${escapeHtml(item.title)}" required></label><label class="wide">Tagline<textarea name="tagline" rows="3">${escapeHtml(item.tagline)}</textarea></label><label class="wide">Daftar perawatan<textarea name="treatments" rows="5" placeholder="Satu perawatan per baris">${escapeHtml(item.treatments)}</textarea><small>Tulis satu item per baris.</small></label><label>Halaman tujuan<select name="service_slug">${services}</select></label>${homepageMediaFields(item, "Video Google Drive")}${commonHomepageFields(item)}`;
}

function testimonialFields(item = {}) {
  return `<label>Nama pasien<input name="patient_name" maxlength="120" value="${escapeHtml(item.patient_name)}" placeholder="Boleh dikosongkan"></label><label>Keterangan pasien<input name="patient_role" maxlength="120" value="${escapeHtml(item.patient_role)}" placeholder="Contoh: Pelari rekreasional"></label><label class="wide">Cerita / kutipan<textarea name="quote_text" rows="5">${escapeHtml(item.quote_text)}</textarea></label>${homepageMediaFields(item, "Video Google Drive")}${commonHomepageFields(item)}`;
}

function therapySessionFields(item = {}) {
  return `<label class="wide">Judul file<input name="title" maxlength="180" value="${escapeHtml(item.title)}" required></label><label class="wide">Keterangan<textarea name="caption_text" rows="4">${escapeHtml(item.caption_text)}</textarea></label>${homepageMediaFields(item, "Foto dari Google Drive")}<label class="wide">Alt text gambar<input name="alt_text" maxlength="255" value="${escapeHtml(item.alt_text)}" placeholder="Jelaskan isi foto untuk aksesibilitas"></label>${commonHomepageFields(item)}`;
}

function setupHomepageMediaForm(form, drivePreviewType) {
  const source = form.querySelector("[name=media_source]");
  const input = form.querySelector("[name=media_input]");
  const file = form.querySelector("[name=media_file]");
  const current = form.querySelector("[name=current_media_url]").value;
  const uploadField = form.querySelector(".homepage-upload-field");
  const linkField = form.querySelector(".homepage-link-field");
  const linkLabel = form.querySelector("[data-homepage-media-label]");
  const help = form.querySelector("[data-homepage-media-help]");
  const preview = form.querySelector("[data-homepage-media-preview]");
  const render = (kind, value) => renderMediaPreview(preview, kind, value);
  const update = () => {
    const upload = source.value === "upload";
    uploadField.hidden = !upload; linkField.hidden = upload;
    input.required = !upload;
    if (upload) { help.textContent = ""; render("image", file.files[0] ? URL.createObjectURL(file.files[0]) : current); }
    else if (source.value === "image_url") { linkLabel.textContent = "URL gambar langsung"; input.placeholder = "https://domain.com/foto.jpg"; help.textContent = "Tempel URL publik gambar yang diawali http:// atau https://."; render("image", input.value.trim()); }
    else if (source.value === "youtube") { linkLabel.textContent = "Link atau ID YouTube"; input.placeholder = "https://youtu.be/... atau ID video"; help.textContent = "Tempel link atau ID video YouTube."; render("youtube", input.value.trim()); }
    else { linkLabel.textContent = "Link atau ID Google Drive"; input.placeholder = "https://drive.google.com/file/d/.../view"; help.textContent = "Pastikan akses file diatur: Siapa saja yang memiliki link."; render(drivePreviewType, input.value.trim()); }
  };
  source.addEventListener("change", update); input.addEventListener("input", update); file.addEventListener("change", update); update();
}

function openHomepageForm(kind, item = null) {
  const settings = {
    specialties: ["specialty-form", item ? "Edit spesialisasi" : "Tambah spesialisasi", specialtyFields, loadHomepageModules],
    testimonials: ["testimonial-form", item ? "Edit testimoni" : "Tambah testimoni", testimonialFields, loadHomepageModules],
    "therapy-sessions": ["therapy-session-form", item ? "Edit file sesi terapi" : "Tambah file sesi terapi", therapySessionFields, loadHomepageModules]
  }[kind];
  insertForm(formPanel(settings[0], settings[1], settings[2](item || {})), async form => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const source = data.media_source;
    const imageFile = formData.get("media_file");
    if (source === "upload") {
      data.media_type = "image";
      data.media_url = imageFile && imageFile.size ? await uploadFeaturedImage(imageFile) : data.current_media_url;
      if (!data.media_url) throw new Error("Pilih file foto yang akan diupload.");
    } else if (source === "image_url") {
      data.media_type = "image";
      data.media_url = String(data.media_input || "").trim();
      if (!/^https?:\/\//.test(data.media_url)) throw new Error("Masukkan URL gambar langsung yang valid.");
    } else {
      data.media_type = source;
      const reference = parseMediaReference(source === "youtube" ? "youtube" : "google_drive", data.media_input);
      data.media_url = reference.id;
      if (!data.media_url) throw new Error(reference.error);
    }
    delete data.media_source; delete data.media_input; delete data.media_file; delete data.current_media_url;
    await api(`${kind}${item ? `&id=${item.id}` : ""}`, { method: item ? "PUT" : "POST", body: JSON.stringify(data) });
    await settings[3]();
  });
  setupHomepageMediaForm(document.querySelector(`#${settings[0]}`), kind === "therapy-sessions" ? "google_drive_image" : "google_drive_video");
}

function renderHomepageModules() {
  const status = item => `<span class="status ${String(item.is_active) === "1" ? "published" : "draft"}">${String(item.is_active) === "1" ? "Tampil" : "Disembunyikan"}</span>`;
  document.querySelector("#specialty-rows").innerHTML = state.specialties.length ? state.specialties.map(item => `<tr><td><strong>${escapeHtml(item.title)}</strong><small class="table-subtitle">${escapeHtml(item.tagline || "Tanpa tagline")}</small></td><td>${escapeHtml(item.media_type.replace(/_/g, " "))}</td><td>${escapeHtml(item.service_slug ? faqServiceLabel(item.service_slug) : "-")}</td><td>${Number(item.sort_order)}</td><td>${status(item)}</td><td class="row-actions"><button class="text-button" data-edit-specialty="${item.id}">Edit</button><button class="text-button delete-button" data-delete-specialty="${item.id}">Hapus</button></td></tr>`).join("") : '<tr><td colspan="6"><div class="table-empty"><strong>Belum ada spesialisasi</strong><span>Tambahkan kartu untuk beranda.</span></div></td></tr>';
  document.querySelector("#testimonial-rows").innerHTML = state.testimonials.length ? state.testimonials.map(item => `<tr><td><strong>${escapeHtml(item.patient_name || "Tanpa nama")}</strong><small class="table-subtitle">${escapeHtml(item.patient_role || "-")}</small></td><td>${escapeHtml(item.media_type.replace(/_/g, " "))}</td><td>${escapeHtml(item.quote_text || "Tanpa kutipan")}</td><td>${Number(item.sort_order)}</td><td>${status(item)}</td><td class="row-actions"><button class="text-button" data-edit-testimonial="${item.id}">Edit</button><button class="text-button delete-button" data-delete-testimonial="${item.id}">Hapus</button></td></tr>`).join("") : '<tr><td colspan="6"><div class="table-empty"><strong>Belum ada testimoni</strong><span>Tambahkan foto atau video pasien.</span></div></td></tr>';
  document.querySelector("#therapy-session-rows").innerHTML = state.therapySessions.length ? state.therapySessions.map(item => `<tr><td><strong>${escapeHtml(item.title)}</strong><small class="table-subtitle">${escapeHtml(item.caption_text || "Tanpa keterangan")}</small></td><td>${escapeHtml(item.media_type.replace(/_/g, " "))}</td><td><span class="url-cell">${escapeHtml(item.media_url)}</span></td><td>${Number(item.sort_order)}</td><td>${status(item)}</td><td class="row-actions"><button class="text-button" data-edit-therapy-session="${item.id}">Edit</button><button class="text-button delete-button" data-delete-therapy-session="${item.id}">Hapus</button></td></tr>`).join("") : '<tr><td colspan="6"><div class="table-empty"><strong>Belum ada file sesi terapi</strong><span>Tambahkan foto Google Drive atau media lainnya.</span></div></td></tr>';
}

async function loadHomepageModules() {
  const [specialties, testimonials, therapySessions] = await Promise.all([api("specialties"), api("testimonials"), api("therapy-sessions")]);
  state.specialties = specialties.data;
  state.testimonials = testimonials.data;
  state.therapySessions = therapySessions.data;
  renderHomepageModules();
}

const aboutSectionLabels = { methods: "Metode fisioterapi", commitments: "Komitmen kami", therapists: "Fisioterapis kami", equipment: "Kelengkapan alat kami" };

function aboutItemFields(section, item = {}) {
  const titleLabel = section === "therapists" ? "Nama fisioterapis" : section === "equipment" ? "Nama alat / fasilitas" : "Judul";
  const selectedSource = item.media_type === "image" && String(item.media_url || "").startsWith("uploads/") ? "upload" : (item.media_type || "upload");
  const option = (value, label) => `<option value="${value}" ${selectedSource === value ? "selected" : ""}>${label}</option>`;
  return `<input type="hidden" name="section_key" value="${section}"><input type="hidden" name="current_media_url" value="${escapeHtml(item.media_url)}"><label class="wide">${titleLabel}<input name="title" maxlength="180" value="${escapeHtml(item.title)}" required></label><label>Subjudul / jabatan<input name="subtitle" maxlength="180" value="${escapeHtml(item.subtitle)}" placeholder="Opsional"></label><label class="wide">Deskripsi / kutipan<textarea name="description" rows="5">${escapeHtml(item.description)}</textarea></label>${section === "commitments" ? `<label class="wide">Keterangan penanggung jawab<input name="detail_text" maxlength="255" value="${escapeHtml(item.detail_text)}" placeholder="Contoh: Founder & Chief Physiotherapist"></label>` : '<input type="hidden" name="detail_text" value="">'}<label>Jenis media<select name="media_source">${option("upload", "Upload foto")}${option("image", "URL foto langsung")}${option("google_drive_image", "Foto Google Drive")}${option("google_drive_video", "Video Google Drive")}${option("youtube", "Video YouTube")}</select></label><label class="wide about-upload-field">Upload foto<input name="media_file" type="file" accept="image/jpeg,image/png,image/webp"><small>JPG, PNG, atau WebP, maksimal 5 MB.</small></label><label class="wide about-link-field">Link atau ID media<input name="media_input" value="${selectedSource === "upload" ? "" : escapeHtml(item.media_url)}" placeholder="Tempel link atau ID media"><small>Google Drive harus dapat diakses oleh siapa saja yang memiliki link.</small></label><label class="wide">Alt text<input name="alt_text" maxlength="255" value="${escapeHtml(item.alt_text)}" placeholder="Jelaskan isi foto atau video"></label><div class="wide about-media-preview" data-about-media-preview><span>Preview media akan tampil di sini.</span></div>${commonHomepageFields(item)}`;
}

function setupAboutMediaPreview(form) {
  const source = form.querySelector("[name=media_source]");
  const input = form.querySelector("[name=media_input]");
  const file = form.querySelector("[name=media_file]");
  const preview = form.querySelector("[data-about-media-preview]");
  const uploadField = form.querySelector(".about-upload-field");
  const linkField = form.querySelector(".about-link-field");
  const current = form.querySelector("[name=current_media_url]").value;
  const show = (kind, value) => renderMediaPreview(preview, kind, value);
  const update = () => {
    const isUpload = source.value === "upload";
    uploadField.hidden = !isUpload; linkField.hidden = isUpload;
    if (isUpload) show("image", file.files[0] ? URL.createObjectURL(file.files[0]) : current);
    else show(source.value, input.value.trim());
  };
  source.addEventListener("change", update); input.addEventListener("input", update); file.addEventListener("change", update); update();
}

function openAboutItemForm(section, item = null) {
  insertForm(formPanel("about-item-form", `${item ? "Edit" : "Tambah"} ${aboutSectionLabels[section]}`, aboutItemFields(section, item || {})), async form => {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    const source = data.media_source;
    const imageFile = formData.get("media_file");
    if (source === "upload") {
      data.media_type = "image";
      data.media_url = imageFile && imageFile.size ? await uploadFeaturedImage(imageFile) : data.current_media_url;
      if (!data.media_url) throw new Error("Pilih foto yang akan diupload.");
    } else if (source === "image") {
      data.media_type = "image";
      data.media_url = String(data.media_input || "").trim();
      if (!/^https?:\/\//.test(data.media_url)) throw new Error("Masukkan URL gambar langsung yang valid dan diawali http:// atau https://.");
    } else {
      data.media_type = source;
      const reference = parseMediaReference(source === "youtube" ? "youtube" : "google_drive", data.media_input);
      data.media_url = reference.id;
      if (!data.media_url) throw new Error(reference.error);
    }
    delete data.media_source; delete data.media_input; delete data.media_file; delete data.current_media_url;
    await api(`about-items${item ? `&id=${item.id}` : ""}`, { method: item ? "PUT" : "POST", body: JSON.stringify(data) });
    await loadAboutItems();
  });
  setupAboutMediaPreview(document.querySelector("#about-item-form"));
}

function renderAboutItems() {
  Object.keys(aboutSectionLabels).forEach(section => {
    const body = document.querySelector(`[data-about-group="${section}"] tbody`);
    const items = state.aboutItems.filter(item => item.section_key === section);
    body.innerHTML = items.length ? items.map(item => `<tr><td><strong>${escapeHtml(item.title)}</strong><small class="table-subtitle">${escapeHtml(item.description || "Tanpa deskripsi")}</small></td><td>${escapeHtml(item.media_type.replace(/_/g, " "))}</td><td>${Number(item.sort_order)}</td><td><span class="status ${String(item.is_active) === "1" ? "published" : "draft"}">${String(item.is_active) === "1" ? "Tampil" : "Disembunyikan"}</span></td><td class="row-actions"><button class="text-button" data-edit-about-item="${item.id}">Edit</button><button class="text-button delete-button" data-delete-about-item="${item.id}">Hapus</button></td></tr>`).join("") : `<tr><td colspan="5"><div class="table-empty"><strong>Belum ada ${aboutSectionLabels[section].toLowerCase()}</strong><span>Gunakan tombol tambah di atas.</span></div></td></tr>`;
  });
}

async function loadAboutItems() { state.aboutItems = (await api("about-items")).data; renderAboutItems(); }

function resourceFields(kind, item = {}) {
  return `<label>Nama / platform<input name="label" value="${escapeHtml(item.label)}" placeholder="Contoh: Instagram" required></label><label>Tipe<select name="link_type">${[["whatsapp","WhatsApp"],["phone","Telepon"],["email","Email"],["google_maps","Google Maps"],["social","Sosial media"],["custom","Link lainnya"]].map(([value,label]) => `<option value="${value}" ${item.link_type === value ? "selected" : ""}>${label}</option>`).join("")}</select></label><label>Teks yang tampil<input name="display_text" value="${escapeHtml(item.display_text)}" placeholder="Contoh: +62 812 3456 7890"><small>Teks yang dibaca pengunjung di website.</small></label><label>Penempatan<select name="placement"><option value="header,footer" ${(item.placement || "") === "header,footer" ? "selected" : ""}>Header dan footer</option><option value="contact,footer" ${(item.placement || "contact,footer") === "contact,footer" ? "selected" : ""}>Kontak dan footer</option><option value="footer" ${(item.placement || "") === "footer" ? "selected" : ""}>Footer saja</option><option value="contact" ${(item.placement || "") === "contact" ? "selected" : ""}>Halaman kontak</option></select></label><label class="wide">URL / tujuan<input name="url" value="${escapeHtml(item.url)}" required><small data-contact-url-help></small></label><label>Urutan<input name="sort_order" type="number" min="0" value="${Number(item.sort_order || 0)}"></label><label>Status<select name="is_active"><option value="1" ${String(item.is_active ?? 1) === "1" ? "selected" : ""}>Aktif</option><option value="0" ${String(item.is_active) === "0" ? "selected" : ""}>Disembunyikan</option></select></label>`;
}

function setupContactForm(form) {
  const type = form.querySelector("[name=link_type]");
  const url = form.querySelector("[name=url]");
  const display = form.querySelector("[name=display_text]");
  const help = form.querySelector("[data-contact-url-help]");
  const settings = {
    whatsapp: ["https://wa.me/62812...", "Gunakan link wa.me lengkap, termasuk pesan awal bila diperlukan."],
    phone: ["tel:+6281234567890", "Gunakan format tel:+62 agar dapat ditelepon langsung."],
    email: ["mailto:hello@domain.com", "Gunakan format mailto:alamat@email.com."],
    google_maps: ["https://maps.app.goo.gl/...", "Tempel link berbagi dari Google Maps."],
    social: ["https://instagram.com/namaakun", "Tempel link profil Instagram, Facebook, YouTube, atau TikTok."],
    custom: ["https://...", "Gunakan URL lengkap yang diawali https://."]
  };
  const update = () => { const current = settings[type.value]; url.placeholder = current[0]; help.textContent = current[1]; if (!display.value && type.value === "email") display.placeholder = "hello@domain.com"; };
  type.addEventListener("change", update); update();
}

function openResourceForm(kind, item = null) {
  insertForm(formPanel(`${kind}-form`, `${item ? "Edit" : "Tambah"} kontak atau sosial`, resourceFields(kind, item || {})), async form => {
    const data = Object.fromEntries(new FormData(form));
    await api(`${kind}${item ? `&id=${item.id}` : ""}`, { method: item ? "PUT" : "POST", body: JSON.stringify(data) });
    await loadResources();
  });
  setupContactForm(document.querySelector("#links-form"));
}

function businessContactValues() {
  const email = state.links.find(item => item.link_type === "email") || {};
  const phone = state.links.find(item => item.link_type === "phone") || state.links.find(item => item.link_type === "whatsapp") || {};
  const maps = state.links.find(item => item.link_type === "google_maps") || {};
  return {
    email: email.display_text || String(email.url || "").replace(/^mailto:/, ""),
    phone: phone.display_text || String(phone.url || "").replace(/^tel:/, ""),
    address: maps.display_text || "",
    maps_url: maps.url || ""
  };
}

function openBusinessContactForm() {
  const item = businessContactValues();
  const fields = `<label>Email klinik<input name="email" type="email" value="${escapeHtml(item.email)}" placeholder="hello@domain.com" required></label><label>Nomor HP<input name="phone" type="tel" value="${escapeHtml(item.phone)}" placeholder="+62 812 3456 7890" required><small>Boleh memakai format +62 atau 08.</small></label><label class="wide">Alamat klinik<input name="address" value="${escapeHtml(item.address)}" maxlength="255" placeholder="Alamat lengkap yang tampil kepada pengunjung" required></label><label class="wide">Link Google Maps<input name="maps_url" type="url" value="${escapeHtml(item.maps_url)}" placeholder="https://maps.app.goo.gl/..." required><small>Gunakan link berbagi Google Maps.</small></label>`;
  insertForm(formPanel("business-contact-form", "Kelola informasi klinik", fields), async form => {
    const data = Object.fromEntries(new FormData(form));
    const result = await api("business-contact", { method: "POST", body: JSON.stringify(data) });
    state.links = result.data;
    renderResources();
    renderBusinessContact();
  });
}

function renderBusinessContact() {
  const card = document.querySelector("#business-profile-card");
  if (!card) return;
  const item = businessContactValues();
  card.querySelector("h3").textContent = item.address || "Informasi klinik belum lengkap";
  card.querySelector(".muted").textContent = [item.phone, item.email].filter(Boolean).join(" · ") || "Lengkapi email, nomor HP, dan alamat klinik.";
}

function openGoogleReviewForm() {
  const item = state.googleReview || {};
  const fields = `<label>Mode<select name="mode"><option value="manual" ${item.mode !== "auto" ? "selected" : ""}>Manual</option><option value="auto" ${item.mode === "auto" ? "selected" : ""}>Otomatis dari Google</option></select></label><label data-place-id>Google Place ID<input name="place_id" value="${escapeHtml(item.place_id)}" placeholder="Contoh: ChIJ..."><small>Diperlukan untuk sinkronisasi Places API.</small></label><label>Rating manual<input name="rating" type="number" min="0" max="5" step="0.1" value="${Number(item.rating || 5)}" required></label><label>Jumlah ulasan manual<input name="review_count" type="number" min="0" value="${Number(item.review_count || 0)}" required></label><label class="wide">Link Google Maps<input name="maps_url" type="url" value="${escapeHtml(item.maps_url)}" placeholder="https://maps.app.goo.gl/..."></label><div class="wide api-status ${item.api_configured ? "ready" : "warning"}" data-api-status>${item.api_configured ? "API key Google Places sudah terhubung. Mode otomatis dapat digunakan." : "API key belum tersedia. Nilai manual akan tetap ditampilkan sebagai fallback."}</div>`;
  insertForm(formPanel("google-review-form", "Kelola Google Review", fields), async form => {
    const data = Object.fromEntries(new FormData(form));
    const result = await api("google-review", { method: "POST", body: JSON.stringify(data) });
    state.googleReview = result.data; renderGoogleReview();
  });
  const form = document.querySelector("#google-review-form");
  const mode = form.querySelector("[name=mode]");
  const update = () => { form.querySelector("[data-place-id]").hidden = mode.value !== "auto"; };
  mode.addEventListener("change", update); update();
}

async function refreshGoogleReview() {
  const button = document.querySelector("#refresh-google-review");
  button.disabled = true; button.textContent = "Menyinkronkan…";
  try { const result = await api("google-review-refresh", { method: "POST", body: "{}" }); state.googleReview = result.data; renderGoogleReview(); notify("Google Review berhasil disinkronkan."); }
  catch (error) { notify(error.message, "error"); }
  finally { button.disabled = false; button.textContent = "Sinkronkan"; }
}

function renderGoogleReview() {
  const item = state.googleReview; if (!item) return;
  const card = document.querySelector("#google-review-card");
  card.querySelector("h3").textContent = `${Number(item.rating).toFixed(1)} dari 5 · ${Number(item.review_count).toLocaleString("id-ID")} ulasan`;
  card.querySelector(".muted").textContent = item.mode === "auto" ? `Mode otomatis${item.last_synced_at ? ` · terakhir sinkron ${formatDate(item.last_synced_at)}` : " · belum pernah sinkron"}` : "Mode manual · dapat digunakan tanpa API key";
  const refresh = card.querySelector("#refresh-google-review");
  refresh.hidden = item.mode !== "auto"; refresh.disabled = !item.api_configured;
  refresh.title = item.api_configured ? "Ambil rating terbaru dari Google" : "API key Google Places belum dikonfigurasi";
}

const formatHour = value => String(value || "").slice(0, 5);

function openBusinessHoursForm() {
  const rows = state.businessHours.map(item => `<div class="hours-row" data-hours-row data-day-key="${escapeHtml(item.day_key)}"><strong>${escapeHtml(item.day_label)}</strong><label>Status<select name="status"><option value="open" ${String(item.is_closed) !== "1" ? "selected" : ""}>Buka</option><option value="closed" ${String(item.is_closed) === "1" ? "selected" : ""}>Tutup</option></select></label><label>Buka<input name="open_time" type="time" value="${escapeHtml(formatHour(item.open_time))}"></label><label>Tutup<input name="close_time" type="time" value="${escapeHtml(formatHour(item.close_time))}"></label><label class="hours-note">Catatan<input name="note" maxlength="120" value="${escapeHtml(item.note)}" placeholder="Opsional, contoh: Dengan janji"></label></div>`).join("");
  insertForm(formPanel("business-hours-form", "Kelola jam buka", `<div class="wide hours-editor"><div class="hours-editor-head"><strong>Jadwal mingguan</strong><span>Atur setiap hari. Hari tutup dapat diberi catatan khusus.</span></div>${rows}</div>`, "Simpan jadwal"), async form => {
    const days = [...form.querySelectorAll("[data-hours-row]")].map((row, index) => ({
      day_key: row.dataset.dayKey,
      day_label: state.businessHours[index].day_label,
      is_closed: row.querySelector('[name="status"]').value === "closed" ? 1 : 0,
      open_time: row.querySelector('[name="open_time"]').value,
      close_time: row.querySelector('[name="close_time"]').value,
      note: row.querySelector('[name="note"]').value
    }));
    const result = await api("business-hours", { method: "POST", body: JSON.stringify({ days }) });
    state.businessHours = result.data;
    renderBusinessHours();
  });
  const form = document.querySelector("#business-hours-form");
  form.querySelectorAll("[data-hours-row]").forEach(row => {
    const status = row.querySelector('[name="status"]');
    const update = () => row.querySelectorAll('input[type="time"]').forEach(input => { input.disabled = status.value === "closed"; });
    status.addEventListener("change", update);
    update();
  });
}

function renderBusinessHours() {
  const card = document.querySelector("#business-hours-card");
  if (!card || !state.businessHours.length) return;
  const openDays = state.businessHours.filter(item => String(item.is_closed) !== "1");
  const closedDays = state.businessHours.filter(item => String(item.is_closed) === "1");
  card.querySelector("h3").textContent = `${openDays.length} hari buka setiap minggu`;
  card.querySelector(".muted").textContent = closedDays.length ? `${closedDays.map(item => item.day_label).join(", ")} tutup${closedDays[0].note ? ` · ${closedDays[0].note}` : ""}` : "Buka setiap hari";
}

function renderResources() {
  const linkBody = document.querySelector("#contact-rows");
  if (linkBody) linkBody.innerHTML = state.links.length ? state.links.map(item => `<tr><td><strong>${escapeHtml(item.label)}</strong></td><td>${escapeHtml(item.link_type.replace(/_/g, " "))}</td><td>${escapeHtml(item.display_text || "-")}</td><td><a class="url-cell" href="${escapeHtml(item.url)}" target="_blank" rel="noopener">${escapeHtml(item.url)} ↗</a></td><td>${escapeHtml(item.placement)}</td><td><span class="status ${String(item.is_active) === "1" ? "published" : "draft"}">${String(item.is_active) === "1" ? "Aktif" : "Disembunyikan"}</span></td><td class="row-actions"><button class="text-button" data-edit-link="${item.id}">Edit</button><button class="text-button delete-button" data-delete-link="${item.id}">Hapus</button></td></tr>`).join("") : '<tr><td colspan="7"><div class="table-empty"><strong>Belum ada kontak</strong><span>Tambahkan WhatsApp, telepon, email, Maps, atau sosial media.</span></div></td></tr>';
  const summary = document.querySelector("#contact-summary");
  if (summary) summary.innerHTML = [["Kontak aktif", state.links.filter(item => String(item.is_active) === "1" && item.link_type !== "social").length],["Akun sosial", state.links.filter(item => String(item.is_active) === "1" && item.link_type === "social").length],["Disembunyikan", state.links.filter(item => String(item.is_active) === "0").length]].map(([label,total]) => `<article><span>${label}</span><strong>${total}</strong></article>`).join("");
}

async function loadResources() {
  const [links, googleReview, businessHours] = await Promise.all([api("links"), api("google-review"), api("business-hours")]);
  state.links = links.data; state.googleReview = googleReview.data; state.businessHours = businessHours.data; renderResources(); renderGoogleReview(); renderBusinessHours(); renderBusinessContact();
}

function userFields(item = {}) {
  return `<label>Nama<input name="name" value="${escapeHtml(item.name)}" required></label><label>Email<input name="email" type="email" value="${escapeHtml(item.email)}" required></label><label>Role<select name="role">${["admin","editor","analyst"].map(role => `<option value="${role}" ${item.role === role ? "selected" : ""}>${role}</option>`).join("")}</select></label><label>Status<select name="is_active"><option value="1" ${String(item.is_active ?? 1) === "1" ? "selected" : ""}>Aktif</option><option value="0" ${String(item.is_active) === "0" ? "selected" : ""}>Nonaktif</option></select></label><label class="wide">Kata sandi ${item.id ? "(kosongkan bila tidak diubah)" : ""}<input name="password" type="password" ${item.id ? "" : "required"} minlength="10" autocomplete="new-password"></label>`;
}

function openUserForm(item = null) {
  insertForm(formPanel("user-form", item ? "Edit pengguna" : "Tambah pengguna", userFields(item || {})), async form => {
    const data = Object.fromEntries(new FormData(form));
    await api(`users${item ? `&id=${item.id}` : ""}`, { method: item ? "PUT" : "POST", body: JSON.stringify(data) });
    await loadUsers();
  });
}

function renderUsers() {
  const body = document.querySelector("#users tbody");
  body.innerHTML = state.users.length ? state.users.map(item => `<tr><td><strong>${escapeHtml(item.name)}</strong></td><td>${escapeHtml(item.email)}</td><td><span class="role ${escapeHtml(item.role)}">${escapeHtml(item.role)}</span></td><td><span class="status ${String(item.is_active) === "1" ? "published" : "draft"}">${String(item.is_active) === "1" ? "Aktif" : "Nonaktif"}</span></td><td><button class="text-button" data-edit-user="${item.id}">Edit</button> <button class="text-button delete-button" data-delete-user="${item.id}">Hapus</button></td></tr>`).join("") : '<tr><td colspan="5">Belum ada pengguna.</td></tr>';
}

async function loadUsers() {
  if (state.user.role !== "admin") { document.querySelector('[data-view="users"]')?.remove(); document.querySelector("#users")?.remove(); delete titles.users; return; }
  state.users = (await api("users")).data; renderUsers();
}

function countEvent(name) { return Number((state.analytics?.counts || []).find(item => item.event_name === name)?.total || 0); }
function renderAnalytics() {
  if (!state.analytics) return;
  const values = [state.analytics.visitors, countEvent("page_view"), countEvent("whatsapp_click") + countEvent("maps_click") + countEvent("email_click"), countEvent("article_click")];
  const labels = ["Pengunjung unik", "Page view", "Klik kontak", "Klik artikel"];
  document.querySelectorAll("#analytics .metric-card").forEach((card, index) => { card.querySelector(".muted").textContent = labels[index]; card.querySelector("strong").textContent = Number(values[index] || 0).toLocaleString("id-ID"); card.querySelector("small").textContent = "30 hari terakhir"; });
  const list = document.querySelector("#analytics .rank-list");
  if (list) list.innerHTML = state.analytics.events.length ? state.analytics.events.slice(0, 8).map((item, index) => `<li><span class="rank">${String(index + 1).padStart(2, "0")}</span><div><strong>${escapeHtml(item.event_label || item.event_name)}</strong><small>${escapeHtml(item.page_path)}</small></div><b>${Number(item.total).toLocaleString("id-ID")}</b></li>`).join("") : '<li><span>Belum ada aktivitas pengunjung.</span></li>';
  const sourcePanel = document.querySelector("#analytics .content-grid .panel:last-child");
  if (sourcePanel) sourcePanel.innerHTML = `<div class="panel-heading"><div><h3>Status pengukuran</h3><p class="muted">Data langsung dari database</p></div></div><ul class="rank-list"><li><span class="rank">✓</span><div><strong>Page view</strong><small>Setiap halaman publik</small></div><b>${countEvent("page_view")}</b></li><li><span class="rank">✓</span><div><strong>Klik kontak</strong><small>WhatsApp, Maps, dan email</small></div><b>${values[2]}</b></li></ul>`;
  renderOverview();
}

function renderOverview() {
  const values = [state.analytics?.visitors || 0, countEvent("whatsapp_click"), countEvent("article_click"), countEvent("maps_click")];
  document.querySelectorAll("#overview .metric-card").forEach((card, index) => { card.querySelector("strong").textContent = Number(values[index] || 0).toLocaleString("id-ID"); card.querySelector("small").textContent = "30 hari terakhir"; });
  const daily = state.analytics?.daily || [];
  const chart = document.querySelector("#overview .chart-bars");
  if (chart) {
    const maximum = Math.max(1, ...daily.map(item => Number(item.total)));
    chart.innerHTML = daily.length ? daily.map(item => `<i title="${escapeHtml(item.day)}: ${item.total}" style="height:${Math.max(5, Math.round(Number(item.total) / maximum * 100))}%"></i>`).join("") : '<span class="muted">Belum ada page view dalam 30 hari terakhir.</span>';
  }
  const popular = document.querySelector("#overview .rank-list");
  if (popular) popular.innerHTML = (state.analytics?.events || []).slice(0, 4).map((item, index) => `<li><span class="rank">${String(index + 1).padStart(2, "0")}</span><div><strong>${escapeHtml(item.event_label || item.event_name)}</strong><small>${escapeHtml(item.page_path)}</small></div><b>${Number(item.total).toLocaleString("id-ID")}</b></li>`).join("") || '<li><span class="muted">Belum ada data interaksi.</span></li>';
  const body = document.querySelector("#overview table tbody");
  if (body) body.innerHTML = state.contents.slice(0, 5).map(item => `<tr><td><strong>${escapeHtml(item.title)}</strong></td><td>${escapeHtml(item.type)}</td><td><span class="status ${item.status}">${escapeHtml(item.status)}</span></td><td>${formatDate(item.updated_at)}</td></tr>`).join("") || '<tr><td colspan="4">Belum ada aktivitas content.</td></tr>';
}

async function loadAnalytics() { state.analytics = await api("analytics"); renderAnalytics(); }

document.addEventListener("click", async event => {
  const nav = event.target.closest("[data-view], [data-view-target]");
  if (nav) showView(nav.dataset.view || nav.dataset.viewTarget);
  const newAbout = event.target.closest("[data-new-about]");
  if (newAbout) { openAboutItemForm(newAbout.dataset.newAbout); return; }
  const mappings = [
    ["edit-content", state.contents, openContentForm], ["edit-service", state.contents, openServiceForm], ["edit-faq", state.faqs, openFaqForm], ["edit-price", state.pricing, openPricingForm], ["edit-specialty", state.specialties, item => openHomepageForm("specialties", item)], ["edit-testimonial", state.testimonials, item => openHomepageForm("testimonials", item)], ["edit-therapy-session", state.therapySessions, item => openHomepageForm("therapy-sessions", item)], ["edit-about-item", state.aboutItems, item => openAboutItemForm(item.section_key, item)], ["edit-link", state.links, item => openResourceForm("links", item)], ["edit-user", state.users, openUserForm]
  ];
  for (const [key, collection, handler] of mappings) {
    const button = event.target.closest(`[data-${key}]`);
    if (button) {
      const id = button.getAttribute(`data-${key}`);
      const item = collection.find(entry => String(entry.id) === id);
      if (!item) { notify("Data yang akan diedit tidak ditemukan. Muat ulang dashboard.", "error"); return; }
      handler(item);
      return;
    }
  }
  const deletes = [["content","contents",loadContents],["service","contents",loadContents],["faq","faqs",loadFaqs],["price","pricing",loadPricing],["specialty","specialties",loadHomepageModules],["testimonial","testimonials",loadHomepageModules],["therapy-session","therapy-sessions",loadHomepageModules],["about-item","about-items",loadAboutItems],["link","links",loadResources],["user","users",loadUsers]];
  for (const [key, action, reload] of deletes) {
    const button = event.target.closest(`[data-delete-${key}]`);
    if (button) {
      const row = button.closest("tr, article");
      const label = row?.querySelector("strong, h3")?.textContent?.trim() || key;
      if (!await confirmDelete(label)) return;
      try { await api(`${action}&id=${button.getAttribute(`data-delete-${key}`)}`, { method: "DELETE" }); await reload(); notify(`${label} berhasil dihapus.`, "success"); }
      catch (error) { notify(error.message, "error"); }
    }
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && document.querySelector(".dashboard-modal-backdrop")) closeModal();
});

async function init() {
  try {
    const session = await api("session"); state.user = session.user; state.csrf = session.csrf;
  } catch (error) { notify(error.message || "Dashboard tidak dapat terhubung ke server.", "error"); return; }
  if (state.user.role === "analyst") document.body.classList.add("read-only");
  document.querySelector(".avatar").textContent = state.user.name.split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase();
  document.querySelector(".account-name").textContent = state.user.name;
  document.querySelectorAll(".account .avatar").forEach(element => { element.textContent = state.user.name.split(/\s+/).map(part => part[0]).join("").slice(0, 2).toUpperCase(); });
  document.querySelector("[data-account-name]").textContent = state.user.name;
  document.querySelector("[data-account-email]").textContent = state.user.email;
  document.querySelector("[data-account-role]").textContent = state.user.role;
  prepareDashboardUX();
  setupSidebarGroups();
  document.body.insertAdjacentHTML("beforeend", '<button type="button" class="sidebar-backdrop" id="sidebar-backdrop" aria-label="Tutup menu dashboard" hidden></button>');
  const menuToggle = document.querySelector("#menu-toggle");
  menuToggle.addEventListener("click", () => setSidebarOpen(menuToggle.getAttribute("aria-expanded") !== "true"));
  document.querySelector("#sidebar-backdrop").addEventListener("click", () => setSidebarOpen(false));
  const accountToggle = document.querySelector("#account-menu-toggle");
  const accountMenu = document.querySelector("#account-menu");
  const websiteLink = accountMenu.querySelector('a[href="../index.html"]');
  websiteLink.insertAdjacentHTML("afterend", '<button type="button" class="settings-menu-button" id="settings-menu-button"><span>⚙</span> Pengaturan & panduan</button>');
  const closeAccountMenu = () => { accountMenu.hidden = true; accountToggle.setAttribute("aria-expanded", "false"); };
  accountToggle.addEventListener("click", event => { event.stopPropagation(); const open = accountMenu.hidden; accountMenu.hidden = !open; accountToggle.setAttribute("aria-expanded", String(open)); });
  accountMenu.addEventListener("click", event => event.stopPropagation());
  document.querySelector("#settings-menu-button").addEventListener("click", () => { showView("settings"); closeAccountMenu(); });
  document.addEventListener("click", closeAccountMenu);
  document.addEventListener("keydown", event => { if (event.key === "Escape") { closeAccountMenu(); setSidebarOpen(false); } });
  document.querySelectorAll("[data-logout]").forEach(button => button.addEventListener("click", async () => { button.disabled = true; button.textContent = "Keluar…"; try { await api("logout", { method: "POST" }); } finally { location.replace("login.html"); } }));
  document.querySelector("#new-content").addEventListener("click", () => openContentForm());
  document.querySelector("#new-service").addEventListener("click", () => openServiceForm());
  document.querySelector("#new-faq").addEventListener("click", () => openFaqForm());
  document.querySelector("#new-price").addEventListener("click", () => openPricingForm());
  document.querySelector("#new-specialty").addEventListener("click", () => openHomepageForm("specialties"));
  document.querySelector("#new-testimonial").addEventListener("click", () => openHomepageForm("testimonials"));
  document.querySelector("#new-therapy-session").addEventListener("click", () => openHomepageForm("therapy-sessions"));
  document.querySelector("#new-link")?.addEventListener("click", () => openResourceForm("links"));
  document.querySelector("#users .button.primary").addEventListener("click", () => openUserForm());
  document.querySelector("#content .toolbar input").addEventListener("input", renderContents);
  document.querySelectorAll("#content .toolbar select").forEach(select => select.addEventListener("change", renderContents));
  document.querySelector("#faqs .faq-toolbar input").addEventListener("input", renderFaqs);
  document.querySelectorAll("#faqs .faq-toolbar select").forEach(select => select.addEventListener("change", renderFaqs));
  document.querySelector("#pricing .pricing-toolbar input").addEventListener("input", renderPricing);
  document.querySelectorAll("#pricing .pricing-toolbar select").forEach(select => select.addEventListener("change", renderPricing));
  await Promise.all([loadContents(), loadFaqs(), loadPricing(), loadHomepageModules(), loadAboutItems(), loadResources(), loadAnalytics(), loadUsers()]);
  showView(location.hash.slice(1) || "overview");
}

document.querySelectorAll(".metric-card strong").forEach(element => { element.textContent = "—"; });
document.querySelectorAll(".metric-card small").forEach(element => { element.textContent = "Memuat data…"; });
document.querySelectorAll(".rank-list").forEach(list => { list.innerHTML = '<li><span class="muted">Memuat data…</span></li>'; });
document.querySelector("#overview .chart-bars").innerHTML = '<span class="muted">Memuat kunjungan…</span>';
document.querySelector("#content-rows").innerHTML = '<tr><td colspan="6">Memuat data…</td></tr>';
document.querySelector("#faq-rows").innerHTML = '<tr><td colspan="6">Memuat FAQ…</td></tr>';
document.querySelector("#pricing-rows").innerHTML = '<tr><td colspan="6">Memuat harga…</td></tr>';
document.querySelector("#specialty-rows").innerHTML = '<tr><td colspan="6">Memuat spesialisasi…</td></tr>';
document.querySelector("#testimonial-rows").innerHTML = '<tr><td colspan="6">Memuat testimoni…</td></tr>';
document.querySelector("#therapy-session-rows").innerHTML = '<tr><td colspan="6">Memuat sesi terapi…</td></tr>';
document.querySelector("#users tbody").innerHTML = '<tr><td colspan="5">Memuat data…</td></tr>';
init();
