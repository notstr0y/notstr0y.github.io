# notstr0y.github.io

Personal portfolio site styled as a Neovim workspace (Catppuccin Mocha), built with Tailwind CSS.

## Structure

```
.
├── index.html              # page shell, loads css/js
├── css/
│   └── style.css           # custom styles (scrollbar, tabs, markdown rendering)
├── js/
│   ├── tailwind-config.js  # Catppuccin Mocha color palette for Tailwind
│   ├── data.js             # all site content (home/about/projects/now/stack/contact/ama)
│   └── app.js               # tab rendering + markdown-to-DOM engine
└── assets/
    └── img/                 # favicon, profile images
```

## Editing content

All page copy lives in `js/data.js` as a list of virtual "files" (`home.md`, `about.md`, etc.),
each with an array of `{ type, text }` blocks (`h1`, `h2`, `paragraph`, `list`). Edit that file
to change any text — no HTML editing required for content updates.

## Local preview

Just open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```
