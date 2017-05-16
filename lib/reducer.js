'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reducer;

var _actions = require('./actions');

var INITIAL_STATE = {
  loading: false,
  loaded: false,
  onServer: false
};
function reducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : INITIAL_STATE;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      type = _ref.type,
      payload = _ref.payload;

  switch (type) {
    case _actions.BEGIN_ASYNC_LOAD:
      return {
        loading: true,
        loaded: false,
        onServer: !!payload.onServer
      };
    case _actions.END_ASYNC_LOAD:
    case _actions.SKIP_ASYNC_LOAD:
      return {
        loading: false,
        loaded: true,
        onServer: !!payload.onServer
      };
    default:
      return state;
  }
}