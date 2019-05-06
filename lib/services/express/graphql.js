'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = exports.createGraphQLHandler = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _graphql = require('graphql');

var _expressGraphql = require('express-graphql');

var _expressGraphql2 = _interopRequireDefault(_expressGraphql);

var _hooks = require('@marcopeg/hooks');

var _package = require('../../../package.json');

var _package2 = _interopRequireDefault(_package);

var _hooks2 = require('./hooks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var info = {
    description: 'Provides info regarding the project',
    type: _graphql.GraphQLString,
    resolve: function resolve() {
        return _package2.default.name + ' v' + _package2.default.version;
    }
};

var createGraphQLHandler = exports.createGraphQLHandler = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var isDev, queries, mutations, context, config, schema;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        isDev = ['development', 'test'].indexOf(process.env.NODE_ENV) !== -1;
                        queries = { info: info };
                        mutations = { info: info };
                        context = { data: {} };
                        config = {
                            graphiql: isDev
                        };
                        _context.next = 7;
                        return (0, _hooks.createHook)(_hooks2.EXPRESS_GRAPHQL, {
                            async: 'serie',
                            args: {
                                queries: queries,
                                mutations: mutations,
                                context: context,
                                config: config
                            }
                        });

                    case 7:
                        schema = {
                            query: new _graphql.GraphQLObjectType({
                                name: 'RootQuery',
                                fields: queries
                            }),
                            mutation: new _graphql.GraphQLObjectType({
                                name: 'RootMutation',
                                fields: mutations
                            })
                        };
                        return _context.abrupt('return', function (req, res) {
                            return (0, _expressGraphql2.default)({
                                schema: new _graphql.GraphQLSchema(schema),
                                graphiql: config.graphiql,
                                context: (0, _extends3.default)({}, context, {
                                    req: req,
                                    res: res
                                })
                            })(req, res);
                        });

                    case 9:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function createGraphQLHandler() {
        return _ref.apply(this, arguments);
    };
}();

var register = exports.register = function register(_ref2) {
    var registerAction = _ref2.registerAction;
    return registerAction({
        hook: _hooks2.EXPRESS_ROUTE,
        name: _hooks2.EXPRESS_GRAPHQL,
        trace: __filename,
        handler: function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(_ref4) {
                var app = _ref4.app,
                    settings = _ref4.settings;
                var mountPoint;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                mountPoint = settings.graphql.mountPoint;

                                if (!(mountPoint === null)) {
                                    _context2.next = 3;
                                    break;
                                }

                                throw new Error('[graphql] mount point not defined');

                            case 3:
                                _context2.t0 = app;
                                _context2.t1 = mountPoint;
                                _context2.next = 7;
                                return createGraphQLHandler();

                            case 7:
                                _context2.t2 = _context2.sent;

                                _context2.t0.use.call(_context2.t0, _context2.t1, _context2.t2);

                            case 9:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, undefined);
            }));

            return function handler(_x) {
                return _ref3.apply(this, arguments);
            };
        }()
    });
};