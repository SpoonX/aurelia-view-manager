import * as exports from '../../src/aurelia-view';

describe('aurelia-view-manager', () => {
  it('exports all the required things', () => {
    /* helps with checking backward compatibility */
    expect(Object.keys(exports)).toEqual(jasmine.arrayContaining([
      'configure',
      'resolvedView',
      'ViewManager',
      'Config'
    ]));
  });
});
