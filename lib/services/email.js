const debug = require('debug')('@polskycenter/bnv-api:services:email');
const promisify = require('es6-promisify');
const ses = require('node-ses');

const env = require('../env');

const FROM = `BNV Calculators <${env('SES_EMAIL')}>`;

const client = ses.createClient({
  amazon: 'https://email.us-east-1.amazonaws.com',
  key: env('AWS_KEYID'),
  secret: env('AWS_SECRET')
});

const sendEmail = promisify(client.sendEmail, { thisArg: client, multiArgs: true });

function email(to, subject, plainText) {
  debug('send', to, subject);

  // [KE] promisify-ied multi-argument callbacks are converted to an Array; resolve to the target
  //      response object in Array position 1; rel: https://goo.gl/76qHKg
  return sendEmail({
    to,
    from: FROM,
    subject,
    altText: plainText
  }).then(res => res[1]);
}

module.exports = email;
