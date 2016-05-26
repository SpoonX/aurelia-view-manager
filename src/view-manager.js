import {inject} from 'aurelia-framework'; /* only import aurelia-di */
import {Config} from './config';
import mustache from 'mustache';


@inject(Config)
export class ViewManager {

  constructor(config) {
    this.config = config;
  }

  /**
   * calculates the location
   * @param {string} namespace a string that represents a namespace(plugin)
   * @param {string} view a string that equals the template filename.
   * @returns {string} represents the path of the view
   */
  resolve(namespace, view) {
    let config = Object.create(this.config.getConfigs(namespace));

    config.view = view;

    /* default location of the namespace or the default */
    let path = config.location;

    /* if defined, use the location of the view*/
    if (config.map && config.map[view]) {
      path = config.map[view];
    }

    return mustache.render(config.location, config);
  }
}
