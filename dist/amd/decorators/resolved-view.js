define(['exports', 'aurelia-dependency-injection', './../view-manager', 'aurelia-templating'], function (exports, _aureliaDependencyInjection, _viewManager, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.resolvedView = resolvedView;
  function resolvedView(namespace, view) {
    return function resolvedViewDecorator(target) {
      var viewManager = _aureliaDependencyInjection.Container.instance.get(_viewManager.ViewManager);

      target.prototype.getViewStrategy = viewManager.resolve.bind(viewManager, namespace, view);

      (0, _aureliaTemplating.useView)(viewManager.resolve(namespace, view))(target);

      return target;
    };
  }
});