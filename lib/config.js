'use strict';

/**
 * App Configuration
 * =================
 *
 * Strict ENV based configuration proxy
 */

// allow to perform module memoization
module.cache = {};

/**
 * Allows to forcefully pass a pool of variables to use as origin
 * 
 * NOTE: This is needed because ParcelJS does not provide a "process.env"
 * variable at start time.
 * 
 * @param {*} envVars 
 */
var init = function init(envVars, debug) {
    module.cache.envVars = Object.assign({}, envVars);
    module.cache.debug = debug;
};

var get = function get(key, defaultValue) {
    var pool = module.cache.envVars || process.env;

    if (pool[key] === undefined) {
        if (defaultValue) {
            module.cache.debug && console.log('[debug] process.env.' + key + '::default::' + defaultValue);
            return defaultValue;
        }

        throw new Error('Env "' + key + '" not defined');
    }
    module.cache.debug && console.log('[debug] process.env.' + key + '::' + pool[key]);
    return pool[key];
};

var isDev = function isDev() {
    if (!isDev.NODE_ENV) {
        isDev.NODE_ENV = get('NODE_ENV');
    }

    return isDev.NODE_ENV === 'development';
};

module.exports = {
    init: init,
    get: get,
    isDev: isDev
};