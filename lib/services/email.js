const debug = require('debug')('@polskycenter/bnv-api:services:email');
const ses = require('node-ses');

const env = require('../env');

const FROM = `BNV Calculators <${env('SES_EMAIL')}>`;

const client = ses.createClient({
  amazon: 'https://email.us-east-1.amazonaws.com',
  key: env('AWS_KEYID'),
  secret: env('AWS_SECRET')
});

function email(to, subject, plainText) {
  debug('send', to, subject);

  return new Promise((resolve, reject) => client.sendEmail({
    to,
    subject,
    from: FROM,
    altText: plainText
  }, (err, data) => {
    if (err) {
      debug('ERROR', data);
      return reject(err);
    }

    debug('SENT', data);
    return resolve(data);
  }));
}

module.exports = email;
