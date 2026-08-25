---
name: webhook-event-router
description: Autonomous webhook listener and event router for Claude Code and AI agents. Ingests GitHub, Stripe, and Discord webhooks, validates HMAC signatures, and routes normalized event payloads to designated sub-agents.
---

# Webhook Event Router Skill

This skill allows Claude Code agents to act as autonomous event-driven operators by spinning up local/remote webhook receivers, verifying cryptographic HMAC-SHA256 signatures, and transforming inbound payloads into structured agent events.

## Features
- **HMAC Signature Verification**: Validates GitHub (`X-Hub-Signature-256`), Stripe (`Stripe-Signature`), and custom webhooks.
- **Event Normalization**: Transforms heterogeneous webhook schemas into a canonical `AgentEvent` interface.
- **Sub-Agent Dispatch**: Filters and routes high-priority events (e.g., CI failures, PR approvals, payout confirmations) directly to agent queues.

## Usage
```bash
node scripts/router.js --port 8080 --secret your_hmac_secret
```