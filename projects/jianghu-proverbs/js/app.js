/* 江湖箴言 · roll + copy logic */
(function () {
  "use strict";

  const els = {
    scroll:     document.getElementById("scroll"),
    proverb:    document.querySelector(".proverb"),
    zh:         document.getElementById("zh"),
    py:         document.getElementById("py"),
    en:         document.getElementById("en"),
    author:     document.getElementById("author"),
    dynasty:    document.getElementById("dynasty"),
    stamp:      document.getElementById("indexStamp"),
    rollBtn:    document.getElementById("rollBtn"),
    copyBtn:    document.getElementById("copyBtn"),
    copyLabel:  document.getElementById("copyLabel"),
    counter:    document.getElementById("counter"),
  };

  if (els.counter) {
    els.counter.textContent = "— 江湖共" + PROVERBS.length + "卷 · " + PROVERBS.length + " scrolls —";
  }

  let current = null;   // currently displayed proverb
  let lastIdx = -1;     // avoid immediate repeats
  let copyResetTimer = null;

  function pickIndex() {
    if (PROVERBS.length <= 1) return 0;
    let i;
    do { i = Math.floor(Math.random() * PROVERBS.length); }
    while (i === lastIdx);
    return i;
  }

  function render(p, idx) {
    els.zh.innerHTML = p.zh;
    els.py.textContent = p.py || "";
    els.en.textContent = p.en || "";
    els.author.textContent = p.author || "";
    els.dynasty.textContent = p.dynasty || "";
    els.stamp.textContent = "第\n" + (idx + 1);
    els.stamp.classList.add("show");

    // restart swap animation
    els.proverb.classList.remove("swap");
    void els.proverb.offsetWidth;
    els.proverb.classList.add("swap");
  }

  function roll() {
    const idx = pickIndex();
    lastIdx = idx;
    current = PROVERBS[idx];

    els.scroll.classList.remove("rolling");
    void els.scroll.offsetWidth;
    els.scroll.classList.add("rolling");

    render(current, idx);

    els.copyBtn.disabled = false;
    resetCopyLabel();
  }

  function plainText(p) {
    // strip any HTML line breaks from the Chinese line
    const zh = p.zh.replace(/<br\s*\/?>/gi, " ");
    return `${zh}\n${p.py}\n“${p.en}”\n— ${p.author} · ${p.dynasty}`;
  }

  function resetCopyLabel() {
    els.copyBtn.classList.remove("copied");
    els.copyLabel.textContent = "抄录 · Copy";
  }

  async function copy() {
    if (!current) return;
    const text = plainText(current);
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        legacyCopy(text);
      }
      showCopied();
    } catch (e) {
      legacyCopy(text);
      showCopied();
    }
  }

  function legacyCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.top = "-9999px";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
  }

  function showCopied() {
    els.copyBtn.classList.add("copied");
    els.copyLabel.textContent = "已抄录 · Copied!";
    clearTimeout(copyResetTimer);
    copyResetTimer = setTimeout(resetCopyLabel, 1800);
  }

  els.rollBtn.addEventListener("click", roll);
  els.copyBtn.addEventListener("click", copy);

  // keyboard: space / enter rolls, C copies
  document.addEventListener("keydown", function (e) {
    if (e.target.tagName === "BUTTON") return;
    if (e.code === "Space" || e.code === "Enter") { e.preventDefault(); roll(); }
    else if (e.key === "c" || e.key === "C") { if (current) copy(); }
  });

  // first roll on load for an inviting start
  window.addEventListener("DOMContentLoaded", roll);
})();
