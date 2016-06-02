import {Container} from 'aurelia-dependency-injection';
import {ViewManager} from './../view-manager';

export function resolvedView(namespace, view) {
  return function resolvedViewDecorator(target) {
    let viewManager        = Container.instance.get(ViewManager);
    target.getViewStrategy = viewManager.resolve(namespace, view);

    return target; /* handy for testing */
  };
}
