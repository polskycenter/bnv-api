const moment = require('moment');

function timestamp(val) {
  return moment(val).valueOf();
}

module.exports = timestamp;
