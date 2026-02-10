/* ================= REVEAL ANIMATIONS ================= */

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      entry.target.classList.toggle("active", entry.isIntersecting);
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

/* ================= LANGUAGE TOGGLE ================= */

const langBtn = document.getElementById("langToggle");

langBtn.addEventListener("click", () => {
  const newLang = currentLang === "ar" ? "en" : "ar";
  langBtn.setAttribute("aria-pressed", newLang === "ar");
  setLanguage(newLang);
});

/* ================= PARALLAX (DESKTOP ONLY) ================= */

/*
  🔒 CRITICAL FIX:
  - Disable parallax entirely on mobile
  - This is what caused videos to float over sections
*/

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
  /* Hard reset transforms on mobile */
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
      video.pause(); // no reset
    }
  };

  /* Desktop hover */
  if (!isMobile) {
    card.addEventListener("mouseenter", playVideo);
    card.addEventListener("mouseleave", () => {
      if (activeVideo === video) {
        video.pause();
      }
    });
  }

  /* Mobile tap */
  card.addEventListener("click", e => {
    e.preventDefault();
    toggleVideo();
  });

  /* Reset when finished */
  video.addEventListener("ended", () => {
    video.currentTime = 0;
    if (activeVideo === video) activeVideo = null;
  });
});
