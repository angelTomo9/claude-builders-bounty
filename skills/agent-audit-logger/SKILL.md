---
name: agent-audit-logger
description: Autonomous structured audit logger and token cost tracker for multi-agent workflows in Claude Code. Records step trajectories, token telemetry, and generates Markdown audit summaries.
---

# Agent Audit Logger Skill

Provides structured JSONL trajectory logging, token telemetry accounting, and automated Markdown compliance reporting for autonomous Claude Code sub-agent swarms.

## Features
- **JSONL Streaming Logger**: Appends execution events in atomic JSON Lines format.
- **Cost & Token Accounting**: Computes prompt, completion, and cache token metrics per agent turn.
- **Audit Report Generator**: Generates clean executive Markdown tables showing agent timelines and actions.