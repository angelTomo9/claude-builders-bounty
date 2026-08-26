---
name: grpc-protobuf-validator
description: Autonomous Protocol Buffers (.proto) parser, wire-type validator, and gRPC payload validator for Claude Code. Validates proto3 syntax rules, field numbering sequences, and enforces JSON-to-protobuf mapping contracts.
---

# gRPC Protobuf Validator Skill

Empowers autonomous Claude Code agents to parse `.proto` definition files and validate gRPC payload messages against schema contracts without requiring `protoc` binaries.

## Validation Features
- **Proto3 Syntax Parser**: Parses `syntax = "proto3"`, message declarations, enum variants, and service RPC endpoints.
- **Wire-Type Field Verification**: Checks field numbers (1..536,870,911), disallows reserved ranges (19000..19999).
- **JSON Mapping Contract Enforcer**: Asserts camelCase/snake_case field equivalence and primitive type casting.