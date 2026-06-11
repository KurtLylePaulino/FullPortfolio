#!/usr/bin/env python3
"""
Stage all three music libraries into assets/audio/<cat>/ with clean names,
de-duplicate tracks that live in more than one folder, and emit a categorized
assets/data/music.json the player consumes.

Priority for de-dup (a track kept in its most specific home):
    ruina  >  dnd  >  original
"""
import json, re, shutil, unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT.parent / "MUSIC"
OUT = ROOT / "assets" / "audio"
DATA = ROOT / "assets" / "data"

# category key -> (source dir, display title, blurb, default vibe, dedup priority)
CATS = [
    ("original", SRC, "Original",
     "Industrial liturgies, neon ghosts, and cinematic dread — my own singles.",
     "original", 1),
    ("dnd", SRC / "DND MUSIC", "DnD · Canrael Campaign",
     "Score and ballads written for the world of Canrael at the table.",
     "campaign score", 2),
    ("ruina", SRC / "RUINA MUSIC", "Library of Ruina · Fan Works",
     "Fan songs composed in tribute to Library of Ruina.",
     "library of ruina", 3),
]

# hand-tuned vibes for the originals (by normalized title)
ORIG_VIBE = {
    "pandaemonium be not afraid": "industrial · sacred",
    "pandaemonium kill die repeat": "industrial · relentless",
    "neon ghost imagine her": "synthwave · cyber",
    "gutter pulse": "darkwave · pulse",
    "defective by design": "industrial",
    "aoi softly": "ambient · soft",
    "the weight of a good person": "cinematic",
    "the slayer the sage and the king": "epic · narrative",
}

def norm(stem: str) -> str:
    s = stem
    s = re.sub(r"\(\d+\)\s*$", "", s)          # trailing (1) (2) (3)
    s = s.replace("__", " ").replace("_", " ")
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.replace("Æ", "ae").replace("æ", "ae")
    s = re.sub(r"[^a-zA-Z0-9]+", " ", s).lower().strip()
    return re.sub(r"\s+", " ", s)

def slug(stem: str) -> str:
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", norm(stem))).strip("-")

def title(stem: str) -> str:
    s = re.sub(r"\(\d+\)\s*$", "", stem).strip()
    s = s.replace("__", " — ").replace("_", " ").strip()
    return re.sub(r"\s+", " ", s)

def main():
    seen = set()
    cats_out = []
    # process by priority DESC so the most specific home claims the track
    for key, src, disp, blurb, dvibe, prio in sorted(CATS, key=lambda c: -c[5]):
        if not src.exists():
            print("!! missing", src); continue
        outdir = OUT / key
        outdir.mkdir(parents=True, exist_ok=True)
        files = sorted(p for p in src.iterdir() if p.suffix.lower() == ".mp3")
        tracks = []
        for f in files:
            n = norm(f.stem)
            if n in seen:
                print(f"  dedup skip ({key}):", f.name); continue
            seen.add(n)
            sl = slug(f.stem)
            dst = outdir / f"{sl}.mp3"
            shutil.copy2(f, dst)
            tracks.append({
                "src": f"assets/audio/{key}/{sl}.mp3",
                "title": title(f.stem),
                "vibe": ORIG_VIBE.get(n, dvibe),
            })
            print(f"  [{key}] {f.name}")
        cats_out.append({"key": key, "title": disp, "blurb": blurb,
                         "tracks": tracks, "_prio": prio})
    # restore display order: original, dnd, ruina
    cats_out.sort(key=lambda c: c["_prio"])
    for c in cats_out:
        c.pop("_prio")
    DATA.mkdir(parents=True, exist_ok=True)
    (DATA / "music.json").write_text(json.dumps({"categories": cats_out}, indent=2, ensure_ascii=False), encoding="utf-8")
    n = sum(len(c["tracks"]) for c in cats_out)
    print(f"\nDONE: {n} unique tracks across {len(cats_out)} categories")
    for c in cats_out:
        print(f"  {c['key']}: {len(c['tracks'])}")

if __name__ == "__main__":
    main()
