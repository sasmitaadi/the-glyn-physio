const form = document.querySelector("#login-form");
const errorBox = document.querySelector("#login-error");
const statusBox = document.querySelector("#login-status");
const passwordInput = form.elements.password;
const passwordToggle = document.querySelector(".password-toggle");
fetch("../api.php?action=session", { headers: { Accept: "application/json" } }).then(response => { if (response.ok) location.replace("index.html"); }).catch(() => {});
passwordToggle.addEventListener("click", () => {
  const visible = passwordInput.type === "text";
  passwordInput.type = visible ? "password" : "text";
  passwordToggle.textContent = visible ? "Lihat" : "Sembunyikan";
  passwordToggle.setAttribute("aria-label", visible ? "Tampilkan kata sandi" : "Sembunyikan kata sandi");
  passwordToggle.setAttribute("aria-pressed", String(!visible));
  passwordInput.focus();
});
form.addEventListener("submit", async event => {
  event.preventDefault();
  const button = form.querySelector("button[type=submit]");
  const originalLabel = button.textContent;
  button.disabled = true;
  button.textContent = "Memeriksa akun…";
  form.setAttribute("aria-busy", "true");
  errorBox.hidden = true;
  statusBox.textContent = "Sedang menghubungkan ke dashboard.";
  try {
    const response = await fetch("../api.php?action=login", { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(Object.fromEntries(new FormData(form))) });
    const payload = await response.json().catch(() => ({ ok: false, error: "Respons server tidak valid." }));
    if (!response.ok || !payload.ok) throw new Error(payload.error || "Tidak dapat masuk.");
    statusBox.textContent = "Berhasil. Membuka dashboard…";
    location.replace("index.html");
  } catch (error) {
    errorBox.textContent = error.message || "Dashboard tidak dapat terhubung ke server.";
    errorBox.hidden = false;
    statusBox.textContent = "";
    button.disabled = false;
    button.textContent = originalLabel;
    form.removeAttribute("aria-busy");
    passwordInput.focus();
  }
});
