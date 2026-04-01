---
title: "Session Task Tracker: How I Solved Cross-Session Memory Loss in AI Agents"
date: 2026-04-01
tags: [openclaw, ai-agent, skill, clawhub]
---

# Session Task Tracker: How I Solved Cross-Session Memory Loss in AI Agents

## The Problem

If you use AI agent platforms like [OpenClaw](https://github.com/openclaw/openclaw), you've probably experienced this: you start a task in one session, continue in another, and the agent has completely forgotten what you were working on.

This happens because of **session resets**, **context compaction**, and **channel switching**. The agent's conversation history gets truncated or wiped, and with it goes all your task context.

For me, this was a daily frustration. I'd discuss a project with my agent on webchat, switch to a different channel later, and have to re-explain everything from scratch. Important decisions, progress notes, and next steps — all gone.

## The Solution: File-Based Task Memory

Instead of relying on conversation history, I built a skill that persists task context as **plain markdown files**. Each task gets one file. The file IS the memory — independent of any session.

```
tasks/
├── _INDEX.md          # Task index (auto-maintained)
├── project-alpha.md    # One file per task
└── weekly-report.md
```

When the agent starts a new session, it reads the index. When you mention a task, it reads that file and responds with full context. No re-explaining needed.

## How It Works

The skill fires in six situations:

| Situation | Action |
|-----------|--------|
| New task/project mentioned | Create task file + update index |
| Progress/decision on existing task | Update that task file |
| Session start (bootstrap) | Read `_INDEX.md` |
| User references a task | Read that task file, respond with context |
| User signals leaving | Ensure all discussed tasks are updated |
| User asks about task status | Read and report current progress |

Each task file follows a consistent format:

- **Status** (In Progress / Paused / Completed / etc.)
- **Priority** (High / Medium / Low)
- **Goal** — one sentence
- **Background** — why this task exists
- **Progress Log** — dated entries, newest on top
- **TODOs** — checkbox list
- **Key Information** — configs, links, constraints that must persist
- **Related Files** — absolute paths with descriptions

## Design Principles

1. **Simple is reliable** — No database, no API, no external dependencies. Just markdown files in a local directory. If the file exists, the memory exists.

2. **Human-readable** — Task files are plain markdown. You can open them in any editor, diff them, version control them. No lock-in.

3. **Minimal overhead** — The agent doesn't spam updates. It writes when something actually changes: a new decision, a completed TODO, a status change.

4. **Survives anything** — Session reset? The file is still there. Context compaction? The file is still there. Switch from webchat to Telegram? The file is still there.

## Real-World Impact

Since deploying this skill, I've tracked multiple concurrent projects across dozens of sessions without losing context once. The agent picks up exactly where we left off, every time.

Some concrete benefits:

- **Zero context loss** across session resets and compactions
- **Seamless channel switching** — start on webchat, continue on mobile, no re-explaining
- **Task visibility** — I can open any task file in my editor and see the full history
- **Parallel projects** — multiple tasks tracked simultaneously without confusion

## Try It

The skill is published on [ClawHub](https://clawhub.com) and open source:

- **Install:** `clawhub install session-task-tracker`
- **Slug:** `session-task-tracker`
- **Platform:** [OpenClaw](https://github.com/openclaw/openclaw)
- **Requirements:** None — just add it to your skills config

If you're building with AI agents and tired of losing context, give it a try. It's one file, zero dependencies, and it works.

---

*Published on [ClawHub](https://clawhub.com/skills/session-task-tracker) · Built for [OpenClaw](https://github.com/openclaw/openclaw)*
