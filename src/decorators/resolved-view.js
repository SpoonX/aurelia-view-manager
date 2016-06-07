import {Container} from 'aurelia-dependency-injection';
import {ViewManager} from './../view-manager';
import {RelativeViewStrategy, useViewStrategy} from 'aurelia-templating';

/**
 * Decorates a custome element class in a way that it loads it's view from
 * elsewehere
 *
 * @param {string} namespace used to seperate different view configurations
 * @param {string} view used to find the value that belongs to the view
 * @returns {function} that takes the target and sets the view strategy on the element
 */
export function resolvedView(namespace, view) {
  let viewManager = Container.instance.get(ViewManager);
  let path        = viewManager.resolve(namespace, view);

  return useViewStrategy(new RelativeViewStrategy(path));
}
