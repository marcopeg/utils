'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _hooks = require('@marcopeg/hooks');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _nodeEnvFile = require('node-env-file');

var _nodeEnvFile2 = _interopRequireDefault(_nodeEnvFile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Extends `process.env` with informations from local files:
 *
 * .env
 * .env.local
 * .env.[development|production|...]
 * .env.[development|production|...].local
 *
 */

var fileExists = function fileExists(filePath) {
    return new Promise(function (resolve, reject) {
        _fs2.default.exists(filePath, function (exists) {
            return exists ? resolve(true) : resolve(false);
        });
    });
};

var loadEnv = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(fileName, root, options) {
        var filePath;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        filePath = _path2.default.join(root, fileName);
                        _context.next = 3;
                        return fileExists(filePath);

                    case 3:
                        if (!_context.sent) {
                            _context.next = 5;
                            break;
                        }

                        (0, _nodeEnvFile2.default)(filePath, options);

                    case 5:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function loadEnv(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}();

var initEnv = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(args) {
        var cwd;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        cwd = args.cwd || process.cwd();
                        _context2.next = 3;
                        return loadEnv('.env', cwd);

                    case 3:
                        _context2.next = 5;
                        return loadEnv('.env.local', cwd, { override: true });

                    case 5:
                        _context2.next = 7;
                        return loadEnv('.env.' + process.env.NODE_ENV, cwd, { override: true });

                    case 7:
                        _context2.next = 9;
                        return loadEnv('.env.' + process.env.NODE_ENV + '.local', cwd, { override: true });

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function initEnv(_x4) {
        return _ref2.apply(this, arguments);
    };
}();

var register = exports.register = function register(_ref3) {
    var registerAction = _ref3.registerAction;
    return registerAction({
        hook: _hooks.START,
        name: _hooks.SERVICE + ' env',
        trace: __filename,
        handler: initEnv
    });
};