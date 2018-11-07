/**
 * App Configuration
 * =================
 *
 * Strict ENV based configuration proxy
 */

// allow to perform module memoization
module.cache = {}

/**
 * Allows to forcefully pass a pool of variables to use as origin
 * 
 * NOTE: This is needed because ParcelJS does not provide a "process.env"
 * variable at start time.
 * 
 * @param {*} envVars 
 */
const init = (envVars) => {
    module.cache.envVars = Object.assign({}, envVars)
}

const get = (key, defaultValue) => {
    const pool = module.cache.envVars || process.env

    if (pool[key] === undefined) {
        if (defaultValue) {
            // log(`${key}::default::${defaultValue}`)
            return defaultValue
        }

        throw new Error(`Env "${key}" not defined`)
    }
    // log(`${key}::${pool[key]}`)
    return pool[key]
}

const isDev = () => {
    if (!isDev.NODE_ENV) {
        isDev.NODE_ENV = get('NODE_ENV')
    }

    return isDev.NODE_ENV === 'development'
}

module.exports = {
    init,
    get,
    isDev,
}
