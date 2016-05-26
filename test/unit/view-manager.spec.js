import {ViewManager} from '../../src/view-manager';
import {Config} from '../../src/config';

describe('ViewManager', () => {

  var viewManager;

  beforeEach(() => {

    var config = new Config();
    viewManager = new ViewManager(config);

  });

  it('works', () => {

    expect(
      viewManager.resolve('my-namespace', 'my-template')
    ).toBe(
      'bootstrap/my-template'
    );

  });

})
