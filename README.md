# notstr0y — portfolio

A minimal, monochrome single-page portfolio. The site name is spelled out as a row of
clickable characters (`n-o-t-s-t-r-0-y`); hovering a character flips it to katakana,
clicking it opens the matching section. Light/dark theme is a manual toggle, saved to
`localStorage`.

## Structure

```
.
├── index.html        # page shell only — loads css/js, no inline styles/scripts
├── css/
│   └── style.css      # all styling (monochrome light/dark theme via CSS vars)
├── js/
│   ├── data.js         # all site content, keyed by section
│   └── app.js           # rendering engine + theme toggle + hash-based routing
└── assets/
    └── resume.pdf       # (add your resume file here — linked from get-in-touch)
```

## How sections map to the title

| char | section id            | title              |
|------|------------------------|---------------------|
| n    | whoami                 | home / intro        |
| o    | more-about-me          | about                |
| t    | skills-and-stack       | skills               |
| s    | featured-work          | projects             |
| t    | career-timeline        | experience           |
| r    | get-in-touch           | contact              |
| 0    | notes-and-thoughts     | about (secondary)    |
| y    | —                      | no action bound      |

## Editing content

Everything text-wise lives in `js/data.js`, in a single `CONTENT.sections` array — one
object per character/section. Add a project by pushing into the `featured-work` section's
`items` array, add a skill by pushing into the right `skills-and-stack` category, etc.
No HTML editing needed for content changes.

## Local preview

Open `index.html` directly, or serve it:

```
python3 -m http.server 8000
```

## Note

`assets/resume.pdf` is referenced by the contact section's download link but isn't
included here — drop your resume PDF into `assets/` with that filename, or update the
`resume` field in `js/data.js` to point elsewhere.
