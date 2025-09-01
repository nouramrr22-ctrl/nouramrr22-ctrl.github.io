// Slideshow with autoplay, arrows, dots.
// FILENAMES match your current /img folder exactly (4 images).

document.addEventListener("DOMContentLoaded", () => {
  // ---- Set your exact file names here ----
  const FILENAMES = [
    "slide1.jpg.png",
    "slide2.jpg.png",
    "slide3.jpg.jpg",
    "slide4.jpg.png"
  ];

  const ALTS = [
    "Product 1",
    "Product 2",
    "Product 3",
    "Product 4"
  ];

  // Build slides & dots from arrays
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
    container.insertBefore(slide, container.querySelector(".hero-overlay"));
  });

  FILENAMES.forEach(() => {
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

  function goNext() { index = (index + 1) % slides.length; show(index); }
  function goPrev() { index = (index - 1 + slides.length) % slides.length; show(index); }

  function start() { stop(); timer = setInterval(goNext, DURATION); }
  function stop()  { if (timer) clearInterval(timer); timer = null; }

  // init
  show(index);
  start();

  // controls
  next.addEventListener("click", () => { stop(); goNext(); start(); });
  prev.addEventListener("click", () => { stop(); goPrev(); start(); });
  dots.forEach((dot, i) => dot.addEventListener("click", () => { stop(); index = i; show(index); start(); }));

  // UX: pause on hover & when tab hidden
  container.addEventListener("mouseenter", stop);
  container.addEventListener("mouseleave", start);
  document.addEventListener("visibilitychange", () => document.hidden ? stop() : start());
});
