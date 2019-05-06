'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _conn = require('./conn');

exports.default = function (q, s) {
    var connectionName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';
    return (0, _conn.getHandler)(connectionName).handler.query(q, s);
};