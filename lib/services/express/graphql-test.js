'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = exports.initGraphql = exports.validateToken = exports.init = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _graphql = require('graphql');

var _hooks = require('@marcopeg/hooks');

var _hooks2 = require('./hooks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var settings = {};

var init = exports.init = function init(_ref) {
    var isEnabled = _ref.isEnabled,
        token = _ref.token;

    settings.isEnabled = isEnabled;
    settings.token = token;
};

var validateToken = exports.validateToken = function validateToken(token) {
    if (!settings.isEnabled) {
        throw new Error('n/a');
    }

    if (settings.token !== token) {
        throw new Error('invalid token');
    }

    return true;
};

var initGraphql = exports.initGraphql = function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(_ref3) {
        var queries = _ref3.queries,
            mutations = _ref3.mutations;
        var testQueries, testMutations, queryPrototype, defaultQueries;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        if (settings.isEnabled) {
                            _context.next = 2;
                            break;
                        }

                        return _context.abrupt('return');

                    case 2:
                        testQueries = {};
                        testMutations = {};
                        queryPrototype = {
                            description: 'Enable test apis protected by a token',
                            args: {
                                token: {
                                    type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
                                }
                            },
                            resolve: function resolve(params, args) {
                                return validateToken(args.token);
                            }
                        };
                        defaultQueries = {
                            enabled: {
                                type: _graphql.GraphQLBoolean,
                                resolve: function resolve() {
                                    return true;
                                }
                            }
                        };
                        _context.next = 8;
                        return (0, _hooks.createHook)(_hooks2.EXPRESS_GRAPHQL_TEST, {
                            async: 'serie',
                            args: {
                                queries: testQueries,
                                mutations: testMutations
                            }
                        });

                    case 8:

                        queries.test = (0, _extends3.default)({}, queryPrototype, {
                            type: new _graphql.GraphQLObjectType({
                                name: 'TestQuery',
                                fields: (0, _extends3.default)({}, testQueries, defaultQueries)
                            })
                        });

                        mutations.test = (0, _extends3.default)({}, queryPrototype, {
                            type: new _graphql.GraphQLObjectType({
                                name: 'TestMutation',
                                fields: (0, _extends3.default)({}, testMutations, defaultQueries)
                            })
                        });

                    case 10:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function initGraphql(_x) {
        return _ref2.apply(this, arguments);
    };
}();

var register = exports.register = function register(_ref4) {
    var registerAction = _ref4.registerAction;

    registerAction({
        hook: _hooks.INIT_SERVICE,
        name: _hooks2.EXPRESS_GRAPHQL_TEST,
        trace: __filename,
        handler: function handler(_ref5) {
            var graphqlTest = _ref5.graphqlTest;
            return init(graphqlTest);
        }
    });

    registerAction({
        hook: _hooks2.EXPRESS_GRAPHQL,
        name: _hooks2.EXPRESS_GRAPHQL_TEST,
        trace: __filename,
        handler: initGraphql
    });
};