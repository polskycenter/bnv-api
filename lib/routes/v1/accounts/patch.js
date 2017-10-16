const boom = require('boom');
const jsonpatch = require('fast-json-patch');
const Account = require('../../../models/Account');

const PATCH_PATHS = new Set([
  '/name'
]);

const PATCH_PATHS_MANAGER = new Set([
  ...PATCH_PATHS,
  '/isBuilder',
  '/isManager'
]);

function patch(req, res, next) {
  const accountId = req.params.id;
  const patches = [].concat(req.body);

  const patchPaths = req.account.isManager ? PATCH_PATHS_MANAGER : PATCH_PATHS;
  const allowedPatches = patches.filter(p => patchPaths.has(p.path));

  if (patches.length !== allowedPatches.length) {
    return next(boom.badData('invalid patch paths', { allowedPaths: Array.from(patchPaths) }));
  }

  return Account.findById(accountId).then((account) => {
    if (account === null) {
      throw boom.notFound('unmatched account', { accountId });
    }

    let patched;

    try {
      patched = allowedPatches.reduce(jsonpatch.applyReducer, Object.assign({}, account.toJSON()));
    } catch (err) {
      throw boom.badData('one or more invalid patches', err);
    }

    return account.update(patched);
  })
    .then(account => res.json(account.summarize()))
    .catch(next);
}

module.exports = patch;
