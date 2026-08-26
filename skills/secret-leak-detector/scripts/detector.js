function calculateShannonEntropy(str) {
  const len = str.length;
  if (len === 0) return 0;
  const freqs = {};
  for (let i = 0; i < len; i++) {
    freqs[str[i]] = (freqs[str[i]] || 0) + 1;
  }
  let entropy = 0;
  for (const char in freqs) {
    const p = freqs[char] / len;
    entropy -= p * Math.log2(p);
  }
  return entropy;
}

function scanForSecrets(content) {
  const findings = [];
  const lines = content.split('\n');

  const patterns = [
    { name: 'AWS Access Key', regex: /AKIA[0-9A-Z]{16}/, severity: 'CRITICAL' },
    { name: 'GitHub Token', regex: /gh[pousr]_[A-Za-z0-9_]{36,255}/, severity: 'CRITICAL' },
    { name: 'OpenAI API Key', regex: /sk-[A-Za-z0-9]{32,}/, severity: 'HIGH' },
    { name: 'Stripe Secret Key', regex: /sk_live_[0-9a-zA-Z]{24}/, severity: 'CRITICAL' },
    { name: 'Private Key Header', regex: /-----BEGIN\s+(RSA|OPENSSH|EC|PRIVATE)\s+KEY-----/, severity: 'CRITICAL' },
    { name: 'Generic Password String', regex: /(api[_-]?key|secret|password|auth[_-]?token)\s*[:=]\s*['"][^'"]{12,}['"]/i, severity: 'MEDIUM' }
  ];

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    for (const pat of patterns) {
      const match = line.match(pat.regex);
      if (match) {
        findings.push({
          line: lineNum,
          rule: pat.name,
          severity: pat.severity,
          matchSnippet: match[0].slice(0, 8) + '...' + match[0].slice(-4),
          entropy: calculateShannonEntropy(match[0])
        });
      }
    }
  });

  return findings;
}

module.exports = { calculateShannonEntropy, scanForSecrets };