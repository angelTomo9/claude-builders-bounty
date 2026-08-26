---
name: sentry-error-triager
description: Autonomous Sentry and OpenTelemetry error triage assistant for Claude Code. Groups stack traces by root cause, parses sourcemap-aligned call frames, and correlates telemetry breadcrumbs into actionable bug fixes.
---

# Sentry Error Triager Skill

Empowers autonomous Claude Code agents to parse exception payloads, cluster runtime errors by root cause signature, and pinpoint failing line numbers.

## Features
- **Root Cause Clustering**: Hashes exception types and top-of-stack call frames into consistent issue fingerprint hashes.
- **Breadcrumb Correlator**: Filters UI, HTTP, and console breadcrumbs leading immediately up to crashes.
- **Severity Classifier**: Categorizes errors into `CRITICAL` (unhandled crash/panic), `WARNING` (degraded service), or `INFO`.