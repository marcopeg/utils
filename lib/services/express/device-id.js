'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = exports.deviceId = undefined;

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

var _hooks = require('./hooks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var deviceId = exports.deviceId = function deviceId(_ref) {
    var scope = _ref.scope,
        header = _ref.header;

    if (!scope) throw new Error('[deviceId] you must provide a value for "scope"');
    if (!header) throw new Error('[deviceId] you must provide a value for "header"');

    return function (req, res, next) {
        req[scope] = req.get(header) || (0, _v2.default)();
        res.set(header, req[scope]);
        next();
    };
};

var register = exports.register = function register(_ref2) {
    var registerAction = _ref2.registerAction;
    return registerAction({
        hook: _hooks.EXPRESS_MIDDLEWARE,
        name: '→ express/device-id',
        trace: __filename,
        handler: function handler(_ref3) {
            var app = _ref3.app,
                settings = _ref3.settings;
            return app.use(deviceId(settings.deviceId));
        }
    });
};