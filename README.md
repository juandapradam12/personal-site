# Personal Site

Modular personal website built with **Astro**, **Markdown/YAML content**, and **Tailwind CSS**.

Start small: CV first. Add blog, work, and research sections over time by enabling nav items and adding content files.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

## Project structure

```text
content/config/     # YAML — edit content here
  site.yaml         # Name, email, SEO
  navigation.yaml   # Menu items (enable when ready)
  cv.yaml           # CV data

src/
  components/
    shell/          # Header, footer, nav
    sections/       # Page blocks (CV sections today)
    ui/             # Reusable primitives
  layouts/          # Page wrappers
  lib/content.ts    # YAML loaders + types
  pages/            # Routes
```

## Edit your CV

All CV content lives in `content/config/cv.yaml`. Update experience, education, skills, and links — no component changes needed.

Site-wide settings: `content/config/site.yaml`.

## Add a section later (Work, Blog, Research)

1. Set `enabled: true` for the item in `content/config/navigation.yaml`
2. Add content under `content/` (e.g. `content/projects/my-project.md`)
3. Add a page in `src/pages/` and a section component

## PDF resume

`public/cv.pdf` is generated from the live CV page (not uploaded by hand), so it always matches
what's on the site and never includes data you've chosen to keep off the public page (phone,
date of birth, references, etc.).

Regenerate it after editing `content/config/cv.yaml`:

```bash
npm run cv:pdf
```

This builds the site, serves it locally, and renders the CV page with headless Chrome using the
`@media print` rules in `src/styles/global.css` (hides the header, in-page nav, footer, and the
"Download PDF" button itself). Requires Google Chrome installed locally.

## Deploy free (Vercel)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import the repo (Vercel auto-detects Astro)
4. Deploy — you get a free URL like `personal-site.vercel.app`

Every push to `main` redeploys automatically.

## Commands

| Command         | Action                |
| --------------- | --------------------- |
| `npm run dev`   | Start local dev server |
| `npm run build` | Build production site  |
| `npm run preview` | Preview production build |

## Stack

- [Astro](https://astro.build) — static site generator
- [Tailwind CSS](https://tailwindcss.com) — styling
- [YAML](https://yaml.org) — structured content

Everything runs on free tiers: GitHub, Vercel, and local dev.
