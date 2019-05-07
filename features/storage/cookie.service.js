'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clear = exports.get = exports.set = undefined;

var _jsCookie = require('js-cookie');

var _jsCookie2 = _interopRequireDefault(_jsCookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cookieName = function cookieName(name) {
    return function (dispatch, getState) {
        var _getState = getState(),
            storage = _getState.storage;

        return storage.scope + '--' + name;
    };
};

var set = exports.set = function set(name, content) {
    return function (dispatch, getState) {
        var _getState2 = getState(),
            ssr = _getState2.ssr;

        if (ssr.isClient()) {
            _jsCookie2.default.set(dispatch(cookieName(name)), content);
        }

        if (ssr.isServer()) {
            ssr.getResponseHandler().cookie(dispatch(cookieName(name)), content);
        }
    };
};

var get = exports.get = function get(name) {
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    return function (dispatch, getState) {
        var _getState3 = getState(),
            ssr = _getState3.ssr;

        if (ssr.isClient()) {
            return _jsCookie2.default.get(dispatch(cookieName(name))) || defaultValue;
        }

        if (ssr.isServer()) {
            return ssr.getRequestHandler().cookies[dispatch(cookieName(name))] || defaultValue;
        }
    };
};

var clear = exports.clear = function clear(name) {
    return function (dispatch, getState) {
        var _getState4 = getState(),
            ssr = _getState4.ssr;

        if (ssr.isClient()) {
            _jsCookie2.default.remove(dispatch(cookieName(name)));
        }

        if (ssr.isServer()) {
            ssr.getResponseHandler().clearCookie(dispatch(cookieName(name)));
        }
    };
};