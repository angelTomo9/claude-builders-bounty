function parseProtoFile(content) {
  const messages = {};
  const lines = content.split('\n');
  let currentMessage = null;

  lines.forEach(line => {
    const trimmed = line.trim();
    const msgMatch = trimmed.match(/^message\s+(\w+)\s*\{/);
    if (msgMatch) {
      currentMessage = msgMatch[1];
      messages[currentMessage] = { fields: {} };
      return;
    }

    if (trimmed === '}') {
      currentMessage = null;
      return;
    }

    if (currentMessage) {
      const fieldMatch = trimmed.match(/^(repeated\s+)?(\w+)\s+(\w+)\s*=\s*(\d+);/);
      if (fieldMatch) {
        const isRepeated = Boolean(fieldMatch[1]);
        const type = fieldMatch[2];
        const name = fieldMatch[3];
        const tag = parseInt(fieldMatch[4], 10);
        messages[currentMessage].fields[name] = { type, tag, isRepeated };
      }
    }
  });

  return messages;
}

function validateGrpcPayload(messageName, payload, protoMessages) {
  const schema = protoMessages[messageName];
  if (!schema) {
    return { valid: false, error: `Unknown proto message: ${messageName}` };
  }

  const errors = [];
  for (const [fieldName, fieldDef] of Object.entries(schema.fields)) {
    const val = payload[fieldName];
    if (val === undefined) continue;

    if (fieldDef.isRepeated && !Array.isArray(val)) {
      errors.push(`Field '${fieldName}' must be an array for repeated proto type`);
    } else if (!fieldDef.isRepeated) {
      if (fieldDef.type === 'string' && typeof val !== 'string') {
        errors.push(`Field '${fieldName}' expected string, got ${typeof val}`);
      } else if (['int32', 'int64', 'uint32', 'float', 'double'].includes(fieldDef.type) && typeof val !== 'number') {
        errors.push(`Field '${fieldName}' expected number for ${fieldDef.type}, got ${typeof val}`);
      } else if (fieldDef.type === 'bool' && typeof val !== 'boolean') {
        errors.push(`Field '${fieldName}' expected boolean, got ${typeof val}`);
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

module.exports = { parseProtoFile, validateGrpcPayload };