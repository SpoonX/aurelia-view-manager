import {ResolvedViewStrategy} from './../resolved-view-strategy';
import {useViewStrategy} from 'aurelia-templating';

/**
 * Decorates a custom element class in a way that it loads it's view from
 * elsewhere
 *
 * @param {string} namespace used to separate different view configurations
 * @param {string} view used to find the value that belongs to the view
 * @returns {function} that takes the target and sets the view strategy on the element
 */
export function resolvedView(namespace, view) {
  return useViewStrategy(new ResolvedViewStrategy(namespace, view));
}
