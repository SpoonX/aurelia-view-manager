import {resolvedView} from './../../src/decorators/resolved-view.js';
import {Container} from 'aurelia-dependency-injection';

describe('resolvedView', () => {
  let fake;

  class Fake {}

  beforeEach(() => {
    new Container().makeGlobal();
    fake = new Fake();
  });

  xit('decorates the constructor', () => {
    expect(resolvedView('namespace', 'view')(Fake).prototype.getViewStrategy).toBeDefined();
  });

  it('resolvedView is a higher order function', () => {
    expect(typeof resolvedView('namespace', 'view')).toBe('function');
  });

  xit('sets the getViewStrategy property on the instance', () => {
    expect(fake.getViewStrategy).toBeDefined();
  });
});
