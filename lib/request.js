'use strict';

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
var wrappedFetch = async function wrappedFetch(url) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    try {
        if (isDev()) {
            await pause(devDelay);
        }
        return fetch(url, config);
    } catch (err) {
        throw err;
    }
};

var getJSON = async function getJSON(url) {
    var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    try {
        var headers = Object.assign({}, config.headers || {}, {
            'content-type': 'application/json'
        });
        var options = Object.assign({}, config, {
            method: 'GET',
            headers: headers
        });
        var res = await wrappedFetch(url, options);

        // status code error handling
        if (res.status !== 200) {
            var errMsg = void 0;
            try {
                errMsg = await res.text();
            } catch (err) {
                errMsg = res.statusText;
            }

            var error = new Error(res.status + ' - ' + errMsg);
            error.response = res;
            throw error;
        }

        return await res.json();
    } catch (err) {
        throw err;
    }
};

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

var postJSON = async function postJSON(url) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    try {
        var headers = Object.assign({}, config.headers || {}, {
            'content-type': 'application/json'
        });
        var options = Object.assign({}, config, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
        var res = await wrappedFetch(url, options);

        // status code error handling
        if (res.status !== 200) {
            var errMsg = void 0;
            try {
                errMsg = await res.text();
            } catch (err) {
                errMsg = res.statusText;
            }

            var error = new Error(res.status + ' - ' + errMsg);
            error.response = res;
            throw error;
        }

        return await res.json();
    } catch (err) {
        throw err;
    }
};

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

var putJSON = async function putJSON(url) {
    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    try {
        var headers = Object.assign({}, config.headers || {}, {
            'content-type': 'application/json'
        });
        var options = Object.assign({}, config, {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(data)
        });
        var res = await wrappedFetch(url, options);

        // status code error handling
        if (res.status !== 200) {
            var errMsg = void 0;
            try {
                errMsg = await res.text();
            } catch (err) {
                errMsg = res.statusText;
            }

            var error = new Error(res.status + ' - ' + errMsg);
            error.response = res;
            throw error;
        }

        return await res.json();
    } catch (err) {
        throw err;
    }
};

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

// export sub modules as part of the main function
wrappedFetch.setDevDelay = setDevDelay;
wrappedFetch.getJSON = getJSON;
wrappedFetch.getJSONAuth = getJSONAuth;
wrappedFetch.postJSONAuth = postJSONAuth;
wrappedFetch.postJSONAuth = postJSONAuth;
wrappedFetch.putJSONAuth = putJSONAuth;
wrappedFetch.putJSONAuth = putJSONAuth;

module.exports = wrappedFetch;