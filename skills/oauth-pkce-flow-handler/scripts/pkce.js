const crypto = require('crypto');

function base64UrlEncode(buffer) {
  return buffer
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

function generateCodeVerifier(length = 64) {
  const bytes = crypto.randomBytes(length);
  return base64UrlEncode(bytes).slice(0, length);
}

function generateCodeChallenge(verifier) {
  const hash = crypto.createHash('sha256').update(verifier).digest();
  return base64UrlEncode(hash);
}

function generatePkcePair() {
  const codeVerifier = generateCodeVerifier(64);
  const codeChallenge = generateCodeChallenge(codeVerifier);
  const state = base64UrlEncode(crypto.randomBytes(32));

  return {
    codeVerifier,
    codeChallenge,
    codeChallengeMethod: 'S256',
    state
  };
}

function verifyPkceChallenge(verifier, expectedChallenge) {
  const challenge = generateCodeChallenge(verifier);
  return challenge === expectedChallenge;
}

module.exports = {
  generateCodeVerifier,
  generateCodeChallenge,
  generatePkcePair,
  verifyPkceChallenge
};