'use strict';

/**
 * App Configuration
 * =================
 *
 * Strict ENV based configuration proxy
 */

// const winston = require('winston')
var log = require('./logger/verbose');

var init = function init() {};

var get = function get(key, defaultValue) {
    if (process.env[key] === undefined) {
        if (defaultValue) {
            log(key + '::default::' + defaultValue);
            return defaultValue;
        }

        throw new Error('Env "' + key + '" not defined');
    }
    log(key + '::' + process.env[key]);
    return process.env[key];
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