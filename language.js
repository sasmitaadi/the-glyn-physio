(function () {
  const translations = {
    "Tentang kami": "About us",
    "Layanan": "Services",
    "Klinik kami": "Our clinics",
    "Artikel": "Articles",
    "Buat janji": "Book an appointment",
    "Buat janji via WhatsApp": "Book via WhatsApp",
    "Fisioterapi berbasis bukti": "Evidence-based physiotherapy",
    "Bergerak lebih baik,": "Move better,",
    "hidup lebih berarti.": "live more fully.",
    "Perawatan fisioterapi yang personal, hangat, dan terarah untuk membantu Anda kembali percaya diri dalam setiap gerakan.": "Personal, compassionate, and purposeful physiotherapy to help you move with confidence again.",
    "Konsultasi sekarang": "Book a consultation",
    "Lihat layanan": "Explore services",
    "Dipercaya oleh pasien dan keluarga": "Trusted by patients and families",
    "Tentang The Glyn Physio": "About The Glyn Physio",
    "Bukan sekadar mengurangi nyeri.": "More than pain relief.",
    "Layanan kami": "Our services",
    "Dukungan untuk setiap langkah.": "Support for every step.",
    "Mengapa memilih kami": "Why choose us",
    "Perawatan yang terasa manusiawi.": "Care that feels human.",
    "Siap bergerak?": "Ready to move?",
    "Mulai perjalanan pulih Anda hari ini.": "Start your recovery journey today.",
    "Hubungi kami via WhatsApp →": "Contact us on WhatsApp →",
    "Trust in expert care.": "Trust in expert care.",
    "Layanan fisioterapi": "Physiotherapy service",
    "Pendekatan kami": "Our approach",
    "Semua layanan": "All services",
    "Konsultasi sekarang →": "Book a consultation →",
    "Insight kesehatan": "Health insights",
    "Kembali ke artikel": "Back to articles",
    "Diskusikan kebutuhan Anda →": "Discuss your needs →",
    "The Glyn Physio": "The Glyn Physio",
    "Senin - Sabtu, 08.00 - 20.00": "Monday - Saturday, 08:00 - 20:00",
    "Jakarta & sekitarnya · hello@theglynphysio.com": "Jakarta and surroundings · hello@theglynphysio.com",
    "Tanyakan jadwal →": "Ask about availability →",
    "Temukan lokasi yang dekat dengan Anda.": "Find a location near you.",
    "Klinik kami": "Our clinics",
    "Ruang belajar untuk tubuh yang lebih aktif.": "A learning space for a more active body.",
    "Layanan yang mendukung gerak Anda.": "Services that support your movement.",
    "Pendampingan fisioterapi yang personal untuk membantu Anda bergerak lebih nyaman dan percaya diri.": "Personal physiotherapy support to help you move more comfortably and confidently.",
    "Baca selengkapnya →": "Read more →",
    "Fisioterapi lansia": "Geriatric physiotherapy",
    "Pemulihan pasca operasi": "Post-operative rehabilitation",
    "Pemulihan cedera olahraga": "Sports injury rehabilitation",
    "Kesehatan gerak umum": "General movement health",
    "Menjaga mobilitas, kekuatan, dan keseimbangan agar tetap mandiri dalam aktivitas sehari-hari.": "Maintain mobility, strength, and balance to stay independent in everyday life.",
    "Pendampingan terarah setelah tindakan medis agar Anda dapat kembali bergerak dengan aman.": "Purposeful support after a medical procedure so you can move safely again.",
    "Solusi personal untuk keluhan nyeri, kaku, dan keterbatasan gerak sehari-hari.": "Personal solutions for everyday pain, stiffness, and movement limitations.",
    "Program bertahap untuk kebutuhan usia lanjut, termasuk latihan keseimbangan, penguatan, dan edukasi keluarga.": "A progressive programme for older adults, including balance, strengthening, and family education.",
    "Evaluasi berkala dan latihan progresif membantu memulihkan rentang gerak, kekuatan, dan kepercayaan diri.": "Regular reviews and progressive exercise help restore range of motion, strength, and confidence.",
    "Kami membantu Anda memahami beban latihan, membangun kapasitas tubuh, dan kembali ke aktivitas pilihan.": "We help you understand training load, build capacity, and return to the activities you enjoy.",
    "Setiap program dimulai dari pemeriksaan menyeluruh dan tujuan yang disepakati bersama.": "Every programme starts with a thorough assessment and goals agreed together.",
    "Paket fisioterapi custom": "Custom physiotherapy package",
    "Kelengkapan alat kami": "Our equipment",
    "Perawatan yang tersedia": "Available treatment",
    "Pendekatan kami": "Our approach",
    "Fisioterapis lansia": "Geriatric physiotherapy",
    "Kembali berolahraga dengan aman melalui program pemulihan dan pencegahan cedera.": "Return to sport safely with a rehabilitation and injury prevention programme.",
    "Memahami nyeri punggung dan cara mengelolanya": "Understanding back pain and how to manage it",
    "Mengenal cedera lutut saat beraktivitas": "Understanding knee injuries during activity",
    "Latihan keseimbangan untuk aktivitas harian": "Balance exercises for everyday activities",
    "Panduan umum pemulihan setelah operasi": "A practical guide to post-operative recovery",
    "Kembali berolahraga setelah cedera": "Returning to sport after injury",
    "Postur kerja dan kebiasaan bergerak": "Work posture and movement habits",
    "Mengatasi keterbatasan gerak bahu": "Managing limited shoulder movement",
    "Menjaga kesehatan kaki dan pergelangan": "Keeping your feet and ankles healthy",
    "Membangun rutinitas latihan di rumah": "Building a home exercise routine",
    "Apa yang perlu disiapkan sebelum konsultasi?": "What should you prepare before a consultation?",
  };
  const reverse = Object.fromEntries(Object.entries(translations).map(([id, en]) => [en, id]));

  function replaceText(lang) {
    const map = lang === "en" ? translations : reverse;
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => {
      const value = node.nodeValue.trim();
      if (map[value]) node.nodeValue = node.nodeValue.replace(value, map[value]);
    });
    document.documentElement.lang = lang === "en" ? "en" : "id";
  }

  function setup() {
    const current = localStorage.getItem("glyn-language") || "en";
    const button = document.createElement("button");
    button.type = "button";
    button.className = "language-toggle rounded-full border border-ink/20 px-3 py-2 text-xs font-bold";
    button.textContent = current === "en" ? "ID" : "EN";
    button.setAttribute("aria-label", "Switch language");
    button.addEventListener("click", () => {
      const next = localStorage.getItem("glyn-language") === "en" ? "id" : "en";
      localStorage.setItem("glyn-language", next);
      location.reload();
    });
    const nav = document.querySelector("header nav");
    if (nav) nav.appendChild(button);
    replaceText(current);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", setup);
  else setup();
})();
