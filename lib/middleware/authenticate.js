const basicAuth = require('basic-auth');
const boom = require('boom');
const debug = require('debug')('@polskycenter/bnv-api:middleware:authenticate');

const Account = require('../models/Account');
const Session = require('../models/Session');

function deserialize(key) {
  debug('deserialize', key);

  return Session.findOne({ where: { key } }).then((session) => {
    if (session === null) {
      throw boom.forbidden('invalid credentials');
    } else if (session.isExpired()) {
      session.destroy().catch(err => debug('error revoking session', err));

      throw boom.unauthorized('expired credentials');
    }

    return Account.findById(session.accountId).then((account) => {
      if (account === null) {
        throw boom.forbidden('invalid account');
      } else if (account.isInactive()) {
        throw boom.forbidden('inactive account');
      }

      debug('deserialized', key);

      // [KE] intentionally async to the deserialization flow
      Session.prune(session.accountId).catch(err => debug('error pruning sessions', err));

      return { account, session };
    });
  });
}

function middleware(req, res, next) {
  debug('headers', req.headers);

  const credentials = basicAuth(req);

  if (!credentials || !credentials.name) {
    return next(boom.unauthorized('missing credentials'));
  }

  const key = credentials.name;

  return deserialize(key).then(({ account, session }) => {
    session.touch().catch(err => debug('error touching session', err));

    req.account = account;
    req.session = session;

    next();
  }).catch(next);
}

module.exports = middleware;
