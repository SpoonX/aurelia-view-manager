import {Config} from './config';
import {getLogger} from 'aurelia-logging';

export function configure(aurelia, configCallback) {
  if (typeof configCallback === 'function') {
    let config = aurelia.container.get(Config);
    configCallback(config);
  } else if (configCallback) {
    getLogger('aurelia-view').warn('config takes a function');
  }
}
