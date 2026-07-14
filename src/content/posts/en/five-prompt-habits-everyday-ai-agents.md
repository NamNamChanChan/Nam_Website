---
title: "Five prompt habits for getting everyday work done with AI agents"
description: "You do not need a technical background to delegate well to an AI agent. These five prompt habits turn vague daily requests into useful, safe, and reviewable work."
pubDatetime: 2026-07-14T11:15:00+08:00
ogImage: ../../../assets/images/five-prompt-habits-everyday-ai-agents-banner.png
draft: false
tags:
  - ai
  - productivity
  - life
---

![A person using an AI agent to organize travel, groceries, product comparisons, email, and a calendar](../../../assets/images/five-prompt-habits-everyday-ai-agents-banner.png)

In my last article, I wrote about prompting Claude Code and Codex like an engineer handing work to another engineer. But the same idea is even more useful outside software.

An AI agent can research a trip, compare products, turn a week of commitments into a meal plan, prepare an email, or organize an event. The difficult part is rarely finding a clever phrase. It is handing over enough of your intent that the agent can make sensible decisions without making decisions that still belong to you.

You do not need a technical background for that. You need five practical habits: **state the outcome, provide the context that changes the answer, set boundaries, define a useful result, and review the plan before consequential action**.

That pattern matches current guidance from [OpenAI's prompting guide](https://learn.chatgpt.com/docs/prompting), its guidance for [starting work with an outcome, context, constraints, and review criteria](https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex), and Anthropic's advice to use [clear instructions and relevant context](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/claude-4-best-practices). Here is how it looks in ordinary life.

## Table of contents

## 1. Ask for the outcome, not just a topic

“Plan my holiday” names a subject, but not a successful result. Where are you starting? Who is travelling? What kind of days do you enjoy? Is the goal to relax, see as much as possible, or stay within a strict budget?

Weak:

```text
Plan a four-day trip to Kyoto.
```

Stronger:

```text
Create a relaxed four-day Kyoto itinerary for two adults travelling from
Singapore in late November. We care more about food, neighbourhood walks,
and one excellent temple each day than covering every attraction.
```

The stronger version gives the agent a destination in both senses. It can still decide how to research and arrange the days, but it knows what a good trip should feel like.

This applies to small tasks too. Instead of “help with dinner,” ask for “five weeknight dinners that take less than 30 minutes and produce a single shopping list.” Start with what you want to be true at the end.

## 2. Add the context that can change the answer

An agent does not know the quiet details in your head. A technically perfect plan can still be useless if it ignores a child's bedtime, a food allergy, an elderly parent's walking limit, or the amount you are willing to spend.

For a weekly meal plan, useful context might be:

- three people are eating, including one vegetarian;
- Tuesday and Thursday are late work nights;
- there is already rice, eggs, spinach, and chicken in the kitchen;
- the grocery budget is HK$700;
- leftovers should become lunch the next day.

```text
Plan five dinners for three people. One person is vegetarian, so every meal
needs an easy meat-free version. Tuesday and Thursday must take 20 minutes or
less. Use the ingredients I already have first, keep new groceries under
HK$700, and turn leftovers into the next day's lunch.
```

This is not about writing a long prompt. It is about including the facts that would change a human assistant's choices.

![Five visual cards representing outcome, personal context, approval boundaries, checking, and a plan](../../../assets/images/five-prompt-habits-everyday-ai-agents-anatomy.png)

*A useful everyday prompt is a compact handover. Each part removes a different kind of guesswork.*

## 3. Draw a clear line between preparing and acting

This is the biggest difference between asking an AI a question and delegating to an AI agent. An agent may be able to fill a form, add an item to a cart, edit a calendar, or prepare a message. Those actions can affect other people, money, and private information.

Say where it must stop:

```text
Find three suitable restaurants and prepare a booking recommendation for my
mother's birthday. Check accessibility, noise level, menu options, location,
and the estimated total for six people. Do not book, call, or send a message.
Wait for my approval after showing the final options.
```

For communications, “draft but do not send” is one of the most valuable lines you can add. For shopping, use “compare and add the preferred option to the cart, but do not purchase.” For calendars, “propose the changes before editing any event.”

OpenAI's current agent guidance explicitly warns against vague instructions such as “check my email and handle everything,” and uses confirmations for consequential actions. Your prompt should reinforce the same division: let the agent do the patient preparation; keep the irreversible decision with you.

> [!WARNING] Treat access as part of the prompt
> Connect only the accounts and information needed for the task. A well-written boundary is useful, but reviewing permissions and the final action is still your responsibility.

## 4. Define the result you want—and how it should be checked

“Compare these three washing machines” can produce three paragraphs copied from marketing pages. A decision-ready comparison needs criteria, current evidence, and a format that makes trade-offs visible.

```text
Compare these three washing machines for a family of four. Prioritize total
cost, reliability, energy use, noise, warranty, and local repair support.
Use current manufacturer specifications and at least two independent review
sources. Put the result in a table, note the date checked, flag any missing or
conflicting information, and finish with a recommendation plus its biggest
downside. Do not purchase anything.
```

Now “done” is observable. The agent knows what to investigate, how fresh the information should be, what uncertainty to expose, and how you want to make the decision.

The right check depends on the task:

- travel research → dates, opening days, journey time, and source links;
- household purchase → price, warranty, return policy, and known trade-offs;
- meal planning → dietary rules, total quantity, budget, and ingredient reuse;
- email draft → factual names, dates, tone, and no sending;
- event planning → headcount, accessibility, total cost, cancellation terms, and approval before booking.

![A chaotic vague trip request contrasted with a calm, structured, approval-gated travel plan](../../../assets/images/five-prompt-habits-everyday-ai-agents-before-after.png)

*The useful divide is not a short prompt versus a long prompt. It is an unreviewable result versus a decision-ready one.*

## 5. For bigger tasks, approve the plan before the action

Some daily tasks contain several hidden decisions. Organizing a birthday dinner involves a date, guest list, dietary needs, travel distance, venue, budget, invitations, and possibly a deposit. Asking an agent to “organize everything” skips the moment when you should inspect those assumptions.

Use two stages:

```text
Help me organize a birthday dinner for eight people next month. First, list
the decisions you need from me and propose a short plan. Then research venues
and draft the invitation. Stop before contacting anyone, changing calendars,
making a booking, or paying a deposit.
```

Review the plan. Correct the date, budget, or priorities. Then authorize the next stage. OpenAI describes agent work as iterative and steerable: you can interrupt, clarify, and change direction while preserving progress. That is not a failure of prompting; it is normal delegation.

## A reusable everyday template

```text
Outcome
<What should be ready when this task is finished?>

Context
<Who is involved? What preferences, dates, budget, files, or facts matter?>

Boundaries
<What must not happen? Which actions need my approval?>

Useful result
<What format, options, sources, checks, and uncertainties should I see?>

Process
<For a complex task, show me the plan and unresolved decisions before acting.>
```

You do not need all five headings every time. A quick request can be two sentences. The template is most useful when the task involves several steps, another person's inbox or calendar, money, private data, or a choice you will live with afterwards.

## The real takeaway

Good everyday prompting is not about sounding technical. It is about being a considerate delegator.

Tell the agent what a good result looks like. Share the personal details that genuinely matter. Put a fence around actions with consequences. Ask for evidence you can review. For bigger jobs, approve the route before anyone starts walking it.

My shortest version is: **prepare widely, decide clearly, and act only with permission**.

That is how an AI agent becomes useful in daily life without quietly taking over the parts that should remain yours.

*If you are experimenting with AI agents for the ordinary work that consumes your week, I would love to hear which handovers save you the most time—[email me](mailto:nam@wistkey.com).*

---

*For more practical notes on using AI well, [follow me on Medium](https://nam0403.medium.com/), [subscribe or bookmark nam-ai.uk](https://nam-ai.uk), or [connect with me on LinkedIn](https://www.linkedin.com/in/nam-chan/)—always glad to compare what works in real life.*
