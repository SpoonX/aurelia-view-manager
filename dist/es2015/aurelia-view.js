import { Config } from './config';
import { ViewManager } from './view-manager';
import { resolvedView } from './decorators/resolved-view';
import { getLogger } from 'aurelia-logging';

function configure(aurelia, configCallback) {
  if (typeof configCallback === 'function') {
    let config = aurelia.container.get(Config);
    configCallback(config);
  } else if (configCallback) {
    getLogger('aurelia-view').warn('config takes a function');
  }
}

export { configure, resolvedView, ViewManager, Config };