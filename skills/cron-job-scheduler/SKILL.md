---
name: cron-job-scheduler
description: Autonomous 5-field UNIX cron expression parser, epoch next-execution calculator, and jittered execution scheduler for Claude Code agents.
---

# Cron Job Scheduler Skill

Empowers autonomous Claude Code agents to parse standard 5-field cron schedules (`* * * * *`), compute the next trigger epoch, and coordinate background recurring routines.

## Capabilities
- **5-Field Syntax Parser**: Evaluates Minute (0-59), Hour (0-23), Day of Month (1-31), Month (1-12), and Day of Week (0-6).
- **Wildcards, Ranges, and Steps**: Fully parses `*/5`, `1-5`, `0,15,30,45`, and standard `*` specifiers.
- **Epoch Trigger Projections**: Calculates exact unix milliseconds to next scheduled iteration.