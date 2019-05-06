'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _createSsrRouter = require('@marcopeg/react-ssr/lib/create-ssr-router');

var _hooks = require('./hooks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var register = exports.register = function register(_ref) {
    var registerAction = _ref.registerAction,
        createHook = _ref.createHook;
    return registerAction({
        hook: _hooks.EXPRESS_ROUTE,
        name: _hooks.EXPRESS_SSR,
        trace: __filename,
        handler: function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref3) {
                var app = _ref3.app,
                    settings = _ref3.settings;
                var options;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                options = (0, _extends3.default)({}, settings.reactSSR || {}, {
                                    port: settings.port
                                });
                                _context.next = 3;
                                return createHook(_hooks.EXPRESS_SSR, {
                                    async: 'serie',
                                    args: { options: options }
                                });

                            case 3:

                                app.use((0, _createSsrRouter.createSSRRouter)(options));

                            case 4:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, undefined);
            }));

            return function handler(_x) {
                return _ref2.apply(this, arguments);
            };
        }(),
        priority: -999,
        route: '/'
    });
};