const bs58 = require('bs58');
const crypto = require('crypto');
const moment = require('moment');
const Sequelize = require('sequelize');

const Account = require('./Account');
const database = require('../services/database');
const leafid = require('../utils/leafid');
const timestamp = require('../utils/timestamp');

const Session = database.define(
  'session',
  {
    id: {
      type: Sequelize.STRING,
      defaultValue: leafid,
      primaryKey: true
    },
    accountId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: Account,
        key: 'id'
      }
    },
    key: {
      type: Sequelize.STRING,
      defaultValue: () => `bnv_${Date.now().toString(36)}${bs58.encode(crypto.randomBytes(24))}`,
      unique: true,
      allowNull: false
    },
    timeUsed: {
      type: Sequelize.DATE
    }
  },
  {
    updatedAt: false
  }
);

// [KE] allow at most 2 active sessions; archive/revoke all others
Session.prune = function prune(accountId) {
  return this.findAll({
    attributes: ['id', 'timeCreated', 'timeUsed'],
    where: { accountId, timeArchived: null }
  }).then(
    sessions => sessions.sort(
      (a, b) => timestamp(b.timeUsed || b.timeCreated) - timestamp(a.timeUsed || a.timeCreated)
    )
  ).then(
    sessions => sessions.slice(2).map(session => session.destroy())
  );
};

// [KE] sessions are valid for at most 90 days
Session.prototype.isExpired = function isExpired() {
  return moment().subtract(90, 'days').isAfter(this.timeCreated);
};

Session.prototype.summarize = function summarize() {
  const session = this.toJSON();

  return {
    id: session.id,
    accountId: session.accountId,
    key: session.key,
    timeCreated: session.timeCreated,
    timeUsed: session.timeUsed
  };
};

Session.prototype.touch = function touch() {
  return this.update({ timeUsed: (new Date()).toISOString() });
};

module.exports = Session;
