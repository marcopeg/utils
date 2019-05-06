'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _socket = require('socket.io');

var _socket2 = _interopRequireDefault(_socket);

var _hooks = require('@marcopeg/hooks');

var _hooks2 = require('./hooks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initSocketIO = function initSocketIO(io) {
    var settings = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    return io.on('connection', function (client) {
        return (0, _hooks.createHook)(_hooks2.EXPRESS_SOCKETIO_ON_CONNECTION, {
            args: { io: io, client: client, settings: (0, _extends3.default)({}, settings) }
        });
    });
};

var register = exports.register = function register(_ref) {
    var registerAction = _ref.registerAction;

    registerAction({
        hook: _hooks2.EXPRESS_INIT,
        name: _hooks.SERVICE + ' express/socketio',
        trace: __filename,
        handler: function handler(_ref2) {
            var server = _ref2.server,
                settings = _ref2.settings;

            initSocketIO((0, _socket2.default)(server), settings.socketio);
        }
    });
};