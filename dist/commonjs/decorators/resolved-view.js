'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvedView = resolvedView;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _viewManager = require('./../view-manager');

var _aureliaTemplating = require('aurelia-templating');

function resolvedView(namespace, view) {
  return function resolvedViewDecorator(target) {
    var viewManager = _aureliaDependencyInjection.Container.instance.get(_viewManager.ViewManager);

    target.prototype.getViewStrategy = viewManager.resolve.bind(viewManager, namespace, view);

    (0, _aureliaTemplating.useView)(viewManager.resolve(namespace, view))(target);

    return target;
  };
}