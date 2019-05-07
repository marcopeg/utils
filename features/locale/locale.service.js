'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.start = exports.init = exports.loadLocale = exports.fetchLocale = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _network = require('@marcopeg/utils/features/network');

var _storage = require('@marcopeg/utils/features/storage');

var _locale = require('./locale.query');

var _locale2 = _interopRequireDefault(_locale);

var _locale3 = require('./locale.reducer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isCacheValid = function isCacheValid(ctime) {
    return function (dispatch, getState) {
        var _getState = getState(),
            locale = _getState.locale;

        var cacheDuration = locale.cacheDuration;


        return new Date() - new Date(ctime) < cacheDuration;
    };
};

var localeExists = function localeExists(desiredLocale) {
    return function (dispatch, getState) {
        var _getState2 = getState(),
            locale = _getState2.locale;

        var current = locale.locales[desiredLocale];

        if (!current) {
            return false;
        }

        return dispatch(isCacheValid(current.ctime));
    };
};

var getCurrentLocale = function getCurrentLocale() {
    return function (dispatch, getState) {
        var _getState3 = getState(),
            locale = _getState3.locale;

        var cookieLocale = dispatch(_storage.cookie.get('locale', locale.locale));

        // translate from ssr compatible format stored in cookie
        var tokens = cookieLocale.toLowerCase().split('_');
        if (tokens.length === 1) {
            return tokens[0].toLowerCase();
        } else if (tokens[0] === tokens[1]) {
            return tokens[0];
        } else {
            return tokens[0] + '-' + tokens[1];
        }
    };
};

var setCurrentLocale = function setCurrentLocale(locale) {
    return function (dispatch) {
        dispatch((0, _locale3.setLocale)(locale));

        // translate to ssr compatible format to be persisted in cookie
        var tokens = locale.split('-');
        var cookieLocale = [tokens[0].toLowerCase(), (tokens[1] ? tokens[1] : tokens[0]).toUpperCase()].join('_');

        dispatch(_storage.cookie.set('locale', cookieLocale));
    };
};

var addLocaleData = function addLocaleData(record) {
    return function (dispatch, getState) {
        var _getState4 = getState(),
            locale = _getState4.locale;

        var ctime = record.ctime || new Date();

        dispatch((0, _locale3.addLocale)(record.locale, record.messages, ctime));

        if (locale.cacheLocal === true) {
            dispatch(_storage.localStorage.setItem('locale::cache::' + record.locale, (0, _extends3.default)({}, record, {
                ctime: ctime
            })));
        }
    };
};

var fetchLocale = exports.fetchLocale = function fetchLocale(locale) {
    return function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(dispatch) {
            var res;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return dispatch((0, _network.runQuery)(_locale2.default, { locale: locale }));

                        case 2:
                            res = _context.sent;
                            return _context.abrupt('return', res.data.locale);

                        case 4:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, undefined);
        }));

        return function (_x) {
            return _ref.apply(this, arguments);
        };
    }();
};

var loadLocale = exports.loadLocale = function loadLocale(desiredLocale) {
    return function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(dispatch, getState) {
            var cachedData, remoteData;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            if (!dispatch(localeExists(desiredLocale))) {
                                _context2.next = 3;
                                break;
                            }

                            dispatch(setCurrentLocale(desiredLocale));
                            return _context2.abrupt('return');

                        case 3:
                            cachedData = null;
                            remoteData = null;

                            // try load from local storaged cache

                            try {
                                cachedData = dispatch(_storage.localStorage.getItem('locale::cache::' + desiredLocale));
                                if (cachedData && dispatch(isCacheValid(cachedData.ctime))) {
                                    remoteData = cachedData;
                                }
                            } catch (err) {} // eslint-disable-line

                            // fetch from the server

                            if (remoteData) {
                                _context2.next = 15;
                                break;
                            }

                            _context2.prev = 7;
                            _context2.next = 10;
                            return dispatch(fetchLocale(desiredLocale));

                        case 10:
                            remoteData = _context2.sent;
                            _context2.next = 15;
                            break;

                        case 13:
                            _context2.prev = 13;
                            _context2.t0 = _context2['catch'](7);

                        case 15:
                            if (remoteData) {
                                _context2.next = 23;
                                break;
                            }

                            console.log('[locale] failed to load locale: ' + desiredLocale);

                            if (!cachedData) {
                                _context2.next = 22;
                                break;
                            }

                            console.log('[locale] defaulting to an old cached definition');
                            remoteData = cachedData;
                            _context2.next = 23;
                            break;

                        case 22:
                            return _context2.abrupt('return');

                        case 23:

                            dispatch(addLocaleData(remoteData));
                            dispatch(setCurrentLocale(desiredLocale));

                        case 25:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined, [[7, 13]]);
        }));

        return function (_x2, _x3) {
            return _ref2.apply(this, arguments);
        };
    }();
};

var init = exports.init = function init() {
    return function (dispatch) {
        try {
            window.loadLocale = function (locale) {
                return dispatch(loadLocale(locale));
            };
        } catch (err) {} // eslint-disable-line
    };
};

var start = exports.start = function start() {
    return function (dispatch, getState) {
        var _getState5 = getState(),
            ssr = _getState5.ssr;

        var current = dispatch(getCurrentLocale());
        return ssr.await(dispatch(loadLocale(current)));
    };
};