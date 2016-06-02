import {resolvedView} from './../../src/decorators/resolved-view.js';
import {Container} from 'aurelia-dependency-injection';

describe('resolvedView', () => {

  let container;
  let fake;
  class Fake {};

  beforeEach(() => {
    container = new Container().makeGlobal();
    fake = new Fake();
  });

  it('sets the getViewStrategy property', () => {
    /* is higher order */
    expect(fake.getViewStrategy).toBeUndefined(); /* first it is undefined */
    expect(typeof resolvedView('namespace', 'view')).toBe('function'); /* then it is set */
    expect(resolvedView('namespace', 'view')(fake).getViewStrategy).toBeDefined();
  });
});

