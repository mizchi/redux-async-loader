'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadOnServer;

var _actions = require('./actions');

var _flattenComponents = require('./flattenComponents');

var _flattenComponents2 = _interopRequireDefault(_flattenComponents);

var _loadAsync = require('./loadAsync');

var _loadAsync2 = _interopRequireDefault(_loadAsync);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadOnServer(renderProps, store) {
  var flattened = (0, _flattenComponents2.default)(renderProps.components);
  if (!flattened.length) {
    return Promise.resolve();
  }

  var dispatch = store.dispatch;

  dispatch((0, _actions.beginAsyncLoad)(true));
  return (0, _loadAsync2.default)(flattened, renderProps, store).then(function (v) {
    dispatch((0, _actions.endAsyncLoad)(true));
    return v;
  }, function (e) {
    dispatch((0, _actions.endAsyncLoad)(true));
    return Promise.reject(e);
  });
}