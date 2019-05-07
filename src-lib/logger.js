/**
 * Logging Library Interface
 * =========================
 *
 * one day this will be connected with Winston and possibly
 * push data into S3 or some fancy log collector system.
 *
 */

const config = require('./config')

const logLevels = {
    ERROR: 0,
    INFO: 1,
    VERBOSE: 2,
    DEBUG: 3,
}

// init time cache for enviroment dependent configuration
const cache = {}

const args2string = (...args) => args
    .map(a => typeof a === 'string' ? a : JSON.stringify(a))
    .join(', ')

// computes the default value based on function param or LOG_LEVEL env variable
const getLogLevel = (defaultLogLevel) => {
    const envLogLevel = config.get('LOG_LEVEL', 'dn')
    const logLevel = String(envLogLevel === 'dn' ? defaultLogLevel : envLogLevel).toUpperCase()
    const logLevelNum = parseInt(logLevel, 10)

    if (String(logLevelNum) === logLevel) return logLevelNum
    if (logLevels[logLevel] !== undefined) return logLevels[logLevel]

    // apply defaults
    if (envLogLevel === 'test') return logLevels.DEBUG
    if (envLogLevel === 'development') return logLevels.INFO
    return logLevels.INFO
}

const log = (level, prefix) => (...args) => {
    if (cache[level]) return
    console.log(`[${prefix}] ${args2string(...args)}`)
}

const init = (logLevel) => {
    cache.logLevel = getLogLevel(logLevel)
    Object.keys(logLevels).forEach((key) => {
        cache[logLevels[key]] = cache.logLevel < logLevels[key]
    })
}

const logInfo = log(logLevels.INFO, 'info')
const logVerbose = log(logLevels.VERBOSE, 'verbose')
const logDebug = log(logLevels.DEBUG, 'debug')
const logError = log(logLevels.ERROR, 'error')

module.exports = {
    init,
    logInfo,
    logVerbose,
    logDebug,
    logError,
}
