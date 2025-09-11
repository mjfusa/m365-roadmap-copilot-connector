/**
 * Fetch polyfill for Node.js environments
 * This ensures fetch is available globally for libraries that depend on it
 */

// Only polyfill if fetch is not already available
if (!global.fetch) {
  const fetch = require('node-fetch');
  
  // Make fetch available globally
  global.fetch = fetch;
  global.Headers = fetch.Headers;
  global.Request = fetch.Request;
  global.Response = fetch.Response;
}
