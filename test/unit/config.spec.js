import {Config} from '../../src/config';
import extend from 'extend';

describe('config', () => {
  let config;

  beforeEach(function() {
    config = new Config();
  });

  it('uses the same defaults object in configurations', () => {
    expect(config.defaults).toBe(config.namespaces.defaults);
  });

  it('can get defaults and has sane defaults', () => {
    let defaults = {
      location: '{{framework}}/{{view}}.html',
      framework: 'bootstrap',
      map: {}
    };
    expect(config.fetch('defaults')).toEqual(defaults);
  });

  it('allows users to register under a namespace', () => {
    let components = {
      one: 1,
      two: 2
    };
    /* chainable */
    expect(config.configureNamespace('form', components)).toBe(config);
    expect(config.fetch('form')).toEqual(extend({}, config.defaults, components));
  });

  it('can set defaults', () => {
    let defaults = {
      location: '{{framework}}/{{view}}.html',
      map: {},
      framework: 'bootstrap',
      boo: 'two'
    };

    /* chainable */
    expect(config.configureDefaults(defaults)).toEqual(config);
    expect(config.fetch('defaults')).toEqual(defaults);
  });

  it('gets the values of the new configure object', () => {
    config.configureNamespace('form', {
      map: {
        text: './path.html'
      }
    });

    expect(config.namespaces.form.map.text).toBe('./path.html');

    config.configureNamespace('form', {
      map: {
        text: './altered.html'
      }
    });

    expect(config.namespaces.form.map.text).toBe('./altered.html');
  });
});
