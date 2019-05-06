'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = undefined;

var _expressLocale = require('express-locale');

var _expressLocale2 = _interopRequireDefault(_expressLocale);

var _hooks = require('@marcopeg/hooks');

var _hooks2 = require('@marcopeg/utils/lib/services/express/hooks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var register = exports.register = function register(_ref) {
    var registerAction = _ref.registerAction;
    return registerAction({
        hook: _hooks2.EXPRESS_MIDDLEWARE,
        name: _hooks.SERVICE + ' express/locale',
        handler: function handler(_ref2) {
            var app = _ref2.app,
                settings = _ref2.settings;
            var locale = settings.locale;

            var config = {
                default: locale.default || 'en_US',
                priority: locale.priority || ['cookie', 'accept-language', 'default']
            };

            if (locale.cookieName) {
                config.cookie = { name: locale.cookieName };
            }

            if (locale.queryName) {
                config.query = { name: locale.queryName };
            }

            if (locale.hostname) {
                config.hostname = locale.hostname;
            }

            if (locale.map) {
                config.map = locale.map;
            }

            if (locale.allowed) {
                config.allowed = locale.allowed;
            }

            app.use((0, _expressLocale2.default)(config));
        }
    });
}; // https://www.npmjs.com/package/express-locale