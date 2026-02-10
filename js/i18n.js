const translations = {
  ar: {
    "hero.title": "أنا أحرر <span class='text-[var(--red)]'>الانتباه</span>",
    "hero.subtitle": "مونتاج سينمائي عالي التأثير لعلامات تجارية وصناع محتوى لا يقبلون أن يتم تخطيهم.",
    "hero.scroll": "مرر للأسفل للتجربة",

    "work.title": "مختارات <span class='text-[var(--red)]'>الأعمال</span>",

    "why.title": "لماذا <span class='text-[var(--red)]'>ONYX</span>",
    "why.text": "قص سريع. حركة نظيفة. لا ثانية مهدورة. أصمم المونتاج ليُشاهد — لا ليُتخطى.",

    "pricing.title": "<span class='text-[var(--red)]'>الأسعار</span>",

    "pricing.basic.title": "فيديو تقليدي",
    "pricing.basic.line1": "• فيديو واحد",
    "pricing.basic.line2": "• بقياس ريل إنستغرام",
    "pricing.basic.line3": "• مع كتابة",
    "pricing.basic.price": "350 ل.س",

    "pricing.advanced.title": "فيديو متقدم",
    "pricing.advanced.line1": "• فيديو واحد",
    "pricing.advanced.line2": "• بقياس ريل إنستغرام",
    "pricing.advanced.line3": "• كتابة + تعديل",
    "pricing.advanced.line4": "• حركة وانتقالات",
    "pricing.advanced.price": "550 ل.س",

    "pricing.pro.title": "فيديو احترافي",
    "pricing.pro.line1": "• فكرة أو شرح",
    "pricing.pro.line2": "• أكثر من 30 ثانية",
    "pricing.pro.line3": "• عرضي أو مربع",
    "pricing.pro.price": "1500 – 2000 ل.س",

    "pricing.monthly.title": "اشتراك شهري",
    "pricing.monthly.line1": "• 15 فيديو متقدم",
    "pricing.monthly.line2": "+ 10 فيديو تقليدي",
    "pricing.monthly.line3": "• حسب الطلب",
    "pricing.monthly.line4": "• أولوية تنفيذ",
    "pricing.monthly.price": "9000 ل.س",

    "cta.title": "جاهز لصناعة شيء <span class='text-[var(--red)]'>جميل؟</span>",
    "cta.whatsapp": "تواصل عبر واتساب",
    "cta.instagram": "تابعني على انستغرام"
  },

  en: {
    "hero.title": "I EDIT <span class='text-[var(--red)]'>ATTENTION</span>",
    "hero.subtitle": "High-impact cinematic editing for brands & creators.",
    "hero.scroll": "Scroll down to experience",

    "work.title": "Selected <span class='text-[var(--red)]'>Work</span>",

    "why.title": "Why <span class='text-[var(--red)]'>ONYX</span>",
    "why.text": "Fast cuts. Clean motion. Zero wasted seconds. I design edits to be watched — not skipped.",

    "pricing.title": "<span class='text-[var(--red)]'>Pricing</span>",

    "pricing.basic.title": "Basic Video",
    "pricing.basic.line1": "• One video",
    "pricing.basic.line2": "• Instagram Reel size",
    "pricing.basic.line3": "• Text included",
    "pricing.basic.price": "350 SYP",

    "pricing.advanced.title": "Advanced Video",
    "pricing.advanced.line1": "• One video",
    "pricing.advanced.line2": "• Instagram Reel size",
    "pricing.advanced.line3": "• Text + editing",
    "pricing.advanced.line4": "• Motion & transitions",
    "pricing.advanced.price": "550 SYP",

    "pricing.pro.title": "Professional Video",
    "pricing.pro.line1": "• Concept or tutorial",
    "pricing.pro.line2": "• Over 30 seconds",
    "pricing.pro.line3": "• Horizontal or square",
    "pricing.pro.price": "1500 – 2000 SYP",

    "pricing.monthly.title": "Monthly Package",
    "pricing.monthly.line1": "• 15 advanced videos",
    "pricing.monthly.line2": "+ 10 basic videos",
    "pricing.monthly.line3": "• On request",
    "pricing.monthly.line4": "• Priority delivery",
    "pricing.monthly.price": "9000 SYP",

    "cta.title": "Ready to create something <span class='text-[var(--red)]'>Sharp?</span>",
    "cta.whatsapp": "Contact via WhatsApp",
    "cta.instagram": "Follow on Instagram"
  }
};

let currentLang = "ar";

function animatePrice(el, newText) {
  el.classList.add("price-fade-out");

  setTimeout(() => {
    el.innerHTML = newText;
    el.classList.remove("price-fade-out");
    el.classList.add("price-fade-in");

    setTimeout(() => {
      el.classList.remove("price-fade-in");
    }, 300);
  }, 200);
}

function setLanguage(lang) {
  currentLang = lang;
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;

    if (key.includes("price")) {
      animatePrice(el, translations[lang][key]);
    } else {
      el.innerHTML = translations[lang][key];
    }
  });
}

setLanguage(currentLang);

document.getElementById("langToggle").addEventListener("click", () => {
  setLanguage(currentLang === "ar" ? "en" : "ar");
});
