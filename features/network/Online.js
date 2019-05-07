'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mapSate = function mapSate(_ref) {
    var network = _ref.network;
    return {
        isOnline: network.isOnline
    };
};

var Online = function Online(_ref2) {
    var isOnline = _ref2.isOnline,
        render = _ref2.render,
        component = _ref2.component,
        children = _ref2.children;

    if (render) {
        return _react2.default.createElement(render, { isOnline: isOnline });
    }

    if (component) {
        return isOnline ? _react2.default.createElement(component) : null;
    }

    return isOnline ? children : null;
};

Online.propTypes = {
    isOnline: _propTypes2.default.bool.isRequired,
    render: _propTypes2.default.func,
    component: _propTypes2.default.func,
    children: _propTypes2.default.any // eslint-disable-line
};

Online.defaultProps = {
    render: null,
    component: null
};

exports.default = (0, _reactRedux.connect)(mapSate)(Online);