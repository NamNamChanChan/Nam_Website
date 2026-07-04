---
title: "Why we deploy LLMs on-premises"
description: "Privacy, cost control and predictability: when running AI on your own servers beats calling an API — and when it doesn't."
pubDatetime: 2026-07-03T14:00:00+08:00
tags:
  - ai
  - tech
---

<!-- DRAFT: seed post written by Claude — Nam to review/edit before publishing. -->

The default way to add AI to a product in 2026 is to call a frontier-model API. It's the right default — until it isn't. A large part of my work at [Wistkey](https://wistkey.com) is deploying LLMs **on-premises**: on servers our clients own and control. Here's when that trade actually makes sense.

## Table of contents

## 1. When the data genuinely cannot leave

This is the reason that starts most conversations. Banks, healthcare providers, law firms, government suppliers — many organisations operate under rules (or client contracts) that flatly prohibit sending certain data to a third-party API, whatever the provider's privacy policy says.

An on-prem deployment changes the question from *"can we trust the vendor's data handling?"* to *"does the data ever leave our network?"* When the answer must be **no**, the architecture decision is already made for you.

## 2. When usage is high and steady

API pricing is beautiful for spiky, unpredictable workloads. But once you're running a sustained volume — classification on every document, a copilot every employee touches daily — the economics flip. A fixed pool of GPUs running an open-weight model has a **flat, predictable cost** no matter how many tokens you push through it.

The crossover point is different for every workload, so measure it: tokens per month × API price vs. hardware amortisation + power + maintenance. The answer surprises people in both directions.

## 3. When you need the model to stay put

APIs deprecate models, change behaviour between versions, and rate-limit you during peak hours. For workflows where output stability matters — anything audited, anything with downstream automation — pinning an exact model version on your own hardware removes a whole class of surprises. You upgrade when *you* decide to, after *your* evals pass.

## When the API is still the right call

Being honest about the other side:

- **Frontier capability.** If the task needs the strongest reasoning models, open-weight alternatives may not be there yet.
- **Spiky or small workloads.** Idle GPUs are expensive paperweights.
- **No ops capacity.** On-prem means someone patches, monitors and upgrades it. That someone must exist.

## The practical middle path

Most deployments we do are **hybrid**: sensitive or high-volume workflows run on-prem on open-weight models; everything else calls an API. Start with one workflow where the case is unambiguous, get it running well, and expand from evidence rather than ideology.

If you're weighing this decision for your own organisation, I'm happy to compare notes — [email me](mailto:nam@wistkey.com).
