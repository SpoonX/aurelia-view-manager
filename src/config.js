import extend from 'extend';

let namespaces = {};

let defaultsTo = {
  location: '{{framework}}/{{view}}',
  framework: 'bootstrap'
};

/**
 * adds a namespace to the namespaces object without configs.
 * uses prototypal inheritance to enable default fallback
 * @param {string} name the name of the namespace
 * @return {object} an empty config whoms prototype is an object containing the
 * defaults
 */
function createNamespace(name) {
  let namespaceConfig = Object.create(defaultsTo);
  namespaceConfig.map = {};
  return namespaceConfig;
}

export class Config {
  /**
   * change the defaults to be used when namespace location and framework is not
   * defined.
   * @param {object} defaults values to use as the defaults
   * @returns {Config}
   */
  extendDefaults(defaults) {
    extend(defaultsTo, defaults);
    return this;
  }

  /**
   * Register configuration for the view manager to use later.
   *
   * @param {string} name of the namespace
   * @param {object} def configs used to resolve template paths
   *
   * @returns {Config}
   */
  setNamespace(name, configs) {
    let namespaceConfig = namespaces[name];
    if (!namespaces[name]) {
      namespaceConfig = createNamespace(name)
    }

    namespaces[name] = extend(true, namespaceConfig, configs);

    return this;
  }

  /**
   * returns the object with all the namespaces configurations
   * @returns {object} a new object with namespaces object as prototype
   */
  namespaceConfigurations() {
    return Object.create(namespaces);
  }

  /**
   * returns the object with the default configurations
   * @returns {object}
   */
  getDefaults() {
    return defaultsTo;
  }

  /**
   * returns either the namespace config or the defaultsTo configs
   *
   * @param {string} [name]
   * @returns {object} the config object for that namespace.
   *
   * @todo
   * consider returning an error when name argument is passed and the
   * namespace has no configs defined
   */
  getConfigs(namespace) {
    return namespaces[namespace] || defaultsTo;
  }
}
