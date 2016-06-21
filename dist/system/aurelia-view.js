'use strict';

System.register(['./config', './view-manager', './decorators/resolved-view', 'aurelia-logging'], function (_export, _context) {
  "use strict";

  var Config, ViewManager, resolvedView, getLogger;


  function configure(aurelia, configCallback) {
    if (typeof configCallback === 'function') {
      var config = aurelia.container.get(Config);
      configCallback(config);
    } else if (configCallback) {
      getLogger('aurelia-view').warn('config takes a function');
    }
  }

  return {
    setters: [function (_config) {
      Config = _config.Config;
    }, function (_viewManager) {
      ViewManager = _viewManager.ViewManager;
    }, function (_decoratorsResolvedView) {
      resolvedView = _decoratorsResolvedView.resolvedView;
    }, function (_aureliaLogging) {
      getLogger = _aureliaLogging.getLogger;
    }],
    execute: function () {
      _export('configure', configure);

      _export('resolvedView', resolvedView);

      _export('ViewManager', ViewManager);

      _export('Config', Config);
    }
  };
});