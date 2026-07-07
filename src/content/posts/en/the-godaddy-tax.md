---
title: "The GoDaddy tax: what a domain should really cost — and where to actually buy it"
description: "A .com is a commodity — the same name, the same DNS, everywhere. So why does GoDaddy renew it at ~$22 when at-cost registrars charge ~$10? A look at the domain-registrar pricing spread, the teaser-and-renewal trap, and how to stop overpaying."
pubDatetime: 2026-07-08T02:00:00+08:00
ogImage: ../../../assets/images/the-godaddy-tax-cover.png
draft: false
tags:
  - business
  - tech
---

![The GoDaddy tax — what a domain should really cost, and where to actually buy it, with a receipt of stacked add-on charges](../../../assets/images/the-godaddy-tax-cover.png)

I run a small pile of domains — one per project, plus a few I'm sitting on. So once or twice a month a renewal notice lands, and a while back one of them made me actually read the number: a bog-standard `.com`, renewing for about **£17 / US$22**. The identical domain, at a couple of other registrars, renews for **half that**.

Same name. Same DNS. Same everything a domain actually *is*. The only difference was where I'd bought it. That gap has a name in my head now: **the GoDaddy tax** — and GoDaddy is just the most famous collector of it.

This isn't a hit piece; GoDaddy runs a slick, functional service and millions of people are happy on it. But if you're paying their prices without knowing the alternatives cost half as much, that's worth thirty seconds of your attention. Here's the honest comparison.

## Table of contents

## A domain is a commodity — so why the 2× spread?

Here's the thing people forget: **a registrar is a reseller.** Every `.com` in the world is ultimately administered by the same registry (Verisign), at the same wholesale price to every registrar — right around $10 a year. GoDaddy, Namecheap, Porkbun and the rest all buy from the same tap. What they sell you is a thin layer of dashboard, DNS management, and support on top.

So when one registrar charges $10 and another charges $22 for the *identical* product, the $12 difference isn't buying you a better domain. There's no such thing as a better `.com`. It's buying brand, marketing spend, and the assumption that you won't check.

> [!note] The tell: at-cost registrars exist and are fine
> The proof that ~$10 is the real price is that reputable registrars sell it at ~$10 all day and stay in business. If a domain genuinely cost $22 to provide, they couldn't. The extra is margin, not cost.

## What a `.com` renews for, by registrar

I pulled current renewal prices (mid-2026). I'm using **renewal**, not first-year, on purpose — see the next section for why. Rounded, in USD:

![Bar chart of .com renewal prices per year: GoDaddy about $22, Squarespace about $20, Namecheap about $18, Porkbun about $11, Spaceship about $10](../../../assets/images/the-godaddy-tax-prices.png)

*Same .com, same DNS — the gap is pure markup, and you pay it every year. Sources: registrars' own pricing pages plus comparison trackers, mid-2026.*

```
Registrar     .com renewal/yr   note
------------  ---------------   ---------------------------------
GoDaddy       ~$22              cheap first year, steep renewal
Squarespace   ~$20              inherited Google Domains; got pricier
Namecheap     ~$18              ~$8 first year, ~+68% at renewal
Porkbun       ~$11              flat, sold close to cost
Spaceship     ~$10             currently about the cheapest
```

Two years on GoDaddy ≈ the *same domain for a decade* is a stretch, but you get the idea: over the ten-plus years you'll actually hold a domain, the difference between $22 and $10 a year is real money — per domain, and I have a dozen.

> [!tip] Where the very cheapest sits
> For completeness: there's also an **at-cost registrar option — Cloudflare** — which passes through the wholesale price (~$10.44) with zero markup. The catch is it's transfer-in only (you can't register a *new* name there) and it ties the domain to its own DNS, so it's a different decision than "where do I buy." For a straight purchase, Porkbun and Spaceship are the easy at-cost picks.

## How GoDaddy actually gets you: teaser, renewal, upsell

The sticker price isn't where the tax lives. Three mechanisms are:

![The teaser-and-renewal trap: year one $0.01–$4.99, year two onward about $22 a year (a ~340% jump), plus pre-ticked add-ons at checkout pushing the cart past $50](../../../assets/images/the-godaddy-tax-trap.png)

*The first-year price is marketing. The renewal is the price you actually signed up for.*

**1. The teaser first year.** That "$0.01" or "$4.99 .com!" is a one-year promo. Year two snaps to the real ~$22 — a jump north of **300%**. Nothing wrong with a promo, but it's the *renewal* you should compare, because you'll pay it every year for as long as you own the name.

**2. The pre-ticked upsells.** Go through GoDaddy's checkout and the cart quietly accumulates add-ons — an SSL certificate you can get free from your host, an email plan, a "protection" or "ownership" upsell — and a $12 domain becomes a **$50+** order unless you untick them. Some are things you already get for free elsewhere.

**3. Privacy that used to cost extra.** WHOIS privacy hides your name, address and phone from the public record. It should be free — and to GoDaddy's credit it now is — but for years it was a $10–20/year line item, and plenty of registrars still treat it as a checkbox to charge for. Free privacy should be table stakes, not a feature.

> [!warning] Compare the renewal, not the headline
> Every "cheapest domain!" ad is quoting first-year promo pricing. The honest comparison is the **renewal** price with privacy included and add-ons unticked. On that basis the spread above is real and permanent.

## What I actually do

Nothing exotic — just four habits that keep domain costs boring:

- **Separate the registrar from everything else.** Buy the domain at a cheap registrar; host the site wherever you like; do email somewhere else. Bundling everything into one expensive dashboard is exactly what you're paying extra for. Domains are portable — you can always point the DNS elsewhere.
- **Judge on the renewal price.** First-year promos are noise. Look up year-two pricing before you buy; it's the number you'll live with.
- **Untick everything at checkout.** You need the domain. You almost certainly don't need the pre-selected SSL, email, or "protection" bundle. Add them later, deliberately, if you actually want them.
- **Audit what you're already paying.** You can see who currently holds a domain — and then go look up that registrar's renewal price:

```bash
whois yourdomain.com | grep -i registrar
```

If that comes back as a pricey registrar and your renewal is creeping up, moving a domain is a ~10-minute job (unlock it, grab the auth/EPP code, start a transfer at the new registrar; it usually adds a year for roughly the new registrar's price). I've moved several with zero downtime — DNS keeps serving throughout.

## When paying more is fine

To be fair, because the goal is a good decision, not registrar tribalism: if you want **one login** for your domain, your website builder, your email and your support line, and you'd rather not think about any of it, GoDaddy (or Squarespace) sells you exactly that, and the premium buys real convenience. For a non-technical owner who values one throat to choke, that can be worth it.

But know what you're buying: you're paying a premium for packaging, not for a better domain. If you're even slightly technical — or you just read this far — you're the person for whom it's pure markup.

## Takeaway

A `.com` is about **$10 a year** of commodity. Anything much above that is a tax on not checking — and it's charged annually, per domain, quietly, for as long as you own the name. Look up your renewals, untick the add-ons, and if the number's silly, move. It's one of the highest-return-per-minute chores in running anything online.

*Sitting on a pile of domains and not sure what you're actually paying across them? [Email me](mailto:nam@wistkey.com) — happy to help you audit and, if it's worth it, move them without downtime.*

---

*Found this useful? [Follow me on Medium](https://nam0403.medium.com/), [subscribe or bookmark nam-ai.uk](https://nam-ai.uk) for more no-nonsense posts on running things online without overpaying, and [connect on LinkedIn](https://www.linkedin.com/in/nam-chan/) — always up for comparing notes.*
