var _dec, _class2, _dec2, _class3;



import extend from 'extend';
import { inject } from 'aurelia-dependency-injection';
import { viewStrategy, useViewStrategy } from 'aurelia-templating';
import { relativeToFile } from 'aurelia-path';

export var Config = function () {
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

    var configs = arguments.length <= 1 || arguments[1] === undefined ? { map: {} } : arguments[1];

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
}();

export function configure(aurelia, configOrConfigure) {
  var config = aurelia.container.get(Config);

  if (typeof configCallback === 'function') {
    return configOrConfigure(config);
  }
  config.configure(configOrConfigure);
}

export var ViewManager = (_dec = inject(Config), _dec(_class2 = function () {
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

export var ResolvedViewStrategy = (_dec2 = viewStrategy(), _dec2(_class3 = function () {
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
}()) || _class3);

export function resolvedView(namespace, view) {
  return useViewStrategy(new ResolvedViewStrategy(namespace, view));
}