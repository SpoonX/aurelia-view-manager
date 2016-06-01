import extend from 'extend';

export class Config {

  /***
   * these can be overwritten with the configureDefaults function
   */

  constructor() {
    this.defaults = {
      location: '{{framework}}/{{view}}.html',
      framework: 'bootstrap'};
    this.configurations = {}; //stores the namespaced configs
    this.configurations.defaults = this.defaults; /* have the defaults object showup like a namespaces in the configurations object */
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
   * @param {object} [def={}] configs used to resolve template paths
   *
   * @returns {Config}
   */
  register(name, configs) {
    let namespace = this.get(name) || Object.create(this.defaults);
    extend(true, namespace, configs || {});
    let config = {};
    config[name] = namespace;
    this.configure(config);
    return this;
  }

  /**
   * extends the configuration object. When writing to the configurations
   * object it is best to use this function.
   *
   * @param {object} config
   * @returns {Config} self
   */
  configure(config) {
    extend(true, this.configurations, config);
    return this;
  }

  /**
   * convenient for getting a (nested) property in the configurations
   * object.
   *
   * @param {...string} props when prop is falsy it returns the whole
   * configurations object
   *
   * @returns {*} the value of that property
   */
  get(props) {
    let result = this.configurations;
    for (let index in arguments) {
      let key = arguments[index];
      let value = result[key];
      if (!value) { return value; } //if undefined return it
      result = result[key];
    }
    return result;
  }
}
