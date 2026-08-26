class WebSocketReconnectionMesh {
  constructor(options = {}) {
    this.baseDelay = options.baseDelay || 500;
    this.maxDelay = options.maxDelay || 10000;
    this.maxRetries = options.maxRetries || 10;
    this.queue = [];
    this.seenSeqIds = new Set();
    this.connected = false;
    this.attempts = 0;
  }

  send(payload) {
    const seqId = Date.now() + '-' + Math.random().toString(36).slice(2, 7);
    const envelope = { seqId, payload, timestamp: Date.now() };

    if (!this.connected) {
      this.queue.push(envelope);
      return { status: 'QUEUED', seqId };
    }

    return { status: 'TRANSMITTED', seqId };
  }

  onMessage(envelope) {
    if (!envelope || !envelope.seqId) return null;
    if (this.seenSeqIds.has(envelope.seqId)) {
      return { duplicate: true, seqId: envelope.seqId };
    }
    this.seenSeqIds.add(envelope.seqId);
    if (this.seenSeqIds.size > 1000) {
      const oldest = Array.from(this.seenSeqIds).slice(0, 200);
      oldest.forEach(id => this.seenSeqIds.delete(id));
    }
    return { duplicate: false, payload: envelope.payload };
  }

  computeBackoffDelay() {
    const jitter = Math.random() * 0.3 + 0.85;
    const delay = Math.min(this.baseDelay * Math.pow(2, this.attempts) * jitter, this.maxDelay);
    this.attempts++;
    return Math.floor(delay);
  }

  onConnect() {
    this.connected = true;
    this.attempts = 0;
    const flushed = [...this.queue];
    this.queue = [];
    return flushed;
  }

  onDisconnect() {
    this.connected = false;
  }
}

module.exports = { WebSocketReconnectionMesh };