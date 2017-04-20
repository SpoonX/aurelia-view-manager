var _dec, _class2, _dec2, _class3;

import extend from 'extend';
import { inject } from 'aurelia-dependency-injection';
import { viewStrategy, ViewEngine, ViewCompileInstruction, ResourceLoadContext, ViewFactory, useViewStrategy } from 'aurelia-templating';
import { relativeToFile } from 'aurelia-path';

export let Config = class Config {

  constructor() {
    this.defaults = {
      location: '{{framework}}/{{view}}.html',
      framework: 'bootstrap',
      map: {}
    };
    this.namespaces = {};

    this.namespaces.defaults = this.defaults;
  }

  configureDefaults(configs) {
    extend(true, this.defaults, configs);

    return this;
  }

  configureNamespace(name, configs = { map: {} }) {
    let namespace = this.fetch(name);

    extend(true, namespace, configs);

    this.configure({ [name]: namespace });

    return this;
  }

  configure(config) {
    extend(true, this.namespaces, config);

    return this;
  }

  fetch(properties) {
    if (!this.namespaces[properties]) {
      return this.defaults;
    }

    let result = this.namespaces;
    let args = Array.from(arguments);

    for (let index in args) {
      if (!args.hasOwnProperty(index)) {
        continue;
      }
      let key = args[index];
      let value = result[key];

      if (!value) {
        return value;
      }
      result = result[key];
    }

    return result;
  }
};

export function configure(aurelia, configOrConfigure) {
  let config = aurelia.container.get(Config);

  if (typeof configOrConfigure === 'function') {
    return configOrConfigure(config);
  }
  config.configure(configOrConfigure);
}

export let ViewManager = (_dec = inject(Config), _dec(_class2 = class ViewManager {

  constructor(config) {
    this.config = config;
  }

  resolve(namespace, view) {
    if (!namespace || !view) {
      throw new Error(`Cannot resolve without namespace and view. Got namespace "${namespace}" and view "${view}" in stead`);
    }

    let namespaceOrDefault = Object.create(this.config.fetch(namespace));

    namespaceOrDefault.view = view;

    let location = (namespaceOrDefault.map || {})[view] || namespaceOrDefault.location;

    return render(location, namespaceOrDefault);
  }
}) || _class2);

function render(template, data) {
  let result = template;

  for (let key in data) {
    let regexString = ['{{', key, '}}'].join('');
    let regex = new RegExp(regexString, 'g');
    let value = data[key];

    result = result.replace(regex, value);
  }

  if (template !== result) {
    result = render(result, data);
  }

  return result;
}

export let ResolvedViewStrategy = (_dec2 = viewStrategy(), _dec2(_class3 = class ResolvedViewStrategy {
  constructor(namespace, view) {
    this.namespace = namespace;
    this.view = view;
  }

  loadViewFactory(viewEngine, compileInstruction, loadContext) {
    let viewManager = viewEngine.container.get(ViewManager);
    let path = viewManager.resolve(this.namespace, this.view);

    compileInstruction.associatedModuleId = this.moduleId;

    return viewEngine.loadViewFactory(this.moduleId ? relativeToFile(path, this.moduleId) : path, compileInstruction, loadContext);
  }
}) || _class3);

export function resolvedView(namespace, view) {
  return useViewStrategy(new ResolvedViewStrategy(namespace, view));
}