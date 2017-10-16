const env = require('../env');

const HOST_CLIENT = env('HOST_CLIENT');

function isValidExchangeUrl(url) {
  return url && url.startsWith(`${HOST_CLIENT}/`);
}

module.exports = isValidExchangeUrl;
