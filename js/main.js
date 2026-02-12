/* ================= REVEAL ANIMATIONS ================= */

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* ================= LANGUAGE TOGGLE ================= */

const langBtn = document.getElementById("langToggle");

langBtn.addEventListener("click", () => {
  const nextLang = currentLang === "ar" ? "en" : "ar";
  langBtn.setAttribute("aria-pressed", nextLang === "ar");
  setLanguage(nextLang);
});

/* ================= PARALLAX (DESKTOP ONLY) ================= */

const isMobile = window.matchMedia("(max-width: 900px)").matches;
let ticking = false;

if (!isMobile) {
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        document.querySelectorAll(".parallax").forEach(el => {
          el.style.transform = `translateY(${window.scrollY * 0.1}px)`;
        });
        ticking = false;
      });
      ticking = true;
    }
  });
} else {
  document.querySelectorAll(".parallax").forEach(el => {
    el.style.transform = "none";
  });
}

/* ================= VIDEO LOGIC ================= */

let activeVideo = null;

document.querySelectorAll(".video-card").forEach(card => {
  const src = card.dataset.video;
  if (!src) return;

  const video = document.createElement("video");
  video.muted = false;
  video.playsInline = true;
  video.preload = "none";
  video.setAttribute("muted", "");
  video.disablePictureInPicture = true;
  video.controls = false;

  const source = document.createElement("source");
  source.src = src;
  source.type = "video/mp4";

  video.appendChild(source);
  card.appendChild(video);

  const playVideo = () => {
    if (activeVideo && activeVideo !== video) {
      activeVideo.pause();
      activeVideo.currentTime = 0;
    }
    activeVideo = video;
    video.play().catch(() => {});
  };

  const toggleVideo = () => {
    if (video.paused) {
      playVideo();
    } else {
      video.pause();
    }
  };

  if (!isMobile) {
    card.addEventListener("mouseenter", playVideo);
    card.addEventListener("mouseleave", () => {
      if (activeVideo === video) video.pause();
    });
  }

  card.addEventListener("click", e => {
    e.preventDefault();
    toggleVideo();
  });

  video.addEventListener("ended", () => {
    video.currentTime = 0;
    if (activeVideo === video) activeVideo = null;
  });
});
/* ================= INTRO LOGIC ================= */

const introOverlay = document.getElementById("intro-overlay");
const introVideo = document.getElementById("intro-video");

if (!sessionStorage.getItem("introPlayed")) {

  document.body.classList.add("intro-lock");

  introVideo.play().catch(() => {});

  introVideo.addEventListener("ended", () => {
    introOverlay.classList.add("fade-out");

    setTimeout(() => {
      introOverlay.remove();
      document.body.classList.remove("intro-lock");
    }, 1000);

    sessionStorage.setItem("introPlayed", "true");
  });

} else {
  if (introOverlay) {
    introOverlay.remove();
  }
}
