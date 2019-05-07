'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reducer = exports.actionHandlers = exports.addLocale = exports.setLocale = exports.ADD_LOCALE = exports.SET_LOCALE = exports.initialState = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _actionHandlers;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = exports.initialState = {
    locale: 'en',
    locales: {},
    cacheLocal: false,
    cacheDuration: 86400000 // 24h


    /**
     * Actions
     */

};var SET_LOCALE = exports.SET_LOCALE = 'setLocale@locale';
var ADD_LOCALE = exports.ADD_LOCALE = 'addLocale@locale';

var setLocale = exports.setLocale = function setLocale(locale) {
    return {
        type: SET_LOCALE,
        payload: { locale: locale }
    };
};

var addLocale = exports.addLocale = function addLocale(key, value, ctime) {
    return {
        type: ADD_LOCALE,
        payload: { key: key, value: value, ctime: ctime }
    };
};

/**
 * Handlers
 */

var actionHandlers = exports.actionHandlers = (_actionHandlers = {}, (0, _defineProperty3.default)(_actionHandlers, SET_LOCALE, function (state, _ref) {
    var payload = _ref.payload;
    return (0, _extends4.default)({}, state, {
        locale: payload.locale.toLowerCase().replace('_', '-')
    });
}), (0, _defineProperty3.default)(_actionHandlers, ADD_LOCALE, function (state, _ref2) {
    var payload = _ref2.payload;
    return (0, _extends4.default)({}, state, {
        locales: (0, _extends4.default)({}, state.locales, (0, _defineProperty3.default)({}, payload.key, {
            messages: payload.value,
            ctime: payload.ctime
        }))
    });
}), _actionHandlers);

var reducer = exports.reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var handler = actionHandlers[action.type];
    return handler ? handler(state, action) : state;
};

exports.default = reducer;