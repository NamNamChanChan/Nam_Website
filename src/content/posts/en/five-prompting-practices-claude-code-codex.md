---
title: "Five prompt habits that work in both Claude Code and Codex"
description: "The best coding-agent prompts are not long incantations. These five practical habits—drawn from the official Claude Code and Codex guidance—make implementation faster, safer, and easier to verify."
pubDatetime: 2026-07-14T11:00:00+08:00
ogImage: ../../../assets/images/five-prompting-practices-claude-code-codex-banner.png
draft: false
tags:
  - ai
  - tech
  - it
---

![A structured prompt with five practical modules guiding two coding-agent workspaces](../../../assets/images/five-prompting-practices-claude-code-codex-banner.png)

I use both Claude Code and Codex, and the biggest difference in results rarely comes from a clever phrase. It comes from whether I have described the work like an engineer delegating to another engineer.

That means a good prompt is not a spell. It is a compact handover: **the outcome, the useful context, the guardrails, the evidence, and the point where planning should happen before editing**.

I compared the current official guidance from [Anthropic's Claude Code prompt library](https://code.claude.com/docs/en/prompt-library), its [best-practices guide](https://code.claude.com/docs/en/best-practices), and OpenAI's [Codex best practices](https://learn.chatgpt.com/guides/best-practices) and [prompting guide](https://learn.chatgpt.com/docs/prompting). The terminology differs, but the advice converges more than it conflicts.

Here are the five habits I would keep.

## Table of contents

## 1. Lead with the outcome, not a recipe

Start by saying what should be true when the work is finished. Do not turn the prompt into a brittle implementation plan unless the implementation itself is a requirement.

Weak:

```text
Open auth.ts, add a function, change the middleware, then update the controller.
```

Stronger:

```text
Fix the login flow so users whose access token has expired can refresh their
session without being sent back to the sign-in page. Preserve the current
security model and public API.
```

The second prompt gives the agent a destination and room to inspect the code. It may discover that the real fault is not in the controller at all. Both vendors' guidance makes the same point in slightly different language: describe the result and delegate the route.

> [!TIP] Think like a tech lead
> Give direction, context, and authority boundaries. Avoid dictating every file read and command unless that sequence is genuinely part of the requirement.

## 2. Attach the context that can change the answer

Coding agents can search a repository, but they cannot know which internal decision, screenshot, failed log, or reference implementation matters most to you.

Good context is specific:

- the error output that reproduces the problem;
- the relevant folder or likely execution path;
- an existing component whose pattern should be followed;
- a screenshot of the expected interface;
- documentation that defines the API contract.

```text
The checkout fails only after a card expires. Start in src/payments/ and use
tests/payment-retry.spec.ts as the behavioural reference. The attached log is
from the first failed retry after token refresh.
```

This is better than pasting the whole repository or a 4,000-line log. Context is a budget: include what changes the answer and let the agent retrieve the rest.

![Five connected modules representing outcome, context, constraints, verification, and planning](../../../assets/images/five-prompting-practices-claude-code-codex-anatomy.png)

*A useful prompt has five jobs. More words are not automatically more context.*

## 3. State the boundaries—and what must stay untouched

Most expensive agent mistakes are not syntax errors. They are scope errors: changing a public interface, adding a dependency, rewriting an unrelated module, touching production data, or “cleaning up” code the task never asked about.

Put the important constraints in the prompt:

```text
Use the libraries already in package.json. Do not change the database schema
or the public API. Preserve the user's uncommitted changes. Ask before any
production-facing or destructive action.
```

Keep the list short enough to remain visible. “Write clean code” adds little; “do not change the schema” can prevent a bad afternoon.

For rules that apply to every task, move them out of individual prompts. Claude Code uses `CLAUDE.md`; Codex uses `AGENTS.md`. Both are better homes for repository layout, build commands, conventions, and durable do-not rules.

> [!WARNING] Instructions are not enforcement
> A written boundary guides the agent, but permissions, sandboxes, tests, and review provide the harder safety rails. Use both when the cost of a mistake is real.

## 4. Define “done” as observable proof

“Make it work” forces the agent to guess when to stop. A test, screenshot, metric, or expected output closes the feedback loop.

```text
Reproduce the bug with a failing test, implement the smallest safe fix, then
run the focused test and the existing auth suite. Done when both pass and an
expired session refreshes without redirecting to /login. Report the files
changed and any remaining risk.
```

Anthropic calls verification the highest-leverage addition to a Claude Code workflow. OpenAI likewise recommends telling Codex what “done” means and asking it to run tests, lint, type checks, visual checks, or a final diff review.

The proof should match the work:

- backend change → focused tests plus the relevant suite;
- UI change → browser interaction and screenshot comparison;
- performance work → a numeric baseline and target;
- migration → schema or data verification plus a rollback path;
- documentation → link and example checks.

![A vague prompt producing tangled failures contrasted with a structured prompt producing a verified result](../../../assets/images/five-prompting-practices-claude-code-codex-before-after.png)

*The useful divide is not “short prompt versus long prompt.” It is ambiguous work versus verifiable work.*

## 5. For complex work, separate discovery from implementation

If the task crosses several systems or the requirements are still fuzzy, do not force a one-shot implementation prompt. Ask the agent to inspect, question assumptions, and propose a plan first.

```text
Read the current authentication flow and identify every component affected by
adding passkeys. Do not edit yet. Produce a plan covering data model changes,
fallback login, migration, security risks, tests, and rollout. Flag decisions
that require product input.
```

Review that plan, correct it early, and only then authorize implementation. Claude Code and Codex both document plan-first workflows for ambiguous or higher-risk tasks. Both also encourage steering when new evidence appears: the conversation is part of the engineering loop, not evidence that the first prompt failed.

There is one useful limit. If a session has accumulated unrelated work and repeated failed approaches, start clean and carry forward a better specification. More conversation is not always more context.

## The template I actually use

```text
Goal
<What outcome should exist for the user or system?>

Context
<Relevant files, symptoms, logs, screenshots, or reference patterns.>

Constraints
<What must remain unchanged? What is out of scope? What needs approval?>

Done when
<Tests, browser checks, metrics, expected output, and final review.>

For complex tasks
<Inspect and propose a plan before editing. Flag unresolved decisions.>
```

Not every prompt needs every heading. A two-line bug fix can be excellent. The template is a diagnostic: when an agent goes off course, one of these pieces was often missing.

## The real takeaway

Claude Code and Codex are capable enough to navigate unfamiliar code. The prompt should not try to impersonate their planner. It should give them the information only you have: **intent, priority, risk tolerance, and proof**.

My shortest version is: *tell it where to go, show it the map that matters, mark the cliffs, and agree how you will know you arrived.*

That works better than any magic phrase I have found.

*If your team is trying to turn coding agents from impressive demos into a dependable engineering workflow, I am happy to compare notes—[email me](mailto:nam@wistkey.com).*

---

*For more practical notes on AI-assisted engineering, [follow me on Medium](https://nam0403.medium.com/), [subscribe or bookmark nam-ai.uk](https://nam-ai.uk), or [connect with me on LinkedIn](https://www.linkedin.com/in/nam-chan/)—always glad to hear what is working in your codebase.*
