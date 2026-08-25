---
name: smart-contract-linter
description: Autonomous static analysis linter and vulnerability scanner for Solidity smart contracts in Claude Code. Scans for reentrancy, unchecked external calls, tx.origin authentication, and state-variable visibility.
---

# Smart Contract Linter Skill

Empowers Claude Code to perform automated security audits and linting on EVM smart contracts.

## Detection Rules
- **Reentrancy**: Checks for state modifications occurring after external `.call{value: ...}()` invocations.
- **Unchecked Call Return**: Flags `.call()`, `.delegatecall()`, or `.send()` lacking return value checks.
- **tx.origin Phishing**: Warns against using `tx.origin` for access control instead of `msg.sender`.
- **Missing Visibility**: Flags function declarations without explicit `public`, `private`, `external`, or `internal` keywords.