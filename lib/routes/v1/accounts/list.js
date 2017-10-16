const Account = require('../../../models/Account');
const database = require('../../../services/database');

const DEFAULT_LIMIT = 30;

function list(req, res, next) {
  const limit = parseInt(req.query.limit, 10) || DEFAULT_LIMIT;
  const offset = parseInt(req.query.offset, 10) || 0;

  return Promise.all([
    Account.findAll({ attributes: [[database.fn('COUNT', database.col('id')), 'count']] }),
    Account.findAll({ limit, offset, order: [['email', 'ASC']] })
  ]).then(([total, accounts]) => {
    res.set({
      'X-Total-Count': total[0].get('count')
    });

    return res.json(accounts.map(account => account.summarize()));
  }).catch(next);
}

module.exports = list;
