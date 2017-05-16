'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = useAsyncLoader;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ReduxAsyncLoaderContext = require('./ReduxAsyncLoaderContext');

var _ReduxAsyncLoaderContext2 = _interopRequireDefault(_ReduxAsyncLoaderContext);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function useAsyncLoader() {
  return {
    renderRouterContext: function renderRouterContext(child, renderProps) {
      return _react2.default.createElement(
        _ReduxAsyncLoaderContext2.default,
        renderProps,
        child
      );
    }
  };
}