'use strict';

System.register(['aurelia-dependency-injection', './../view-manager', 'aurelia-templating'], function (_export, _context) {
  "use strict";

  var Container, ViewManager, RelativeViewStrategy, useViewStrategy;
  return {
    setters: [function (_aureliaDependencyInjection) {
      Container = _aureliaDependencyInjection.Container;
    }, function (_viewManager) {
      ViewManager = _viewManager.ViewManager;
    }, function (_aureliaTemplating) {
      RelativeViewStrategy = _aureliaTemplating.RelativeViewStrategy;
      useViewStrategy = _aureliaTemplating.useViewStrategy;
    }],
    execute: function () {
      function resolvedView(namespace, view) {
        var viewManager = Container.instance.get(ViewManager);
        var path = viewManager.resolve(namespace, view);

        return useViewStrategy(new RelativeViewStrategy(path));
      }

      _export('resolvedView', resolvedView);
    }
  };
});