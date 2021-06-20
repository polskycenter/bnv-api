const boom = require('boom');
const Account = require('../../../models/Account');

function del(req, res, next) {
  const accountId = req.params.id;

  return Account.findByPk(accountId).then((account) => {
    if (account === null) {
      throw boom.notFound('unmatched account', { accountId });
    }

    return account.destroy();
  })
    .then(() => res.json(null))
    .catch(next);
}

module.exports = del;
