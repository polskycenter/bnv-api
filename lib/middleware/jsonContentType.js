const boom = require('boom');
const debug = require('debug')('@polskycenter/bnv-api:middleware:contentType');

const METHODS = new Set(['POST', 'PUT', 'PATCH']);
const TYPE = 'application/json';

function middleware(req, res, next) {
  const contentType = req.headers['content-type'];
  const method = req.method;

  if (METHODS.has(method) && (!contentType || contentType.split(';')[0] !== TYPE)) {
    debug('invalid', method, contentType);
    return next(boom.notAcceptable('missing or invalid Content-Type'));
  }

  return next();
}

module.exports = middleware;
