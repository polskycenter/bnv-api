const boom = require('boom');

const compareBySortOrder = require('../../../utils/compareBySortOrder');
const Scenario = require('../../../models/Scenario');
const ScenarioAction = require('../../../models/ScenarioAction');

function get(req, res, next) {
  const scenarioId = req.params.id;

  return Promise.all([
    Scenario.findByPk(scenarioId),
    ScenarioAction.findAll({ where: { scenarioId } })
  ]).then(([scenario, actions]) => {
    if (scenario === null) {
      throw boom.notFound('unmatched sample', { scenarioId });
    }

    return scenario.summarize({
      actions: actions.map(action => action.summarize()).sort(compareBySortOrder)
    });
  })
    .then(scenario => res.json(scenario))
    .catch(next);
}

module.exports = get;
