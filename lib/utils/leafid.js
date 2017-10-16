const crypto = require('crypto');

function leafid() {
  const random = parseInt(crypto.randomBytes(6).toString('hex'), 16).toString(36).slice(0, 8);

  return `${Date.now().toString(36)}${random}`;
}

module.exports = leafid;
