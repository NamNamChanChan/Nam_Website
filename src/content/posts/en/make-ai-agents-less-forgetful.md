---
title: "How to make your AI agent less forgetful: a beginner's guide"
description: "AI memory is not magic. This beginner-friendly guide shows how preferences, project spaces, a one-page notebook, handovers, and careful retrieval make an AI agent feel far less memoryless."
pubDatetime: 2026-07-14T12:10:00+08:00
ogImage: ../../../assets/images/make-ai-agents-less-forgetful-banner.png
draft: false
tags:
  - ai
  - tech
---

![A person reconnecting an AI assistant to an organized notebook, project folder, and archive](../../../assets/images/make-ai-agents-less-forgetful-banner.png)

The most frustrating sentence in AI is probably: “We already discussed this yesterday.”

You explained the goal, corrected three mistakes, chose an option, and agreed on the next step. Then you open a new conversation and the AI behaves as if none of it happened.

It feels like a broken memory. But the simpler explanation is usually this: **the useful information was never put somewhere the next session could reliably find it**.

An AI does not need an infinite memory to become less forgetful. It needs a decent notebook. In practice, that means separating stable preferences from project facts, keeping a short source of truth, writing a handover at the end of each session, and retrieving only the relevant notes next time.

This is a beginner's guide to doing exactly that—whether you use ChatGPT, Claude, another AI product, or an agent your team built.

## Table of contents

## First: what does “AI memory” actually mean?

Imagine the AI has a desk and a filing cabinet.

The **desk** is the information available right now: your current message, recent conversation, instructions, relevant files, and anything a tool has retrieved. AI engineers call this the context. The desk can be large, but it is not infinite.

The **filing cabinet** is everything stored outside that immediate conversation: saved preferences, previous chats, project files, summaries, databases, and memory notes. Those things help only if the system can find the right item and put it back on the desk at the right time.

That gives us three separate jobs:

1. **Save** the fact somewhere durable.
2. **Find** it when it becomes relevant.
3. **Refresh** or remove it when it becomes wrong.

Anthropic's guide to [context engineering for agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) makes the same distinction in more technical language: context is valuable but finite, so longer-running agents need techniques such as retrieval, compaction, and structured notes. More chat history alone is not automatically better memory.

![Four connected memory spaces: the current desk, a preference card, a project binder, and a searchable archive](../../../assets/images/make-ai-agents-less-forgetful-memory-layers.png)

*Good memory is not one giant transcript. It is a small working desk connected to organized storage.*

## 1. Separate “always true” from “true for this project”

The first improvement is simply putting different facts in different homes.

**Stable preferences** apply across many conversations:

- I prefer concise answers with a short recommendation first.
- Write to me in Traditional Chinese, but keep technical terms in English.
- I am vegetarian.
- Ask before sending messages or making purchases.

These belong in a product's saved memory or custom instructions. OpenAI describes [custom instructions](https://help.openai.com/en/articles/8096356-custom-instructions-for-chatgpt) as explicit guidance about what ChatGPT should know and how it should respond, while [saved memory](https://help.openai.com/en/articles/8983151-is-memory-different-from-custom-instructions) can retain useful information learned from conversations.

**Project facts** have a narrower lifetime:

- The family trip is 18–23 December.
- The current budget is HK$24,000.
- We rejected the morning flight because it is too early for the children.
- The next task is to compare three hotels near the station.

Do not put every temporary decision into global memory. Store it with that project. Otherwise a six-month-old trip preference can quietly influence an unrelated plan.

> [!TIP] A simple test
> Ask: “Should this still affect the answer in a completely different conversation next year?” If yes, it may be a stable preference. If no, keep it inside the project.

## 2. Give each long-running effort its own room

If you return to a topic every week, stop treating it as a pile of unrelated chats. Create one project or workspace for it.

A useful project contains:

- one clear goal;
- a few relevant files or links;
- project-specific instructions;
- the important decisions so far;
- the latest status and next action.

ChatGPT [Projects](https://help.openai.com/en/articles/10169521-projects-in-chatgpt) can keep related chats, files, instructions, and project memory together. Claude Projects provide a project knowledge base and instructions, although Anthropic notes that information must be added to that knowledge base when you want it available across separate chats. The buttons differ, but the principle is the same: **keep one continuing body of work in one continuing context space**.

Do not create one enormous “Everything” project. A project for “Family trip to Japan” is useful. A project containing travel, tax, fitness, a product launch, and twenty random PDFs becomes another messy filing cabinet.

## 3. Keep a one-page AI notebook

Product memory is convenient, but an editable note gives you something even more important: a visible source of truth.

Create a short document called “AI notebook”, “project brief”, or anything that feels natural. Keep it boring and easy to scan:

```text
PROJECT
What are we trying to achieve?

STABLE CONTEXT
People, preferences, constraints, dates, budget, and important source files.

DECISIONS
What have we agreed, and why?

CURRENT STATE
What has already been completed?

OPEN QUESTIONS
What is still uncertain or waiting for a person?

NEXT ACTION
What should happen first in the next session?

LAST UPDATED
Date and owner of this note.
```

At the start of a new chat, attach or paste this note and say:

```text
Use this notebook as the current source of truth. Tell me if my new request
conflicts with it. Do not silently overwrite a decision; propose an update.
```

That last sentence matters. Memory should not become a hidden authority. You should be able to see when a new request contradicts an old decision and choose which one wins.

## 4. End each session with a handover

Most memory is lost at the least exciting moment: when the work stops.

After a productive conversation, ask the agent to prepare a compact handover before you close it:

```text
Prepare the handover for our next session. Include only:
1. decisions made and the reason for each;
2. work completed;
3. unresolved questions;
4. the next three actions;
5. facts or preferences that should update the project notebook.

Separate confirmed facts from assumptions. Do not include the full transcript.
```

Read it before saving. Correct mistakes immediately. Then replace the relevant sections of the notebook rather than appending another page forever.

![Repeated sessions restarting from nothing contrasted with sessions connected by a compact handover](../../../assets/images/make-ai-agents-less-forgetful-handover.png)

*A handover preserves decisions and next steps. A full transcript preserves every detour as well.*

This habit works for almost anything: a job search, weekly meal planning, a house renovation, ongoing research, customer support, or writing a series of articles. The agent does not need to remember every sentence. It needs the state of the work.

## 5. Retrieve selectively—and clean the memory

The tempting solution to forgetfulness is to paste everything back in. That creates a different problem: the useful fact is buried under old drafts, repeated arguments, stale prices, and abandoned ideas.

Good retrieval asks for the smallest useful set:

```text
Before answering, retrieve the current project goal, the last two confirmed
decisions, the latest budget, and the next action. Ignore superseded drafts.
Show which notes and dates you relied on.
```

This is why search and retrieval matter as much as storage. OpenAI's current [Memory FAQ](https://help.openai.com/en/articles/8590148-memory-in-chatgpt-remembering-what-you-chat-about) lets users review and correct remembered information, see memory sources in supported experiences, and use Temporary Chat when they do not want a conversation to use or create memory.

Once a month—or whenever the AI gives a strangely outdated answer—ask three questions:

1. What do you currently remember about me or this project?
2. Which source did each important fact come from?
3. What is stale, contradictory, overly sensitive, or no longer useful?

Then update or delete it. A memory system that only adds information will eventually become a confident collection of old assumptions.

> [!WARNING] Not everything should be remembered
> Avoid storing passwords, authentication codes, payment details, medical records, or confidential information unless the system is explicitly approved for that data. Use temporary or memory-off modes for conversations you do not want reused, and review the product's data controls.

## If you are building the agent yourself

The same beginner model becomes a simple architecture:

- **Session history** keeps the current conversation connected.
- **Durable memory** stores distilled preferences, facts, decisions, and lessons outside the model.
- **Retrieval** selects the relevant items for this task.
- **Compaction** turns a long conversation into a shorter state summary before the context becomes crowded.

OpenAI's [Agents SDK sessions](https://openai.github.io/openai-agents-python/sessions/) store conversation history across runs and support persistent stores and compaction. Its newer sandbox-agent memory makes an important distinction: conversational sessions preserve messages, while durable memory distils lessons into reusable files. That is a good design principle even if you never use the SDK.

The model is not the database. Store memory somewhere you can inspect, control access to, correct, expire, and back up. Then give the model only what it needs for the current decision.

## The real takeaway

Making an AI less memoryless is not mainly about finding a model with the largest context window. It is about building a small memory habit around the model.

Put permanent preferences in the permanent place. Keep project facts inside the project. Maintain one short notebook. End useful sessions with a handover. Retrieve selectively. Delete what has become wrong or too sensitive.

My shortest version is: **do not ask the AI to remember everything; help it remember the right things on purpose**.

That is less magical than “perfect memory”, but much more dependable.

*If your team is designing an agent that needs to pick up real work across days or people, I am happy to compare memory patterns and practical trade-offs—[email me](mailto:nam@wistkey.com).*

---

*For more practical notes on building useful AI habits, [follow me on Medium](https://nam0403.medium.com/), [subscribe or bookmark nam-ai.uk](https://nam-ai.uk), or [connect with me on LinkedIn](https://www.linkedin.com/in/nam-chan/)—always glad to hear how you keep context alive.*
