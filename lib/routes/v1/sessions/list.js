const Session = require('../../../models/Session');

function list(req, res, next) {
  const accountId = req.account.id;

  return Session.findAll({ where: { accountId }, order: [['timeCreated', 'DESC']] })
    .then(sessions => sessions.map(session => session.summarize()))
    .then(sessions => res.json(sessions))
    .catch(next);
}

module.exports = list;
