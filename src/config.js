import extend from 'extend';

export class Config {

  /* these can be overwritten with the configureDefaults function */
  defaults = {
    location: '{{framework}}/{{view}}.html',
    framework: 'bootstrap',
    map: {}
  };

  /* stores the namespaced configs */
  namespaces = {};

  constructor() {
    /***
     * have the defaults object showup like a namespaces in the namespaces
     * object
     */
    this.namespaces.defaults = this.defaults;
  }

  /**
   * extends the defaults object
   * @param {object} configs
   * @return {Config} self
   */
  configureDefaults(configs) {
    extend(true, this.defaults, configs);

    return this;
  }

  /**
   * Register configuration for the view manager to use later.
   *
   * @param {string} name of the namespace
   * @param {object} [configs={}] configs used to resolve template paths
   *
   * @returns {Config}
   */
  configureNamespace(name, configs = {map: {}}) {
    let namespace = Object.create(this.fetch(name));
    let config    = {
      [name]: namespace
    };

    extend(true, namespace, configs);
    this.configure(config);

    return this;
  }

  /**
   * extends the configuration object. When writing to the namespaces
   * object it is best to use this function.
   *
   * @param {object} config
   * @returns {Config} self
   */
  configure(config) {
    extend(true, this.namespaces, config);

    return this;
  }

  /**
   * convenient for getting a (nested) property in the namespaces
   * object.
   *
   * @param {...string} properties when prop is falsy it returns the whole
   * namespaces object
   *
   * @returns {*} the value of that property or undefined
   */
  fetch(properties) {
    if (!this.namespaces[properties]) {
      /* if namespace is not defined it creates a new object with proto defaults  */
      return this.defaults;
    }

    let result = this.namespaces;

    for (let index in arguments) {
      let key   = arguments[index];
      let value = result[key];
      if (!value) {
        return value;
      }
      result = result[key];
    }

    return result;
  }
}
