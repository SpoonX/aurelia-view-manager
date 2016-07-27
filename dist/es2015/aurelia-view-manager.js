var _dec, _class2;

import extend from 'extend';
import { getLogger } from 'aurelia-logging';
import { inject, Container } from 'aurelia-dependency-injection';
import { RelativeViewStrategy, useViewStrategy } from 'aurelia-templating';

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
    let namespace = Object.create(this.fetch(name));
    let config = { [name]: namespace };

    extend(true, namespace, configs);
    this.configure(config);

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

    for (let index in arguments) {
      let key = arguments[index];
      let value = result[key];
      if (!value) {
        return value;
      }
      result = result[key];
    }

    return result;
  }
};

export function configure(aurelia, configCallback) {
  if (typeof configCallback === 'function') {
    let config = aurelia.container.get(Config);
    configCallback(config);
  } else if (configCallback) {
    getLogger('aurelia-view').warn('config takes a function');
  }
}

export let ViewManager = (_dec = inject(Config), _dec(_class2 = class ViewManager {

  constructor(config) {
    this.config = config;
  }

  resolve(namespace, view) {
    if (!namespace || !view) {
      throw new Error(`Cannot resolve without namespace and view. Got namespace "${ namespace }" and view "${ view }" in stead`);
    }

    let namespaceOrDefault = Object.create(this.config.fetch(namespace));
    namespaceOrDefault.view = view;

    let location = namespaceOrDefault.map[view] || namespaceOrDefault.location;

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

export function resolvedView(namespace, view) {
  let viewManager = Container.instance.get(ViewManager);
  let path = viewManager.resolve(namespace, view);

  return useViewStrategy(new RelativeViewStrategy(path));
}