const http = require('http');
const crypto = require('crypto');

function verifyHmac(payload, signature, secret) {
  if (!signature || !secret) return false;
  const hmac = crypto.createHmac('sha256', secret);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature));
}

function normalizeEvent(provider, rawBody) {
  const data = typeof rawBody === 'string' ? JSON.parse(rawBody) : rawBody;
  return {
    id: data.id || crypto.randomUUID(),
    provider: provider,
    timestamp: new Date().toISOString(),
    event: data.action || data.type || 'generic_event',
    payload: data
  };
}

function startServer(port = 8080, secret = 'test-secret') {
  const server = http.createServer((req, res) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      const signature = req.headers['x-hub-signature-256'] || req.headers['stripe-signature'];
      const isValid = secret ? verifyHmac(body, signature, secret) : true;

      if (!isValid && signature) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ error: 'Invalid HMAC signature' }));
      }

      try {
        const event = normalizeEvent(req.headers['x-github-event'] ? 'github' : 'custom', body);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'routed', event }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: e.message }));
      }
    });
  });

  return server;
}

if (require.main === module) {
  const port = process.env.PORT || 8080;
  const secret = process.env.WEBHOOK_SECRET || 'test-secret';
  startServer(port, secret).listen(port, () => {
    console.log(`Webhook Event Router listening on port ${port}`);
  });
}

module.exports = { verifyHmac, normalizeEvent, startServer };