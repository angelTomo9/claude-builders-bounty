const fs = require('fs');
const path = require('path');

class AgentAuditLogger {
  constructor(logFilePath) {
    this.logFilePath = logFilePath || path.join(process.cwd(), 'agent_audit.jsonl');
  }

  logEvent(event) {
    const entry = {
      timestamp: new Date().toISOString(),
      agentId: event.agentId || 'primary',
      action: event.action,
      tokens: event.tokens || { prompt: 0, completion: 0 },
      metadata: event.metadata || {}
    };
    fs.appendFileSync(this.logFilePath, JSON.stringify(entry) + '\n', 'utf8');
    return entry;
  }

  generateReport() {
    if (!fs.existsSync(this.logFilePath)) return '# Audit Report\nNo logs found.';
    const lines = fs.readFileSync(this.logFilePath, 'utf8').trim().split('\n').filter(Boolean);
    const events = lines.map(l => JSON.parse(l));

    let md = `# 📋 Agent Trajectory Audit Report (${new Date().toLocaleString()})\n\n`;
    md += `| Timestamp | Agent | Action | Tokens |\n`;
    md += `|---|---|---|---|\n`;

    let totalTokens = 0;
    events.forEach(e => {
      const sum = (e.tokens.prompt || 0) + (e.tokens.completion || 0);
      totalTokens += sum;
      md += `| ${e.timestamp.substring(11, 19)} | \`${e.agentId}\` | ${e.action} | ${sum} |\n`;
    });

    md += `\n**Total Telemetry Tokens Recorded:** ${totalTokens}\n`;
    return md;
  }
}

module.exports = { AgentAuditLogger };