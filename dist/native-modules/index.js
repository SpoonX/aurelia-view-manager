'use strict';

exports.__esModule = true;

var _aureliaViewManager = require('./aurelia-view-manager');

Object.keys(_aureliaViewManager).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _aureliaViewManager[key];
    }
  });
});