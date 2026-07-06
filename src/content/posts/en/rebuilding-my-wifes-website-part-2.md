---
title: "Rebuilding my wife's website, Part II: the SEO story — 76 hidden events, and a name Google couldn't find"
description: "Her site was quietly hiding 89% of her portfolio behind a broken button, had no meta descriptions, no structured data — and her own Chinese name appeared nowhere. How the rebuild took SEO from 85 to 100 on every page."
pubDatetime: 2026-07-06T00:20:00+08:00
ogImage: ../../../assets/images/krystle-seo-banner.png
draft: false
tags:
  - tech
  - ai
---

![Part II, the SEO story — events visible 9 to 85, pages with JSON-LD 0 to 102, Lighthouse SEO 85 to 100](../../../assets/images/krystle-seo-banner.png)

In [Part I](/posts/rebuilding-my-wifes-website-part-1/), we rebuilt my wife Krystle's WordPress portfolio as 102 pages of static HTML — first paint went from 10.3 s to 1.7 s. But speed was never the painful part of the audit.

The painful part: her site had been **quietly hiding 76 of her 85 events from every visitor** — and from every search engine that renders JavaScript. And even the pages Google *could* see were telling it almost nothing: no meta descriptions, no structured data, a homepage titled just "Krystle" — and her Chinese name, **張可澄**, appearing nowhere at all.

This is Part II: what was invisible, why, and how the rebuild took Lighthouse SEO from **85 to 100 on every one of the 102 pages**.

## Table of contents

## The invisible portfolio

Driving a real browser against the live site with the network tab open, one request kept failing:

`wp-json/cassia/v1/get-posts → 403`

The theme's "Load More" button fetched events through a REST call protected by a **security nonce baked into the cached page**. The cache plugin kept pages longer than nonces live. So for real visitors the nonce was always stale, the endpoint always returned 403 — and the portfolio silently stopped at the first **9 of 85 events**.

![The original portfolio grid — visitors only ever saw these first nine events](../../../assets/images/krystle-05-before-portfolio.jpg)

*What every visitor saw: nine events, and a Load More button that looked fine and did nothing.*

> [!warning] Silent failure is the expensive kind
> The button rendered. Nothing errored on screen. It had probably been broken for a long time — and 89% of her portfolio was invisible the whole while. If your site loads content with a button or an infinite scroll, go and click it in a private window today.

For an MC, the portfolio *is* the sales pitch. A client searching for "wedding MC" or "corporate emcee" experience saw a ninth of it.

## What else the site wasn't telling Google

The hidden events were the dramatic find, but the audit's SEO list was long and mundane:

- **No meta descriptions. Anywhere.** Google was left to improvise every snippet.
- **No Open Graph or Twitter cards** — shared links rendered as bare URLs.
- **No structured data at all** — no `Person`, no `LocalBusiness`, nothing for a business whose entire premise is *a person providing a local service*.
- The homepage title was just **"Krystle"**.
- The footer logo linked to the **theme vendor's demo site** on every page — leaking link equity sitewide, on every single page, to a template company.
- Both "Read More" buttons had **empty hrefs**.
- The sample post `hello-world` was still live and indexable, along with WooCommerce cart/checkout pages for a shop with no products.
- And the name thing: anyone searching **「張可澄 司儀」** — her actual name plus "MC" — could not find her, because 張可澄 wasn't on the site. Not in the titles, not in the text, not in the code.

None of these is exotic. That's the point — this is what an unaudited site accumulates.

## The fix, piece by piece

### Same URLs, so the index survives

Rule one of the rebuild: **every existing URL keeps working**. Google's index of the site carried over intact — no 404s, no rank roulette from a migration. The junk that shouldn't have been indexed (`hello-world`, cart, checkout) got **301s** to sensible destinations.

### A Load More that cannot fail

The rebuilt portfolio pre-renders **all 85 events in the HTML**. The filter shows and hides; the button un-hides nine more. This is the actual shipped code, lightly trimmed:

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

No nonce, no cache, no endpoint — nothing to 403. And because the content is in the HTML, a crawler doesn't need to click anything to see all 85 events.

![Rebuilt portfolio — all 85 events pre-rendered, filter and load-more purely client-side](../../../assets/images/krystle-06-after-portfolio.jpg)

*All 85 events, actually reachable — by humans and by crawlers.*

### Every page tells Google what it is

The build script stamps each of the 102 pages with a unique title, a **bilingual meta description**, Open Graph + Twitter cards, and a canonical URL. And structured data everywhere it means something:

- **`Person`** — with `alternateName: 張可澄`, linking her English and Chinese identities
- **`LocalBusiness`** — she is one
- **`BreadcrumbList`** — on every nested page
- **`ImageGallery`** — one per event page, describing the photos

![One of the 85 generated event pages with its lightbox gallery](../../../assets/images/krystle-07-after-event-page.jpg)

*Each of the 85 event pages: unique title, description, canonical, and its own ImageGallery markup.*

Because pages are stamped from data by one script, this metadata **cannot drift**: a new event added to the JSON gets all of it automatically. (That's the bulk-editing win from Part I wearing its SEO hat.)

### The name

張可澄 is now in the titles, the meta descriptions, the About page, the footer, and the JSON-LD. Someone searching her Chinese name finally lands on her own site — instead of nothing.

![Rebuilt About page — bio, credentials, and her Chinese name finally on the site](../../../assets/images/krystle-08-after-about.jpg)

*The About page — with 張可澄 on the site at last.*

## The scoreboard

| | WordPress | Static rebuild |
| :--- | :--- | :--- |
| Lighthouse SEO | 85 | **100** (every template) |
| Events a visitor — or crawler — can see | 9 of 85 | **85 of 85** |
| Pages with meta descriptions | 0 | **102** |
| Pages with structured data | 0 | **102** |
| Social share cards | none | **all pages** |
| 張可澄 findable on the site | no | **yes** |
| Junk URLs indexed (cart, hello-world) | yes | **301'd** |

Independently confirmed on the live site — the old site's last PSI run hours before cutover, and the rebuild after:

![PageSpeed Insights on the old WordPress site: Performance 57, Accessibility 94, Best Practices 100, SEO 85](../../../assets/images/krystle-11-psi-before.jpg)

*The old site, live, hours before the DNS flip: SEO 85.*

![PageSpeed Insights on the live rebuilt site, desktop: 100 across all categories](../../../assets/images/krystle-13-psi-after-desktop.png)

*The rebuild, live: SEO 100 — alongside 100s everywhere else.*

> [!note] What's left is patience
> Rankings don't move overnight. The index has the same URLs with much better signals; now it's Search Console, and waiting — while watching whether 「張可澄 司儀」 starts surfacing her. That's a future part of this series.

## The takeaway

Nothing in this post is advanced SEO. No tricks, no "hacks" — just a site that finally *shows its content* and *describes itself accurately*, on every page, automatically. Most small-business sites don't have an SEO strategy problem; they have a "Google literally cannot see the good stuff" problem.

Fix the visibility first. The strategy can come after.

---

**This series:** [Part I — WordPress → static HTML, and the honest pros and cons](/posts/rebuilding-my-wifes-website-part-1/) · Part II — you're here · Parts III and IV are on the way.

*Suspect your site is hiding things from Google? I'm happy to take a look — [email me](mailto:nam@wistkey.com).*
