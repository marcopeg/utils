'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POSTGRES_BEFORE_START = exports.POSTGRES_BEFORE_INIT = undefined;

var _hooks = require('@marcopeg/hooks');

var POSTGRES_BEFORE_INIT = exports.POSTGRES_BEFORE_INIT = _hooks.SERVICE + ' postgres/beforeInit';
var POSTGRES_BEFORE_START = exports.POSTGRES_BEFORE_START = _hooks.SERVICE + ' postgres/beforeStart';