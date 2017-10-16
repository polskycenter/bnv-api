const boom = require('boom');
const jwt = require('jsonwebtoken');

const Session = require('../../../../models/Session');
const env = require('../../../../env');

const SECRET = env('SECRET');

function get(req, res, next) {
  const token = req.query.token || '';

  let decoded;

  try {
    decoded = jwt.verify(token, SECRET);
  } catch (err) {
    return next(boom.forbidden('invalid activation'));
  }

  const sessionId = decoded.id;

  return Session.findById(sessionId).then((session) => {
    if (session === null) {
      throw boom.notFound('unmatched session', { sessionId });
    }

    return session.touch();
  })
    .then(session => res.json(session.summarize()))
    .catch(next);
}

module.exports = get;
