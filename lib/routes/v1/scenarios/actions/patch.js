const boom = require('boom');
const jsonpatch = require('fast-json-patch');

const ScenarioAction = require('../../../../models/ScenarioAction');

const PATCH_PATHS = new Set([
  '/description',
  '/importance',
  '/sortOrder',
  '/title'
]);

function patch(req, res, next) {
  const actionId = req.params.id;
  const patches = [].concat(req.body);
  const scenarioId = req.params.sid;

  const allowedPatches = patches.filter(p => PATCH_PATHS.has(p.path));

  if (patches.length !== allowedPatches.length) {
    return next(boom.badData('invalid patch paths', { allowedPaths: Array.from(PATCH_PATHS) }));
  }

  return ScenarioAction.findOne({ where: { id: actionId, scenarioId } }).then((action) => {
    if (action === null) {
      throw boom.notFound('unmatched scenario action', { actionId });
    }

    let patched;

    try {
      patched = allowedPatches.reduce(jsonpatch.applyReducer, Object.assign({}, action.toJSON()));
    } catch (err) {
      throw boom.badData('one or more invalid patches', err);
    }

    return action.update(patched);
  })
    .then(action => res.json(action.summarize()))
    .catch(next);
}

module.exports = patch;
