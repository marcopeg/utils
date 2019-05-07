'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Offline = exports.Online = exports.runQuery = exports.postJSON = exports.listeners = exports.services = exports.reducers = undefined;

var _fetch = require('./services/fetch.service');

Object.defineProperty(exports, 'postJSON', {
    enumerable: true,
    get: function get() {
        return _fetch.postJSON;
    }
});

var _graphql = require('./services/graphql.service');

Object.defineProperty(exports, 'runQuery', {
    enumerable: true,
    get: function get() {
        return _graphql.runQuery;
    }
});

var _Online = require('./Online');

Object.defineProperty(exports, 'Online', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_Online).default;
    }
});

var _Offline = require('./Offline');

Object.defineProperty(exports, 'Offline', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_Offline).default;
    }
});

var _networkStatus = require('./services/network-status.service');

var networkStatusService = _interopRequireWildcard(_networkStatus);

var fetchService = _interopRequireWildcard(_fetch);

var graphqlService = _interopRequireWildcard(_graphql);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reducers = exports.reducers = {
    network: require('./network.reducer').default
}; /**
    * Provides ways to use and sense the network
    *
    */

var services = exports.services = [networkStatusService, fetchService, graphqlService];
var listeners = exports.listeners = [];