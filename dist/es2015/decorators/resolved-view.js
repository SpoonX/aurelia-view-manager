import { Container } from 'aurelia-dependency-injection';
import { ViewManager } from './../view-manager';
import { RelativeViewStrategy, useViewStrategy } from 'aurelia-templating';

export function resolvedView(namespace, view) {
  let viewManager = Container.instance.get(ViewManager);
  let path = viewManager.resolve(namespace, view);

  return useViewStrategy(new RelativeViewStrategy(path));
}