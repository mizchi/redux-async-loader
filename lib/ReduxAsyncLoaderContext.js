'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _computeChangedRoutes = require('./computeChangedRoutes');

var _computeChangedRoutes2 = _interopRequireDefault(_computeChangedRoutes);

var _actions = require('./actions');

var _flattenComponents = require('./flattenComponents');

var _flattenComponents2 = _interopRequireDefault(_flattenComponents);

var _loadAsync2 = require('./loadAsync');

var _loadAsync3 = _interopRequireDefault(_loadAsync2);

var _names = require('./names');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* eslint-disable react/no-set-state */
/* eslint-disable react/sort-comp */

/*
 * A part of these functions are:
 *   Copyright (c) 2015 Ryan Florence
 *   Released under the MIT license.
 *   https://github.com/ryanflorence/async-props/blob/master/LICENSE.md
 */

var ReduxAsyncLoaderContext = function (_Component) {
  _inherits(ReduxAsyncLoaderContext, _Component);

  function ReduxAsyncLoaderContext(props, context) {
    _classCallCheck(this, ReduxAsyncLoaderContext);

    var _this = _possibleConstructorReturn(this, (ReduxAsyncLoaderContext.__proto__ || Object.getPrototypeOf(ReduxAsyncLoaderContext)).call(this, props, context));

    _this.state = {
      children: null
    };
    _this.loadCount = 0;
    return _this;
  }

  _createClass(ReduxAsyncLoaderContext, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _getAsyncLoaderState = this.getAsyncLoaderState(),
          loading = _getAsyncLoaderState.loading,
          loaded = _getAsyncLoaderState.loaded,
          onServer = _getAsyncLoaderState.onServer;

      if (loading) {
        return;
      }

      if (loaded && onServer) {
        var dispatch = this.context.store.dispatch;

        dispatch((0, _actions.skipAsyncLoad)(false));
        return;
      }

      this.loadAsync(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // FIXME: Dirty check for stop by global
      // I want to take this flag by reducer, but dispatching action can not intercept at same request frame.
      if (global.FLAG_FOR_STOP_ASYNC_LOAD) {
        return;
      }

      if (nextProps.location === this.props.location) {
        return;
      }

      var enterRoutes = (0, _computeChangedRoutes2.default)({ routes: this.props.routes, params: this.props.params, location: this.props.location }, { routes: nextProps.routes, params: nextProps.params, location: nextProps.location });

      var indexDiff = nextProps.components.length - enterRoutes.length;
      var components = enterRoutes.map(function (route, index) {
        return nextProps.components[indexDiff + index];
      });

      this.loadAsync(Object.assign({}, nextProps, { components: components }));
    }
  }, {
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      var _getAsyncLoaderState2 = this.getAsyncLoaderState(),
          loading = _getAsyncLoaderState2.loading;

      return !loading;
    }
  }, {
    key: 'getAsyncLoaderState',
    value: function getAsyncLoaderState() {
      var getAsyncLoaderState = this.props.getAsyncLoaderState;
      var getState = this.context.store.getState;

      return getAsyncLoaderState(getState());
    }
  }, {
    key: 'loadAsync',
    value: function loadAsync(props) {
      var _this2 = this;

      var children = props.children,
          components = props.components;


      var flattened = (0, _flattenComponents2.default)(components);
      if (!flattened.length) {
        return;
      }

      var store = this.context.store;
      var dispatch = store.dispatch;

      this.beginLoad(dispatch, children).then(function () {
        return (0, _loadAsync3.default)(flattened, props, store);
      }).then(function () {
        return _this2.endLoad(dispatch);
      }, function (error) {
        return _this2.endLoad(dispatch, error);
      });
    }
  }, {
    key: 'beginLoad',
    value: function beginLoad(dispatch, children) {
      var _this3 = this;

      if (this.loadCount === 0) {
        dispatch((0, _actions.beginAsyncLoad)());
      }

      ++this.loadCount;
      return new Promise(function (resolve) {
        _this3.setState({ children: children }, function () {
          return resolve();
        });
      });
    }
  }, {
    key: 'endLoad',
    value: function endLoad(dispatch, error) {
      if (error) {
        this.props.onError(error);
      }

      --this.loadCount;
      if (this.loadCount === 0) {
        dispatch((0, _actions.endAsyncLoad)());
        this.setState({ children: null });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _getAsyncLoaderState3 = this.getAsyncLoaderState(),
          loading = _getAsyncLoaderState3.loading;

      return loading ? this.state.children : this.props.children;
    }
  }]);

  return ReduxAsyncLoaderContext;
}(_react.Component);

ReduxAsyncLoaderContext.contextTypes = {
  store: _propTypes2.default.object.isRequired
};

ReduxAsyncLoaderContext.propTypes = {
  children: _propTypes2.default.node.isRequired,
  components: _propTypes2.default.array.isRequired,
  params: _propTypes2.default.object.isRequired,
  location: _propTypes2.default.object.isRequired,
  getAsyncLoaderState: _propTypes2.default.func,
  onError: _propTypes2.default.func
};

ReduxAsyncLoaderContext.defaultProps = {
  getAsyncLoaderState: function getAsyncLoaderState(state) {
    return state[_names.reducerName];
  },
  onError: function onError(error) {
    // ignore
  }
};

exports.default = ReduxAsyncLoaderContext;