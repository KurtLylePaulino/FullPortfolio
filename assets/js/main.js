/* shared interactions: nav state, scroll reveals, hero particle field */
(function () {
  "use strict";

  // --- nav scrolled state ---
  const nav = document.querySelector(".nav");
  if (nav) {
    const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // --- reveal on scroll (exposed so dynamically-injected nodes can register too) ---
  let io = null;
  if ("IntersectionObserver" in window) {
    io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  }
  window.__observeReveals = function (nodes) {
    if (!nodes) nodes = document.querySelectorAll(".reveal");
    if (!io) { nodes.forEach((el) => el.classList.add("in")); return; }
    nodes.forEach((el, i) => { el.style.transitionDelay = (i % 6) * 60 + "ms"; io.observe(el); });
  };
  window.__observeReveals();

  // --- hero particle field (embers / abyssal dust) ---
  const canvas = document.getElementById("hero-canvas");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (canvas && canvas.getContext && !reduce) {
    const ctx = canvas.getContext("2d");
    let w, h, particles, raf;
    const COUNT = 70;
    const accent = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#7fd6d0";

    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.width = canvas.offsetWidth * dpr;
      h = canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function rnd(a, b) { return a + Math.random() * (b - a); }
    function make() {
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      particles = Array.from({ length: COUNT }, () => ({
        x: rnd(0, W), y: rnd(0, H), r: rnd(0.4, 1.8),
        vy: rnd(-0.12, -0.55), vx: rnd(-0.2, 0.2),
        a: rnd(0.05, 0.5), tw: rnd(0.002, 0.02), tp: Math.random() * Math.PI * 2,
      }));
    }
    function frame() {
      const W = canvas.offsetWidth, H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.y += p.vy; p.x += p.vx; p.tp += p.tw;
        if (p.y < -5) { p.y = H + 5; p.x = rnd(0, W); }
        if (p.x < -5) p.x = W + 5; if (p.x > W + 5) p.x = -5;
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tp));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(frame);
    }
    function start() { size(); make(); cancelAnimationFrame(raf); frame(); }
    start();
    let t;
    window.addEventListener("resize", () => { clearTimeout(t); t = setTimeout(start, 200); });
  }
})();
