# Part IV source notes — "The site is live. Then my wife sent me a WhatsApp message."
*Source material for the 4th post in the "Rebuilding my wife's website" series (parts 1–3 published 2026-07-06). Everything below happened AFTER launch, on the live site. Photos already in `src/assets/images/` as `krystle-14..17-*`.*

## Suggested angle

Parts 1–3 ended with the rebuild deployed. Part 4 is the reality-check chapter: **what shipping teaches you that QA can't.** Three post-launch stories, each with a concrete fix, each blog-friendly:

1. A WhatsApp share that looked embarrassing (→ designing a link-preview banner)
2. A layout bug QA never caught because nobody tested 768px (→ art direction ≠ responsive resizing)
3. Finally cornering the phantom Lighthouse LCP from Part 1's caveat (→ how lab simulation actually works, and when to stop trusting it)

**STATUS: Part 4 was written and published 2026-07-06 from these notes.** The bilingual-mirror story that briefly lived here as "Story 4" has its own source file now → `krystle-revamp-PART5-SOURCE.md`.

Callback hooks to earlier parts: Part 2 fixed what visitors saw; Part 3 fixed what Google saw; **Part 4 fixes what friends see when Krystle shares her own site in a chat.**

Note: Part 3's teaser promised a 「張可澄 司儀」 *ranking* follow-up — indexing/ranking data needs weeks in Search Console to be worth writing about. Either open Part 4 by saying the ranking check is coming later (keeps the promise honest), or fold in whatever GSC shows at writing time if it's already interesting.

## Photo table

| File | Caption suggestion | Section |
|---|---|---|
| `krystle-14-og-banner.jpg` | The 1200×630 link-preview banner — rendered from the live hero itself, so the fonts are pixel-identical | story 1 |
| `krystle-15-tablet-bug-before.jpg` | The bug: on tablets, the phone composition loaded with her name typeset across her face | story 2 |
| `krystle-16-tablet-fixed-after.jpg` | The fix: 601–1024px now gets the tablet composition, text in the clear space | story 2 |
| `krystle-17-mobile-hero-final.jpg` | Final phone hero after type tuning — name over the soft watercolor, face clear | story 2 |
| (Nam's own screenshot) | The WhatsApp message that started it: a bare, imageless preview of www.krystle.hk | opening — **Nam: drop in your phone screenshot, it's the perfect cold open** |

Reusable from earlier parts if needed: `krystle-10-cheung-kerning-debug.jpg` (Part 2 callback), `krystle-12/13-psi-*.png` (scores).

## Story 1 — The WhatsApp preview (task: "make sharing her site look like promoting her")

- Krystle shared `www.krystle.hk` in WhatsApp → the preview card was **bare**: bold URL as the "title", no image, no description. For an MC whose business spreads by referral chat messages, the preview IS the business card.
- Diagnosis (all checked live with the actual crawler user-agents):
  - `facebookexternalhit/1.1` and `WhatsApp/2.x` both got 200 + full OG tags from apex AND www → not blocked, not missing tags (the rebuild shipped them in Part 3).
  - The og:image existed (200, 25 KB, 1200×590) → not broken.
  - **Root cause #1: WhatsApp's preview cache.** The link had been shared before the DNS cutover, when the old WordPress site (zero OG tags) was still answering. WhatsApp/Facebook cache per-URL previews aggressively; the bare card was a fossil of the old site.
  - **Root cause #2: the og:image was weak anyway** — a hero crop that was ~60% empty watercolor wash; centre-cropped to a chat thumbnail it showed… nothing.
- The fix, part A — **a real promo banner.** Neat trick worth a paragraph: instead of composing a card in an image editor (and hunting for font files), we **rendered it from the live site itself** — loaded the homepage in a headless browser at exactly 1200×630, hid the nav, injected one extra line (張可澄 · 香港專業雙語司儀), and screenshotted. Pixel-identical brand fonts (Cinzel Decorative! the kerning fix from Part 2 included!) for free. 49 KB JPEG — comfortably under WhatsApp's ~300 KB large-preview limit.
- The fix, part B — **complete image metadata + a fresh URL**: `og:image` → `/img/og/banner-krystle.jpg` (new filename = cache bust), plus `og:image:width/height/type/alt` and `og:image:secure_url`. Home/about/portfolio/404 use the banner; the 85 event pages keep their own event photo as og:image (an event link shared in chat shows THAT event — better promo than a generic banner), now with per-event alt text.
- The last mile is human: WhatsApp still holds old cached previews per-URL. Remedies: share into a different chat, or Facebook's Sharing Debugger → "Scrape Again" (WhatsApp rides Facebook's crawler infrastructure).
- Bonus detail: the www-vs-apex red herring — the screenshot showed `www.krystle.hk`, both hosts serve the site fine; canonical/og:url point to apex. Easy to burn 20 minutes suspecting the subdomain.

## Story 2 — The 768px bug nobody tested

- Post-launch mobile audit of the LIVE site: phones (390px) fine, desktop fine… **iPad portrait (768px): the phone hero composition loaded with the title typeset straight across Krystle's face**, text clipping off-screen.
- Why QA missed it: testing covered "mobile" (390) and "desktop" (1440) — the classic two-device blind spot. 601–1024px is a real audience (iPads, landscape phones, small laptops).
- Why it happened (the actual lesson): **art direction ≠ responsive resizing.** The hero isn't one image scaling down — it's three *different compositions* (desktop: her left / text right; tablet: her left, MORE headroom; phone: portrait crop / text on top). The original designer had made all three; the rebuild's `<picture>` breakpoints mapped the phone composition to everything ≤900px. Text positioned for the phone image landed on the tablet-size render of that phone image… on her face.
- Fix: proper three-way art direction — `<source media="(max-width:600px)">` phone comp with text on top, `(max-width:1024px)` tablet comp with text right of her, desktop above; matching CSS text positions per range; per-source `width/height` attributes so there's zero layout shift. Phone type also tuned (the full 1:1.39 composition now shows uncropped, so her face sits lower and the name only grazes hair, matching the original's overlap level).
- Nice metric for the post: the fix is ~15 lines of CSS + 2 HTML attributes. Finding it required looking at one viewport nobody looks at.

## Story 3 — Cornering the phantom LCP (resolves Part 1's open caveat)

- The caveat from Part 1: Lighthouse said LCP 6.5s, its own filmstrip showed 1.9s, a real trace said 0.2s. Post-launch reality: **Google's PSI on the live site never showed the phantom** (mobile 90–95, LCP 2.9–3.7s; desktop 100, LCP 0.6s — the screenshots published in Part 1/3 as krystle-12/13). But a stock `lighthouse` CLI run against the same live URL still modeled 7.4s — same page, same network, two "lab" numbers 4 seconds apart. That contradiction is the story.
- The observed-metrics smoking gun in the report: `observedLoad: 344ms` but `observedFirstPaint: 1334ms` — everything painted at once, and the SIMULATOR multiplied whatever that single paint depended on.
- The bisection (fun to narrate): 11 test variants — kill animations? no. Kill the marquee? no. Inline the CSS? worse. Single hero image instead of `<picture>`? no. Drop font preloads? no. `font-display: optional`? no. Load fonts via JS after `window.load`? STILL 6.5s. Remove `@font-face` entirely → **1.35s.**
- Root cause: **Lighthouse's Lantern simulator builds a "pessimistic" dependency graph for LCP that includes every network request in flight before the paint.** A 272 KB Chinese font subset (+ four latin subsets) on simulated Slow-4G ≈ seconds of modeled delay glued onto the LCP — no matter what `font-display` says, no matter that real browsers paint immediately with the fallback and swap invisibly.
- The kicker: the metrics aren't even internally coherent — removing fonts made simulated FCP *worse* while fixing LCP. At that point you're not optimizing a website, you're optimizing a model's opinion.
- Resolution: keep the real-UX-optimal font strategy (preload + swap; FCP 1.7s), trust the three measurements that agree (filmstrip, DevTools trace, field data), let CrUX field numbers accumulate — that's what Google actually ranks on. Chinese-font sites hit this simulator tension universally; worth saying loudly for the HK/TW dev audience.
- Related live-only quirk: Lighthouse SEO reads 92 on the live site vs 100 locally — Cloudflare edge-injects a `Content-Signal: search=yes,ai-train=no` line into robots.txt (their AI-crawl-control feature); Lighthouse flags the unknown directive. One dashboard toggle restores 100. Meta-observation for the post: even your CDN edits your site now.

## Status / facts to close the post

- Live: krystle.hk + www on Cloudflare (Git-connected Worker; push-to-deploy). Banner live at `/img/og/banner-krystle.jpg` (200, 50 KB), tablet fix in production CSS — verified same afternoon.
- The rebuild workflow held up in anger: bug report (WhatsApp screenshot) → fix → `git push` → live in ~1 minute, all in one sitting.
- Numbers recap available in parts 1–3; don't repeat, link back.
- Series arc closer: the site now looks right on every screen INCLUDING the ones nobody tests, and sharing it in a chat finally looks like what it is — promoting Krystle.

## Fact-check corner

- WhatsApp large preview: og:image must be reachable to facebookexternalhit, < ~300–600 KB (ours: 49 KB), ratio ~1.91:1 (ours: exactly 1200×630); previews cached per-URL; FB Sharing Debugger "Scrape Again" refreshes.
- Tablet fix commit: `834cbfd` "Fix tablet hero art direction + add OG promo banner for link previews" (pushed by Nam 2026-07-06).
- LCP evidence files: `15_Krystle.hk_revamp/audit/lighthouse/LIVE-home-mobile.json` (observed vs simulated metrics), bisection results in session notes / BUILD-REPORT.md update section.
- 張可澄 line on the banner: 張可澄 · 香港專業雙語司儀.
