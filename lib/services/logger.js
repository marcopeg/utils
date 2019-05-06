'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = exports.logDebug = exports.logVerbose = exports.logInfo = exports.logError = undefined;

var _logger = require('@marcopeg/utils/lib/logger');

Object.defineProperty(exports, 'logError', {
    enumerable: true,
    get: function get() {
        return _logger.logError;
    }
});
Object.defineProperty(exports, 'logInfo', {
    enumerable: true,
    get: function get() {
        return _logger.logInfo;
    }
});
Object.defineProperty(exports, 'logVerbose', {
    enumerable: true,
    get: function get() {
        return _logger.logVerbose;
    }
});
Object.defineProperty(exports, 'logDebug', {
    enumerable: true,
    get: function get() {
        return _logger.logDebug;
    }
});

var _hooks = require('@marcopeg/hooks');

// Hooks from other services
var EXPRESS_MIDDLEWARE = _hooks.SERVICE + ' express/middleware';

var expressMiddleware = function expressMiddleware(req, res, next) {
    req.logger = {
        logError: _logger.logError,
        logInfo: _logger.logInfo,
        logVerbose: _logger.logVerbose,
        logDebug: _logger.logDebug
    };
    next();
};

var register = exports.register = function register(_ref) {
    var registerAction = _ref.registerAction;

    registerAction({
        hook: _hooks.START,
        name: _hooks.SERVICE + ' logger',
        trace: __filename,
        handler: _logger.init
    });

    registerAction({
        hook: EXPRESS_MIDDLEWARE,
        name: _hooks.SERVICE + ' logger',
        trace: __filename,
        handler: function handler(_ref2) {
            var app = _ref2.app;
            return app.use(expressMiddleware);
        }
    });
};