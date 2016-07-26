import {Container} from 'aurelia-dependency-injection';
import {ViewManager} from '../../src/view-manager';
import {Config} from '../../src/config';

describe('ViewManager', () => {
  let viewManager;
  let config;

  beforeEach(() => {
    new Container().makeGlobal();
    viewManager = Container.instance.get(ViewManager);
    config      = Container.instance.get(Config);
  });

  it('allows one to set the defaults', () => {
    // change the default namespace config and chain */
    expect(config.configureDefaults({
      location: 'my/views/{{view}}/{{framework}}.html',
      framework: 'plmr',
      map: {}
    })).toBe(config);

    /* check if new defaults are used when resolving view */
    expect(viewManager.resolve('undefined-namespace', 'undefined-view')).toBe(
      'my/views/undefined-view/plmr.html'
    );
  });

  it('uses the passed view to populate the view placeholder', () => {
    config.configureNamespace('form', {
      location: '{{framework}}/{{style}}/views/{{view}}.html',
      framework: 'bootstrap',
      style: 'minimal'
    });

    expect(viewManager.resolve('form', 'page')).toBe('bootstrap/minimal/views/page.html');
  });

  it('resolves namespace views', () => {
    expect(
      viewManager.resolve('my-namespace', 'my-template')
    ).toBe(
      'bootstrap/my-template.html'
    );
  });

  it('resolves a re-mapped view', () => {
    config.configureNamespace('namespace', {
      map: {
        text: 'input.html'
      }
    });

    expect(viewManager.resolve('namespace', 'text')).toBe('input.html');
  });
});
