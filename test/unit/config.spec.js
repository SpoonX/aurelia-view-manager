import {Config} from '../../src/config';

describe('config', () => {

  let config;


  beforeEach(function() {
    config = new Config();
  });

  it('can get defaults and has sane defaults', () => {
    let defaults = {
      location: '{{framework}}/{{view}}',
      framework: 'bootstrap'
    };

    expect(config.getDefaults()).toEqual(defaults)
  });

  it('can set defaults and chains', () => {
    let defaults = {
      boo: 'two',
      location: '{{framework}}/{{view}}',
      framework: 'bootstrap'
    };
    expect(config.extendDefaults({boo: 'two'})).toEqual(config);
    expect(config.getDefaults()).toEqual(defaults);
  });

});
