class TokenBucketRateLimiter {
  constructor(options = {}) {
    this.capacity = options.capacity || 100; // max burst
    this.refillRate = options.refillRate || 10; // tokens per second
    this.buckets = new Map();
    this.maxBuckets = options.maxBuckets || 10000;
  }

  getBucket(key) {
    const now = Date.now();
    let bucket = this.buckets.get(key);

    if (!bucket) {
      if (this.buckets.size >= this.maxBuckets) {
        // Evict oldest 10%
        const keysToEvict = Array.from(this.buckets.keys()).slice(0, Math.floor(this.maxBuckets * 0.1));
        keysToEvict.forEach(k => this.buckets.delete(k));
      }
      bucket = { tokens: this.capacity, lastRefill: now };
      this.buckets.set(key, bucket);
      return bucket;
    }

    // Refill tokens based on elapsed time
    const elapsedSec = (now - bucket.lastRefill) / 1000;
    const tokensToAdd = elapsedSec * this.refillRate;
    bucket.tokens = Math.min(this.capacity, bucket.tokens + tokensToAdd);
    bucket.lastRefill = now;

    return bucket;
  }

  consume(key, cost = 1) {
    const bucket = this.getBucket(key);

    if (bucket.tokens >= cost) {
      bucket.tokens -= cost;
      return {
        allowed: true,
        remaining: Math.floor(bucket.tokens),
        retryAfterMs: 0
      };
    }

    const tokensNeeded = cost - bucket.tokens;
    const retryAfterMs = Math.ceil((tokensNeeded / this.refillRate) * 1000);

    return {
      allowed: false,
      remaining: Math.floor(bucket.tokens),
      retryAfterMs
    };
  }
}

module.exports = { TokenBucketRateLimiter };