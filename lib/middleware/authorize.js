const boom = require('boom');
const debug = require('debug')('@polskycenter/bnv-api:middleware:authorize');

const Session = require('../models/Session');

const ROLES = {
  BUILDER: 'BUILDER',
  MANAGER: 'MANAGER',
  SELF: 'SELF'
};

// [KE] special-purpose authorization which allows an account to delete any session created
//      for that account
function deleteSessionMiddleware(req, res, next) {
  const sessionId = req.params.id;

  return Session.findByPk(sessionId).then((session) => {
    if (!session) {
      throw next(boom.forbidden('invalid credentials'));
    } else if (session.accountId !== req.account.id) {
      return next(boom.forbidden('invalid session owner'));
    }

    return next();
  }).catch(next);
}

function hasRole(role) {
  return (role === ROLES.SELF && this.params.id === this.account.id) ||
    (role === ROLES.BUILDER && this.account.isBuilder) ||
    (role === ROLES.MANAGER && this.account.isManager);
}

function middlewareFactory(roles) {
  const requirements = [].concat(roles);

  debug('setup', roles);

  return function middleware(req, res, next) {
    if (requirements.length && !requirements.some(hasRole.bind(req))) {
      return next(boom.forbidden('invalid role authorization'));
    }

    return next();
  };
}

module.exports = middlewareFactory;
module.exports.deleteSession = deleteSessionMiddleware;
module.exports.ROLES = ROLES;
