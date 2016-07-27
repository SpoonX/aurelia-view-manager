import * as exports from '../../dist/amd/aurelia-view-manager';

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
