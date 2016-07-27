'use strict';

System.register(['extend', 'aurelia-logging', 'aurelia-dependency-injection', 'aurelia-templating'], function (_export, _context) {
  "use strict";

  var extend, getLogger, inject, Container, RelativeViewStrategy, useViewStrategy, _dec, _class2, Config, ViewManager;

  

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

  return {
    setters: [function (_extend) {
      extend = _extend.default;
    }, function (_aureliaLogging) {
      getLogger = _aureliaLogging.getLogger;
    }, function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
      Container = _aureliaDependencyInjection.Container;
    }, function (_aureliaTemplating) {
      RelativeViewStrategy = _aureliaTemplating.RelativeViewStrategy;
      useViewStrategy = _aureliaTemplating.useViewStrategy;
    }],
    execute: function () {
      _export('Config', Config = function () {
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
          extend(true, this.defaults, configs);

          return this;
        };

        Config.prototype.configureNamespace = function configureNamespace(name) {
          var _config;

          var configs = arguments.length <= 1 || arguments[1] === undefined ? { map: {} } : arguments[1];

          var namespace = Object.create(this.fetch(name));
          var config = (_config = {}, _config[name] = namespace, _config);

          extend(true, namespace, configs);
          this.configure(config);

          return this;
        };

        Config.prototype.configure = function configure(config) {
          extend(true, this.namespaces, config);

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
      }());

      _export('Config', Config);

      function configure(aurelia, configCallback) {
        if (typeof configCallback === 'function') {
          var config = aurelia.container.get(Config);
          configCallback(config);
        } else if (configCallback) {
          getLogger('aurelia-view').warn('config takes a function');
        }
      }

      _export('configure', configure);

      _export('ViewManager', ViewManager = (_dec = inject(Config), _dec(_class2 = function () {
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
      }()) || _class2));

      _export('ViewManager', ViewManager);

      function resolvedView(namespace, view) {
        var viewManager = Container.instance.get(ViewManager);
        var path = viewManager.resolve(namespace, view);

        return useViewStrategy(new RelativeViewStrategy(path));
      }

      _export('resolvedView', resolvedView);
    }
  };
});