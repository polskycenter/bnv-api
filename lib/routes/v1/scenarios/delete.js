const boom = require('boom');

const Scenario = require('../../../models/Scenario');
const ScenarioAction = require('../../../models/ScenarioAction');

function del(req, res, next) {
  const scenarioId = req.params.id;

  return Scenario.findById(scenarioId).then((scenario) => {
    if (scenario === null) {
      throw boom.notFound('unmatched scenario', { scenarioId });
    }

    return Promise.all([
      scenario.destroy(),
      ScenarioAction.destroy({ where: { scenarioId } })
    ]);
  })
    .then(() => res.json(null))
    .catch(next);
}

module.exports = del;
