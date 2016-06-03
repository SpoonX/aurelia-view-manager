import {resolvedView} from './../../src/decorators/resolved-view.js';
import {ViewManager} from './../../src/view-manager';
import {Container} from 'aurelia-dependency-injection';

describe('resolvedView', () => {

  let container;
  let fake;

  class Fake {}

  beforeEach(() => {
    container = new Container().makeGlobal();
    fake = new Fake();
  });

  it('calls the resolve method', () => {
    let viewManager = Container.instance.get(ViewManager);
    spyOn(viewManager, 'resolve');
    resolvedView('hello', 'world')(Fake);
    expect(viewManager.resolve).toHaveBeenCalled();
  });

  it('decorates the constructor', () => {
    expect(resolvedView('namespace', 'view')(Fake).prototype.getViewStrategy).toBeDefined();
  });

  it('resolvedView is a higher order function', () => {
    expect(typeof resolvedView('namespace', 'view')).toBe('function');
  });

  it('sets the getViewStrategy property on the instance', () => {
    expect(fake.getViewStrategy).toBeDefined();
  });
});

