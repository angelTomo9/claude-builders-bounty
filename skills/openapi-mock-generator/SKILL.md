---
name: openapi-mock-generator
description: Autonomous OpenAPI 3.0 / 3.1 specification parser and synthetic mock dataset generator for Claude Code. Generates realistic fixture data complying with schema types, formats (uuid, email, uri, date-time), and enum constraints.
---

# OpenAPI Mock Generator Skill

Enables autonomous Claude Code agents to parse OpenAPI schema objects and generate type-compliant synthetic mock datasets for unit testing and contract validation.

## Generation Capabilities
- **Primitive Types**: Synthesizes strings, integers, floats, and booleans honoring min/max ranges.
- **Format Specialization**: Auto-formats `uuid`, `email`, `uri`, `date-time`, and `ipv4`.
- **Object & Array Graphing**: Recursively traverses nested schemas, `$ref` component definitions, and required properties.