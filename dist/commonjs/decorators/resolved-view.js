'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvedView = resolvedView;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _viewManager = require('./../view-manager');

var _aureliaTemplating = require('aurelia-templating');

function resolvedView(namespace, view) {
  var viewManager = _aureliaDependencyInjection.Container.instance.get(_viewManager.ViewManager);
  var path = viewManager.resolve(namespace, view);

  return (0, _aureliaTemplating.useViewStrategy)(new _aureliaTemplating.RelativeViewStrategy(path));
}