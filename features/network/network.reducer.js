'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.reducer = exports.actionHandlers = exports.setLoading = exports.setStatus = exports.SET_LOADING = exports.SET_STATUS = exports.initialState = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _actionHandlers;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = exports.initialState = {
    isOnline: true,
    isLoading: false

    /**
     * Actions
     */

};var SET_STATUS = exports.SET_STATUS = 'setStatus@network';
var SET_LOADING = exports.SET_LOADING = 'setLoading@network';

var setStatus = exports.setStatus = function setStatus(value) {
    return {
        type: SET_STATUS,
        payload: {
            value: Boolean(value)
        }
    };
};

var setLoading = exports.setLoading = function setLoading(value) {
    return {
        type: SET_LOADING,
        payload: {
            value: Boolean(value)
        }
    };
};

/**
 * Handlers
 */

var actionHandlers = exports.actionHandlers = (_actionHandlers = {}, (0, _defineProperty3.default)(_actionHandlers, SET_STATUS, function (state, _ref) {
    var payload = _ref.payload;
    return (0, _extends3.default)({}, state, {
        isOnline: payload.value
    });
}), (0, _defineProperty3.default)(_actionHandlers, SET_LOADING, function (state, _ref2) {
    var payload = _ref2.payload;
    return (0, _extends3.default)({}, state, {
        isLoading: payload.value
    });
}), _actionHandlers);

var reducer = exports.reducer = function reducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    var handler = actionHandlers[action.type];
    return handler ? handler(state, action) : state;
};

exports.default = reducer;