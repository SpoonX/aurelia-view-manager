'use strict';

System.register(['./config', './view-manager'], function (_export, _context) {
  "use strict";

  var Config, ViewManager;


  function configure(aurelia, configCallback) {
    var config = aurelia.container.get(Config);

    configCallback(config);
  }

  return {
    setters: [function (_config) {
      Config = _config.Config;
    }, function (_viewManager) {
      ViewManager = _viewManager.ViewManager;
    }],
    execute: function () {
      _export('configure', configure);

      _export('ViewManager', ViewManager);

      _export('Config', Config);
    }
  };
});