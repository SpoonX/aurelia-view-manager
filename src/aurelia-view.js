import {Config} from './config';
import {ViewManager} from './view-manager';
import {resolvedView} from './decorators/resolved-view';

function configure(aurelia, configCallback) {
  let config = aurelia.container.get(Config);

  configCallback(config);
}

export {
  configure,
  resolvedView,
  ViewManager,
  Config
};
