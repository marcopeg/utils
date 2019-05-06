'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _hooks = require('./hooks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var register = exports.register = function register(_ref) {
    var registerAction = _ref.registerAction;
    return registerAction({
        hook: _hooks.EXPRESS_MIDDLEWARE,
        name: _hooks.EXPRESS_STATIC,
        trace: __filename,
        handler: function handler(_ref2) {
            var app = _ref2.app,
                settings = _ref2.settings;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = (settings.static || [])[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var rule = _step.value;

                    app.use(rule.path, _express2.default.static(rule.source));
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }
        }
    });
};