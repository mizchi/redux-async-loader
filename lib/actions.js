'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beginAsyncLoad = beginAsyncLoad;
exports.endAsyncLoad = endAsyncLoad;
exports.skipAsyncLoad = skipAsyncLoad;
var BEGIN_ASYNC_LOAD = exports.BEGIN_ASYNC_LOAD = 'redux-async-loader/load/begin';
var END_ASYNC_LOAD = exports.END_ASYNC_LOAD = 'redux-async-loader/load/end';
var SKIP_ASYNC_LOAD = exports.SKIP_ASYNC_LOAD = 'redux-async-loader/load/skip';

function beginAsyncLoad() {
  var onServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  return {
    type: BEGIN_ASYNC_LOAD,
    payload: {
      onServer: onServer
    }
  };
}

function endAsyncLoad() {
  var onServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  return {
    type: END_ASYNC_LOAD,
    payload: {
      onServer: onServer
    }
  };
}

function skipAsyncLoad() {
  var onServer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  return {
    type: SKIP_ASYNC_LOAD,
    payload: {
      onServer: onServer
    }
  };
}