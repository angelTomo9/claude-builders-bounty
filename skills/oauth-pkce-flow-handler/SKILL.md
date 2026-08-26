---
name: oauth-pkce-flow-handler
description: Autonomous OAuth 2.1 PKCE authorization code generator and token verification handler for Claude Code. Generates cryptographic code_verifier, calculates S256 code_challenge, validates state parameters, and prevents CSRF.
---

# OAuth PKCE Flow Handler Skill

Empowers autonomous Claude Code agents to negotiate secure OAuth 2.0 / 2.1 client authorizations with Proof Key for Code Exchange (RFC 7636).

## Security Features
- **RFC 7636 Compliance**: Generates high-entropy 43-128 character `code_verifier` strings.
- **S256 Hash Transformation**: Computes SHA-256 base64url-encoded `code_challenge` tokens.
- **CSRF State Verification**: Cryptographically binds state parameters to prevent authorization injection.