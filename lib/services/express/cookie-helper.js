'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = exports.cookieHelper = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _millisecond = require('millisecond');

var _millisecond2 = _interopRequireDefault(_millisecond);

var _cookieParser = require('cookie-parser');

var _cookieParser2 = _interopRequireDefault(_cookieParser);

var _hooks = require('./hooks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cookieHelper = exports.cookieHelper = function cookieHelper(_ref) {
    var scope = _ref.scope,
        duration = _ref.duration;
    return function (req, res, next) {
        var isDev = ['development', 'test'].indexOf(process.env.NODE_ENV) !== -1;

        var options = {
            app: {
                httpOnly: true,
                secure: !isDev,
                maxAge: (0, _millisecond2.default)(duration)
            },
            client: {
                maxAge: (0, _millisecond2.default)(duration)
            }
        };

        var getAppName = function getAppName(name) {
            return (scope || 'xxx') + '::' + name;
        };
        var getClientName = function getClientName(name) {
            return (scope || 'xxx') + '--' + name;
        };

        // App Cookie
        res.setAppCookie = function (name, content) {
            return res.cookie(getAppName(name), content, options.app);
        };
        req.getAppCookie = function (name) {
            return req.cookies[getAppName(name)];
        };
        res.deleteAppCookie = function (name) {
            return res.clearCookie(getAppName(name));
        };

        // Client Cookie
        res.setClientCookie = function (name, content) {
            return res.cookie(getClientName(name), content, options.client);
        };
        req.getClientCookie = function (name) {
            return req.cookies[getClientName(name)];
        };
        res.deleteClientCookie = function (name) {
            return res.clearCookie(getClientName(name));
        };

        next();
    };
};

var register = exports.register = function register(_ref2) {
    var registerAction = _ref2.registerAction;
    return registerAction({
        hook: _hooks.EXPRESS_MIDDLEWARE,
        name: '→ express/cookie-helper',
        trace: __filename,
        handler: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref4) {
                var app = _ref4.app,
                    settings = _ref4.settings;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                app.use((0, _cookieParser2.default)());
                                app.use(cookieHelper(settings.cookieHelper));

                            case 2:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, undefined);
            }));

            return function handler(_x) {
                return _ref3.apply(this, arguments);
            };
        }()
    });
};