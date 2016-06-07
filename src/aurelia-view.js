import {Config} from './config';
import {ViewManager} from './view-manager';
import {resolvedView} from './decorators/resolved-view';

function configure(aurelia, configCallback) {
  if (typeof configCallback === 'function') {
    let config = aurelia.container.get(Config);

    configCallback(config);
  } else {
    console.warn('aurelia-form', 'config takes a function');
  }
}

export {
  configure,
  resolvedView,
  ViewManager,
  Config
};
