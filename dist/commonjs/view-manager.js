'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ViewManager = undefined;

var _dec, _class;

var _aureliaDependencyInjection = require('aurelia-dependency-injection');

var _config = require('./config');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewManager = exports.ViewManager = (_dec = (0, _aureliaDependencyInjection.inject)(_config.Config), _dec(_class = function () {
  function ViewManager(config) {
    _classCallCheck(this, ViewManager);

    this.config = config;
  }

  ViewManager.prototype.resolve = function resolve(namespace, view) {
    if (!namespace || !view) {
      throw new Error('Cannot resolve without namespace and view. Got namespace "' + namespace + '" and view "' + view + '" in stead');
    }

    var namespaceOrDefault = Object.create(this.config.fetch(namespace));
    namespaceOrDefault.view = view;

    var location = namespaceOrDefault.map[view] || namespaceOrDefault.location;

    return render(location, namespaceOrDefault);
  };

  return ViewManager;
}()) || _class);

function render(template, data) {
  var result = template;

  for (var key in data) {
    var regexString = ['{{', key, '}}'].join('');
    var regex = new RegExp(regexString, 'g');
    var value = data[key];
    result = result.replace(regex, value);
  }

  if (template !== result) {
    result = render(result, data);
  }

  return result;
}