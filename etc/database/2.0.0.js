const database = require('../../lib/services/database');

const Account = require('../../lib/models/Account');
const Scenario = require('../../lib/models/Scenario');
const ScenarioAction = require('../../lib/models/ScenarioAction');
const Session = require('../../lib/models/Session');

(async () => {
  await Session.sync({ force: true });

  await Account.sync({ force: true });

  await Scenario.sync({ force: true });
  await ScenarioAction.sync({ force: true });

  const account = await Account.create({
    name: 'Example Admin',
    email: 'example.admin@test.com',
    isBuilder: true,
    isManager: true
  });

  await account.confirm()

  database.close();
})();
