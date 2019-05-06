'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

var _logger = require('ssr/services/logger');

var _conn = require('./conn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (config) {
    (0, _logger.logInfo)('[postgres] init');
    var name = config.connectionName || 'default';
    var handler = new _sequelize2.default(config.database, config.username, config.password, {
        dialect: 'postgres',
        host: config.host,
        port: config.port,
        logging: config.logging || _logger.logDebug,
        operatorsAliases: {}
    });

    (0, _conn.addHandler)(name, {
        name: name,
        config: config,
        handler: handler
    });
};