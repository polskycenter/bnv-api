const Sequelize = require('sequelize');

const database = require('../services/database');
const leafid = require('../utils/leafid');

const ENGINES = new Set(['basic']);

const Scenario = database.define(
  'scenario',
  {
    id: {
      type: Sequelize.STRING,
      defaultValue: leafid,
      primaryKey: true
    },
    engine: {
      type: Sequelize.STRING,
      defaultValue: 'basic',
      validate: {
        isValidLevel(level) {
          if (!ENGINES.has(level)) {
            throw new Error('Invalid importance level');
          }
        }
      },
      allowNull: false
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    prior: {
      type: Sequelize.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 1
      }
    },
    evidenceLevelMinimum: {
      type: Sequelize.FLOAT,
      defaultValue: 0.4,
      allowNull: false,
      validate: {
        min: 0,
        max: 1
      }
    },
    evidenceLevelLow: {
      type: Sequelize.FLOAT,
      defaultValue: 0.45,
      allowNull: false,
      validate: {
        min: 0,
        max: 1
      }
    },
    evidenceLevelMedium: {
      type: Sequelize.FLOAT,
      defaultValue: 0.5,
      allowNull: false,
      validate: {
        min: 0,
        max: 1
      }
    },
    evidenceLevelHigh: {
      type: Sequelize.FLOAT,
      defaultValue: 0.55,
      allowNull: false,
      validate: {
        min: 0,
        max: 1
      }
    },
    evidenceLevelMaximum: {
      type: Sequelize.FLOAT,
      defaultValue: 0.6,
      allowNull: false,
      validate: {
        min: 0,
        max: 1
      }
    },
    importanceWeightLow: {
      type: Sequelize.FLOAT,
      defaultValue: 0.5,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    importanceWeightMedium: {
      type: Sequelize.FLOAT,
      defaultValue: 1,
      allowNull: false,
      validate: {
        min: 0
      }
    },
    importanceWeightHigh: {
      type: Sequelize.FLOAT,
      defaultValue: 2,
      allowNull: false,
      validate: {
        min: 0
      }
    }
  }
);

Scenario.prototype.summarize = function summarize(options = {}) {
  const scenario = this.toJSON();

  return {
    id: scenario.id,
    title: scenario.title,
    description: scenario.description || null,
    engine: scenario.engine,
    actions: options.actions || null,
    prior: scenario.prior,
    importanceWeights: {
      low: scenario.importanceWeightLow,
      medium: scenario.importanceWeightMedium,
      high: scenario.importanceWeightHigh
    },
    evidenceLevels: {
      min: scenario.evidenceLevelMinimum,
      low: scenario.evidenceLevelLow,
      medium: scenario.evidenceLevelMedium,
      high: scenario.evidenceLevelHigh,
      max: scenario.evidenceLevelMaximum
    },
    timeCreated: scenario.timeCreated,
    timeUpdated: scenario.timeUpdated
  };
};

module.exports = Scenario;
