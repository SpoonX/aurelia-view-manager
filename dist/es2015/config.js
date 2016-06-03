import extend from 'extend';

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
    extend(true, namespace, configs);
    let config = {};
    config[name] = namespace;
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