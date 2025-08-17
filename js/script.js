// Gemüse Egypt - Simple Slideshow
// Shows one .slide at a time, auto-advances every 4s,
// pauses on hover, and pauses when the tab is hidden.

document.addEventListener("DOMContentLoaded", () => {
  const slides = Array.from(document.querySelectorAll(".slide"));
  if (!slides.length) return; // no slides found; nothing to do

  let index = 0;
  const DURATION = 4000; // ms

  // show slide by index
  function show(i) {
    slides.forEach((s, idx) => {
      s.style.display = idx === i ? "block" : "none";
    });
  }

  // next slide
  function next() {
    index = (index + 1) % slides.length;
    show(index);
  }

  // initial state
  show(index);

  // autoplay
  let timer = setInterval(next, DURATION);

  // pause on hover over slideshow area
  const container = document.querySelector(".slideshow-container");
  if (container) {
    container.addEventListener("mouseenter", () => {
      clearInterval(timer);
      timer = null;
    });
    container.addEventListener("mouseleave", () => {
      if (!timer) timer = setInterval(next, DURATION);
    });
  }

  // pause when tab is hidden, resume when visible
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    } else {
      if (!timer) timer = setInterval(next, DURATION);
    }
  });
});
