const boom = require('boom');

const Account = require('../../../models/Account');

function get(req, res, next) {
  const accountId = req.params.id;

  return Account.findById(accountId).then((account) => {
    if (account === null) {
      throw boom.notFound('unmatched account', { accountId });
    }

    return account.summarize();
  })
    .then(account => res.json(account))
    .catch(next);
}

module.exports = get;
