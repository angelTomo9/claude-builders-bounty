function lintSolidity(sourceCode) {
  const issues = [];
  const lines = sourceCode.split('\n');

  lines.forEach((line, idx) => {
    const lineNum = idx + 1;

    // Rule 1: tx.origin check
    if (/tx\.origin/.test(line)) {
      issues.push({
        line: lineNum,
        severity: 'HIGH',
        rule: 'SWC-115 / tx.origin Authentication',
        message: 'Avoid using tx.origin for authorization; use msg.sender instead.'
      });
    }

    // Rule 2: Unchecked low-level call
    if (/\.(call|delegatecall|send)\s*\(/.test(line) && !/(bool\s+\w+|require|if)\s*\(?.*\.call/.test(line)) {
      issues.push({
        line: lineNum,
        severity: 'MEDIUM',
        rule: 'SWC-104 / Unchecked Return Value',
        message: 'Return value of low-level call is not verified.'
      });
    }

    // Rule 3: Missing visibility on function
    if (/^\s*function\s+\w+\s*\(/.test(line) && !/(public|external|internal|private)/.test(line)) {
      issues.push({
        line: lineNum,
        severity: 'MEDIUM',
        rule: 'SWC-100 / Missing Visibility',
        message: 'Function declaration lacks explicit visibility modifier.'
      });
    }
  });

  return issues;
}

module.exports = { lintSolidity };