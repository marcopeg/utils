'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.resetModels = exports.getHandlerNames = exports.registerModel = exports.getModel = exports.pushModel = exports.getHandler = exports.addHandler = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var handlers = {};

var addHandler = exports.addHandler = function addHandler(name, data) {
    if (handlers[name] !== undefined) {
        throw new Error('[postgres] handler "' + name + '" already defined');
    }

    handlers[name] = (0, _extends3.default)({}, data, {
        models: {}
    });
};

var getHandler = exports.getHandler = function getHandler(name) {
    if (handlers[name] === undefined) {
        throw new Error('[postgres] handler "' + name + '" does not exists');
    }

    return handlers[name];
};

var pushModel = exports.pushModel = function pushModel(conn, model) {
    if (conn.models[model.name] !== undefined) {
        throw new Error('[postgres] model "' + model.name + '" already defined in "' + conn.name + '"');
    }

    conn.models[model.name] = model;
};

var getModel = exports.getModel = function getModel(modelName) {
    var connectionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

    var model = Object.keys(handlers).filter(function (item) {
        return connectionName ? item === connectionName : true;
    }).map(function (name) {
        return Object.values(handlers[name].models);
    }).reduce(function (acc, models) {
        return [].concat((0, _toConsumableArray3.default)(acc), (0, _toConsumableArray3.default)(models));
    }, []).find(function (item) {
        return item.name === modelName;
    });

    if (!model) {
        var connStr = connectionName ? '' + connectionName : 'ALL CONNECTIONS';
        throw new Error('[postgres] model not found "' + modelName + '" in "' + connStr + '"');
    }

    return model;
};

var registerModel = exports.registerModel = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(model) {
        var connectionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'default';
        var conn, instance;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        conn = handlers[connectionName];
                        _context.next = 4;
                        return model.init(conn.handler);

                    case 4:
                        instance = _context.sent;

                        pushModel(conn, instance);
                        _context.next = 8;
                        return model.start(conn, getModel(model.name, conn.name));

                    case 8:
                        _context.next = 13;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](0);
                        throw new Error('[postgres] register "' + model.name + '" model failed in "' + connectionName + '" - ' + _context.t0.message);

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 10]]);
    }));

    return function registerModel(_x2) {
        return _ref.apply(this, arguments);
    };
}();

var getHandlerNames = exports.getHandlerNames = function getHandlerNames() {
    return Object.keys(handlers);
};

var resetModels = exports.resetModels = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var connectionName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';
        var conn, models, modelsToPopulate;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        conn = handlers[connectionName];
                        models = Object.keys(conn.models).map(function (name) {
                            return conn.models[name];
                        });
                        modelsToPopulate = models.filter(function (model) {
                            return model.populate;
                        });

                        // sync and populate the models

                        _context2.next = 6;
                        return Promise.all(models.map(function (model) {
                            return conn.handler.query('TRUNCATE ' + model.tableName + ' RESTART IDENTITY CASCADE;');
                        }));

                    case 6:
                        _context2.next = 8;
                        return Promise.all(models.map(function (model) {
                            return model.sync();
                        }));

                    case 8:
                        _context2.next = 10;
                        return Promise.all(modelsToPopulate.map(function (model) {
                            return model.populate();
                        }));

                    case 10:
                        _context2.next = 15;
                        break;

                    case 12:
                        _context2.prev = 12;
                        _context2.t0 = _context2['catch'](0);
                        throw new Error('[postgres] resetModels "' + connectionName + '" failed - ' + _context2.t0.message);

                    case 15:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 12]]);
    }));

    return function resetModels() {
        return _ref2.apply(this, arguments);
    };
}();