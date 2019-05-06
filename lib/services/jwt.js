'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = exports.verify = exports.sign = exports.init = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _hooks = require('@marcopeg/hooks');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var secret = null;
var duration = null;

var init = exports.init = function init(settings) {
    secret = settings.secret;
    duration = settings.duration || '0s';
};

var sign = exports.sign = function sign(payload) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var customSecret = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : secret;
    return new Promise(function (resolve, reject) {
        var localSettings = (0, _extends3.default)({}, settings, {
            expiresIn: settings.expiresIn || duration
        });

        _jsonwebtoken2.default.sign({ payload: payload }, customSecret, localSettings, function (err, token) {
            if (err) {
                reject(err);
            } else {
                resolve(token);
            }
        });
    });
};

var verify = exports.verify = function verify(token) {
    var customSecret = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : secret;
    return new Promise(function (resolve, reject) {
        _jsonwebtoken2.default.verify(token, customSecret, function (err, data) {
            if (err) {
                reject(err);
            } else {
                resolve(_jsonwebtoken2.default.decode(token));
            }
        });
    });
};

var register = exports.register = function register(_ref) {
    var registerAction = _ref.registerAction;
    return registerAction({
        hook: _hooks.INIT_SERVICES,
        name: _hooks.SERVICE + ' jwt',
        trace: __filename,
        handler: function handler(_ref2) {
            var jwt = _ref2.jwt;
            return init(jwt);
        }
    });
};

exports.default = { sign: sign, verify: verify };