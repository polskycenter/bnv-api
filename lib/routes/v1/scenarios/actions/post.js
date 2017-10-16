const boom = require('boom');

const ScenarioAction = require('../../../../models/ScenarioAction');

function post(req, res, next) {
  const description = req.body.description;
  const importance = req.body.importance;
  const scenarioId = req.params.sid;
  const sortOrder = req.body.sortOrder;
  const title = req.body.title;

  return ScenarioAction.create({
    description,
    importance,
    scenarioId,
    sortOrder,
    title
  })
    .then(action => res.json(action.summarize()))
    .catch((err) => {
      if (err.name === 'SequelizeValidationError') {
        const messages = err.errors.map(e => e.message);

        return next(boom.badData('incorrect sample parameters', { errors: messages }));
      }

      return next(err);
    });
}

module.exports = post;
