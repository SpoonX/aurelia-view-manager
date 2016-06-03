define(['exports', 'aurelia-dependency-injection', './../view-manager'], function (exports, _aureliaDependencyInjection, _viewManager) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.resolvedView = resolvedView;
  function resolvedView(namespace, view) {
    return function resolvedViewDecorator(target) {
      var viewManager = _aureliaDependencyInjection.Container.instance.get(_viewManager.ViewManager);
      target.getViewStrategy = viewManager.resolve(namespace, view);

      return target;
    };
  }
});