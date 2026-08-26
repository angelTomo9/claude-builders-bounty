function scanQueryForSqlInjection(codeSnippet) {
  const vulnerabilities = [];
  const lines = codeSnippet.split('\n');

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // Pattern 1: Template literal interpolation inside query
    if (/(query|execute|raw)\s*\(\s*`[^`]*\$\{[^}]+\}[^`]*`/i.test(line)) {
      vulnerabilities.push({
        line: lineNum,
        severity: 'HIGH',
        type: 'CWE-89 / SQL Injection via Template Literal',
        message: 'Unsafe variable interpolation in database query. Use parameterized values ($1, $2) instead.'
      });
    }

    // Pattern 2: String concatenation in query
    if (/(SELECT|UPDATE|INSERT|DELETE)\s+.*['"]\s*\+\s*\w+/i.test(line)) {
      vulnerabilities.push({
        line: lineNum,
        severity: 'HIGH',
        type: 'CWE-89 / SQL Injection via String Concatenation',
        message: 'String concatenation detected in SQL statement. Refactor to prepared statements.'
      });
    }
  });

  return vulnerabilities;
}

function parameterizeQuery(templateSql, values = []) {
  let paramIndex = 1;
  const sanitizedSql = templateSql.replace(/\$\{([^}]+)\}/g, () => `$${paramIndex++}`);
  return { sql: sanitizedSql, params: values };
}

module.exports = { scanQueryForSqlInjection, parameterizeQuery };