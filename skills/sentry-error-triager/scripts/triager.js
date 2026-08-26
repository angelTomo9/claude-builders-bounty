const crypto = require('crypto');

function triageSentryEvent(event) {
  const exception = (event.exception && event.exception.values && event.exception.values[0]) || {};
  const errorType = exception.type || 'UnknownError';
  const errorMessage = exception.value || '';
  const frames = (exception.stacktrace && exception.stacktrace.frames) || [];

  // Filter application frames vs node_modules
  const appFrames = frames.filter(f => !f.filename || !f.filename.includes('node_modules'));
  const topFrame = appFrames[appFrames.length - 1] || frames[frames.length - 1] || {};

  // Compute issue fingerprint
  const fingerprintRaw = `${errorType}:${topFrame.filename || 'unknown'}:${topFrame.lineno || 0}:${topFrame.function || 'unknown'}`;
  const fingerprint = crypto.createHash('sha256').update(fingerprintRaw).digest('hex').slice(0, 12);

  // Extract last 5 breadcrumbs
  const breadcrumbs = ((event.breadcrumbs && event.breadcrumbs.values) || []).slice(-5);

  return {
    fingerprint,
    errorType,
    errorMessage,
    topFrame: {
      file: topFrame.filename,
      line: topFrame.lineno,
      col: topFrame.colno,
      func: topFrame.function
    },
    breadcrumbsCount: breadcrumbs.length,
    recentBreadcrumbs: breadcrumbs,
    level: event.level || 'error'
  };
}

module.exports = { triageSentryEvent };