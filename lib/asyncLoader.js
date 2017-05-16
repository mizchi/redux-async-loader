'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = asyncLoader;

var _names = require('./names');

function asyncLoader(loader) {
  return function (Component) {
    Component[_names.loadAsyncPropertyName] = loader;
    return Component;
  };
}