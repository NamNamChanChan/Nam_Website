# Personal Website — Build Summary

**Site:** Nam Chan (aka Alfred Nam) — personal site + bilingual blog
**Domain (target):** https://nam-ai.uk
**Stack:** Astro 6 + AstroPaper theme + Tailwind 4, static, deployed to Cloudflare Pages
**Languages:** English (default, `/`) and 繁體中文 (`/zh/`)
**Location:** `14_Personal_Website/` (self-contained git repo)

---

## What's on the site

| Page | English | 中文 | Contents |
| :--- | :--- | :--- | :--- |
| Home | `/` | `/zh/` | Hero intro, tagline, CTAs, social row, featured + recent posts |
| About | `/about` | `/zh/about` | Self-introduction (CTO @ Wistkey, side projects, yoga, HK ⇄ London) |
| Blog | `/posts` | `/zh/posts` | Posts, tag pages, archives, per-language RSS |
| Projects | `/projects` | `/zh/projects` | Card grid: Wistkey, NamLoop, VitaBaby, Baby Growth Calculator |
| Links | `/links` | `/zh/links` | Linktree-style hub of every profile + site (use as your IG bio link) |
| Search | `/search` | `/zh/search` | Full-text search (Pagefind), scoped per language |

**Feed URLs:** `/rss.xml` (English) · `/zh/rss.xml` (中文)

### Bilingual behaviour
- Header **中 / EN** button swaps to the same page in the other language.
- On a translated post it jumps to the exact counterpart; otherwise to that section's index.
- `<html lang>`, `hreflang` alternates and per-language RSS are all wired up.
- Dates and the collapsible table-of-contents localise automatically (e.g. `2026年7月3日`, `目錄`).
- A `Person` JSON-LD block (name, "Alfred Nam" alt-name, CTO @ Wistkey, all your social profiles) is emitted on the home and about pages for SEO.

---

## Real data wired in ✅

- **Domain:** nam-ai.uk (set as `site.url`)
- **GitHub:** https://github.com/NamNamChanChan
- **LinkedIn:** https://www.linkedin.com/in/nam-chan/
- **X (Twitter):** https://x.com/namchan_hk
- **Instagram:** https://www.instagram.com/nam.traveling/
- **Threads:** https://www.threads.com/@nam.traveling
- **Facebook:** https://www.facebook.com/chankwunnam/
- **YouTube:** https://www.youtube.com/@londonnam
- **Email:** nam@wistkey.com
- **Projects:** Wistkey (wistkey.com), NamLoop (namloop.chankwunnam0304.workers.dev), VitaBaby (vitababy.ai), Baby Growth Percentile Calculator

## Still pending / needs your input

1. **Review the seed blog posts** — the two seed posts were drafted from known facts and are
   marked with a `DRAFT` HTML comment. Read/edit before you consider them "yours":
   - `Hello, world — why this site exists` (EN + 中文)
   - `Why we deploy LLMs on-premises` (EN + 中文)

   (The About page is now written from your own notes — yoga, coding, cross-department AI work.)
2. **Google Search Console** — once live, add your verification string as
   `site.googleVerification` in `astro-paper.config.ts`, then submit the sitemap.
3. **Avatar / headshot** (optional) — not currently used; the design is text-first.

---

## Deploying to Cloudflare Pages

Prerequisites: a Cloudflare account (the same one hosting vitababy.ai works).

```bash
cd "14_Personal_Website"
npm run build

# First run opens a browser to authorise Wrangler with your Cloudflare account:
npx wrangler pages deploy dist --project-name nam-ai
```

This publishes to `https://nam-ai.pages.dev`. Then, to attach the custom domain:

1. Cloudflare dashboard → **Workers & Pages** → **nam-ai** → **Custom domains** → add `nam-ai.uk`.
2. If `nam-ai.uk` is already on Cloudflare, the DNS record is created automatically.
   If it's registered elsewhere, point its nameservers to Cloudflare first (or add the
   CNAME Cloudflare shows you).

Every later deploy is just `npm run build && npx wrangler pages deploy dist --project-name nam-ai`.

> Alternative (no CLI): push this folder to a GitHub repo, then in the Cloudflare dashboard
> create a Pages project connected to it with build command `npm run build` and output dir `dist`.
> This gives you automatic deploys on every push.

---

## Project layout (the bits you'll touch)

```
astro-paper.config.ts        # name, domain, socials, feature toggles
src/
├── data/
│   ├── projects.ts          # /projects cards (bilingual text)
│   └── links.ts             # /links non-social sites
├── content/
│   ├── pages/about.md       # About (EN)  + zh/about.md (中文)
│   └── posts/{en,zh}/*.md   # blog posts — same filename = translation pair
├── i18n/lang/{en,zh}.ts     # all UI strings + hero copy
└── pages/                   # routes; /zh/* mirror the English routes
```

Full authoring + editing guide: **[README.md](README.md)**.
