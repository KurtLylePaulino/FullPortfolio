# Haiku Daily

> 俳句 — a philosophical haiku from the classical Japanese masters, each day.

A small static site that shows one haiku per day from the great masters — Bashō,
Issa, Buson, Chiyo-ni, Shiki and others — with the original Japanese, the author,
and a **Reroll** button to draw another. A washi-paper design with drifting sakura
petals, a copy button, and an optional generative *koto* soundscape. No server, no
API key, no build step — just open `index.html`.

## Sourcing & attribution

All poems are **real haiku by poets who died long ago**, so the originals are in
the **public domain**. The English lines are faithful renderings written for this
project (deliberately not copied from any modern translator's copyrighted wording).
Each entry carries the original Japanese plus the poet's name and dates so it can be
verified and cited. Please don't add verbatim work by living/modern poets — that's a
copyright risk on a public site.

## How it works

- **`haikus.js`** — the pool of haiku (this is the only file you'll usually edit).
- **`app.js`** — picks "today's" haiku deterministically from the date; handles
  reroll, copy, sakura petals, and the Web Audio koto.
- **`index.html` / `style.css`** — the page and its styling.

"Today's haiku" is chosen by the calendar day, so everyone sees the same one each
day. **Reroll** (button, or press `R`) shows a random different one; **Copy** (`C`)
copies the poem with its attribution.

## Adding more haiku

Open `haikus.js` and append to the `HAIKUS` array, keeping the same shape:

```js
{
  jp: "古池や蛙飛び込む水の音",                       // original Japanese
  lines: ["The old pond—", "a frog leaps in:", "the sound of water"],
  author: "Matsuo Bashō",
  dates: "1644–1694",
  kanji: "静",                                        // theme character (watermark)
  theme: "stillness · the eternal now",
},
```

Save, refresh, done.

## Run locally

Just open `index.html` in a browser. (Or serve the folder: `python -m http.server`.)

## Publish free on GitHub Pages

1. Push this folder to a GitHub repo.
2. Repo **Settings → Pages → Source: Deploy from a branch → `main` / root**.
3. Your site goes live at `https://<your-username>.github.io/<repo-name>/`.
