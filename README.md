# nam-ai.uk — Nam Chan's personal website

Personal site and bilingual (English / 繁體中文) blog for **Nam Chan (aka Alfred Nam)**.
Built with [Astro](https://astro.build) on the [AstroPaper](https://github.com/satnaing/astro-paper)
theme, deployed to **Cloudflare Pages**.

See **[SUMMARY.md](SUMMARY.md)** for the full rundown: what's on the site, what's still
pending, and step-by-step deploy instructions.

## Quick start

```bash
npm install
npm run dev        # dev server at http://localhost:4321
npm run build      # type-check + build + Pagefind search index
npm run preview    # preview the production build
```

## Writing a post

1. Copy `src/content/posts/en/_template.md` to a new file.
2. English posts go in `src/content/posts/en/`, Chinese posts in `src/content/posts/zh/`.
3. To link an EN post to its ZH translation, give both files the **same filename** —
   that powers the 中/EN switcher and the `hreflang` tags.
4. Tag with any of: `tech · it · ai · business · finance · yoga`.

## Editing site-wide bits

| What | Where |
| :--- | :--- |
| Name, domain, social URLs, feature toggles | `astro-paper.config.ts` |
| Projects shown on `/projects` | `src/data/projects.ts` |
| Non-social links on `/links` | `src/data/links.ts` |
| About page text | `src/content/pages/about.md` · `src/content/pages/zh/about.md` |
| UI translations (nav, buttons, headings) | `src/i18n/lang/en.ts` · `src/i18n/lang/zh.ts` |
| Home hero copy | `hero.*` keys in the two `src/i18n/lang/*.ts` files |

Original theme by [Sat Naing](https://satnaing.dev). Licensed under MIT.
