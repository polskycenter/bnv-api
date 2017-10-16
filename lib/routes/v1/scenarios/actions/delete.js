const boom = require('boom');

const ScenarioAction = require('../../../../models/ScenarioAction');

function del(req, res, next) {
  const actionId = req.params.id;
  const scenarioId = req.params.sid;

  return ScenarioAction.findOne({ where: { id: actionId, scenarioId } }).then((action) => {
    if (action === null) {
      throw boom.notFound('unmatched scenario action', { actionId });
    }

    return action.destroy();
  })
    .then(() => res.json(null))
    .catch(next);
}

module.exports = del;
