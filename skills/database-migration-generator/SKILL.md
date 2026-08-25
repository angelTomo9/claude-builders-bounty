---
name: database-migration-generator
description: Autonomous schema differential engine and reversible SQL migration generator for Claude Code. Detects added/altered/dropped tables/columns and compiles reversible UP and DOWN DDL migrations.
---

# Database Migration Generator Skill

Empowers autonomous Claude Code agents to compute database schema differences across versions and synthesize compliant, reversible PostgreSQL/MySQL migration scripts.

## Features
- **Schema Differential Engine**: Detects newly created tables, altered column data-types, foreign keys, and indexes.
- **Bi-Directional DDL Synthesis**: Automatically constructs corresponding `UP.sql` and reversible `DOWN.sql` rollbacks.
- **Zero Heavy ORM Dependencies**: Operates natively in fast JavaScript without requiring heavyweight Prisma or TypeORM runtimes.