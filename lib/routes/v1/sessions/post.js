const boom = require('boom');
const ejs = require('ejs');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const moment = require('moment');
const path = require('path');

const Account = require('../../../models/Account');
const env = require('../../../env');
const isValidExchangeUrl = require('../../../utils/isValidExchangeUrl');
const sendEmail = require('../../../services/email');
const Session = require('../../../models/Session');

const HOST_API = env('HOST_API');
const SECRET = env('SECRET');

const template = fs.readFileSync(
  path.join(__dirname, '../../../mails/login.ejs'),
  { encoding: 'utf8' }
);

function post(req, res, next) {
  const email = req.body.email;
  const exchangeUrl = req.body.exchangeUrl;

  return Account.findOne({ where: { email } }).then((account) => {
    if (account === null) {
      throw boom.notFound('unmatched account', { email });
    }

    return Session.create({ accountId: account.id }).then((session) => {
      const activationUrl = isValidExchangeUrl(exchangeUrl) ?
        exchangeUrl :
        `${HOST_API}/v1/sessions/activations`;
      const token = jwt.sign({ id: session.id }, SECRET, { expiresIn: '24h' });

      return sendEmail(
        email,
        `[BNV] Automatic sign-in link - ${moment().format('MMMM Do, YYYY')}`,
        ejs.render(
          template,
          {
            name: account.name,
            email: account.email,
            link: `${activationUrl}?token=${token}`,
          }
        )
      ).then(() => session.summarize());
    });
  })
    .then(session => res.json({ id: session.id, email }))
    .catch(next);
}

module.exports = post;
