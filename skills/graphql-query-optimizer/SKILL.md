---
name: graphql-query-optimizer
description: Autonomous GraphQL query complexity analyzer and depth limiting auditor for Claude Code. Calculates AST nesting levels, prevents DoS attacks from circular nested queries, and optimizes field selection footprints.
---

# GraphQL Query Optimizer Skill

Empowers autonomous Claude Code agents to analyze GraphQL query documents for security compliance, depth limitations, and payload optimization.

## Features
- **Nesting Depth Calculator**: Computes exact field tree depth from GraphQL ASTs.
- **Complexity Scoring**: Weighs list multiplications and nested fields against safety thresholds.
- **Circular Reference Guard**: Detects recursive subfield expansion patterns before query execution.