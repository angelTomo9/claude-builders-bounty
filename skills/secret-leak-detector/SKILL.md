---
name: secret-leak-detector
description: Autonomous API key, private token, Shannon entropy scanner, and credential leak detector for Claude Code. Detects AWS, GitHub, OpenAI, Stripe, and private RSA/SSH keys before git commits.
---

# Secret Leak Detector Skill

Empowers autonomous Claude Code agents to audit repositories and staging files for accidentally hardcoded secrets, high-entropy tokens, and private credentials.

## Detection Rules
- **Vendor Token Signatures**: Scans for AWS (`AKIA...`), GitHub PAT (`ghp_...`), OpenAI (`sk-...`), and Stripe (`sk_live_...`) tokens.
- **Private Key Headers**: Detects PEM blocks (`BEGIN RSA PRIVATE KEY`, `BEGIN OPENSSH PRIVATE KEY`).
- **Shannon Entropy Analysis**: Computes character entropy on raw string literals to flag high-randomness credentials.