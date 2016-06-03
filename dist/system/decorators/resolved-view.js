'use strict';

System.register(['aurelia-dependency-injection', './../view-manager', 'aurelia-templating'], function (_export, _context) {
  "use strict";

  var Container, ViewManager, useView;
  return {
    setters: [function (_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
    }, function (_viewManager) {
      ViewManager = _viewManager.ViewManager;
    }, function (_aureliaTemplating) {
      useView = _aureliaTemplating.useView;
    }],
    execute: function () {
      function resolvedView(namespace, view) {
        return function resolvedViewDecorator(target) {
          var viewManager = Container.instance.get(ViewManager);

          target.prototype.getViewStrategy = viewManager.resolve.bind(viewManager, namespace, view);

          useView(viewManager.resolve(namespace, view))(target);

          return target;
        };
      }

      _export('resolvedView', resolvedView);
    }
  };
});