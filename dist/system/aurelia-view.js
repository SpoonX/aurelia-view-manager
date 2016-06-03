'use strict';

System.register(['./config', './view-manager', './decorators/resolved-view'], function (_export, _context) {
  "use strict";

  var Config, ViewManager, resolvedView;


  function configure(aurelia, configCallback) {
    var config = aurelia.container.get(Config);

    configCallback(config);
  }

  return {
    setters: [function (_config) {
      Config = _config.Config;
    }, function (_viewManager) {
      ViewManager = _viewManager.ViewManager;
    }, function (_decoratorsResolvedView) {
      resolvedView = _decoratorsResolvedView.resolvedView;
    }],
    execute: function () {
      _export('configure', configure);

      _export('resolvedView', resolvedView);

      _export('ViewManager', ViewManager);

      _export('Config', Config);
    }
  };
});