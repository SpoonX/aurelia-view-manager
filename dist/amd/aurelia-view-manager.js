define(['exports', 'extend', 'aurelia-logging', 'aurelia-dependency-injection', 'aurelia-templating'], function (exports, _extend, _aureliaLogging, _aureliaDependencyInjection, _aureliaTemplating) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ViewManager = exports.Config = undefined;
  exports.configure = configure;
  exports.resolvedView = resolvedView;

  var _extend2 = _interopRequireDefault(_extend);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _dec, _class2;

  

  var Config = exports.Config = function () {
    function Config() {
      

      this.defaults = {
        location: '{{framework}}/{{view}}.html',
        framework: 'bootstrap',
        map: {}
      };
      this.namespaces = {};

      this.namespaces.defaults = this.defaults;
    }

    Config.prototype.configureDefaults = function configureDefaults(configs) {
      (0, _extend2.default)(true, this.defaults, configs);

      return this;
    };

    Config.prototype.configureNamespace = function configureNamespace(name) {
      var _config;

      var configs = arguments.length <= 1 || arguments[1] === undefined ? { map: {} } : arguments[1];

      var namespace = Object.create(this.fetch(name));
      var config = (_config = {}, _config[name] = namespace, _config);

      (0, _extend2.default)(true, namespace, configs);
      this.configure(config);

      return this;
    };

    Config.prototype.configure = function configure(config) {
      (0, _extend2.default)(true, this.namespaces, config);

      return this;
    };

    Config.prototype.fetch = function fetch(properties) {
      if (!this.namespaces[properties]) {
        return this.defaults;
      }

      var result = this.namespaces;

      for (var index in arguments) {
        var key = arguments[index];
        var value = result[key];
        if (!value) {
          return value;
        }
        result = result[key];
      }

      return result;
    };

    return Config;
  }();

  function configure(aurelia, configCallback) {
    if (typeof configCallback === 'function') {
      var config = aurelia.container.get(Config);
      configCallback(config);
    } else if (configCallback) {
      (0, _aureliaLogging.getLogger)('aurelia-view').warn('config takes a function');
    }
  }

  var ViewManager = exports.ViewManager = (_dec = (0, _aureliaDependencyInjection.inject)(Config), _dec(_class2 = function () {
    function ViewManager(config) {
      

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
  }()) || _class2);

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

  function resolvedView(namespace, view) {
    var viewManager = _aureliaDependencyInjection.Container.instance.get(ViewManager);
    var path = viewManager.resolve(namespace, view);

    return (0, _aureliaTemplating.useViewStrategy)(new _aureliaTemplating.RelativeViewStrategy(path));
  }
});