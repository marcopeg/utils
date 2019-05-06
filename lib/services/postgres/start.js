'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _pause = require('@marcopeg/utils/lib/pause');

var _pause2 = _interopRequireDefault(_pause);

var _logger = require('ssr/services/logger');

var _conn = require('./conn');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var establishConnection = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(conn, maxAttempts, attemptDelay) {
        var attempts, lastErrorMSG;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        attempts = 0;
                        lastErrorMSG = '';

                    case 2:
                        _context.prev = 2;

                        (0, _logger.logVerbose)('[postgres]  Connection attempt ' + (attempts + 1) + '/' + maxAttempts + ' to "' + conn.name + '"');
                        _context.next = 6;
                        return conn.handler.authenticate();

                    case 6:
                        return _context.abrupt('return', true);

                    case 9:
                        _context.prev = 9;
                        _context.t0 = _context['catch'](2);

                        attempts += 1;
                        lastErrorMSG = _context.t0.message;
                        (0, _logger.logError)('[postgres] failed connection "' + conn.name + '" - ' + _context.t0.message);
                        (0, _logger.logDebug)(_context.t0);
                        _context.next = 17;
                        return (0, _pause2.default)(attemptDelay);

                    case 17:
                        if (attempts < maxAttempts) {
                            _context.next = 2;
                            break;
                        }

                    case 18:
                        throw new Error(lastErrorMSG);

                    case 19:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[2, 9]]);
    }));

    return function establishConnection(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var initModels = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(conn, models) {
        var promises;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        promises = models.map(function (model) {
                            return new Promise(function () {
                                var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(resolve, reject) {
                                    var instance;
                                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                    _context2.prev = 0;

                                                    (0, _logger.logVerbose)('[posgres] init model "' + model.name + '" in "' + conn.name + '"');
                                                    _context2.next = 4;
                                                    return model.init(conn.handler);

                                                case 4:
                                                    instance = _context2.sent;

                                                    (0, _conn.pushModel)(conn, instance);
                                                    resolve();
                                                    _context2.next = 14;
                                                    break;

                                                case 9:
                                                    _context2.prev = 9;
                                                    _context2.t0 = _context2['catch'](0);

                                                    (0, _logger.logError)('[postgres] failed to init model "' + model.name + '" in "' + conn.name + '" - ' + _context2.t0.message);
                                                    (0, _logger.logDebug)(_context2.t0);
                                                    reject({ model: model, err: _context2.t0 });

                                                case 14:
                                                case 'end':
                                                    return _context2.stop();
                                            }
                                        }
                                    }, _callee2, undefined, [[0, 9]]);
                                }));

                                return function (_x6, _x7) {
                                    return _ref3.apply(this, arguments);
                                };
                            }());
                        });
                        return _context3.abrupt('return', Promise.all(promises));

                    case 2:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function initModels(_x4, _x5) {
        return _ref2.apply(this, arguments);
    };
}();

var startModels = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(conn, models) {
        var promises;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        promises = models.map(function (model) {
                            return new Promise(function () {
                                var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(resolve, reject) {
                                    return _regenerator2.default.wrap(function _callee4$(_context4) {
                                        while (1) {
                                            switch (_context4.prev = _context4.next) {
                                                case 0:
                                                    if (model.start) {
                                                        _context4.next = 2;
                                                        break;
                                                    }

                                                    return _context4.abrupt('return', resolve());

                                                case 2:
                                                    _context4.prev = 2;

                                                    (0, _logger.logVerbose)('[postgres] start model "' + model.name + '" in "' + conn.name + '"');
                                                    _context4.next = 6;
                                                    return model.start(conn, (0, _conn.getModel)(model.name, conn.name));

                                                case 6:
                                                    resolve();
                                                    _context4.next = 14;
                                                    break;

                                                case 9:
                                                    _context4.prev = 9;
                                                    _context4.t0 = _context4['catch'](2);

                                                    (0, _logger.logError)('[postgres] failed to start model "' + model.name + '" in "' + conn.name + '" - ' + _context4.t0.message);
                                                    (0, _logger.logDebug)(_context4.t0);
                                                    reject({ model: model, err: _context4.t0 });

                                                case 14:
                                                case 'end':
                                                    return _context4.stop();
                                            }
                                        }
                                    }, _callee4, undefined, [[2, 9]]);
                                }));

                                return function (_x10, _x11) {
                                    return _ref5.apply(this, arguments);
                                };
                            }());
                        });
                        return _context5.abrupt('return', Promise.all(promises));

                    case 2:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function startModels(_x8, _x9) {
        return _ref4.apply(this, arguments);
    };
}();

exports.default = function () {
    var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(_ref6) {
        var schemas = _ref6.schemas,
            models = _ref6.models,
            maxAttempts = _ref6.maxAttempts,
            attemptDelay = _ref6.attemptDelay,
            config = (0, _objectWithoutProperties3.default)(_ref6, ['schemas', 'models', 'maxAttempts', 'attemptDelay']);
        var name, conn, schemasP;
        return _regenerator2.default.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        (0, _logger.logInfo)('[postgres] start');
                        name = config.connectionName || 'default';
                        conn = (0, _conn.getHandler)(name);
                        _context6.prev = 3;
                        _context6.next = 6;
                        return establishConnection(conn, maxAttempts, attemptDelay);

                    case 6:
                        _context6.next = 11;
                        break;

                    case 8:
                        _context6.prev = 8;
                        _context6.t0 = _context6['catch'](3);
                        throw new Error('[postgres] connection failed "' + name + '" - ' + _context6.t0.message);

                    case 11:
                        _context6.prev = 11;

                        if (!config.onConnection) {
                            _context6.next = 15;
                            break;
                        }

                        _context6.next = 15;
                        return config.onConnection(conn);

                    case 15:
                        _context6.next = 20;
                        break;

                    case 17:
                        _context6.prev = 17;
                        _context6.t1 = _context6['catch'](11);
                        throw new Error('[postgres] onConnection hook failed for "' + name + '" - ' + _context6.t1.message);

                    case 20:
                        if (!schemas) {
                            _context6.next = 24;
                            break;
                        }

                        schemasP = schemas.map(function (schema) {
                            return conn.handler.query('CREATE SCHEMA IF NOT EXISTS ' + schema + ';');
                        });
                        _context6.next = 24;
                        return Promise.all(schemasP);

                    case 24:
                        _context6.prev = 24;
                        _context6.next = 27;
                        return initModels(conn, models);

                    case 27:
                        _context6.next = 32;
                        break;

                    case 29:
                        _context6.prev = 29;
                        _context6.t2 = _context6['catch'](24);
                        throw new Error('[postgres] init models failed for "' + name + '": ' + _context6.t2.model.name + ', ' + _context6.t2.err.message);

                    case 32:
                        _context6.prev = 32;

                        if (!config.afterInitModels) {
                            _context6.next = 36;
                            break;
                        }

                        _context6.next = 36;
                        return config.afterInitModels(conn);

                    case 36:
                        _context6.next = 41;
                        break;

                    case 38:
                        _context6.prev = 38;
                        _context6.t3 = _context6['catch'](32);
                        throw new Error('[postgres] afterInitModels hook failed for "' + name + '" - ' + _context6.t3.message);

                    case 41:
                        _context6.prev = 41;
                        _context6.next = 44;
                        return startModels(conn, models);

                    case 44:
                        _context6.next = 49;
                        break;

                    case 46:
                        _context6.prev = 46;
                        _context6.t4 = _context6['catch'](41);
                        throw new Error('[postgres] start models failed for "' + name + '": ' + _context6.t4.model.name + ', ' + _context6.t4.err.message);

                    case 49:
                        _context6.prev = 49;

                        if (!config.afterStartModels) {
                            _context6.next = 53;
                            break;
                        }

                        _context6.next = 53;
                        return config.afterStartModels(conn);

                    case 53:
                        _context6.next = 58;
                        break;

                    case 55:
                        _context6.prev = 55;
                        _context6.t5 = _context6['catch'](49);
                        throw new Error('[postgres] afterStartModels hook failed for "' + name + '" - ' + _context6.t5.message);

                    case 58:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[3, 8], [11, 17], [24, 29], [32, 38], [41, 46], [49, 55]]);
    }));

    return function (_x12) {
        return _ref7.apply(this, arguments);
    };
}();