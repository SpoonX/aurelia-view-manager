define(['exports', 'aurelia-dependency-injection', './../view-manager', 'aurelia-templating'], function (exports, _aureliaDependencyInjection, _viewManager, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.resolvedView = resolvedView;
  function resolvedView(namespace, view) {
    var viewManager = _aureliaDependencyInjection.Container.instance.get(_viewManager.ViewManager);
    var path = viewManager.resolve(namespace, view);

    return (0, _aureliaTemplating.useViewStrategy)(new _aureliaTemplating.RelativeViewStrategy(path));
  }
});