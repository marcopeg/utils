"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var getKeyName = function getKeyName(name) {
    return function (dispatch, getState) {
        var _getState = getState(),
            storage = _getState.storage;

        return storage.scope + "::" + name;
    };
};

var setItem = exports.setItem = function setItem(key, value) {
    return function (dispatch, getState) {
        var _getState2 = getState(),
            ssr = _getState2.ssr;

        if (ssr.isServer()) return;

        var keyName = dispatch(getKeyName(key));
        localStorage.setItem(keyName, JSON.stringify(value));
    };
};

var getItem = exports.getItem = function getItem(key) {
    var defaultValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    return function (dispatch, getState) {
        var _getState3 = getState(),
            ssr = _getState3.ssr;

        if (ssr.isServer()) return;

        var keyName = dispatch(getKeyName(key));
        return JSON.parse(localStorage.getItem(keyName)) || defaultValue;
    };
};

var removeItem = exports.removeItem = function removeItem(key) {
    return function (dispatch, getState) {
        var _getState4 = getState(),
            ssr = _getState4.ssr;

        if (ssr.isServer()) return;

        var keyName = dispatch(getKeyName(key));
        localStorage.removeItem(keyName);
    };
};