const boom = require('boom');

const Scenario = require('../../../models/Scenario');

function post(req, res, next) {
  const description = req.body.description;
  const engine = req.body.engine;
  const prior = req.body.prior;
  const title = req.body.title;

  const evidenceLevels = req.body.evidenceLevels || {};
  const importanceWeights = req.body.importanceWeights || {};

  const evidenceLevelMinimum = evidenceLevels.min;
  const evidenceLevelLow = evidenceLevels.low;
  const evidenceLevelMedium = evidenceLevels.medium;
  const evidenceLevelHigh = evidenceLevels.high;
  const evidenceLevelMaximum = evidenceLevels.max;
  const importanceWeightLow = importanceWeights.low;
  const importanceWeightMedium = importanceWeights.medium;
  const importanceWeightHigh = importanceWeights.high;

  return Scenario.create({
    description,
    engine,
    prior,
    title,
    evidenceLevelMinimum,
    evidenceLevelLow,
    evidenceLevelMedium,
    evidenceLevelHigh,
    evidenceLevelMaximum,
    importanceWeightLow,
    importanceWeightMedium,
    importanceWeightHigh
  })
    .then(sample => res.json(sample.summarize({ actions: [] })))
    .catch((err) => {
      if (err.name === 'SequelizeValidationError') {
        const messages = err.errors.map(e => e.message);

        return next(boom.badData('incorrect sample parameters', { errors: messages }));
      }

      return next(err);
    });
}

module.exports = post;
