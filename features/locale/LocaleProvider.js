'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _reactIntl = require('react-intl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable */

var mapState = function mapState(_ref) {
    var locale = _ref.locale;
    return {
        locale: locale.locale,
        messages: locale.locales[locale.locale] ? locale.locales[locale.locale].messages : {}
    };
};

var LocaleProvider = function LocaleProvider(_ref2) {
    var locale = _ref2.locale,
        messages = _ref2.messages,
        children = _ref2.children;
    return _react2.default.createElement(
        _reactIntl.IntlProvider,
        {
            locale: locale,
            messages: messages
        },
        typeof children === 'function' ? children(locale) : children
    );
};

LocaleProvider.propTypes = {
    locale: _propTypes2.default.string.isRequired,
    messages: _propTypes2.default.object.isRequired,
    children: _propTypes2.default.any.isRequired // eslint-disable-line
};

exports.default = (0, _reactRedux.connect)(mapState)(LocaleProvider);