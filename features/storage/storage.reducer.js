'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This reducer is meant to receive info from the initialState and
 * offers no way to change them.
 */

var initialState = exports.initialState = {
  scope: 'app'

  /**
   * Actions
   */

  /**
   * Handlers
   */

};var actionHandlers = exports.actionHandlers = {};

var reducer = exports.reducer = function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
  var action = arguments[1];

  var handler = actionHandlers[action.type];
  return handler ? handler(state, action) : state;
};

exports.default = reducer;