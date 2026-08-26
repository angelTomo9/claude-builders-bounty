---
name: sql-injection-sanitizer
description: Autonomous SQL injection scanner, raw query parameterizer, and taint analyzer for Claude Code. Detects unsafe template literal interpolations, escaping flaws, and converts raw strings into safe prepared statements ($1, $2, ?).
---

# SQL Injection Sanitizer Skill

Empowers autonomous Claude Code agents to audit backend codebase queries for SQL injection vulnerabilities and auto-refactor string concatenations into parameterized prepared statements.

## Defense Capabilities
- **Taint Pattern Detection**: Flags unescaped variable injections in `SELECT`, `UPDATE`, `INSERT`, and `DELETE` queries.
- **Parameterized SQL Transformer**: Replaces unsafe template literals with `$1, $2, ...` (PostgreSQL) or `?` (MySQL/SQLite).
- **Identifier Quoting**: Enforces double-quote/backtick identifier escaping for table and column names.