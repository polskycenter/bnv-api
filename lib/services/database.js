const debug = require('debug')('@polskycenter/bnv-api:services:database');
const fs = require('fs');
const pgSetTypeParsers = require('pg-safe-numbers');
const Sequelize = require('sequelize-cockroachdb');

const env = require('../env');

pgSetTypeParsers.pgSetTypeParsers();

const db = new Sequelize(
  env('COCKROACHDB'),
  {
    benchmark: !env('IS_PRODUCTION'),
    define: {
      createdAt: 'timeCreated',
      deletedAt: 'timeArchived',
      updatedAt: 'timeUpdated',
      paranoid: true,
      timestamps: true
    },
    dialectOptions: {
      ssl: {
        ca: [
          fs.readFileSync(
            env('COCKROACHDB_CERT'),
            { encoding: 'ascii' }
          )
        ]
      }
    },
    logging: env('IS_PRODUCTION') ? false : (str, timestamp) => debug(`${str} - ${timestamp}ms`),
  }
);

module.exports = db;
