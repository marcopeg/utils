/**
 * App Configuration
 * =================
 *
 * Strict ENV based configuration proxy
 */

// const winston = require('winston')
const log = require('./logger/verbose');

const init = () => {};

const get = (key, defaultValue) => {
    if (process.env[key] === undefined) {
        if (defaultValue) {
            log(`${key}::default::${defaultValue}`);
            return defaultValue;
        }

        throw new Error(`Env "${key}" not defined`);
    }
    log(`${key}::${process.env[key]}`);
    return process.env[key];
};

const isDev = () => get('NODE_ENV') === 'development';

module.exports = {
    init,
    get,
    isDev
};