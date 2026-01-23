const NodeCache = require('node-cache');

// Shared cache instance
// stdTTL: time to live in seconds (default 60s)
// checkperiod: time in seconds to check for expired keys
const cache = new NodeCache({ stdTTL: 60, checkperiod: 120 });

module.exports = cache;
