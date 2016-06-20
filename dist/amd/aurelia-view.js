define(['exports', './config', './view-manager', './decorators/resolved-view', 'aurelia-logging'], function (exports, _config, _viewManager, _resolvedView, _aureliaLogging) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Config = exports.ViewManager = exports.resolvedView = exports.configure = undefined;


  function configure(aurelia, configCallback) {
    if (typeof configCallback === 'function') {
      var config = aurelia.container.get(_config.Config);
      configCallback(config);
    } else if (configCallback) {
      (0, _aureliaLogging.getLogger)('aurelia-view').warn('config takes a function');
    }
  }

  exports.configure = configure;
  exports.resolvedView = _resolvedView.resolvedView;
  exports.ViewManager = _viewManager.ViewManager;
  exports.Config = _config.Config;
});