'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _LocaleProvider = require('./LocaleProvider');

Object.defineProperty(exports, 'LocaleProvider', {
    enumerable: true,
    get: function get() {
        return _interopRequireDefault(_LocaleProvider).default;
    }
});

var _locale = require('./locale.service');

Object.defineProperty(exports, 'loadLocale', {
    enumerable: true,
    get: function get() {
        return _locale.loadLocale;
    }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Locale Service
 * ============================
 *
 * - loads and caches languages definitions
 * - provides `react-intl` context to the app
 *   and switches language automatically
 *
 * NOTE: you must provide the list of locales that your app intend to use
 * before you render the app itself:
 * https://github.com/yahoo/react-intl/wiki#loading-locale-data
 *
 */

var reducers = exports.reducers = {
    locale: require('./locale.reducer').default
};
var services = exports.services = [require('./locale.service')];
var listeners = exports.listeners = [];

// application wrapper that provided `intl` context