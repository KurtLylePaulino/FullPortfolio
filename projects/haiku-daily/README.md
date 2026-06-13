# Haiku Daily

> 俳句 — a philosophical haiku from the classical Japanese masters, each day.

A small static site that shows one haiku per day from the great masters — Bashō,
Issa, Buson, Chiyo-ni, Shiki and others — with the original Japanese, the author,
and a **Reroll** button to draw another. No server, no API key, no build step —
just open `index.html`.

It opens with a shoji-screen intro (the title brush-writes on, a seal stamps down)
over a living sumi-e night scene: parallax Mt Fuji, a glowing moon, drifting clouds
and mist, falling sakura petals, fireflies, and swaying paper lanterns. Each new
haiku brush-writes in line by line.

## Music & sound

- **Music** (♪ button): a looping background track. **Drop an `music.mp3` in the
  repo root and it's used automatically;** otherwise the site synthesizes a calm
  koto / shakuhachi ambience with the Web Audio API. Fades in and out.
- **Sound** (🔔 button): quiet, synthesized UI effects (entry bell, a bamboo
  *shishi-odoshi* clack and brush ticks as a haiku draws, a seal *thunk*). Ducked
  under the music, rate-limited, and remembered in `localStorage`.
- Audio unlocks on the first click/tap (browser autoplay policy). Press `M` to
  toggle music.
- **`prefers-reduced-motion`** is respected: the intro and animations are skipped
  and sound defaults to off.

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
  reroll, copy, the canvas scene (petals + fireflies), parallax, the intro
  sequence, and all audio (music + synth SFX).
- **`index.html` / `style.css`** — the page, the scene, and its styling.

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
