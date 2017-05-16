'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = loadAsync;

var _names = require('./names');

function loadAsync(components, props, store) {
  return Promise.all(components.map(function (component) {
    return component[_names.loadAsyncPropertyName](props, store);
  }));
}