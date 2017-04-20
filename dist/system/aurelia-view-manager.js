'use strict';

System.register(['extend', 'aurelia-dependency-injection', 'aurelia-templating', 'aurelia-path'], function (_export, _context) {
  "use strict";

  var extend, inject, viewStrategy, ViewEngine, ViewCompileInstruction, ResourceLoadContext, ViewFactory, useViewStrategy, relativeToFile, _dec, _class2, _dec2, _class3, Config, ViewManager, ResolvedViewStrategy;

  

  function configure(aurelia, configOrConfigure) {
    var config = aurelia.container.get(Config);

    if (typeof configOrConfigure === 'function') {
      return configOrConfigure(config);
    }
    config.configure(configOrConfigure);
  }

  _export('configure', configure);

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
    return useViewStrategy(new ResolvedViewStrategy(namespace, view));
  }

  _export('resolvedView', resolvedView);

  return {
    setters: [function (_extend) {
      extend = _extend.default;
    }, function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_aureliaTemplating) {
      viewStrategy = _aureliaTemplating.viewStrategy;
      ViewEngine = _aureliaTemplating.ViewEngine;
      ViewCompileInstruction = _aureliaTemplating.ViewCompileInstruction;
      ResourceLoadContext = _aureliaTemplating.ResourceLoadContext;
      ViewFactory = _aureliaTemplating.ViewFactory;
      useViewStrategy = _aureliaTemplating.useViewStrategy;
    }, function (_aureliaPath) {
      relativeToFile = _aureliaPath.relativeToFile;
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
          var _configure;

          var configs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : { map: {} };

          var namespace = this.fetch(name);

          extend(true, namespace, configs);

          this.configure((_configure = {}, _configure[name] = namespace, _configure));

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
          var args = Array.from(arguments);

          for (var index in args) {
            if (!args.hasOwnProperty(index)) {
              continue;
            }
            var key = args[index];
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

          var location = (namespaceOrDefault.map || {})[view] || namespaceOrDefault.location;

          return render(location, namespaceOrDefault);
        };

        return ViewManager;
      }()) || _class2));

      _export('ViewManager', ViewManager);

      _export('ResolvedViewStrategy', ResolvedViewStrategy = (_dec2 = viewStrategy(), _dec2(_class3 = function () {
        function ResolvedViewStrategy(namespace, view) {
          

          this.namespace = namespace;
          this.view = view;
        }

        ResolvedViewStrategy.prototype.loadViewFactory = function loadViewFactory(viewEngine, compileInstruction, loadContext) {
          var viewManager = viewEngine.container.get(ViewManager);
          var path = viewManager.resolve(this.namespace, this.view);

          compileInstruction.associatedModuleId = this.moduleId;

          return viewEngine.loadViewFactory(this.moduleId ? relativeToFile(path, this.moduleId) : path, compileInstruction, loadContext);
        };

        return ResolvedViewStrategy;
      }()) || _class3));

      _export('ResolvedViewStrategy', ResolvedViewStrategy);
    }
  };
});