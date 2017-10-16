const debug = require('debug')('@polskycenter/bnv-api');
const http = require('http');

const api = require('./lib/api');
const env = require('./lib/env');

const server = http.createServer(api);

if (!env('IS_PRODUCTION')) {
  process.on('unhandledRejection', (stack) => {
    debug('unhandled promise error', stack);
  });
}

server.listen(env('PORT'));

server.on('error', (err) => { debug('server error', err); });
server.on('listening', () => { debug('listening', server.address()); });

module.exports = server;
