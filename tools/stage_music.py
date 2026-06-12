#!/usr/bin/env python3
"""
Stage the three music libraries into assets/audio/<cat>/ with clean names, emit a
categorized assets/data/music.json.

Rules:
  - Folders map to base categories: MUSIC/=original, DND MUSIC/=dnd, RUINA MUSIC/=ruina.
  - All PANDÆMONIUM tracks are forced into 'dnd' regardless of which folder they sit in.
  - 'Defective By Design' is excluded (replaced by DEBT OF LIFE).
  - Cross-folder duplicates are de-duped, keeping the highest-priority category
    (ruina > dnd > original).
  - 'Personal Picks' is a top showcase category that CLONES specific tracks (pointing at the
    same staged audio) and is the ONLY place genre tags are shown.
"""
import json, re, shutil, unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT.parent / "MUSIC"
OUT = ROOT / "assets" / "audio"
DATA = ROOT / "assets" / "data"

FOLDERS = [(SRC, "original"), (SRC / "DND MUSIC", "dnd"), (SRC / "RUINA MUSIC", "ruina")]
PRIO = {"original": 1, "dnd": 2, "ruina": 3}
CAT_META = {
    "original": ("Original", "Industrial liturgies, neon ghosts, and cinematic dread — my own singles.", "original"),
    "dnd": ("DnD · Canrael Campaign", "Score and ballads written for the world of Canrael at the table.", "campaign score"),
    "ruina": ("Library of Ruina · Fan Works", "Fan songs composed in tribute to Library of Ruina.", "library of ruina"),
}
EXCLUDE = {"defective by design"}

# home-section vibe (prefix match on normalized title); genres live ONLY in Personal Picks
HOME_VIBE = [
    ("pandaemonium", "industrial · cyber"),
    ("aoi softly", "ambient · soft"),
    ("gutter pulse", "darkwave · pulse"),
    ("neon ghost", "synthwave · cyber"),
    ("debt of life", "industrial"),
    ("the crossroads option", "original"),
    ("the reload junction", "original"),
    ("the slayer the sage and the king", "epic · narrative"),
    ("the weight of a good person", "cinematic"),
    ("the deadmen", "industrial · cyber"),
]

# Personal Picks: (normtitle prefix, display title, GENRE tag). Cloned from home tracks.
PICKS = [
    ("the reload junction",          "The Reload Junction",          "Acoustic Café Cover · Soft Indie Folk"),
    ("one last sip of coffee",       "One Last Sip of Coffee",       "Acoustic Café Cover · Soft Indie Folk"),
    ("pandaemonium kill die repeat", "PANDÆMONIUM — Kill, Die, Repeat", "Cyberpunk Glitch Core"),
    ("a crown of paper stars",       "A Crown of Paper Stars",       "Dark Orchestral · Melancholic Waltz"),
    ("keep the dark at bay",         "Keep the Dark at Bay",         "Work Anthem"),
]

def norm(stem):
    s = re.sub(r"\(\d+\)\s*$", "", stem).replace("__", " ").replace("_", " ")
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c)).replace("Æ", "ae").replace("æ", "ae")
    s = re.sub(r"[^a-zA-Z0-9]+", " ", s).lower().strip()
    return re.sub(r"\s+", " ", s)

def slug(stem):
    return re.sub(r"-+", "-", re.sub(r"[^a-z0-9]+", "-", norm(stem))).strip("-")

def title(stem):
    s = re.sub(r"\(\d+\)\s*$", "", stem).strip().replace("__", " — ").replace("_", " ").strip()
    return re.sub(r"\s+", " ", s)

def home_vibe(nt, cat):
    for key, v in HOME_VIBE:
        if nt.startswith(key):
            return v
    return CAT_META[cat][2]

def final_cat(nt, base):
    return "dnd" if nt.startswith("pandaemonium") else base

def main():
    for c in ("original", "dnd", "ruina"):
        shutil.rmtree(OUT / c, ignore_errors=True)
        (OUT / c).mkdir(parents=True, exist_ok=True)

    items = []  # (path, nt, final_cat) in folder order
    for folder, base in FOLDERS:
        if not folder.exists():
            print("!! missing", folder); continue
        for f in sorted(folder.glob("*.mp3")):
            nt = norm(f.stem)
            if nt in EXCLUDE:
                print("  exclude:", f.name); continue
            items.append((f, nt, final_cat(nt, base)))

    # de-dup: keep highest-priority category per normalized title
    best = {}
    for path, nt, cat in items:
        if nt not in best or PRIO[cat] > PRIO[best[nt][1]]:
            best[nt] = (path, cat)

    cats = {"original": [], "dnd": [], "ruina": []}
    norm_to_src = {}
    seen = set()
    for _, nt, _ in items:
        if nt in seen:
            continue
        seen.add(nt)
        path, cat = best[nt]
        sl = slug(path.stem)
        shutil.copy2(path, OUT / cat / f"{sl}.mp3")
        src = f"assets/audio/{cat}/{sl}.mp3"
        norm_to_src[nt] = src
        cats[cat].append({"src": src, "title": title(path.stem), "vibe": home_vibe(nt, cat)})
        print(f"  [{cat}] {path.name}")

    picks = []
    for key, disp, genre in PICKS:
        src = norm_to_src.get(key) or next((v for k, v in norm_to_src.items() if k.startswith(key)), None)
        if not src:
            print("!! pick not found:", key); continue
        picks.append({"src": src, "title": disp, "vibe": genre})
        print(f"  [personal] {disp}")

    out = [{"key": "personal", "title": "Personal Picks", "pick": True,
            "blurb": "A quick-access showcase — five tracks worth starting with, tagged by genre.",
            "tracks": picks}]
    for c in ("original", "dnd", "ruina"):
        disp, blurb, _ = CAT_META[c]
        out.append({"key": c, "title": disp, "blurb": blurb, "tracks": cats[c]})

    DATA.mkdir(parents=True, exist_ok=True)
    (DATA / "music.json").write_text(json.dumps({"categories": out}, indent=2, ensure_ascii=False), encoding="utf-8")
    print("\nDONE")
    for c in out:
        print(f"  {c['key']}: {len(c['tracks'])}")

if __name__ == "__main__":
    main()
