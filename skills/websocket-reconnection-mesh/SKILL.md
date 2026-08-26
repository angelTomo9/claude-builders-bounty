---
name: websocket-reconnection-mesh
description: Autonomous resilient WebSocket mesh client with exponential backoff heartbeat, offline message queue buffering, and monotonic message deduplication for Claude Code.
---

# WebSocket Reconnection Mesh Skill

Empowers autonomous Claude Code agents to maintain persistent duplex streaming connections with real-time backends under flaky network conditions.

## Resilience Architecture
- **Exponential Backoff with Jitter**: Reconnects on unexpected TCP drops using `min(base * 2^attempt * jitter, maxDelay)`.
- **Offline Queue Buffering**: Queues outgoing RPC messages while disconnected and flushes sequentially upon reconnection.
- **Deduplication Frame Window**: Tracks monotonic sequence IDs to eliminate duplicated broadcast deliveries.