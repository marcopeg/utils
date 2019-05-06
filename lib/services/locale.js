'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _graphql = require('graphql');

var _graphqlTypeJson = require('graphql-type-json');

var _graphqlTypeJson2 = _interopRequireDefault(_graphqlTypeJson);

var _hooks = require('ssr/services/express/hooks');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var loadLocaleFile = function loadLocaleFile(locale) {
    return new Promise(function (resolve, reject) {
        var origin = process.env.NODE_ENV === 'development' && locale !== 'en' ? 'public' : 'build';
        var filePath = _path2.default.join(process.cwd(), origin, 'locale', locale.toLowerCase() + '.json');
        _fs2.default.readFile(filePath, 'utf8', function (err, data) {
            return err ? reject(err) : resolve(data);
        });
    });
};

var loadMessages = function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(locale) {
        var data;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        data = null;
                        _context.prev = 1;
                        _context.next = 4;
                        return loadLocaleFile(locale);

                    case 4:
                        data = _context.sent;
                        _context.next = 10;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](1);
                        throw new Error('localization "' + locale + '" not available');

                    case 10:
                        _context.prev = 10;
                        return _context.abrupt('return', JSON.parse(data));

                    case 14:
                        _context.prev = 14;
                        _context.t1 = _context['catch'](10);
                        throw new Error('localization "' + locale + '" is corrupted');

                    case 17:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 7], [10, 14]]);
    }));

    return function loadMessages(_x) {
        return _ref.apply(this, arguments);
    };
}();

var localeQuery = {
    description: 'Provides localized messages',
    args: {
        locale: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
        }
    },
    type: new _graphql.GraphQLNonNull(new _graphql.GraphQLObjectType({
        name: 'Locale',
        fields: {
            locale: {
                type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
            },
            messages: {
                type: _graphqlTypeJson2.default
            }
        }
    })),
    resolve: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(params, args) {
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            _context2.t0 = args.locale;
                            _context2.next = 3;
                            return loadMessages(args.locale);

                        case 3:
                            _context2.t1 = _context2.sent;
                            return _context2.abrupt('return', {
                                locale: _context2.t0,
                                messages: _context2.t1
                            });

                        case 5:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, undefined);
        }));

        return function resolve(_x2, _x3) {
            return _ref2.apply(this, arguments);
        };
    }()
};

var register = exports.register = function register(_ref3) {
    var registerAction = _ref3.registerAction;
    return registerAction({
        hook: _hooks.EXPRESS_GRAPHQL,
        name: '▶ locale',
        handler: function handler(_ref4) {
            var queries = _ref4.queries;

            queries.locale = localeQuery;
        }
    });
};