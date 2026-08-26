const crypto = require('crypto');

function base64UrlDecode(str) {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return Buffer.from(str, 'base64').toString('utf8');
}

function verifyJwt(token, secret, options = {}) {
  const { maxAgeSkewSec = 60, allowedAlg = 'HS256' } = options;
  const parts = token.split('.');
  if (parts.length !== 3) {
    return { valid: false, error: 'Malformed token structure' };
  }

  let header, payload;
  try {
    header = JSON.parse(base64UrlDecode(parts[0]));
    payload = JSON.parse(base64UrlDecode(parts[1]));
  } catch (e) {
    return { valid: false, error: 'Invalid JSON encoding in token' };
  }

  // Security Check 1: Downgrade attack
  if (header.alg === 'none' || header.alg !== allowedAlg) {
    return { valid: false, error: `Disallowed algorithm: ${header.alg}` };
  }

  // Security Check 2: Signature
  const expectedSig = crypto
    .createHmac('sha256', secret)
    .update(`${parts[0]}.${parts[1]}`)
    .digest('base64url');

  if (parts[2] !== expectedSig) {
    return { valid: false, error: 'Signature mismatch' };
  }

  // Security Check 3: Expiration
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && payload.exp + maxAgeSkewSec < now) {
    return { valid: false, error: 'Token expired' };
  }

  return { valid: true, payload, header };
}

module.exports = { verifyJwt };