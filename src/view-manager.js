import {inject} from 'aurelia-dependency-injection';
import {Config} from './config';

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

    let location            = namespaceOrDefault.map[view] || namespaceOrDefault.location;

    return render(location, namespaceOrDefault);
  }
}

/**
 * returns the rendered string based on a template with mustaches and an object
 *
 * @param {string} template
 * @param {object} data
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

  return result;
}
