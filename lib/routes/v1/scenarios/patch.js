const boom = require('boom');
const has = require('has');
const jsonpatch = require('fast-json-patch');

const Scenario = require('../../../models/Scenario');
const ScenarioAction = require('../../../models/ScenarioAction');

const RENAMED_PATCH_PATCH = {
  '/evidenceLevels/min': '/evidenceLevelMinimum',
  '/evidenceLevels/low': '/evidenceLevelLow',
  '/evidenceLevels/medium': '/evidenceLevelMedium',
  '/evidenceLevels/high': '/evidenceLevelHigh',
  '/evidenceLevels/max': '/evidenceLevelMaximum',
  '/importanceWeights/low': '/importanceWeightLow',
  '/importanceWeights/medium': '/importanceWeightMedium',
  '/importanceWeights/high': '/importanceWeightHigh'
};

const PATCH_PATHS = new Set([
  '/description',
  '/engine',
  '/prior',
  '/title',
  '/evidenceLevelMinimum',
  '/evidenceLevelLow',
  '/evidenceLevelMedium',
  '/evidenceLevelHigh',
  '/evidenceLevelMaximum',
  '/importanceWeightLow',
  '/importanceWeightMedium',
  '/importanceWeightHigh'
]);

function renamePatchPaths(jsonPatch) {
  if (has(RENAMED_PATCH_PATCH, jsonPatch.path)) {
    return Object.assign(
      jsonPatch,
      {
        path: RENAMED_PATCH_PATCH[jsonPatch.path]
      }
    );
  }

  return jsonPatch;
}

function patch(req, res, next) {
  const scenarioId = req.params.id;
  const patches = [].concat(req.body);

  const allowedPatches = patches.map(renamePatchPaths).filter(p => PATCH_PATHS.has(p.path));

  if (patches.length !== allowedPatches.length) {
    return next(boom.badData('invalid patch paths', { allowedPaths: Array.from(PATCH_PATHS) }));
  }

  return Scenario.findByPk(scenarioId).then((scenario) => {
    if (scenario === null) {
      throw boom.notFound('unmatched account', { scenarioId });
    }

    let patched;

    try {
      patched = allowedPatches.reduce(jsonpatch.applyReducer, Object.assign({}, scenario.toJSON()));
    } catch (err) {
      throw boom.badData('one or more invalid patches', err);
    }

    return scenario.update(patched)
      .then(() => ScenarioAction.findAll({ where: { scenarioId } }))
      .then(actions => scenario.summarize({ actions: actions.map(action => action.summarize()) }));
  })
    .then(scenario => res.json(scenario))
    .catch(next);
}

module.exports = patch;
