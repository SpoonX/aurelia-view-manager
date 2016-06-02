var _dec, _class;

import { inject } from 'aurelia-dependency-injection';
import { Config } from './config';

export let ViewManager = (_dec = inject(Config), _dec(_class = class ViewManager {

  constructor(config) {
    this.config = config;
  }

  resolve(namespace, view) {
    if (!namespace || !view) {
      throw new Error(`Cannot resolve without namespace and view. Got namespace "${ namespace }" and view "${ view }" in stead`);
    }

    let config = Object.create(this.config.fetch(namespace));
    config.view = view;

    return render(config.location, config);
  }
}) || _class);

function render(template, data) {
  let result = template;

  for (let key in data) {
    let regexString = ['{{', key, '}}'].join('');
    let regex = new RegExp(regexString, 'g');
    let value = data[key];
    result = result.replace(regex, value);
  }

  return result;
}