# Autonomous Webhook Listener & Event Router for Claude Code

A production-ready skill and daemon that listens for external webhook notifications (GitHub PR events, Stripe payments, CI triggers), validates cryptographic HMAC signatures, and routes standardized events to autonomous AI agents.

## Quickstart
1. Set environment variables:
   ```env
   WEBHOOK_SECRET=your_webhook_secret_here
   PORT=8080
   ```
2. Start the router:
   ```bash
   node scripts/router.js
   ```