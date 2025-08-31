// Gemüse Egypt - Slideshow with autoplay, arrows, dots.
// How to change images: edit FILENAMES below to match files in /img.
// If some are .png, write 'slide1.png', etc.

document.addEventListener("DOMContentLoaded", () => {
  // ==== 1) Configure your images here (file names only) ====
  const FILENAMES = [
    "slide1.jpg",
    "slide2.jpg",
    "slide3.jpg",
    "slide4.jpg",
    "slide5.jpg",
    "slide6.jpg"
  ];

  // Optional: alt texts (same order as images)
  const ALTS = [
    "Fresh Red Onions",
    "Juicy Oranges",
    "Premium Spring Onions",
    "Bright Yellow Lemons",
    "High Quality Sweet Potatoes",
    "Fresh Green Beans Export"
  ];

  // ==== 2) Build slides & dots from the arrays ====
  const container = document.querySelector(".slideshow-container");
  const dotsContainer = document.querySelector(".dots-container");

  if (!container || !dotsContainer || !FILENAMES.length) return;

  FILENAMES.forEach((name, i) => {
    const slide = document.createElement("div");
    slide.className = "slide fade";
    const img = document.createElement("img");
    img.src = `img/${name}`;
    img.alt = ALTS[i] || `Slide ${i+1}`;
    slide.appendChild(img);
    container.insertBefore(slide, container.querySelector(".hero-overlay")); // insert before overlay so overlay stays on top
  });

  FILENAMES.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot";
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
    slides.forEach((s, idx) => s.style.display = idx === i ? "block" : "none");
    dots.forEach((d, idx) => d.classList.toggle("active-dot", idx === i));
  }

  function goNext() {
    index = (index + 1) % slides.length;
    show(index);
  }

  function goPrev() {
    index = (index - 1 + slides.length) % slides.length;
    show(index);
  }

  // autoplay controls
  function start() { stop(); timer = setInterval(goNext, DURATION); }
  function stop() { if (timer) clearInterval(timer); timer = null; }

  // init
  show(index);
  start();

  // arrows
  next.addEventListener("click", () => { stop(); goNext(); start(); });
  prev.addEventListener("click", () => { stop(); goPrev(); start(); });

  // dots
  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => { stop(); index = i; show(index); start(); });
  });

  // pause on hover
  container.addEventListener("mouseenter", stop);
  container.addEventListener("mouseleave", start);

  // pause when tab hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop(); else start();
  });
});
