const http = require('http');
const url = require('url');

class MockApiServer {
  constructor(port = 9000) {
    this.port = port;
    this.storage = new Map();
    this.latencyMs = 50;
  }

  start() {
    this.server = http.createServer(async (req, res) => {
      if (this.latencyMs > 0) {
        await new Promise(r => setTimeout(r, this.latencyMs));
      }

      const parsedUrl = url.parse(req.url, true);
      const parts = parsedUrl.pathname.split('/').filter(Boolean);
      const resource = parts[0] || 'items';
      const id = parts[1];

      if (!this.storage.has(resource)) {
        this.storage.set(resource, []);
      }
      const items = this.storage.get(resource);

      res.setHeader('Content-Type', 'application/json');

      if (req.method === 'GET') {
        if (id) {
          const item = items.find(i => String(i.id) === String(id));
          if (!item) {
            res.writeHead(404);
            return res.end(JSON.stringify({ error: 'Not found' }));
          }
          res.writeHead(200);
          return res.end(JSON.stringify(item));
        }
        res.writeHead(200);
        return res.end(JSON.stringify(items));
      }

      let body = '';
      req.on('data', chunk => body += chunk);
      req.on('end', () => {
        const data = body ? JSON.parse(body) : {};

        if (req.method === 'POST') {
          const newItem = { id: items.length + 1, ...data, createdAt: new Date().toISOString() };
          items.push(newItem);
          res.writeHead(201);
          return res.end(JSON.stringify(newItem));
        }

        if (req.method === 'DELETE' && id) {
          const idx = items.findIndex(i => String(i.id) === String(id));
          if (idx !== -1) {
            items.splice(idx, 1);
            res.writeHead(204);
            return res.end();
          }
          res.writeHead(404);
          return res.end(JSON.stringify({ error: 'Not found' }));
        }

        res.writeHead(405);
        res.end(JSON.stringify({ error: 'Method not allowed' }));
      });
    });

    return this.server.listen(this.port);
  }

  stop() {
    if (this.server) this.server.close();
  }
}

module.exports = { MockApiServer };