const database = require('../../lib/services/database');

const Account = require('../../lib/models/Account');
const Scenario = require('../../lib/models/Scenario');
const ScenarioAction = require('../../lib/models/ScenarioAction');
const Session = require('../../lib/models/Session');

Promise.all([
  Account.sync({ force: true })
])
.then(() => Promise.all([
  Account.create({
    name: 'Foo Baz',
    email: 'foo@baz.com',
    isBuilder: true,
    isManager: true
  }).then(account => account.confirm()),
  Scenario.sync({ force: true }),
  Session.sync({ force: true })
]))
.then(() => Promise.all([
  ScenarioAction.sync({ force: true }),
  Session.sync({ force: true })
]))
.then(() => database.close());
