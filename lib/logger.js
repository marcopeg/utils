'use strict';

/**
 * Logging Library Interface
 * =========================
 *
 * one day this will be connected with Winston and possibly
 * push data into S3 or some fancy log collector system.
 *
 */

var config = require('./config');

var logLevels = {
    ERROR: 0,
    INFO: 1,
    VERBOSE: 2,
    DEBUG: 3

    // init time cache for enviroment dependent configuration
};var cache = {};

var args2string = function args2string() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    return args.map(function (a) {
        return typeof a === 'string' ? a : JSON.stringify(a);
    }).join(', ');
};

// computes the default value based on function param or LOG_LEVEL env variable
var getLogLevel = function getLogLevel(defaultLogLevel) {
    var envLogLevel = config.get('LOG_LEVEL', 'dn');
    var logLevel = String(envLogLevel === 'dn' ? defaultLogLevel : envLogLevel).toUpperCase();
    var logLevelNum = parseInt(logLevel, 10);

    if (String(logLevelNum) === logLevel) return logLevelNum;
    if (logLevels[logLevel] !== undefined) return logLevels[logLevel];

    // apply defaults
    if (envLogLevel === 'test') return logLevels.DEBUG;
    if (envLogLevel === 'development') return logLevels.INFO;
    return logLevels.INFO;
};

var log = function log(level, prefix) {
    return function () {
        if (cache[level]) return;
        console.log('[' + prefix + '] ' + args2string.apply(undefined, arguments));
    };
};

var init = function init(logLevel) {
    cache.logLevel = getLogLevel(logLevel);
    Object.keys(logLevels).forEach(function (key) {
        cache[logLevels[key]] = cache.logLevel < logLevels[key];
    });
};

var logInfo = log(logLevels.INFO, 'info');
var logVerbose = log(logLevels.VERBOSE, 'verbose');
var logDebug = log(logLevels.DEBUG, 'debug');
var logError = log(logLevels.ERROR, 'error');

module.exports = {
    init: init,
    logInfo: logInfo,
    logVerbose: logVerbose,
    logDebug: logDebug,
    logError: logError
};