const boom = require('boom');
const jwt = require('jsonwebtoken');

const Account = require('../../../../models/Account');
const Session = require('../../../../models/Session');
const env = require('../../../../env');

const SECRET = env('SECRET');

function get(req, res, next) {
  const token = req.query.token || '';

  let decoded;

  try {
    decoded = jwt.verify(token, SECRET);
  } catch (err) {
    return next(boom.forbidden('invalid verification'));
  }

  const accountId = decoded.id;

  return Account.findByPk(accountId).then((account) => {
    if (account === null) {
      throw boom.notFound('unmatched account', { accountId });
    }

    return account.confirm();
  })
    .then(account => Session.create({ accountId: account.id }))
    .then(session => res.json(session.summarize()))
    .catch(next);
}

module.exports = get;
