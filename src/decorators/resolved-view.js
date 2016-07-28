import {Container} from 'aurelia-dependency-injection';
import {ViewManager} from './../view-manager';
import {ResolvedViewStrategy} from './../resolved-view-strategy';
import {useViewStrategy} from 'aurelia-templating';

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
