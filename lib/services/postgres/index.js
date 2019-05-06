'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = exports.resetModels = exports.registerModel = exports.getModel = exports.query = exports.start = exports.init = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _init = require('./init');

Object.defineProperty(exports, 'init', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_init).default;
    }
});

var _start = require('./start');

Object.defineProperty(exports, 'start', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_start).default;
    }
});

var _query = require('./query');

Object.defineProperty(exports, 'query', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_query).default;
    }
});

var _conn = require('./conn');

Object.defineProperty(exports, 'getModel', {
    enumerable: true,
    get: function get() {
        return _conn.getModel;
    }
});
Object.defineProperty(exports, 'registerModel', {
    enumerable: true,
    get: function get() {
        return _conn.registerModel;
    }
});
Object.defineProperty(exports, 'resetModels', {
    enumerable: true,
    get: function get() {
        return _conn.resetModels;
    }
});

var _hooks = require('@marcopeg/hooks');

var _hooks2 = require('./hooks');

var _init2 = _interopRequireDefault(_init);

var _start2 = _interopRequireDefault(_start);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var register = exports.register = function register(_ref) {
    var registerAction = _ref.registerAction,
        createHook = _ref.createHook;

    registerAction({
        hook: _hooks.INIT_SERVICE,
        name: '→ postgres',
        trace: __filename,
        handler: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref3) {
                var postgres = _ref3.postgres;

                var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, options, name;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                if (postgres) {
                                    _context.next = 2;
                                    break;
                                }

                                throw new Error('[postgres] missing boot configuration');

                            case 2:
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context.prev = 5;
                                _iterator = postgres[Symbol.iterator]();

                            case 7:
                                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                                    _context.next = 16;
                                    break;
                                }

                                options = _step.value;
                                name = _hooks2.POSTGRES_BEFORE_INIT + '/' + (options.connectionName || 'default');

                                createHook(name, { args: { options: options } });
                                _context.next = 13;
                                return (0, _init2.default)(options);

                            case 13:
                                _iteratorNormalCompletion = true;
                                _context.next = 7;
                                break;

                            case 16:
                                _context.next = 22;
                                break;

                            case 18:
                                _context.prev = 18;
                                _context.t0 = _context['catch'](5);
                                _didIteratorError = true;
                                _iteratorError = _context.t0;

                            case 22:
                                _context.prev = 22;
                                _context.prev = 23;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 25:
                                _context.prev = 25;

                                if (!_didIteratorError) {
                                    _context.next = 28;
                                    break;
                                }

                                throw _iteratorError;

                            case 28:
                                return _context.finish(25);

                            case 29:
                                return _context.finish(22);

                            case 30:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, undefined, [[5, 18, 22, 30], [23,, 25, 29]]);
            }));

            return function handler(_x) {
                return _ref2.apply(this, arguments);
            };
        }()
    });

    registerAction({
        hook: _hooks.START_SERVICE,
        name: '→ postgres',
        trace: __filename,
        handler: function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref5) {
                var postgres = _ref5.postgres;

                var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, options, name;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _iteratorNormalCompletion2 = true;
                                _didIteratorError2 = false;
                                _iteratorError2 = undefined;
                                _context2.prev = 3;
                                _iterator2 = postgres[Symbol.iterator]();

                            case 5:
                                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                    _context2.next = 14;
                                    break;
                                }

                                options = _step2.value;
                                name = _hooks2.POSTGRES_BEFORE_START + '/' + (options.connectionName || 'default');

                                createHook(name, { args: { options: options } });
                                _context2.next = 11;
                                return (0, _start2.default)(options);

                            case 11:
                                _iteratorNormalCompletion2 = true;
                                _context2.next = 5;
                                break;

                            case 14:
                                _context2.next = 20;
                                break;

                            case 16:
                                _context2.prev = 16;
                                _context2.t0 = _context2['catch'](3);
                                _didIteratorError2 = true;
                                _iteratorError2 = _context2.t0;

                            case 20:
                                _context2.prev = 20;
                                _context2.prev = 21;

                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }

                            case 23:
                                _context2.prev = 23;

                                if (!_didIteratorError2) {
                                    _context2.next = 26;
                                    break;
                                }

                                throw _iteratorError2;

                            case 26:
                                return _context2.finish(23);

                            case 27:
                                return _context2.finish(20);

                            case 28:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, undefined, [[3, 16, 20, 28], [21,, 23, 27]]);
            }));

            return function handler(_x2) {
                return _ref4.apply(this, arguments);
            };
        }()
    });
};