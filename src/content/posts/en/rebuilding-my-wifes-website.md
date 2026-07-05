---
title: "Her website was hiding 76 of her 85 events — so we rebuilt it in a weekend"
description: "My wife's WordPress portfolio scored 56 on Lighthouse, took 13.8s to paint, and silently hid 89% of her work. One weekend with an AI agent later: 102 pages of hand-rolled static HTML, SEO 100, first paint 1.7s — same design, same URLs."
pubDatetime: 2026-07-05T21:30:00+08:00
ogImage: ../../../assets/images/krystle-banner.png
draft: false
tags:
  - tech
  - ai
---

![WordPress to static HTML — my wife's website rebuilt in a weekend: SEO 56 to 100, first paint 10.3s to 1.7s, events visible 9 to 85](../../../assets/images/krystle-banner.png)

My wife **Krystle (張可澄)** is a professional bilingual MC in Hong Kong — five thousand-plus events, a Hong Kong MC Competition championship, the works. Her portfolio site is how new clients find her.

Last weekend I finally looked under its hood. It ran WordPress + Elementor + a heavy theme, scored **56 on Lighthouse** with a **13.8-second** largest paint, and — the part that actually hurt — had been **quietly hiding 76 of her 85 events from every visitor**, because of one broken button nobody noticed.

One Sunday evening with Claude Code later: the whole thing is rebuilt as **102 pages of dependency-free static HTML**. Same design, same URLs. **SEO 100 · Accessibility 100 · Best Practices 100**, first paint **1.7s**, zero broken links.

Here's the before and after — and the story in between.

![The original WordPress homepage, full page](../../../assets/images/krystle-01-before-home-fullpage.jpg)

*The original WordPress homepage…*

![The rebuilt static homepage — visually the same site](../../../assets/images/krystle-02-after-home-fullpage.jpg)

*…and the rebuild. Visually the same site — that was the brief. Everything underneath changed.*

## Table of contents

## The audit: what was actually being shipped

First step: crawl the sitemap, download all 101 pages and 2,186 asset files (223 MB), screenshot everything, and run a throttled Lighthouse baseline.

The homepage alone shipped **20 CSS files, 70 JS files — 122 requests, 2.2 MB**. That included React, ReactDOM and lodash on every page… loaded by WooCommerce, for a shop with **zero products**. And Contact Form 7, for a site with **zero forms**. Nobody had chosen any of this; it's just what accumulates when a theme, a page builder and a decade of plugins each bring their friends.

Fonts were their own small disaster: **872 KB across 17 requests** — every weight of Noto Sans TC, Montserrat and Roboto, mostly unused.

### The bug nobody noticed

The audit's real find wasn't the weight. Driving a real browser against the live site, watching the network tab, one request kept failing:

`wp-json/cassia/v1/get-posts → 403`

The theme's "Load More" button fetched events through a REST call protected by a **security nonce baked into the cached page**. The cache plugin kept pages longer than nonces live. So for real visitors, the nonce was always stale, the endpoint always returned 403 — and the portfolio silently stopped at the first **9 of 85 events**.

![The original portfolio grid — visitors only ever saw these first nine events](../../../assets/images/krystle-05-before-portfolio.jpg)

*What every visitor saw: nine events, and a Load More button that looked fine and did nothing.*

> [!warning] Silent failure is the expensive kind
> The button rendered. Nothing errored on screen. It had probably been broken for a long time — and 89% of her portfolio was invisible the whole while. If your site loads content with a button or an infinite scroll, go and actually click it in a private window.

The supporting cast: the footer logo linked to the **theme vendor's demo site** on every page, both "Read More" buttons had **empty hrefs**, there were no meta descriptions, no Open Graph, no structured data, and the homepage title was just "Krystle".

## The plan: same site, a hundredth of the code

The brief was strict on purpose. Same look. Same pages. **Same URLs** — nothing 404s, the Google index survives. No redesign. Just take everything the WordPress stack did with plugins, and do it with almost nothing:

| WordPress (heavy) | Rebuild (light) |
| :--- | :--- |
| Slider Revolution hero (~700 KB JS) | one composed image + CSS-positioned text layers |
| jQuery + GSAP scroll animations | ~30 lines of IntersectionObserver + CSS transitions |
| Isotope filter + AJAX "Load More" (the broken one) | all 85 cards in the DOM; filter = show/hide — no network |
| Magnific Popup lightbox | native `<dialog>` + ~40 lines of JS |
| Google Fonts: 17 requests, 872 KB | self-hosted subsets: 5 files, 392 KB |
| WooCommerce / CF7 / Instagram plugins | deleted; junk URLs 301'd |

![Hero section: WordPress original on the left, static rebuild on the right](../../../assets/images/krystle-03-hero-before-after.jpg)

*Fidelity check — original left, rebuild right.*

## The build

The architecture is one idea: **hand-written templates + a small Node build script + JSON data files**. Python scripts parsed the downloaded WordPress HTML into clean JSON — nav, hero, testimonials, the 84-logo client wall, and per-event data. (A nice irony: the theme's own REST endpoint, replayed with a fresh nonce via curl, happily returned all 85 grid entries — the same API that was failing for every real visitor.)

Then `build.mjs` stamps out all **102 pages**: every one with a unique title, bilingual meta description, Open Graph tags, and JSON-LD — `Person`, `LocalBusiness`, `BreadcrumbList`, an `ImageGallery` per event. A [sharp](https://sharp.pixelplumbing.com/) pipeline generated **805 image derivatives** (WebP grids, two gallery sizes, og:images) from the 397 originals.

![The rebuilt hero — one composed image and HTML text layers instead of a 700 KB slider plugin](../../../assets/images/krystle-04-after-hero.jpg)

*The 700 KB slider plugin, replaced by an image and some absolutely-positioned text.*

The new "Load More" is my favourite part, because it *cannot* break the way the old one did. All 85 cards are already in the DOM; the button just un-hides nine more. This is the actual shipped code, lightly trimmed:

```js
// portfolio filter + load-more (all cards are in the DOM; no network)
var PAGE = 9, shown = PAGE, active = '*';

function apply() {
  var vis = 0;
  cards.forEach(function (c) {
    var match = active === '*' ||
      (' ' + c.getAttribute('data-cats') + ' ').indexOf(' ' + active + ' ') > -1;
    c.classList.toggle('hide', !(match && vis < shown));
    if (match) vis++;
  });
}

more.addEventListener('click', function () { shown += PAGE; apply(); });
```

No nonce, no cache, no endpoint. Nothing to 403.

![Rebuilt portfolio — all 85 events pre-rendered, filter and load-more purely client-side](../../../assets/images/krystle-06-after-portfolio.jpg)

*All 85 events, actually reachable.*

![One of the 85 generated event pages with its lightbox gallery](../../../assets/images/krystle-07-after-event-page.jpg)

*One of the 85 generated event pages — native `<dialog>` lightbox, ImageGallery JSON-LD.*

The whole site now ships **~19 KB of CSS and ~5 KB of JavaScript** — less interactive code than the old site's smallest single plugin file.

One SEO fix I care about more than the scores: her Chinese name **張可澄 appeared nowhere on the old site**. Anyone googling 「張可澄 司儀」 couldn't find her. It's now in the titles, the meta, the About page and the JSON-LD `alternateName`.

![Rebuilt About page — bio, credentials, and her Chinese name finally on the site](../../../assets/images/krystle-08-after-about.jpg)

*The About page — with 張可澄 on the site at last.*

## Two debugging war stories

**The phantom 6.5-second LCP.** After the rebuild, Lighthouse's simulated-throttling mode insisted LCP was 6.5s with a five-second "render delay". Its **own filmstrip showed the hero fully painted at 1.9s**, and a real DevTools-throttled trace (4× CPU, Slow 4G) measured LCP at **207 ms**. Hours of variant-testing — killing animations, inlining CSS, swapping test servers (fun fact: Python's `http.server` speaks HTTP/1.0 with no keep-alive, which distorts the simulator further) — proved it was a measurement artifact.

> [!tip] Don't optimize a number you haven't cross-examined
> Simulator said 6.5s. Filmstrip said 1.9s. Real trace said 0.2s. When a metric contradicts the pixels, check the filmstrip and a real trace before "fixing" anything — the score was lying, the page wasn't.

**The CHŒUNG bug.** In final review, Krystle's surname rendered as "CHŒUNG" — the H and E fused into one glyph. First guess: an OpenType ligature. Disabled ligatures — still fused. A five-row test matrix in the browser isolated the truth: **a faulty negative kerning pair in the font file itself**, yanking the E inside the H. And letter-spacing doesn't neutralize kerning — kerning applies underneath it.

![Debugging CHŒUNG: a test matrix isolating a faulty kerning pair in the font itself](../../../assets/images/krystle-10-cheung-kerning-debug.jpg)

*The five-row matrix that found it: default / ligatures off / uppercase / all features off / letter-spaced.*

The fix, from the shipped CSS:

```css
.hero-text h1 {
  font-kerning: none;   /* the font's kern pair is faulty — H+E collide */
}
```

Fonts are data, and data has bugs.

## The results

| Metric (throttled mobile) | WordPress | Static rebuild |
| :--- | :--- | :--- |
| Lighthouse SEO | 85 | **100** (every template) |
| Accessibility | 94 | **100** |
| Best Practices | 96 | **100** |
| First Contentful Paint | 10.3 s | **1.7 s** |
| Speed Index | 10.3 s | **2.5 s** |
| Real-trace LCP (4× CPU, Slow 4G) | — | **~0.2 s** |
| Homepage requests | 122 | ~44 |
| Fonts | 872 KB · 17 req · third-party | **392 KB · 5 req · self-hosted** |
| JavaScript shipped | ~700 KB incl. React + jQuery | **~5 KB vanilla** |
| Events a visitor can actually see | 9 of 85 | **85 of 85** |

QA before calling it done: all **815 internal URLs** across the 102 pages checked — zero broken; filter, load-more and lightbox exercised in a real browser; desktop and mobile visually diffed against the original's screenshots.

![Mobile: original on the left, rebuild on the right](../../../assets/images/krystle-09-mobile-before-after.jpg)

*Mobile, before and after.*

Then came the boring-but-scary step — full WordPress backup, then the DNS flip to Cloudflare. **The site is live.** Which means the referee I deferred to earlier finally got its say.

### The live scoreboard

Hours before the cutover, we ran PageSpeed Insights against the old site one last time:

![PageSpeed Insights on the old WordPress site: Performance 57, Accessibility 94, Best Practices 100, SEO 85](../../../assets/images/krystle-11-psi-before.jpg)

*The old site, measured live by PSI just before the cutover: 57 / 94 / 100 / 85 — independently confirming what the local audit found.*

And the same test, on the live rebuild:

![PageSpeed Insights on the live rebuilt site, mobile: Performance 90, Accessibility 100, Best Practices 100, SEO 100](../../../assets/images/krystle-12-psi-after-mobile.png)

*Mobile: 90–95 depending on the run (PSI wobbles a few points between runs) — with 0 ms blocking time, 0.005 layout shift, and 100s everywhere else.*

![PageSpeed Insights on the live rebuilt site, desktop: 100 across all categories, FCP 0.3s, LCP 0.6s](../../../assets/images/krystle-13-psi-after-desktop.png)

*Desktop: a straight 100 across the board — first paint 0.3 s, LCP 0.6 s.*

And the phantom 6.5-second LCP from the war story? On the live site, PSI measures mobile LCP at 2.9–3.7 s (a hero photo on a simulated slow phone) and desktop at 0.6 s. The artifact stayed in the lab.

## The quieter win: content you can bulk-edit

There's one more reason leaving WordPress mattered, and it has nothing to do with scores.

Krystle's business is growing, and growth means **bulk changes**: re-categorising a batch of events, swapping a season of photos, adding a stack of new events after a busy quarter. In WordPress + Elementor, that means opening 85 pages one at a time and clicking through a page builder in each — which is why those edits kept *not happening*.

In the rebuild, content is **data**. The 85 events live in JSON files; the pages are stamped by the build script. A bulk change is a search-and-replace — or a five-line script — followed by one build command, and every affected page is re-stamped in seconds, each with its metadata and structured data kept consistent automatically.

The site got faster for visitors. But it also got faster to *change* — and for a growing business, the second one may matter more.

## What this actually demonstrates

This is the same story I keep telling clients about AI adoption, just closer to home. The agent did the parts that never get done because they're tedious: crawling every page, watching every network request (that's how the 403 surfaced), replaying an API, generating 805 image variants, stamping 102 pages, checking 815 links. I did the parts that need taste and judgment: what to keep, what to cut, which bugs mattered, when "the score is lying" — and the final say on my wife's public face.

Neither of us could have shipped this in a weekend alone. That's the whole point.

> [!note] The honest caveats
> A static rebuild fits this site because the content changes a few times a year, and adding an event is one JSON entry + one build command. If she needed daily self-service editing, the answer would look different. Right tool, this job.

And the metric I actually care about isn't in the table: someone who hires MCs can now see **all eighty-five events**, on a site that paints in under two seconds, and 「張可澄」 finally finds her.

*Got a site that's slower — or quieter — than it should be? I'm happy to take a look — [email me](mailto:nam@wistkey.com).*
