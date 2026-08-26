const fs = require('fs');
const readline = require('readline');

function detectDelimiter(sampleLine) {
  const delimiters = [',', ';', '\t', '|'];
  let bestDelim = ',';
  let maxCount = 0;
  for (const d of delimiters) {
    const count = sampleLine.split(d).length - 1;
    if (count > maxCount) {
      maxCount = count;
      bestDelim = d;
    }
  }
  return bestDelim;
}

function parseCsvLine(line, delimiter = ',') {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === delimiter && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

async function streamCsv(filePath, onRow, options = {}) {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let headers = null;
  let delimiter = options.delimiter || null;

  for await (const line of rl) {
    if (!line.trim()) continue;
    if (!delimiter) delimiter = detectDelimiter(line);

    const values = parseCsvLine(line, delimiter);
    if (!headers) {
      headers = values;
    } else {
      const record = {};
      headers.forEach((h, idx) => {
        record[h] = values[idx] || '';
      });
      await onRow(record);
    }
  }
}

module.exports = { streamCsv, parseCsvLine, detectDelimiter };