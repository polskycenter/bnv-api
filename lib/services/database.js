const debug = require('debug')('@polskycenter/bnv-api:services:database');
const fs = require('fs');
const Sequelize = require('sequelize');

const env = require('../env');

const db = new Sequelize(
  'bnv',
  null,
  null,
  {
    benchmark: !env('IS_PRODUCTION'),
    define: {
      createdAt: 'timeCreated',
      deletedAt: 'timeArchived',
      updatedAt: 'timeUpdated',
      paranoid: true,
      timestamps: true
    },
    dialect: 'sqlite',
    storage: env('SQLITE'),
    logging: env('IS_PRODUCTION') ? false : (str, timestamp) => debug(`${str} - ${timestamp}ms`),
  }
);

module.exports = db;
