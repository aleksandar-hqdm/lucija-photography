# -*- coding: utf-8 -*-
"""Scan images/ and write assets/photos.js. Run after adding or changing photos.
Optional captions: create captions.json mapping {"filename.jpg": "Caption text"}.
Display order follows filename order, so name files 01-..., 02-... to control it.
"""
import os, json

ROOT = os.path.dirname(os.path.abspath(__file__))
IMG = os.path.join(ROOT, "images")
EXT = (".jpg", ".jpeg", ".png", ".webp")

caps = {}
cap_path = os.path.join(ROOT, "captions.json")
if os.path.exists(cap_path):
    with open(cap_path, encoding="utf-8") as fh:
        caps = json.load(fh)

files = sorted(f for f in os.listdir(IMG) if f.lower().endswith(EXT))
items = [{"src": f, "alt": "Lucija Spasevska photography", "caption": caps.get(f, "")} for f in files]

out = "window.PHOTOS = " + json.dumps(items, ensure_ascii=False, indent=2) + ";\n"
with open(os.path.join(ROOT, "assets", "photos.js"), "w", encoding="utf-8") as fh:
    fh.write(out)

print("Wrote %d photo(s) to assets/photos.js" % len(items))
for it in items:
    print("  -", it["src"])
