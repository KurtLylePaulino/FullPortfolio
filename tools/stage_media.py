#!/usr/bin/env python3
"""Copy music + project screenshots into assets with clean names, emit manifests."""
import json, shutil
from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT.parent
AUDIO_OUT = ROOT / "assets" / "audio"
IMG_OUT = ROOT / "assets" / "img" / "projects"
DATA = ROOT / "assets" / "data"

# --- MUSIC: source filename -> (clean slug, display title, vibe tag) ---
TRACKS = [
    ("PANDÆMONIUM__BE NOT AFRAID(2).mp3", "be-not-afraid", "PANDÆMONIUM — Be Not Afraid", "industrial · sacred"),
    ("PANDÆMONIUM__KILL_DIE_REPEAT(1).mp3", "kill-die-repeat", "PANDÆMONIUM — Kill, Die, Repeat", "industrial · relentless"),
    ("Neon Ghost (Imagine Her)(1).mp3", "neon-ghost", "Neon Ghost (Imagine Her)", "synthwave · cyber"),
    ("Gutter Pulse.mp3", "gutter-pulse", "Gutter Pulse", "darkwave · pulse"),
    ("Defective By Design(1).mp3", "defective-by-design", "Defective By Design", "industrial"),
    ("AOI, SOFTLY.mp3", "aoi-softly", "AOI, Softly", "ambient · soft"),
    ("The Weight of a Good Person.mp3", "weight-of-a-good-person", "The Weight of a Good Person", "cinematic"),
    ("The Slayer, The Sage, and The King(3).mp3", "slayer-sage-king", "The Slayer, The Sage, and The King", "epic · narrative"),
]

# --- PROJECT IMAGES: source -> (clean name) ---
PROJECT_IMAGES = [
    ("PROJECTS/CIRCUIT BREAKERS/GameScreenshot.png", "circuit-breakers"),
    ("PROJECTS/WEBDEV/HAIKU DAILY/Screenshot 2026-06-11 112843.png", "haiku-daily"),
    ("PROJECTS/WEBDEV/Jianghu Proverbs/Screenshot 2026-06-11 112815.png", "jianghu-proverbs"),
]

def stage_music():
    AUDIO_OUT.mkdir(parents=True, exist_ok=True)
    tracks = []
    for fname, slug, title, vibe in TRACKS:
        src = SRC / "MUSIC" / fname
        if not src.exists():
            print("!! missing", src); continue
        dst = AUDIO_OUT / f"{slug}.mp3"
        shutil.copy2(src, dst)
        tracks.append({"src": f"assets/audio/{slug}.mp3", "title": title, "vibe": vibe})
        print("music:", dst.name)
    (DATA / "music.json").write_text(json.dumps({"tracks": tracks}, indent=2, ensure_ascii=False), encoding="utf-8")

def stage_images():
    IMG_OUT.mkdir(parents=True, exist_ok=True)
    for rel, name in PROJECT_IMAGES:
        src = SRC / rel
        if not src.exists():
            print("!! missing", src); continue
        with Image.open(src) as im:
            im = ImageOps.exif_transpose(im)
            if im.mode in ("RGBA", "P", "LA"): im = im.convert("RGB")
            im.thumbnail((1600, 1600), Image.LANCZOS)
            im.save(IMG_OUT / f"{name}.webp", "WEBP", quality=85, method=6)
        print("project img:", name)

if __name__ == "__main__":
    DATA.mkdir(parents=True, exist_ok=True)
    stage_music()
    stage_images()
    print("media staged.")
