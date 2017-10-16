const compareBySortOrder = require('../../../utils/compareBySortOrder');
const database = require('../../../services/database');
const Scenario = require('../../../models/Scenario');
const ScenarioAction = require('../../../models/ScenarioAction');

const DEFAULT_LIMIT = 30;

function actionDictReducer(accum, action) {
  if (!Array.isArray(accum[action.scenarioId])) {
    accum[action.scenarioId] = []; // eslint-disable-line no-param-reassign
  }

  accum[action.scenarioId].push(action);

  return accum;
}

function list(req, res, next) {
  const limit = parseInt(req.query.limit, 10) || DEFAULT_LIMIT;
  const offset = parseInt(req.query.offset, 10) || 0;

  return Promise.all([
    Scenario.findAll({ attributes: [[database.fn('COUNT', database.col('id')), 'count']] }),
    Scenario.findAll({ limit, offset, order: [['title', 'ASC']] }),
  ]).then(([total, scenarios]) => {
    const scenarioIds = scenarios.map(s => s.id);

    return ScenarioAction.findAll({ where: { scenarioId: { $in: scenarioIds } } })
      .then(actions => actions.map(action => action.summarize()))
      .then(actions => actions.reduce(actionDictReducer, {}))
      .then(actionsDict => ([total, scenarios, actionsDict]));
  })
    .then(([total, scenarios, actionsDict]) => {
      res.set({
        'X-Total-Count': total[0].get('count')
      });

      return res.json(
        scenarios.map(
          scenario => scenario.summarize({
            actions: (actionsDict[scenario.id] || []).sort(compareBySortOrder)
          })
        )
      );
    })
    .catch(next);
}

module.exports = list;
