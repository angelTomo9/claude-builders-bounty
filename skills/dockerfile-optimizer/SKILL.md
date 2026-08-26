---
name: dockerfile-optimizer
description: Autonomous container image optimizer and multi-stage Dockerfile synthesizer for Claude Code. Analyzes instruction order, combines RUN directives, enforces non-root USER execution, and minimizes layer footprint.
---

# Dockerfile Optimizer Skill

Enables autonomous Claude Code agents to analyze and refactor Dockerfiles for minimal artifact size, faster layer caching, and enhanced container runtime security.

## Optimization Rules
- **Multi-Stage Build Synthesis**: Isolates build-time dependencies (compilers, npm cache) from runtime artifacts.
- **Layer Consolidation**: Combines related `RUN apt-get update && apt-get install` commands with cache cleanup.
- **Security Hardening**: Enforces `USER nonroot` execution instead of default root privilege.