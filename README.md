# Lucija Photography

Portfolio site for Lucija Spasevska, event / documentary / cultural photographer, Skopje, North Macedonia.

Live: https://aleksandar-hqdm.github.io/lucija-photography/

## Adding or changing photos

1. Drop image files (`.jpg`, `.jpeg`, `.png`, `.webp`) into the `images/` folder.
   Name them in the order you want them shown, e.g. `01-streetfood.jpg`, `02-vivas.jpg`.
   Use high-resolution exports (long edge around 1600 to 2000 px is plenty for web and keeps the page fast).
2. (Optional) Add captions: create `captions.json` like
   `{ "01-streetfood.jpg": "Skopje Street Food Festival" }`
3. Run `python build_gallery.py` to refresh the gallery list.
4. Commit and push. GitHub Pages redeploys automatically.

## Structure

- `index.html` - page markup
- `assets/style.css` - styling
- `assets/app.js` - gallery + lightbox
- `assets/photos.js` - generated list of images (do not edit by hand)
- `build_gallery.py` - regenerates `photos.js` from the `images/` folder
