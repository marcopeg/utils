'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* global fetch */
var pause = require('./pause');

var _require = require('./config'),
    isDev = _require.isDev;

// - this should be added at the app top level
// require('es6-promise').polyfill()
// require('isomorphic-fetch')

var devDelay = 0;

var setDevDelay = function setDevDelay(delay) {
    devDelay = delay;
};

// eslint-disable-next-line
var wrappedFetch = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(url) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;

                        if (!isDev()) {
                            _context.next = 4;
                            break;
                        }

                        _context.next = 4;
                        return pause(devDelay);

                    case 4:
                        return _context.abrupt('return', fetch(url, config));

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](0);
                        throw _context.t0;

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 7]]);
    }));

    return function wrappedFetch(_x) {
        return _ref.apply(this, arguments);
    };
}();

var getJSON = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(url) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var headers, options, res, errMsg, error;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.prev = 0;
                        headers = Object.assign({}, config.headers || {}, {
                            'content-type': 'application/json'
                        });
                        options = Object.assign({}, config, {
                            method: 'GET',
                            headers: headers
                        });
                        _context2.next = 5;
                        return wrappedFetch(url, options);

                    case 5:
                        res = _context2.sent;

                        if (!(res.status !== 200)) {
                            _context2.next = 22;
                            break;
                        }

                        errMsg = void 0;
                        _context2.prev = 8;
                        _context2.next = 11;
                        return res.text();

                    case 11:
                        errMsg = _context2.sent;
                        _context2.next = 17;
                        break;

                    case 14:
                        _context2.prev = 14;
                        _context2.t0 = _context2['catch'](8);

                        errMsg = res.statusText;

                    case 17:
                        error = new Error(res.status + ' - ' + errMsg);

                        error.response = res;
                        throw error;

                    case 22:
                        _context2.next = 24;
                        return res.json();

                    case 24:
                        return _context2.abrupt('return', _context2.sent);

                    case 25:
                        _context2.next = 30;
                        break;

                    case 27:
                        _context2.prev = 27;
                        _context2.t1 = _context2['catch'](0);
                        throw _context2.t1;

                    case 30:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[0, 27], [8, 14]]);
    }));

    return function getJSON(_x3) {
        return _ref2.apply(this, arguments);
    };
}();

var getJSONAuth = function getJSONAuth(url, token) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var headers = Object.assign({}, config.headers || {}, {
        Authorization: 'Bearer ' + token
    });
    var options = Object.assign({}, config, {
        headers: headers
    });
    return getJSON(url, options);
};

var postJSON = function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(url) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var headers, options, res, errMsg, error;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.prev = 0;
                        headers = Object.assign({}, config.headers || {}, {
                            'content-type': 'application/json'
                        });
                        options = Object.assign({}, config, {
                            method: 'POST',
                            headers: headers,
                            body: JSON.stringify(data)
                        });
                        _context3.next = 5;
                        return wrappedFetch(url, options);

                    case 5:
                        res = _context3.sent;

                        if (!(res.status !== 200)) {
                            _context3.next = 20;
                            break;
                        }

                        errMsg = void 0;
                        _context3.prev = 8;
                        _context3.next = 11;
                        return res.text();

                    case 11:
                        errMsg = _context3.sent;
                        _context3.next = 17;
                        break;

                    case 14:
                        _context3.prev = 14;
                        _context3.t0 = _context3['catch'](8);

                        errMsg = res.statusText;

                    case 17:
                        error = new Error(res.status + ' - ' + errMsg);

                        error.response = res;
                        throw error;

                    case 20:
                        _context3.next = 22;
                        return res.json();

                    case 22:
                        return _context3.abrupt('return', _context3.sent);

                    case 25:
                        _context3.prev = 25;
                        _context3.t1 = _context3['catch'](0);
                        throw _context3.t1;

                    case 28:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[0, 25], [8, 14]]);
    }));

    return function postJSON(_x6) {
        return _ref3.apply(this, arguments);
    };
}();

var postJSONAuth = function postJSONAuth(url, token) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var headers = Object.assign({}, config.headers || {}, {
        Authorization: 'Bearer ' + token
    });
    var options = Object.assign({}, config, {
        headers: headers
    });
    return postJSON(url, data, options);
};

var putJSON = function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(url) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var headers, options, res, errMsg, error;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        headers = Object.assign({}, config.headers || {}, {
                            'content-type': 'application/json'
                        });
                        options = Object.assign({}, config, {
                            method: 'PUT',
                            headers: headers,
                            body: JSON.stringify(data)
                        });
                        _context4.next = 5;
                        return wrappedFetch(url, options);

                    case 5:
                        res = _context4.sent;

                        if (!(res.status !== 200)) {
                            _context4.next = 20;
                            break;
                        }

                        errMsg = void 0;
                        _context4.prev = 8;
                        _context4.next = 11;
                        return res.text();

                    case 11:
                        errMsg = _context4.sent;
                        _context4.next = 17;
                        break;

                    case 14:
                        _context4.prev = 14;
                        _context4.t0 = _context4['catch'](8);

                        errMsg = res.statusText;

                    case 17:
                        error = new Error(res.status + ' - ' + errMsg);

                        error.response = res;
                        throw error;

                    case 20:
                        _context4.next = 22;
                        return res.json();

                    case 22:
                        return _context4.abrupt('return', _context4.sent);

                    case 25:
                        _context4.prev = 25;
                        _context4.t1 = _context4['catch'](0);
                        throw _context4.t1;

                    case 28:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 25], [8, 14]]);
    }));

    return function putJSON(_x11) {
        return _ref4.apply(this, arguments);
    };
}();

var putJSONAuth = function putJSONAuth(url, token) {
    var data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    var config = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

    var headers = Object.assign({}, config.headers || {}, {
        Authorization: 'Bearer ' + token
    });
    var options = Object.assign({}, config, {
        headers: headers
    });
    return putJSON(url, data, options);
};

var deleteJSON = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(url) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var headers, options, res, errMsg, error;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.prev = 0;
                        headers = Object.assign({}, config.headers || {}, {
                            'content-type': 'application/json'
                        });
                        options = Object.assign({}, config, {
                            method: 'DELETE',
                            headers: headers
                        });
                        _context5.next = 5;
                        return wrappedFetch(url, options);

                    case 5:
                        res = _context5.sent;

                        if (!(res.status !== 200)) {
                            _context5.next = 22;
                            break;
                        }

                        errMsg = void 0;
                        _context5.prev = 8;
                        _context5.next = 11;
                        return res.text();

                    case 11:
                        errMsg = _context5.sent;
                        _context5.next = 17;
                        break;

                    case 14:
                        _context5.prev = 14;
                        _context5.t0 = _context5['catch'](8);

                        errMsg = res.statusText;

                    case 17:
                        error = new Error(res.status + ' - ' + errMsg);

                        error.response = res;
                        throw error;

                    case 22:
                        _context5.next = 24;
                        return res.json();

                    case 24:
                        return _context5.abrupt('return', _context5.sent);

                    case 25:
                        _context5.next = 30;
                        break;

                    case 27:
                        _context5.prev = 27;
                        _context5.t1 = _context5['catch'](0);
                        throw _context5.t1;

                    case 30:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined, [[0, 27], [8, 14]]);
    }));

    return function deleteJSON(_x16) {
        return _ref5.apply(this, arguments);
    };
}();

var deleteJSONAuth = function deleteJSONAuth(url, token) {
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    var headers = Object.assign({}, config.headers || {}, {
        Authorization: 'Bearer ' + token
    });
    var options = Object.assign({}, config, {
        headers: headers
    });
    return deleteJSON(url, options);
};

// export sub modules as part of the main function
wrappedFetch.setDevDelay = setDevDelay;
wrappedFetch.getJSON = getJSON;
wrappedFetch.getJSONAuth = getJSONAuth;
wrappedFetch.postJSON = postJSON;
wrappedFetch.postJSONAuth = postJSONAuth;
wrappedFetch.putJSON = putJSON;
wrappedFetch.putJSONAuth = putJSONAuth;
wrappedFetch.deleteJSON = deleteJSON;
wrappedFetch.deleteJSONAuth = deleteJSONAuth;

module.exports = wrappedFetch;