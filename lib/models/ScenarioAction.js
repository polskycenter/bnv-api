const Sequelize = require('sequelize');

const database = require('../services/database');
const leafid = require('../utils/leafid');
const Scenario = require('./Scenario');

const IMPORTANCE_LEVELS = new Set(['low', 'medium', 'high']);

const ScenarioAction = database.define(
  'action',
  {
    id: {
      type: Sequelize.STRING,
      defaultValue: leafid,
      primaryKey: true
    },
    scenarioId: {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: Scenario,
        key: 'id'
      }
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    importance: {
      type: Sequelize.STRING,
      validate: {
        isValidLevel(level) {
          if (!IMPORTANCE_LEVELS.has(level)) {
            throw new Error('Invalid importance level');
          }
        }
      },
      allowNull: false
    },
    sortOrder: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  }
);

ScenarioAction.prototype.summarize = function summarize() {
  const action = this.toJSON();

  return {
    id: action.id,
    scenarioId: action.scenarioId,
    title: action.title,
    description: action.description || null,
    importance: action.importance,
    sortOrder: action.sortOrder
  };
};

module.exports = ScenarioAction;
