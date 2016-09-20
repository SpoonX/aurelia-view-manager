import {Config} from './config';

export function configure(aurelia, configOrConfigure) {
  let config = aurelia.container.get(Config);

  if (typeof configCallback === 'function') {
    return configOrConfigure(config);
  }
  config.configure(configOrConfigure);
}
