const bodyParser = require('body-parser');
const boom = require('boom');
const debug = require('debug')('@polskycenter/bnv-api:router');
const express = require('express');
const healthcheck = require('middle-pinger');
const helmet = require('helmet');
const hpp = require('hpp');
const morgan = require('morgan');

const authenticate = require('./middleware/authenticate');
const authorize = require('./middleware/authorize');
const env = require('./env');
const jsonContentType = require('./middleware/jsonContentType');
const routes = require('./routes');

const IS_PRODUCTION = env('IS_PRODUCTION');
const ROLES = authorize.ROLES;

const api = express();

api.use(morgan(IS_PRODUCTION ? 'tiny' : 'dev'));
api.use(healthcheck());
api.use('/favicon.ico', (req, res) => res.status(204));
api.use(bodyParser.json());
api.use(helmet());
api.use(hpp());
api.use(jsonContentType);

// [KE] these routes are explicitly mounted prior to authentication middleware
api.get('/v1/accounts/verifications', routes.v1.accounts.verifications.get);
api.get('/v1/sessions/activations', routes.v1.sessions.activations.get);
api.post('/v1/sessions', routes.v1.sessions.post);

api.use('/v1', authenticate);

api.delete('/v1/accounts/:id', authorize([ROLES.SELF, ROLES.MANAGER]), routes.v1.accounts.delete);
api.get('/v1/accounts', authorize(ROLES.MANAGER), routes.v1.accounts.list);
api.get('/v1/accounts/:id', authorize([ROLES.SELF, ROLES.MANAGER]), routes.v1.accounts.get);
api.patch('/v1/accounts/:id', authorize([ROLES.SELF, ROLES.MANAGER]), routes.v1.accounts.patch);
api.post('/v1/accounts', authorize(ROLES.MANAGER), routes.v1.accounts.post);

api.delete('/v1/scenarios/:id', authorize(ROLES.BUILDER), routes.v1.scenarios.delete);
api.get('/v1/scenarios', routes.v1.scenarios.list);
api.get('/v1/scenarios/:id', routes.v1.scenarios.get);
api.patch('/v1/scenarios/:id', authorize(ROLES.BUILDER), routes.v1.scenarios.patch);
api.post('/v1/scenarios', authorize(ROLES.BUILDER), routes.v1.scenarios.post);

api.delete('/v1/scenarios/:sid/actions/:id', authorize(ROLES.BUILDER), routes.v1.scenarios.actions.delete); // eslint-disable-line max-len
api.patch('/v1/scenarios/:sid/actions/:id', authorize(ROLES.BUILDER), routes.v1.scenarios.actions.patch); // eslint-disable-line max-len
api.post('/v1/scenarios/:sid/actions', authorize(ROLES.BUILDER), routes.v1.scenarios.actions.post); // eslint-disable-line max-len

api.get('/v1/sessions', routes.v1.sessions.list);
api.delete('/v1/sessions/:id', authorize.deleteSession, routes.v1.sessions.delete);

api.use((req, res, next) => next(boom.notFound('unmatched route')));
api.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  debug('error', err);

  const statusCode = err.isBoom ? err.output.statusCode : 500;

  if (IS_PRODUCTION) {
    return res.status(statusCode).send(err.message);
  }

  res.set('Content-Type', 'application/json');
  return res.status(statusCode).send(JSON.stringify(err, null, 2));
});

module.exports = api;
