function optimizeDockerfile(content) {
  const lines = content.split('\n');
  const suggestions = [];
  let hasNonRootUser = false;
  let hasMultiStage = false;

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    if (/^USER\s+/i.test(line)) {
      hasNonRootUser = true;
    }

    if (/^FROM\s+.*\s+AS\s+/i.test(line)) {
      hasMultiStage = true;
    }

    if (/apt-get\s+install/i.test(line) && !/--no-install-recommends/i.test(line)) {
      suggestions.push({
        line: lineNum,
        severity: 'MEDIUM',
        message: 'Add --no-install-recommends to apt-get install to reduce image size.'
      });
    }

    if (/apt-get\s+update/i.test(line) && !/rm\s+-rf\s+\/var\/lib\/apt\/lists/i.test(line)) {
      suggestions.push({
        line: lineNum,
        severity: 'LOW',
        message: 'Clean up /var/lib/apt/lists/* in the same RUN layer after apt-get update.'
      });
    }
  });

  if (!hasNonRootUser) {
    suggestions.push({
      line: lines.length,
      severity: 'HIGH',
      message: 'Add a dedicated non-root USER instruction to prevent container breakout vulnerabilities.'
    });
  }

  return { hasMultiStage, hasNonRootUser, suggestions };
}

module.exports = { optimizeDockerfile };