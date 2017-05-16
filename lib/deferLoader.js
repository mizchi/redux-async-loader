'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = deferLoader;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function deferLoader(loader) {
  return function (WrappedComponent) {
    var WrapperComponent = function (_Component) {
      _inherits(WrapperComponent, _Component);

      function WrapperComponent() {
        _classCallCheck(this, WrapperComponent);

        return _possibleConstructorReturn(this, (WrapperComponent.__proto__ || Object.getPrototypeOf(WrapperComponent)).apply(this, arguments));
      }

      _createClass(WrapperComponent, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
          var store = this.context.store;

          loader(this.props, store);
        }
      }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          var store = this.context.store;

          loader(nextProps, store);
        }
      }, {
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, this.props);
        }
      }]);

      return WrapperComponent;
    }(_react.Component);

    WrapperComponent.displayName = 'deferLoader(' + getDisplayName(WrappedComponent) + ')';
    WrapperComponent.contextTypes = {
      store: _propTypes2.default.object.isRequired
    };
    return (0, _hoistNonReactStatics2.default)(WrapperComponent, WrappedComponent);
  };
}

function getDisplayName(component) {
  return component.displayName || component.name;
}