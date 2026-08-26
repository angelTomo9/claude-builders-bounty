---
name: rate-limiter-token-bucket
description: Autonomous token bucket & sliding-window rate limiting algorithm for API gateways in Claude Code. Manages burst capacities, continuous millisecond token replenishment, per-key isolation, and memory-safe cache sweeps.
---

# Rate Limiter Token Bucket Skill

Empowers autonomous Claude Code agents to enforce API traffic limits, prevent upstream provider rate exhaustion, and handle burst requests safely.

## Algorithm Specifications
- **Token Bucket Model**: Supports maximum burst capacity $C$ and replenishment rate $r$ tokens/sec.
- **Lazy Refill Calculation**: Calculates token arrivals based on elapsed millisecond intervals `(now - lastRefill) * refillRate`.
- **Per-Key Isolation**: Independent bucket state keyed by client IP, API key, or route endpoint.
- **LRU Memory Management**: Automatic pruning of stale client buckets to maintain a bounded memory footprint.