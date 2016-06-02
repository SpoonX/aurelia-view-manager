'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Config = exports.ViewManager = exports.configure = undefined;

var _config = require('./config');

var _viewManager = require('./view-manager');

function configure(aurelia, configCallback) {
  var config = aurelia.container.get(_config.Config);

  configCallback(config);
}

exports.configure = configure;
exports.ViewManager = _viewManager.ViewManager;
exports.Config = _config.Config;