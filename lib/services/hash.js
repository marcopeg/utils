'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = exports.encode = exports.compare = exports.init = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _hooks = require('@marcopeg/hooks');

var _bcryptNodejs = require('bcrypt-nodejs');

var _bcryptNodejs2 = _interopRequireDefault(_bcryptNodejs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * this is a wrapper service around the hashing problem
 * using MD5 is ok in development but can have serious vulnerabilities.
 *
 * the "encode" function is supposed to be used asyncronousluy so to be
 * open to further development using a better method
 */

var salt = null;

var init = exports.init = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var settings = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        return _context.abrupt('return', new Promise(function (resolve, reject) {
                            _bcryptNodejs2.default.genSalt(settings.rounds, function (err, result) {
                                if (err) {
                                    reject(err);
                                } else {
                                    salt = result;
                                    resolve(result);
                                }
                            });
                        }));

                    case 1:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function init() {
        return _ref.apply(this, arguments);
    };
}();

var compare = exports.compare = function compare(input, hash) {
    return new Promise(function (resolve, reject) {
        _bcryptNodejs2.default.compare(String(input), hash, function (err, isCorrect) {
            if (err) {
                reject(err);
            } else {
                resolve(isCorrect);
            }
        });
    });
};

var encode = exports.encode = function encode(input) {
    return new Promise(function (resolve, reject) {
        _bcryptNodejs2.default.hash(String(input), salt, null, function (err, hash) {
            if (err) {
                reject(err);
            } else {
                resolve(hash);
            }
        });
    });
};

var register = exports.register = function register(_ref2) {
    var registerAction = _ref2.registerAction;
    return registerAction({
        hook: _hooks.INIT_SERVICES,
        name: _hooks.SERVICE + ' hash',
        trace: __filename,
        handler: function handler(_ref3) {
            var hash = _ref3.hash;
            return init(hash);
        }
    });
};