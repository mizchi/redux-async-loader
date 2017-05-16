'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
/*
 * A part of these functions are:
 *   Copyright (c) 2015 Ryan Florence
 *   Released under the MIT license.
 *   https://github.com/ryanflorence/async-props/blob/master/LICENSE.md
 */

exports.default = flattenComponents;

var _names = require('./names');

// based on https://github.com/ryanflorence/async-props/blob/v0.3.2/modules/AsyncProps.js#L8-L18
function eachComponents(components, cb) {
  var _loop = function _loop(i, l) {
    var component = components[i];
    if ((typeof component === 'undefined' ? 'undefined' : _typeof(component)) === 'object') {
      // named components
      // https://github.com/reactjs/react-router/blob/master/docs/API.md#named-components
      Object.keys(component).forEach(function (key) {
        return cb(component[key], i, key);
      });
    } else {
      cb(component, i); // eslint-disable-line callback-return
    }
  };

  for (var i = 0, l = components.length; i < l; i++) {
    _loop(i, l);
  }
}

// based on https://github.com/ryanflorence/async-props/blob/v0.3.2/modules/AsyncProps.js#L20-L27
function flattenComponents(components) {
  var flattened = [];
  eachComponents(components, function (Component) {
    if (Component && Component[_names.loadAsyncPropertyName]) {
      flattened.push(Component);
    }
  });
  return flattened;
}