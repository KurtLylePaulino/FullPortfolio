# The Canrael Codex — A Quote Generator

> *"In a world where the gods have turned their gaze away, we are but whispers in the ruins of a forgotten age."*

A dark-fantasy quote generator themed on the world of **Canrael** — a grimdark setting of
silent gods, decaying empires, failing lighthouses, and the hungry dark beneath the world.

Draw from a bank of **123 whispers**, each an anonymous voice from across the continents:
a nameless knight of the Border Kingdoms, an elven warrior of the Whispering Wood, a gray
warden of Norvdal, the last of her people on a dying lighthouse.

## Features

- **123 hand-written quotes** drawn from the world's own lore and voice.
- **8 regions to filter by**, following the geography of Canrael:
  - The World Adrift · Alverdon (the East) · Eldovia (the West) · Frosthold (the North)
  - Ankari (Land of Reeds) · Miran (the Martial Realm) · The Abyss Below · Echoes of the Golden Age
- **Atmospheric design** — aged parchment, ember-gold, and the silver-blue *Aetherflame*
  of the lighthouses, over original concept art.
- **Keyboard shortcuts** — `Space` to draw, `C` to inscribe (copy).
- Fully **static** and **responsive**; no build step, no dependencies, no tracking.

## Project structure

```
index.html        — markup
styles.css        — theme & layout
script.js         — draw / filter / copy logic + ambient embers
quotes.js         — the quote bank (CATEGORIES + QUOTES)
assets/
  hero.webp       — lighthouse banner (concept art)
  parchment.webp  — quote-card texture
```

To add or edit quotes, edit `quotes.js`. Each quote is:

```js
{ text: "…", author: "An archivist of the dying cities", cat: "world" }
```

`cat` must match a category `id` in the `CATEGORIES` array at the top of the file.

---

*Concept art generated for this project. World, lore, and characters of Canrael are the
author's own.*
