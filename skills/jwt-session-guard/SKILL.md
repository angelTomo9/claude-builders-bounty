---
name: jwt-session-guard
description: Autonomous cryptographic JWT token verifier and session auditor for Claude Code. Validates HMAC-SHA256 signatures, defends against none-algorithm downgrade attacks, and checks expiration skew margins.
---

# JWT Session Guard Skill

Empowers autonomous Claude Code agents to verify, decode, and audit JSON Web Tokens against security threats without requiring external dependencies.

## Defense Capabilities
- **Algorithm Downgrade Protection**: Rejects tokens using `alg: "none"` or unapproved algorithms.
- **HMAC-SHA256 Cryptographic Verification**: Computes constant-time digest equality in Node.js.
- **Clock Skew Tolerant Expiration**: Validates `exp` and `nbf` claims with configurable drift margins.