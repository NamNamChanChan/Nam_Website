# Part V source notes — "We made the site bilingual in one sitting. It used to take a village."
*Source material for the 5th post in the "Rebuilding my wife's website" series (parts 1–4 published 2026-07-06). Topic: the full English mirror of krystle.hk — and Nam's explicit core angle: **how absurdly easy adding a language has become compared to the old days, when it needed a product manager, programmers, QA, and a UI designer worrying about string lengths.***

## The one-line story

krystle.hk went from Chinese-only to fully bilingual — every one of its 102 pages mirrored under `/en/`, 204 pages total, with real in-context translation, hreflang plumbing, a language switcher that keeps your place, and typography tuned per language — in **one sitting with an AI agent**. Fifteen years ago this exact deliverable was a quarter-long, five-role project. That delta is the post.

## Photo

| File | Caption suggestion |
|---|---|
| `krystle-19-english-home.jpg` | The English mirror live at [krystle.hk/en/](https://krystle.hk/en/) — HOME · ABOUT · PORTFOLIO · COURSES, 中文 switcher top-right, same design, same speed |

Consider a second visual: a side-by-side of the same event page zh vs en (easy to screenshot at writing time: `/portfolio-item/party-lny/` vs `/en/portfolio-item/party-lny/`), and/or a snippet of `i18n.json` next to the two rendered pages — "this file IS the localization project".

## What shipped (facts, all verified live)

- English mirror under `/en/` of the entire site: home, about, portfolio, **85 event pages**, **13 category pages**, 404 — 102 zh + 102 en = **204 pages**.
- One new source file: `site-src/data/i18n.json` — English UI strings, SEO titles/descriptions, the about-page bio, all 9 client testimonials, 13 category labels, and **85 individual event-title translations**.
- Language switcher in header + mobile menu that **preserves the equivalent deep path**: switch on event #47's page, land on event #47 in the other language.
- The invisible-but-critical SEO layer, generated mechanically for every page pair: localized `<html lang>`, per-language canonical, `hreflang` alternates (zh-HK / en-HK / x-default), `og:locale`, localized breadcrumbs/JSON-LD, and a sitemap carrying `xhtml:link` alternates for all 202 indexable URLs.
- English-specific typography rules (see "the string-length section" below).
- Validation before deploy: 204 pages built, internal link check **0 broken across all 204**, smoke tests on paired zh/en pages. Push → live in ~a minute (the Part-4 workflow).
- Bonus visible in the screenshot: the nav also gained **Courses (課程)** — the "future menu item" the original architecture reserved space for in the very first planning doc. It landed exactly as promised: a data change, not a redesign.

## THE CORE ANGLE — what this used to cost (write this section big)

Anyone who shipped localization at a 2000s–2010s company knows the ritual. "Add English to the website" was a *project* with a cast:

- **A product manager** to scope which pages, write the spec, chair the weekly localization sync, and negotiate which market "owns" ambiguous strings.
- **Programmers** to retrofit an i18n framework first — weeks of extracting thousands of hardcoded strings into resource files (gettext/.po, properties files, spreadsheet exports) before one word could be translated. Every string ID a tiny negotiation.
- **A translation vendor** working from that spreadsheet with zero page context — producing the classic howlers ("Home" as 住宅, button labels translated as full sentences) that then round-trip through review cycles measured in weeks.
- **A UI designer** auditing every screen for **string-length blowups** — the eternal localization tax: the Chinese label is 4 characters, its English is 30; now the button truncates, the nav wraps to two lines, the card layout explodes. Whole design-system guidelines existed just for "text expansion tolerance".
- **QA** regression-testing every page × every viewport × both languages — twice, because the first round of layout fixes broke the *other* locale.
- A release train to coordinate it all. Net: **months of calendar time, five-plus roles**, and forever after, two languages ≈ 1.7× the maintenance surface.

**What it took here:** one conversation. The AI agent had already read every page of the site (it *built* the site), so it translated **in context** — testimonials rewritten as natural English rather than word-for-word Cantonese (「好多謝Krystle喺我Big Day咁幫手！」 → prose an English reader would actually write), 司儀 rendered as "MC" not "ceremony master", and the gloriously long 「佐敦谷水道中秋綵燈展亮燈儀式及河道綠化體驗日」 given its full English name ("Jordan Valley Channel Mid-Autumn Lantern Exhibition Lighting Ceremony and River Greening Experience Day"). The i18n framework nobody had to retrofit was one JSON overlay plus a loop over locales in the 400-line build script. The hreflang/sitemap/switcher plumbing — the part agencies bill real money for — was generated mechanically. And QA was the same automated pass as always: 204 pages, 0 broken links, minutes.

**The string-length problem specifically** — the thing that used to occupy a designer for a sprint — became a *typography pass*: Chinese runs wide-tracked (the site's elegant 3px letter-spacing looks right on 中文 but gappy on English), so the English pages got their own letter-spacing and readability rules; and because the layouts were built to wrap gracefully (Part 2's flexible grid), event titles that **tripled in length** in English just… wrapped. No exploded cards. The screenshot-able proof: category label 「起動 / 開幕典禮」 (7 chars) vs "Kick-off & Opening Ceremonies" (29 chars) sitting happily in the same card meta slot.

**The honest nuance (keep it — it makes the claim credible):** the machine didn't replace *judgment*. Someone still decides that testimonials should sound like testimonials, that Krystle's brand voice in English is warm-professional, that 司儀 is "MC". What collapsed is the **coordination cost** — the five-role, multi-month relay race compressed into a conversation where the same participant holds the context of the translator, the programmer, the designer, and the QA. The marginal cost of a language dropped to "one JSON file"; the marginal cost of the NEXT language (Japanese? Putonghua-market simplified?) is now the same file again.

- Killer closing stat pairing: WordPress multilingual, the old way, usually meant a plugin (WPML — itself a paid, notoriously heavy add-on), double the database rows and another 20 points off the Lighthouse score. Here: same 100s, same sub-second paint, twice the pages, zero new dependencies.

## Series-arc hooks

- Part 1 promised the architecture would pay dividends ("data → build script"); Part 5 is the biggest dividend cashed so far: the 85 event pages didn't get translated one by one — **their template got a second voice.**
- Krystle's tagline is literally "Professional **Bilingual** Emcee" — the site finally practices what she performs. (Use this — it's the natural title/kicker.)
- Business case in one line: HK event bookers are bilingual, but corporate procurement, expat wedding couples and international brands (Nintendo, Disney, Liberty…) search in English — /en/ is for them, with hreflang making sure Google serves each audience the right one.
- Part 3's 「張可澄 司儀」 GSC ranking follow-up is STILL pending (needs weeks of data) — Part 5 can renew that promise; English-query coverage ("Hong Kong bilingual MC/emcee") now joins it as a second thing to measure.

## Fact-check corner

- Live: krystle.hk/en/ returns 200 with title "Krystle Cheung | Hong Kong Bilingual MC & Emcee"; hreflang zh-HK/en-HK/x-default verified in live HTML; switcher present both directions (中文 ↔ EN).
- Build facts: BUILD-REPORT.md § "Update 2026-07-06 — English `/en/` language mirror" in 15_Krystle.hk_revamp (204 pages, 0 missing internal refs, i18n.json contents list).
- English testimonial names on the live page are partially anonymized ("Wedding Client") vs Chinese originals (Toby/媛/Joey…) — deliberate choice in translation, worth keeping consistent if quoted.
- Don't overclaim the "one sitting" as one *prompt* — it was an afternoon's session including validation; the contrast with a multi-month cross-functional project holds effortlessly without exaggeration.
