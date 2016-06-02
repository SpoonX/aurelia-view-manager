'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvedView = resolvedView;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _viewManager = require('./../view-manager');

function resolvedView(namespace, view) {
  return function resolvedViewDecorator(target) {
    var viewManager = _aureliaDependencyInjection.Container.instance.get(_viewManager.ViewManager);
    target.getViewStrategy = viewManager.resolve(namespace, view);

    return target;
  };
}