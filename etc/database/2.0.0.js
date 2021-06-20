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

  database.close();
})();
