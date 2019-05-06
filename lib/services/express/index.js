'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = exports.start = exports.init = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _http = require('http');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _compression = require('compression');

var _compression2 = _interopRequireDefault(_compression);

var _helmet = require('helmet');

var _helmet2 = _interopRequireDefault(_helmet);

var _hooks = require('@marcopeg/hooks');

var _logger = require('ssr/services/logger');

var _hooks2 = require('./hooks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var server = (0, _http.createServer)(app);

var init = exports.init = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(settings) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        (0, _logger.logInfo)('[express] init...');

                        _context.next = 3;
                        return (0, _hooks.createHook)(_hooks2.EXPRESS_INIT, {
                            async: 'serie',
                            args: { app: app, server: server, settings: (0, _extends3.default)({}, settings) }
                        });

                    case 3:

                        // hook - enable a tracing context that is scoped
                        // into the current request
                        app.use((0, _hooks.createHookContext)(settings.hooks || {}));

                        // Basics
                        app.use((0, _compression2.default)());
                        app.use((0, _helmet2.default)());

                        app.use(function (req, res, next) {
                            req.data = {};
                            next();
                        });

                        _context.next = 9;
                        return (0, _hooks.createHook)(_hooks2.EXPRESS_MIDDLEWARE, {
                            async: 'serie',
                            args: { app: app, server: server, settings: (0, _extends3.default)({}, settings) }
                        });

                    case 9:
                        _context.next = 11;
                        return (0, _hooks.createHook)(_hooks2.EXPRESS_ROUTE, {
                            async: 'serie',
                            args: { app: app, server: server, settings: (0, _extends3.default)({}, settings) }
                        });

                    case 11:
                        _context.next = 13;
                        return (0, _hooks.createHook)(_hooks2.EXPRESS_HANDLER, {
                            async: 'serie',
                            args: { app: app, server: server, settings: (0, _extends3.default)({}, settings) }
                        });

                    case 13:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function init(_x) {
        return _ref.apply(this, arguments);
    };
}();

var start = exports.start = function start(settings) {
    return new Promise(function (resolve) {
        (0, _logger.logInfo)('[express] start server...');
        server.listen(settings.port, function () {
            (0, _logger.logInfo)('[express] server is running on ' + settings.port);
            resolve();
        });
    });
};

var register = exports.register = function register(_ref2) {
    var registerAction = _ref2.registerAction;

    registerAction({
        hook: _hooks.INIT_SERVICE,
        name: '→ express',
        trace: __filename,
        handler: function handler(_ref3) {
            var express = _ref3.express;
            return init(express);
        }
    });

    registerAction({
        hook: _hooks.START_SERVICE,
        name: '→ express',
        trace: __filename,
        handler: function handler(_ref4) {
            var express = _ref4.express;
            return start(express);
        }
    });
};