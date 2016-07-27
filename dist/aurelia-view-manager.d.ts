import extend from 'extend';
import {getLogger} from 'aurelia-logging';
import {inject,Container} from 'aurelia-dependency-injection';
import {RelativeViewStrategy,useViewStrategy} from 'aurelia-templating';

export declare class Config {
  
  /* these can be overwritten with the configureDefaults function */
  defaults: any;
  
  /* stores the namespaced configs */
  namespaces: any;
  constructor();
  
  /**
     * extends the defaults object
     * @param {object} configs
     * @return {Config} self
     */
  configureDefaults(configs?: any): any;
  
  /**
     * Register configuration for the view manager to use later.
     *
     * @param {string} name of the namespace
     * @param {object} [configs={}] configs used to resolve template paths
     *
     * @returns {Config}
     */
  configureNamespace(name?: any, configs?: any): any;
  
  /**
     * extends the configuration object. When writing to the namespaces
     * object it is best to use this function.
     *
     * @param {object} config
     * @returns {Config} self
     */
  configure(config?: any): any;
  
  /**
     * convenient for getting a (nested) property in the namespaces
     * object.
     *
     * @param {...string} properties when prop is falsy it returns the whole
     * namespaces object
     *
     * @returns {*} the value of that property or undefined
     */
  fetch(properties?: any): any;
}
export declare function configure(aurelia?: any, configCallback?: any): any;
export declare class ViewManager {
  constructor(config?: any);
  
  /**
     * returns the location of a template as a string.
     *
     * @param {string} [namespace] a string that represents a namespace(plugin)
     * when not defined it defaults to the "global" configurations.
     *
     * @param {string} view a string that equals the template filename.
     * @returns {string} represents the path of the view
     */
  resolve(namespace?: any, view?: any): any;
}

/**
 * Decorates a custome element class in a way that it loads it's view from
 * elsewehere
 *
 * @param {string} namespace used to seperate different view configurations
 * @param {string} view used to find the value that belongs to the view
 * @returns {function} that takes the target and sets the view strategy on the element
 */
export declare function resolvedView(namespace?: any, view?: any): any;