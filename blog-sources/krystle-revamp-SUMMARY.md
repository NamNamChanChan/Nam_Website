# Rebuilding My Wife's Website: WordPress → Hand-Rolled Static HTML, with an AI Agent
*Source notes for blog post · project: krystle.hk revamp · done 2026-07-05 (one evening: audit → plan → build → QA) · all photos in `src/assets/images/krystle-`*

## The one-line story

My wife Krystle (張可澄) is a professional bilingual MC in Hong Kong. Her portfolio site ran on WordPress + Elementor + a heavy theme, scored **56 on Lighthouse with a 13.8-second LCP**, and — as the audit revealed — had been **quietly hiding 76 of her 85 events from every visitor** because of a broken "Load More" button. In one evening with Claude Code, we audited every page, downloaded every asset, and rebuilt the whole thing as 102 pages of dependency-free static HTML: **SEO 100 · Accessibility 100 · Best Practices 100, first paint 1.7s, zero broken links**, same design, same URLs, ready for Cloudflare.

---

## Photo list (10)

| # | File | Caption suggestion | Where in post |
|---|---|---|---|
| 1 | `src/assets/images/krystle-01-before-home-fullpage.jpg` | The original WordPress homepage (full page) | "Before" intro |
| 2 | `src/assets/images/krystle-02-after-home-fullpage.jpg` | The rebuilt static homepage — visually the same site | right after #1 |
| 3 | `src/assets/images/krystle-03-hero-before-after.jpg` | Hero section: WordPress original (left) vs static rebuild (right) | fidelity section |
| 4 | `src/assets/images/krystle-04-after-hero.jpg` | The rebuilt hero — one composed image + HTML text layers instead of a 700 KB slider plugin | RevSlider section |
| 5 | `src/assets/images/krystle-05-before-portfolio.jpg` | Original portfolio grid — the Load More button silently 403'd, so visitors only ever saw these 9 events | the bug story |
| 6 | `src/assets/images/krystle-06-after-portfolio.jpg` | Rebuilt portfolio — all 85 events pre-rendered, filter and load-more are pure client-side | after the bug story |
| 7 | `src/assets/images/krystle-07-after-event-page.jpg` | One of the 85 generated event pages with lightbox gallery | build section |
| 8 | `src/assets/images/krystle-08-after-about.jpg` | Rebuilt About page — bio, credentials, and her Chinese name 張可澄 finally on the site | SEO section |
| 9 | `src/assets/images/krystle-09-mobile-before-after.jpg` | Mobile: original (left) vs rebuild (right) | responsive section |
| 10 | `src/assets/images/krystle-10-cheung-kerning-debug.jpg` | Debugging "CHŒUNG": a test matrix isolating a faulty kerning pair in the font itself | war-story section |

---

## Chapter 1 — The audit (what we found under the hood)

Crawled the sitemap, downloaded all **101 pages** of HTML and **2,186 asset files (223 MB)**, took full-page screenshots, ran throttled Lighthouse as a baseline.

**The stack:** WordPress 6.6 + Cassia theme (Qode) + Elementor 3.19 + Slider Revolution + WooCommerce + Contact Form 7 + Instagram Feed — on the homepage that meant **20 CSS files, 70 JS files, 122 requests, 2.2 MB**, including React + ReactDOM + lodash loaded on every page… for a WooCommerce shop with **zero products** and a contact form plugin with **zero forms**.

**Bugs nobody had noticed:**
1. **The Load More button was broken for real visitors.** The theme's REST call sent a security nonce baked into the cached page; LiteSpeed cached pages longer than nonces live, so the endpoint returned 403. Result: only the first 9 of 85 events were ever visible. (Found by driving a real browser against the live site and watching the network tab — `wp-json/cassia/v1/get-posts → 403`.)
2. **The footer logo linked to the theme vendor's demo site** (`cassia.qodeinteractive.com`) on every page — leftover from the demo import, leaking SEO equity sitewide.
3. **No favicon (404), no meta descriptions anywhere, no Open Graph, no structured data.** Homepage title: just "Krystle".
4. Both "Read More" buttons had **empty href** — they did nothing when clicked.
5. Sample post `hello-world` still live; cart/checkout pages indexed.

**Baseline (Lighthouse 12, throttled mobile):** Performance **56**, SEO **85**, FCP/LCP **10.3s / 13.8s**, fonts alone 872 KB across 17 requests (every weight of Noto Sans TC, Montserrat, Roboto…).

**Design tokens extracted** (so the rebuild could be faithful): Tiffany-teal `#81D8D0` accent, warm off-white `#F2F1EF`, Cinzel Decorative (hero), Cormorant Infant (serif accents), Montserrat (headings), Noto Sans TC (body), thin weights + wide letter-spacing everywhere.

→ Photos 1, 5 here.

## Chapter 2 — The plan

Non-negotiables: same look, same pages, **same URLs** (nothing 404s, Google index survives), native HTML output, super fast, SEO-first, deploy on Cloudflare. Explicit non-goal: no redesign.

Architecture: hand-written HTML/CSS/JS templates + **one small Node build script** that stamps out the 85 event pages and 13 category pages from data files — "native HTML without hand-maintaining 101 files". Every heavy WP feature got a lightweight replacement:

| WordPress (heavy) | Rebuild (light) |
|---|---|
| Slider Revolution hero (~700 KB JS) | one composed image + CSS-positioned text layers |
| jQuery + GSAP scroll animations | 30 lines of IntersectionObserver + CSS transitions |
| Isotope filtering + AJAX Load More (the broken one) | all 85 cards in the DOM; filter = show/hide, load-more = un-hide 9 more — cannot break, no network |
| Magnific Popup lightbox | native `<dialog>` + ~40 lines JS (keyboard + swipe) |
| Google Fonts, 17 req / 872 KB | self-hosted subsets, 5 files / ~390 KB — incl. **Noto Sans TC subset to the 919 glyphs actually used** (fonttools + brotli, variable weight axis trimmed to 300–700) |
| WooCommerce/CF7/Instagram plugins | deleted; junk URLs 301'd |

## Chapter 3 — The build

1. **Content extraction**: Python scripts parsed the downloaded WP HTML into clean JSON — nav, hero, 3 advantage + 4 style items, 9 testimonials, 8-photo strip, 84-logo wall, 4 celeb partners, and per-event data (title, categories, photos, grid order recovered from the theme's own REST endpoint — curl worked where the browser's stale nonce failed).
2. **Image pipeline**: sharp generated **805 derivatives** (WebP grid squares, 900/1600px gallery sizes, 1200px JPEG og:images, logo thumbnails) from the 397 downloaded originals. The whole site's image payload: 50 MB total, each page loads a fraction, lazily.
3. **Build script** (`build.mjs`, no framework): stamps 102 pages — every page gets unique title + bilingual meta description + Open Graph + Twitter cards + JSON-LD (`Person` with `alternateName: 張可澄`, `LocalBusiness`, `BreadcrumbList`, `ImageGallery` per event) + canonical. Also emits `sitemap.xml`, `robots.txt`, `_redirects` (old junk URLs → 301), `_headers` (immutable font caching, security headers), favicon set.
4. **CSS ~19 KB, JS ~5 KB.** Total interactive code shipped is smaller than the old site's *smallest single plugin file*.
5. SEO bonus: her Chinese name **張可澄 appeared nowhere on the old site** — anyone googling "張可澄 司儀" couldn't find her. It's now in titles, meta, JSON-LD, the About intro and footer.

→ Photos 2, 3, 4, 6, 7, 8, 9 here.

## Chapter 4 — Two debugging war stories (the fun part)

**The phantom 6.5-second LCP.** After the rebuild, Lighthouse's simulated-throttling mode insisted LCP was 6.5s with a "5-second render delay" — yet its **own filmstrip showed the hero fully painted at 1.9s**, and a real DevTools-throttled trace (4× CPU, Slow 4G) measured LCP at **207 ms**. Hours of variant-testing (killing animations, inlining CSS, swapping test servers — python's `http.server` speaks HTTP/1.0 with no keep-alive, which distorts the simulator further) proved it's a measurement artifact, not a real delay. Lesson: **when a metric looks wrong, check the filmstrip and a real trace before "optimizing"** — the score was lying, the pixels weren't. Verdict deferred to PageSpeed Insights on the live CF deployment.

**The CHŒUNG bug.** After launch-review, Krystle's surname rendered as "CHŒUNG" — H and E fused. First guess: an OpenType ligature in Cinzel Decorative → disabled ligatures → still fused. A five-row test matrix in the browser (default / kerning off / uppercase / all features off / letter-spaced) isolated the real cause: **a faulty negative kerning pair in the font file Google serves** — kerning yanked the E inside the H, and letter-spacing doesn't neutralize kerning. `font-kerning: none` on the hero title fixed it. Lesson: fonts are data, and data has bugs.

→ Photo 10 here.

## Chapter 5 — Results

| Metric (throttled mobile) | WordPress | Static rebuild |
|---|---|---|
| Lighthouse SEO | 85 | **100** (every template) |
| Accessibility | 94 | **100** |
| Best Practices | 96 | **100** |
| First Contentful Paint | 10.3 s | **1.7 s** |
| Speed Index | 10.3 s | **2.5 s** |
| Total Blocking Time | 20 ms | 40 ms (both negligible — green is <200 ms) |
| Real-trace LCP (4× CPU, Slow 4G) | — | **~0.2 s** |
| Homepage requests | 122 | ~44 |
| Fonts | 872 KB / 17 req / third-party | ~390 KB / 5 req / self-hosted |
| JS shipped | ~700 KB incl. React+jQuery | **~5 KB vanilla** |
| Events a visitor can actually see | 9 of 85 | **85 of 85** |

QA: 815 internal URLs across all 102 pages — 0 broken; filter/load-more/lightbox exercised in a real browser; desktop + mobile visually diffed against the original's screenshots.

**Status:** built and QA'd; Cloudflare Worker/Pages deploy config ready (`npm run build` → `npx wrangler deploy`); krystle.hk still serves the old WP site until DNS cutover — full WP backup first, then flip, then Search Console.

## Blog angles worth pulling out

- "Your WordPress site may be hiding your content and you'd never know" — the stale-nonce + page-cache 403 is a *silent* failure mode; the button looked fine.
- The absurdity audit: React, ReactDOM, lodash, WooCommerce cart JS, and a contact-form plugin — all shipped on every page of a site with no shop and no forms.
- Static-site-from-data pattern: 101 "native HTML" pages without maintaining 101 files — one JSON + one 400-line build script; adding a future menu item (Coaching, EMCEE) is a one-line nav change.
- CJK font subsetting is the single biggest HK/TW perf lever: full Noto Sans TC = the whole old font bill; subset to used glyphs = 272 KB with the variable weight axis intact.
- Agentic workflow: the AI audited the live site in a real browser (found the 403 by watching network requests), replayed the theme's own REST API to recover all 85 grid entries, then generated + QA'd the rebuild — screenshots at every step.
- Don't trust one number: simulator LCP said 6.5s, the filmstrip said 1.9s, a real trace said 0.2s.

## Fact-check corner (for the post)

- Krystle: Krystle Stephanie Cheung 張可澄, bilingual (廣東話/English/普通話) MC, 5,000+ events hosted, HK MC Competition champion; entity MC KRYSTLE COMPANY LIMITED; IG @mc_krystle.
- Site: krystle.hk — 3 main pages + 85 event pages + 13 category pages; hosted on Hostinger (LiteSpeed) pre-revamp.
- Rebuild artifacts: `site/` (102 pages, 52 MB), `site-src/` (data JSONs, build.mjs, 19 KB CSS, 5 KB JS, font subsets, sharp pipeline), full audit trail in `audit/`.
- Numbers above are from Lighthouse 12 runs stored in `audit/lighthouse/` (before: `home-mobile-throttled.json`, after: `NEW-home-mobile.json`).
