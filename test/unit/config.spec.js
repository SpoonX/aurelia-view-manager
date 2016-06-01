import {Config} from '../../src/config';

describe('config', () => {

  let config;

  beforeEach(function() {
    config = new Config();
  });

  it('uses the same defaults object in configurations', () => {
    expect(config.defaults).toBe(config.configurations.defaults);
  });

  it('can get defaults and has sane defaults', () => {
    let defaults = {
      location: '{{framework}}/{{view}}.html',
      framework: 'bootstrap'
    };
    expect(config.get('defaults')).toEqual(defaults)
  });

  it('allows users to register under a namespace', () => {
    let components = {
      one: 1,
      two: 2,
    };
    // it chains
    expect(config.register('form', components)).toBe(config);
    expect(config.get('form')).toEqual(components);
  });

  it('can set defaults', () => {
    let defaults = {
      boo: 'two',
      location: '{{framework}}/{{view}}.html',
      framework: 'bootstrap'
    };

    expect(config.configureDefaults({boo: 'two'})).toEqual(config); //returns self
    expect(config.get('defaults')).toEqual(defaults);
  });

});
