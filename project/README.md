# Art By Maheen — Website

A gallery-style portfolio site for oil painter Maheen, inspired by the
structure and motion of coveomusic.com: a full-bleed hero, an infinitely
looping horizontal canvas gallery, a catalogued collection list, an about
section, and a commission/contact form — all wrapped in a custom
loading-screen animation built from the artist's own recurring motif
(sunlight breaking through a forest canopy).

## Project structure

```
project/
├── index.html          Main (and only) HTML page
├── css/
│   └── style.css       All styles, design tokens as CSS variables
├── js/
│   └── main.js         Preloader, nav, marquee, lightbox, form, reveals
├── assets/
│   ├── paintings/       painting-01.jpg … painting-12.jpg (your artwork)
│   └── icons/
│       └── favicon.svg
└── README.md
```

No build step, no framework, no npm install — it's plain HTML/CSS/JS so
it will run anywhere a browser can load static files.

## Running it locally

Opening `index.html` directly works, but some browsers restrict things
like `loading="lazy"` or fonts over `file://`. It's better (and closer to
production) to serve it locally:

```bash
cd project
python3 -m http.server 8080
# then open http://localhost:8080
```

or, if you have Node:

```bash
npx serve .
```

## Deploying it

This is a static site — you can drop the whole `project` folder onto:
- **Netlify / Vercel** (drag-and-drop the folder, or connect a git repo)
- **GitHub Pages** (push to a repo, enable Pages on the branch)
- Any regular web host, via FTP/SFTP

Just make sure `index.html`, `css/`, `js/`, and `assets/` all stay in the
same relative structure.

## Customizing

- **Paintings & captions** — everything about each painting (title, one-line
  "mood" description, year) lives in one place: the `PAINTINGS` array at the
  top of `js/main.js`. Add, remove, or reorder entries there; the gallery
  marquee, the collection list, and the lightbox all read from it
  automatically. Sizes weren't included since the originals weren't
  specified — add a `size:` field per entry and show it in the collection
  row / lightbox if you'd like exact dimensions listed.
- **Bio & quote** — edit the text directly inside the `#about` section in
  `index.html`. The bio there is a starting draft; swap in Maheen's real
  story, training, and process.
- **Contact** — the form currently only shows a confirmation message
  in-page (see the comment above the `submit` handler in `main.js`). To
  actually receive submissions, wire it to a service like Formspree,
  EmailJS, or your own backend endpoint, or simply direct people to the
  mailto link already in the Commission section.
- **Colors & type** — all defined as CSS variables at the top of
  `css/style.css` (`:root`), so retheming is a matter of changing a
  handful of hex values and two font names.
- **Adding more paintings** — drop new images into `assets/paintings/`,
  add a matching entry to the `PAINTINGS` array, done.

## Credits

Fonts: Fraunces & Albert Sans & JetBrains Mono (Google Fonts, open license).
All artwork © Maheen.
