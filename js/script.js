// Homepage slideshow + nav active state
document.addEventListener("DOMContentLoaded", () => {
  // EXACT filenames currently in /img (case/extension sensitive)
  const FILENAMES = [
    "slide1.jpg.png",
    "slide2.jpg.png",
    "slide3.jpg.png",
    "slide4.jpg.png"
  ];
  const ALTS = [
    "Fresh Sweet Potatoes ready for export",
    "Premium Egyptian Onions",
    "High-quality Spring Onions",
    "Fresh Citrus for German Market"
  ];

  // Highlight active nav link
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".menu a").forEach(a => {
    if (a.getAttribute("href") === here) {
      a.classList.add("active");
      a.setAttribute("aria-current", "page");
    }
  });

  // Build slideshow
  const container = document.querySelector(".slideshow-container");
  const dotsContainer = document.querySelector(".dots-container");
  if (!container || !dotsContainer) return;

  // Inject slides
  FILENAMES.forEach((name, i) => {
    const slide = document.createElement("div");
    slide.className = "slide";
    const img = document.createElement("img");
    img.src = `img/${name}`;
    img.alt = ALTS[i] || `Slide ${i + 1}`;
    img.loading = "lazy";
    slide.appendChild(img);
    container.insertBefore(slide, container.querySelector(".hero-overlay"));
  });

  // Inject dots
  FILENAMES.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
    dot.setAttribute("role", "button");
    dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
    dotsContainer.appendChild(dot);
  });

  const slides = Array.from(document.querySelectorAll(".slide"));
  const dots = Array.from(document.querySelectorAll(".dot"));
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  let index = 0;
  const DURATION = 4000;
  let timer;

  function show(i) {
    slides.forEach((s, idx) => {
      s.style.display = idx === i ? "block" : "none";
      if (idx === i) s.classList.add("fade"); else s.classList.remove("fade");
    });
    dots.forEach((d, idx) => d.classList.toggle("active-dot", idx === i));
  }

  function goNext() { index = (index + 1) % slides.length; show(index); }
  function goPrev() { index = (index - 1 + slides.length) % slides.length; show(index); }

  function start() { stop(); timer = setInterval(goNext, DURATION); }
  function stop()  { if (timer) clearInterval(timer); timer = null; }

  // Init
  show(index);
  start();

  // Controls
  next.addEventListener("click", () => { stop(); goNext(); start(); });
  prev.addEventListener("click", () => { stop(); goPrev(); start(); });
  dots.forEach((dot, i) => dot.addEventListener("click", () => { stop(); index = i; show(index); start(); }));

  // Pause on hover & when tab hidden
  container.addEventListener("mouseenter", stop);
  container.addEventListener("mouseleave", start);
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
});
