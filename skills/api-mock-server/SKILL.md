---
name: api-mock-server
description: Autonomous in-memory stateful REST API mock server and fixture generator for Claude Code. Simulates CRUD endpoints with dynamic JSON storage and configurable network latency.
---

# API Mock Server Skill

Enables autonomous Claude Code agents to test frontend components and HTTP clients against local stateful mock APIs without external dependencies.

## Features
- **In-Memory CRUD**: Implements auto-incrementing ID creation, retrieval, updates, and deletions.
- **Configurable Latency**: Simulates realistic network jitter and response delays.
- **RESTful Endpoints**: Generates standard `/api/v1/:resource` endpoints dynamically.