const Sequelize = require('sequelize');

const database = require('../services/database');
const leafid = require('../utils/leafid');

const Account = database.define(
  'account',
  {
    id: {
      type: Sequelize.STRING,
      defaultValue: leafid,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    isBuilder: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isManager: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    timeConfirmed: {
      type: Sequelize.DATE
    },
    timeSuspended: {
      type: Sequelize.DATE
    }
  }
);

Account.beforeCreate((account) => {
  account.email = account.email.toLowerCase(); // eslint-disable-line no-param-reassign
});

Account.beforeFind((options) => {
  if (options.where && options.where.email) {
    options.where.email = options.where.email.toLowerCase(); // eslint-disable-line no-param-reassign, max-len
  }

  return options;
});

// [KE] workaround "paranoid" db DELETEs that do not treat deleted timestamp as part of uniqueness;
//      see afterRestore below for restoration workflow
Account.beforeDestroy((account) => {
  const email = `${encodeURIComponent(account.email)}@${Date.now().toString(36)}.bnv.io`;

  return account.update({ email });
});


Account.afterRestore((account) => {
  const email = decodeURIComponent(account.email.split('@')[0]);

  return account.update({ email });
});

Account.prototype.confirm = function confirm() {
  return this.update({ timeConfirmed: (new Date()).toISOString() });
};

Account.prototype.isInactive = function isInactive() {
  return this.timeConfirmed === null || this.timeSuspended !== null;
};

Account.prototype.reinstate = function reinstate() {
  return this.update({ timeSuspended: null });
};

Account.prototype.summarize = function summarize() {
  const account = this.toJSON();

  return {
    id: account.id,
    name: account.name,
    email: account.email,
    isBuilder: account.isBuilder,
    isManager: account.isManager,
    timeConfirmed: account.timeConfirmed,
    timeCreated: account.timeCreated,
    timeSuspended: account.timeSuspended
  };
};

Account.prototype.suspended = function suspended() {
  return this.update({ timeSuspended: (new Date()).toISOString() });
};

module.exports = Account;
