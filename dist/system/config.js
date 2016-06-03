'use strict';

System.register(['extend'], function (_export, _context) {
  "use strict";

  var extend, Config;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  return {
    setters: [function (_extend) {
      extend = _extend.default;
    }],
    execute: function () {
      _export('Config', Config = function () {
        function Config() {
          _classCallCheck(this, Config);

          this.defaults = {
            location: '{{framework}}/{{view}}.html',
            framework: 'bootstrap'
          };
          this.namespaces = {};

          this.namespaces.defaults = this.defaults;
        }

        Config.prototype.configureDefaults = function configureDefaults(configs) {
          extend(true, this.defaults, configs);

          return this;
        };

        Config.prototype.configureNamespace = function configureNamespace(name) {
          var configs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          var namespace = this.fetch(name);
          extend(true, namespace, configs);
          var config = {};
          config[name] = namespace;
          this.configure(config);

          return this;
        };

        Config.prototype.configure = function configure(config) {
          extend(true, this.namespaces, config);

          return this;
        };

        Config.prototype.fetch = function fetch(properties) {
          if (!this.namespaces[properties]) {
            return Object.create(this.defaults);
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
    }
  };
});