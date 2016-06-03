'use strict';

System.register(['aurelia-dependency-injection', './config'], function (_export, _context) {
  "use strict";

  var inject, Config, _dec, _class, ViewManager;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function render(template, data) {
    var result = template;

    for (var key in data) {
      var regexString = ['{{', key, '}}'].join('');
      var regex = new RegExp(regexString, 'g');
      var value = data[key];
      result = result.replace(regex, value);
    }

    return result;
  }
  return {
    setters: [function (_aureliaDependencyInjection) {
      inject = _aureliaDependencyInjection.inject;
    }, function (_config) {
      Config = _config.Config;
    }],
    execute: function () {
      _export('ViewManager', ViewManager = (_dec = inject(Config), _dec(_class = function () {
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
      }()) || _class));

      _export('ViewManager', ViewManager);
    }
  };
});