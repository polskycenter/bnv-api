const boom = require('boom');
const ejs = require('ejs');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

const Account = require('../../../models/Account');
const env = require('../../../env');
const isValidExchangeUrl = require('../../../utils/isValidExchangeUrl');
const sendEmail = require('../../../services/email');

const HOST_API = env('HOST_API');
const SECRET = env('SECRET');

const template = fs.readFileSync(
  path.join(__dirname, '../../../mails/invite.ejs'),
  { encoding: 'utf8' }
);

function post(req, res, next) {
  const email = req.body.email;
  const exchangeUrl = req.body.exchangeUrl;
  const isBuilder = req.body.isBuilder;
  const isManager = req.body.isManager;
  const name = req.body.name;

  const verbs = ['use'];

  if (isBuilder) {
    verbs.push('edit');
  }

  if (isManager) {
    verbs.push('manage');
  }

  return Account.create({ email, isBuilder, isManager, name }).then((account) => {
    const token = jwt.sign({ id: account.id }, SECRET, { expiresIn: '72h' });
    const verificationUrl = isValidExchangeUrl(exchangeUrl) ?
      exchangeUrl :
      `${HOST_API}/v1/accounts/verifications`;

    return sendEmail(
      email,
      '[BNV] Confirm your account',
      ejs.render(
        template,
        {
          name,
          email,
          link: `${verificationUrl}?token=${token}`,
          verbs
        }
      )
    ).then(() => account.summarize());
  })
    .then(account => res.json(account))
    .catch((err) => {
      if (
        err.name === 'SequelizeValidationError'
      ) {
        const messages = err.errors.map(e => e.message);

        return next(boom.badData('incorrect account parameters', { errors: messages }));
      } else if (
        err.name === 'SequelizeUniqueConstraintError' &&
        err.message.startsWith('duplicate key value (email)')
      ) {
        return next(boom.badData('email already exists', { email }));
      }

      return next(err);
    });
}

module.exports = post;
