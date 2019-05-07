'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cookie = exports.localStorage = exports.listeners = exports.services = exports.reducers = undefined;

var _localStorage = require('./local-storage.service');

var localStorageService = _interopRequireWildcard(_localStorage);

var _cookie = require('./cookie.service');

var cookieService = _interopRequireWildcard(_cookie);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

/**
 * Provides universal dispatchable methods for:
 *
 * - cookies
 * - localStorage
 *
 */

var reducers = exports.reducers = {
  storage: require('./storage.reducer').default
};
var services = exports.services = [];
var listeners = exports.listeners = [];

var localStorage = exports.localStorage = localStorageService;
var cookie = exports.cookie = cookieService;