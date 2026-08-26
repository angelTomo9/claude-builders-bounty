function parseField(field, min, max) {
  const values = new Set();
  const parts = field.split(',');

  for (const part of parts) {
    if (part === '*') {
      for (let i = min; i <= max; i++) values.add(i);
    } else if (part.includes('/')) {
      const [range, stepStr] = part.split('/');
      const step = parseInt(stepStr, 10) || 1;
      const start = range === '*' ? min : parseInt(range, 10);
      for (let i = start; i <= max; i += step) values.add(i);
    } else if (part.includes('-')) {
      const [startStr, endStr] = part.split('-');
      const start = parseInt(startStr, 10);
      const end = parseInt(endStr, 10);
      for (let i = start; i <= end; i++) values.add(i);
    } else {
      const num = parseInt(part, 10);
      if (!isNaN(num) && num >= min && num <= max) values.add(num);
    }
  }

  return values;
}

function getNextCronExecution(cronExpr, fromDate = new Date()) {
  const fields = cronExpr.trim().split(/\s+/);
  if (fields.length !== 5) {
    throw new Error('Invalid cron expression. Expected 5 fields.');
  }

  const minutes = parseField(fields[0], 0, 59);
  const hours = parseField(fields[1], 0, 23);
  const daysOfMonth = parseField(fields[2], 1, 31);
  const months = parseField(fields[3], 1, 12);
  const daysOfWeek = parseField(fields[4], 0, 6);

  const candidate = new Date(fromDate.getTime() + 60000);
  candidate.setSeconds(0, 0);

  // Search up to 1 year ahead minute by minute
  for (let i = 0; i < 525600; i++) {
    const min = candidate.getMinutes();
    const hr = candidate.getHours();
    const dom = candidate.getDate();
    const mon = candidate.getMonth() + 1;
    const dow = candidate.getDay();

    if (
      minutes.has(min) &&
      hours.has(hr) &&
      daysOfMonth.has(dom) &&
      months.has(mon) &&
      daysOfWeek.has(dow)
    ) {
      return candidate;
    }

    candidate.setTime(candidate.getTime() + 60000);
  }

  throw new Error('No execution time found within 1 year.');
}

module.exports = { parseField, getNextCronExecution };