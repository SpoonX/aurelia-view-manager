define(['exports', './config', './view-manager', './decorators/resolved-view'], function (exports, _config, _viewManager, _resolvedView) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Config = exports.ViewManager = exports.resolvedView = exports.configure = undefined;


  function configure(aurelia, configCallback) {
    var config = aurelia.container.get(_config.Config);

    configCallback(config);
  }

  exports.configure = configure;
  exports.resolvedView = _resolvedView.resolvedView;
  exports.ViewManager = _viewManager.ViewManager;
  exports.Config = _config.Config;
});