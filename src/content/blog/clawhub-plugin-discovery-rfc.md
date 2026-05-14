---
title: 'From Publishing a Plugin to Shipping an RFC: Improving Discovery in ClawHub'
description: 'How publishing Guardrail Bridge on ClawHub turned into a product RFC for first-class plugin discovery controls, and what I learned from seeing it implemented.'
lang: 'en'
pubDate: 2026-05-14
---

# From Publishing a Plugin to Shipping an RFC: Improving Discovery in ClawHub

Open-source contributions are not always code. Sometimes the highest-leverage contribution is a well-scoped product problem.

Recently, an RFC I opened in the ClawHub community was accepted and implemented: [first-class plugin discovery controls for ClawHub Plugins](https://github.com/openclaw/clawhub/issues/2118). The shipped work added plugin categories, category-aware listing support, discovery controls in the UI, and docs/spec coverage for the taxonomy and behavior.

This post is a short reflection on where the RFC came from, why I framed it the way I did, and what I learned from seeing it move from a concrete publishing problem to a shipped platform improvement.

## The Trigger: Publishing Guardrail Bridge

The RFC did not start as a theoretical product exercise. It started from a very concrete experience: we had published [Guardrail Bridge](https://github.com/dylanzhangzx/guardrail-bridge-plugin), a plugin focused on bringing guardrail and security capabilities into agent workflows.

After publishing it, I started looking at ClawHub's Plugins surface from two perspectives at once:

- as a plugin author who wanted the right users to discover our plugin;
- as a product person asking whether the discovery experience would scale as the plugin catalog grew.

Search was useful if someone already knew what to type. But it was much less helpful for users browsing by intent: security, observability, automation, APIs, deployment, and so on.

That was the moment the product problem became clear to me. Guardrail Bridge was the trigger, but the underlying issue was not about one plugin. It was about whether ClawHub had enough structure for users to discover plugins by use case.

## The Product Gap

ClawHub already had a stronger browse experience for Skills. Users could browse by broad categories and use richer sorting options. Plugins, meanwhile, were becoming more important as ClawHub moved toward first-class OpenClaw plugin hosting, but the discovery model was still thinner.

At the time of the RFC, the Plugins page mostly exposed search plus a small set of trust-related filters, such as verified publisher and executes-code. Those filters matter, especially because plugins can execute code and connect external systems. But they do not solve the browsing problem by themselves.

For a small catalog, search-only discovery can be acceptable. For a growing marketplace, it creates friction:

- users need to know the right keywords before they can find useful plugins;
- plugin authors rely too heavily on naming and exact search terms;
- security-oriented plugins are harder to find unless users already search for security language;
- the platform has less room to communicate intent, category, and use case.

This is a common marketplace problem. Once supply grows, search alone is not enough. Discovery needs structure.

## The RFC

The RFC proposed adding first-class discovery controls to the Plugins browse page. The core ideas were straightforward:

- add plugin categories in the sidebar, following the existing Skills browse layout;
- introduce broad categories such as Developer Tools, MCP & Tooling, Security, Data & APIs, Observability, Automation, Deployment, and Other;
- keep existing trust and safety filters, including verified publisher and executes-code;
- add clearer sort options such as Featured, Relevance, Recently updated, Newest, and Name;
- leave stats-based sorting and deeper metadata-backed taxonomy as follow-up work.

The important part was not just the feature list. It was the scope control.

I did not want the RFC to turn into a debate about promoting Guardrail Bridge, ranking policy, moderation policy, or a complete taxonomy migration. Those are bigger questions. The proposal needed to be small enough for maintainers to evaluate and ship.

So the first version intentionally reused an existing ClawHub pattern: category browsing similar to Skills. It also allowed a low-risk implementation path where categories could initially map to keywords, with room to migrate toward explicit metadata later.

## Why Scope Matters

Good product RFCs are not just wish lists. They should reduce ambiguity for maintainers.

For this RFC, I tried to be explicit about non-goals:

- do not feature or recommend any specific plugin;
- do not change ranking, moderation, or verified publisher policy;
- do not require a permanent database-backed category field in the first version;
- do not require downloads, stars, or installs sorting unless the API can support accurate global sorting;
- do not merge Skills and Plugins into one browse page.

This mattered because my original motivation had a personal angle. I wanted Guardrail Bridge to have better exposure. But if the RFC had stayed at that level, it would have been too narrow.

The useful product move was abstraction: take a real author-side pain point and reframe it as a platform-level discovery problem.

## What Shipped

The RFC was eventually implemented on `main` through the landed ClawHub work in `#2126` / `50858282`. In the maintainer's closing note, the shipped scope included:

- first-class plugin categories;
- category-aware plugin API and listing support;
- plugin discovery controls in the UI;
- docs/spec coverage for taxonomy and behavior.

The final `main` CI was green at `0e926c6f`, including browser smoke and local-auth E2E coverage.

That outcome was encouraging because it validated the framing. The community did not just accept the problem; it shipped a broader platform capability.

## What I Learned

The biggest lesson is that open-source product work has to be both concrete and general.

If a proposal is too abstract, it becomes hard to prioritize. If it is too self-interested, it becomes hard to trust. The sweet spot is to start from a real use case, explain why it represents a broader class of problems, and make the first implementation small enough to review.

For me, Guardrail Bridge provided the concrete use case. ClawHub's growing plugin catalog provided the broader platform context. The RFC connected the two.

A good RFC should leave maintainers with fewer questions, not more. It should make tradeoffs visible, separate goals from non-goals, and give contributors a realistic implementation path.

That is the kind of contribution I want to keep practicing: not only building plugins, but also helping the platforms around them become easier to use, safer to browse, and more discoverable for the right users.

---

Related links:

- [RFC: Add first-class plugin discovery controls](https://github.com/openclaw/clawhub/issues/2118)
- [Guardrail Bridge plugin repository](https://github.com/dylanzhangzx/guardrail-bridge-plugin)
- [OpenClaw](https://github.com/openclaw/openclaw)
