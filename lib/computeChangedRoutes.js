'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = computeChangedRoutes;

var _PatternUtils = require('react-router/lib/PatternUtils');

function computeChangedRoutes(prevState, nextState) {
  var prevRoutes = prevState && prevState.routes;
  var nextRoutes = nextState.routes;

  if (!prevRoutes) {
    return nextRoutes;
  }

  var leaveIndex = prevRoutes.findIndex(function (route) {
    return nextRoutes.indexOf(route) === -1 || routeParamsChanged(route, prevState, nextState) || queryParamsChanged(route, prevState, nextState) || routeChanged(route, prevState, nextState);
  });
  var leaveRoutes = leaveIndex === -1 ? [] : prevRoutes.slice(leaveIndex);

  return nextRoutes.filter(function (route) {
    var isNew = prevRoutes.indexOf(route) === -1;
    var paramsChanged = leaveRoutes.indexOf(route) !== -1;

    return isNew || paramsChanged;
  });
}
/*
 * A part of these functions are:
 *   Copyright (c) 2015-present, Ryan Florence, Michael Jackson
 *   Released under the MIT license.
 *   https://github.com/reactjs/react-router/blob/master/LICENSE.md
 */

function routeParamsChanged(route, prevState, nextState) {
  if (!route.path) {
    return false;
  }

  var paramNames = (0, _PatternUtils.getParamNames)(route.path);

  return paramNames.some(function (paramName) {
    return prevState.params[paramName] !== nextState.params[paramName];
  });
}

function queryParamsChanged(route, prevState, nextState) {
  var queryKeys = route.asyncLoaderProps && route.asyncLoaderProps.queryKeys || route.queryKeys;
  if (!queryKeys) {
    return false;
  }

  var prevQuery = prevState.location.query;
  var nextQuery = nextState.location.query;

  if (queryKeys === '*') {
    var prevQueryKeys = Object.keys(prevQuery);
    var nextQueryKeys = Object.keys(nextQuery);

    return prevQueryKeys.length !== nextQueryKeys.length || prevQueryKeys.some(function (key) {
      return prevQuery[key] !== nextQuery[key];
    });
  }

  var keys = queryKeys.split(/[, ]+/);
  return keys.some(function (key) {
    return prevQuery[key] !== nextQuery[key];
  });
}

function routeChanged(route, prevState, nextState) {
  var changed = route.asyncLoaderProps && route.asyncLoaderProps.routeChanged;
  return changed && changed(route, prevState, nextState);
}