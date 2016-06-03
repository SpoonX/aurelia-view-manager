import {Container} from 'aurelia-dependency-injection';
import {ViewManager} from './../view-manager';
import {useView} from 'aurelia-templating';

export function resolvedView(namespace, view) {
  return function resolvedViewDecorator(target) {
    let viewManager        = Container.instance.get(ViewManager);

    target.prototype.getViewStrategy = viewManager.resolve.bind(viewManager, namespace, view);

    useView(viewManager.resolve(namespace, view))(target);

    return target;
  };
}
