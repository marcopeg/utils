'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EXPRESS_SOCKETIO_ON_CONNECTION = exports.EXPRESS_GRAPHQL_TEST = exports.EXPRESS_GRAPHQL = exports.EXPRESS_SSR = exports.EXPRESS_STATIC = exports.EXPRESS_HANDLER = exports.EXPRESS_ROUTE = exports.EXPRESS_MIDDLEWARE = exports.EXPRESS_INIT = undefined;

var _hooks = require('@marcopeg/hooks');

var EXPRESS_INIT = exports.EXPRESS_INIT = _hooks.SERVICE + ' express/init';
var EXPRESS_MIDDLEWARE = exports.EXPRESS_MIDDLEWARE = _hooks.SERVICE + ' express/middleware';
var EXPRESS_ROUTE = exports.EXPRESS_ROUTE = _hooks.SERVICE + ' express/route';
var EXPRESS_HANDLER = exports.EXPRESS_HANDLER = _hooks.SERVICE + ' express/handler';
var EXPRESS_STATIC = exports.EXPRESS_STATIC = _hooks.SERVICE + ' express/static';
var EXPRESS_SSR = exports.EXPRESS_SSR = _hooks.SERVICE + ' express/ssr';

var EXPRESS_GRAPHQL = exports.EXPRESS_GRAPHQL = _hooks.SERVICE + ' express/graphql';
var EXPRESS_GRAPHQL_TEST = exports.EXPRESS_GRAPHQL_TEST = _hooks.SERVICE + ' express/graphql-test';

var EXPRESS_SOCKETIO_ON_CONNECTION = exports.EXPRESS_SOCKETIO_ON_CONNECTION = _hooks.SERVICE + ' express/socketio/on/connection';