import {Config} from './config';
import {ViewManager} from './view-manager';

function configure(aurelia, configCallback) {
  let config = aurelia.container.get(Config);

  configCallback(config);
}

export {
  configure,
  ViewManager,
  Config
};
