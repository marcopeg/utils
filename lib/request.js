function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* global fetch */
const pause = require('./pause');
const { isDev } = require('./config');

// - this should be added at the app top level
// require('es6-promise').polyfill()
// require('isomorphic-fetch')

let devDelay = 0;

const setDevDelay = delay => {
    devDelay = delay;
};

// eslint-disable-next-line
const wrappedFetch = (() => {
    var _ref = _asyncToGenerator(function* (url, config = {}) {
        try {
            if (isDev()) {
                yield pause(devDelay);
            }
            return fetch(url, config);
        } catch (err) {
            throw err;
        }
    });

    return function wrappedFetch(_x) {
        return _ref.apply(this, arguments);
    };
})();

const getJSON = (() => {
    var _ref2 = _asyncToGenerator(function* (url, config = {}) {
        try {
            const headers = Object.assign({}, config.headers || {}, {
                'content-type': 'application/json'
            });
            const options = Object.assign({}, config, {
                method: 'GET',
                headers: headers
            });
            const res = yield wrappedFetch(url, options);

            // status code error handling
            if (res.status !== 200) {
                let errMsg;
                try {
                    errMsg = yield res.text();
                } catch (err) {
                    errMsg = res.statusText;
                }

                const error = new Error(`${res.status} - ${errMsg}`);
                error.response = res;
                throw error;
            }

            return yield res.json();
        } catch (err) {
            throw err;
        }
    });

    return function getJSON(_x2) {
        return _ref2.apply(this, arguments);
    };
})();

const getJSONAuth = (url, token, config = {}) => {
    const headers = Object.assign({}, config.headers || {}, {
        Authorization: `Bearer ${token}`
    });
    const options = Object.assign({}, config, {
        headers: headers
    });
    return getJSON(url, options);
};

const postJSON = (() => {
    var _ref3 = _asyncToGenerator(function* (url, data = {}, config = {}) {
        try {
            const headers = Object.assign({}, config.headers || {}, {
                'content-type': 'application/json'
            });
            const options = Object.assign({}, config, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });
            const res = yield wrappedFetch(url, options);

            // status code error handling
            if (res.status !== 200) {
                let errMsg;
                try {
                    errMsg = yield res.text();
                } catch (err) {
                    errMsg = res.statusText;
                }

                const error = new Error(`${res.status} - ${errMsg}`);
                error.response = res;
                throw error;
            }

            return yield res.json();
        } catch (err) {
            throw err;
        }
    });

    return function postJSON(_x3) {
        return _ref3.apply(this, arguments);
    };
})();

const postJSONAuth = (url, token, data = {}, config = {}) => {
    const headers = Object.assign({}, config.headers || {}, {
        Authorization: `Bearer ${token}`
    });
    const options = Object.assign({}, config, {
        headers: headers
    });
    return postJSON(url, data, options);
};

const putJSON = (() => {
    var _ref4 = _asyncToGenerator(function* (url, data = {}, config = {}) {
        try {
            const headers = Object.assign({}, config.headers || {}, {
                'content-type': 'application/json'
            });
            const options = Object.assign({}, config, {
                method: 'PUT',
                headers: headers,
                body: JSON.stringify(data)
            });
            const res = yield wrappedFetch(url, options);

            // status code error handling
            if (res.status !== 200) {
                let errMsg;
                try {
                    errMsg = yield res.text();
                } catch (err) {
                    errMsg = res.statusText;
                }

                const error = new Error(`${res.status} - ${errMsg}`);
                error.response = res;
                throw error;
            }

            return yield res.json();
        } catch (err) {
            throw err;
        }
    });

    return function putJSON(_x4) {
        return _ref4.apply(this, arguments);
    };
})();

const putJSONAuth = (url, token, data = {}, config = {}) => {
    const headers = Object.assign({}, config.headers || {}, {
        Authorization: `Bearer ${token}`
    });
    const options = Object.assign({}, config, {
        headers: headers
    });
    return putJSON(url, data, options);
};

// export sub modules as part of the main function
wrappedFetch.setDevDelay = setDevDelay;
wrappedFetch.getJSON = getJSON;
wrappedFetch.getJSONAuth = getJSONAuth;
wrappedFetch.postJSONAuth = postJSONAuth;
wrappedFetch.postJSONAuth = postJSONAuth;
wrappedFetch.putJSONAuth = putJSONAuth;
wrappedFetch.putJSONAuth = putJSONAuth;

module.exports = wrappedFetch;