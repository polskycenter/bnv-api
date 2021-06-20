const has = require('has');

const config = {
  AWS_KEYID: process.env.BNV__AWS_KEYID,
  AWS_SECRET: process.env.BNV__AWS_SECRET,
  HOST_API: process.env.BNV__HOST_API,
  HOST_CLIENT: process.env.BNV__HOST_CLIENT,
  IS_PRODUCTION: process.env.BNV__ENVIRONMENT === 'production',
  PORT: 8040,
  SECRET: process.env.BNV__SECRET,
  SES_EMAIL: process.env.BNV__AWS_SES_EMAIL,
  SQLITE: process.env.BNV__SQLITE
};

function get(param) {
  if (!has(config, param)) {
    throw new Error(`unknown configuration parameter: ${param}`);
  }

  return config[param];
}

module.exports = get;
