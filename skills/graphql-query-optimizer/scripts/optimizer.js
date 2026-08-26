function analyzeGraphQLQuery(queryString, maxDepth = 5) {
  let currentDepth = 0;
  let maxFoundDepth = 0;
  const fields = [];
  const lines = queryString.split('\n');

  lines.forEach(line => {
    const trimmed = line.trim();
    if (trimmed.includes('{')) {
      currentDepth++;
      if (currentDepth > maxFoundDepth) maxFoundDepth = currentDepth;
    }
    if (trimmed.includes('}')) {
      currentDepth = Math.max(0, currentDepth - 1);
    }
    const match = trimmed.match(/^([a-zA-Z0-9_]+)/);
    if (match && !['query', 'mutation', 'subscription', 'fragment'].includes(match[1])) {
      fields.push(match[1]);
    }
  });

  const isSafe = maxFoundDepth <= maxDepth;
  const complexityScore = fields.length * 2 + maxFoundDepth * 5;

  return {
    maxDepth: maxFoundDepth,
    complexityScore,
    isSafe,
    totalFields: fields.length,
    warning: !isSafe ? `Query depth ${maxFoundDepth} exceeds safety threshold of ${maxDepth}.` : null
  };
}

module.exports = { analyzeGraphQLQuery };