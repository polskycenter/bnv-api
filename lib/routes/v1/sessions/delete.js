const boom = require('boom');
const Session = require('../../../models/Session');

function del(req, res, next) {
  const sessionId = req.params.id;

  return Session.findByPk(sessionId).then((session) => {
    if (session === null) {
      throw boom.notFound('unmatched session', { sessionId });
    }

    return session.destroy();
  })
    .then(() => res.json(null))
    .catch(next);
}

module.exports = del;
