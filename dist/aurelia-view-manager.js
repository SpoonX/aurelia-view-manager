import extend from 'extend';
import {getLogger} from 'aurelia-logging';
import {inject} from 'aurelia-dependency-injection';
import {viewStrategy,useViewStrategy} from 'aurelia-templating';
import {relativeToFile} from 'aurelia-path';

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
    let namespace = this.fetch(name);
    extend(true, namespace, configs);

    this.configure({[name]: namespace});

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
    let args   = Array.from(arguments);

    for (let index in args) {
      let key   = args[index];
      let value = result[key];
      if (!value) {
        return value;
      }
      result = result[key];
    }

    return result;
  }
}

export function configure(aurelia, configOrConfigure) {
  let config = aurelia.container.get(Config);

  if (typeof configCallback === 'function') {
    return configOrConfigure(config);
  } 
  
  config.configure(configOrConfigure);
}

@inject(Config)
export class ViewManager {

  constructor(config) {
    this.config = config;
  }

  /**
   * returns the location of a template as a string.
   *
   * @param {string} [namespace] a string that represents a namespace(plugin)
   * when not defined it defaults to the "global" configurations.
   *
   * @param {string} view a string that equals the template filename.
   * @returns {string} represents the path of the view
   */
  resolve(namespace, view) {
    if (!namespace || !view) { /* both arguments are required */
      throw new Error(
        `Cannot resolve without namespace and view. Got namespace "${namespace}" and view "${view}" in stead`
      );
    }

    let namespaceOrDefault  = Object.create(this.config.fetch(namespace));
    namespaceOrDefault.view = view;

    let location            = (namespaceOrDefault.map || {})[view] || namespaceOrDefault.location;

    return render(location, namespaceOrDefault);
  }
}

/**
 * returns the rendered string based on a template with mustaches and an object
 *
 * @param {string} template
 * @param {object} data
 *
 * @returns {string}
 */
function render(template, data) {
  let result = template;

  for (let key in data) {
    let regexString = ['{{', key, '}}'].join('');
    let regex       = new RegExp(regexString, 'g');
    let value       = data[key];
    result          = result.replace(regex, value);
  }

  /* performs the rendering of nested templates */
  if (template !== result) {
    result = render(result, data);
  }

  return result;
}

/**
* A view strategy that loads a view based on namespace and view name registered with the ViewManager
*/
@viewStrategy()
export class ResolvedViewStrategy {
  /**
  * Creates an instance of ResolvedViewStrategy.
  * @param namespace The namespace of the view.
  * @param view The name of the view.
  */
  constructor(namespace: string, view: string) {
    this.namespace = namespace;
    this.view = view;
  }

  /**
  * Loads a view factory.
  * @param viewEngine The view engine to use during the load process.
  * @param compileInstruction Additional instructions to use during compilation of the view.
  * @param loadContext The loading context used for loading all resources and dependencies.
  * @return A promise for the view factory that is produced by this strategy.
  */
  loadViewFactory(viewEngine: ViewEngine, compileInstruction: ViewCompileInstruction, loadContext?: ResourceLoadContext): Promise<ViewFactory> {
    let viewManager = viewEngine.container.get(ViewManager);
    let path        = viewManager.resolve(this.namespace, this.view);

    compileInstruction.associatedModuleId = this.moduleId;
    return viewEngine.loadViewFactory(this.moduleId ? relativeToFile(path, this.moduleId) : path, compileInstruction, loadContext);
  }
}

/**
 * Decorates a custome element class in a way that it loads it's view from
 * elsewehere
 *
 * @param {string} namespace used to seperate different view configurations
 * @param {string} view used to find the value that belongs to the view
 * @returns {function} that takes the target and sets the view strategy on the element
 */
export function resolvedView(namespace, view) {
  return useViewStrategy(new ResolvedViewStrategy(namespace, view));
}
