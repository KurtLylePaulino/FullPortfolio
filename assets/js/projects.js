/* FullPortfolio projects page — render summary cards from the shared projects.json */
(function () {
  "use strict";
  const mount = document.getElementById("proj-list");
  if (!mount) return;
  const GLYPH = { game: "◆", ml: "⌗", web: "&lt;/&gt;" };

  fetch("assets/data/projects.json")
    .then((r) => r.json())
    .then((d) => render(d.projects || []))
    .catch(() => { mount.innerHTML = '<p style="color:var(--ink-faint);font-family:var(--mono)">Could not load projects.</p>'; });

  function render(projects) {
    mount.innerHTML = projects.map((p, i) => {
      const rev = i % 2 === 1 ? " rev" : "";
      const media = p.media
        ? `<div class="proj__media"><img src="${p.media}" alt="${escapeAttr(p.title)}" loading="lazy"></div>`
        : `<div class="proj__media code"><div class="proj__glyph">${GLYPH[p.category] || "▣"}</div></div>`;
      const badge = p.award ? `<div class="badge">★ ${p.award}</div>` : "";
      const tags = (p.stack || []).map((s) => `<span class="tag">${s}</span>`).join("");
      const links = (p.links || []).map((l) =>
        `<a class="${l.kind === "primary" ? "solid" : ""}" href="${l.href}" target="_blank" rel="noopener">${l.label} ${l.href.endsWith(".ipynb") ? "↓" : "↗"}</a>`
      ).join("");
      return `
        <article class="proj${rev} reveal">
          ${media}
          <div class="proj__body">
            ${badge}
            <div class="proj__tags">${tags}</div>
            <h3>${p.title}</h3>
            <div class="proj__meta">${p.tagline}${p.year ? " · " + p.year : ""}</div>
            <p>${p.blurb}</p>
            <div class="proj__links">${links}</div>
          </div>
        </article>`;
    }).join("");

    // re-run reveal observer for freshly-injected nodes
    if (window.__observeReveals) window.__observeReveals(mount.querySelectorAll(".reveal"));
  }

  function escapeAttr(s) { return String(s).replace(/"/g, "&quot;"); }
})();
