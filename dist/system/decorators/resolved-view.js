'use strict';

System.register(['aurelia-dependency-injection', './../view-manager'], function (_export, _context) {
  "use strict";

  var Container, ViewManager;
  return {
    setters: [function (_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
    }, function (_viewManager) {
      ViewManager = _viewManager.ViewManager;
    }],
    execute: function () {
      function resolvedView(namespace, view) {
        return function resolvedViewDecorator(target) {
          var viewManager = Container.instance.get(ViewManager);
          target.getViewStrategy = viewManager.resolve(namespace, view);

          return target;
        };
      }

      _export('resolvedView', resolvedView);
    }
  };
});