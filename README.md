# aurelia-view-manager

[![Build Status](https://travis-ci.org/SpoonX/aurelia-view-manager.svg?branch=master)](https://travis-ci.org/SpoonX/aurelia-view-manager)
[![Gitter](https://img.shields.io/gitter/room/nw
s/nw.js.svg?maxAge=2592000?style=plastic)](https://gitter.im/SpoonX/Dev)

> Enables the support of multiple rendering strategies and configuring view
> strategies at run time.

## Installation

### Jspm/SytemJs

Run `jspm i aurelia-view-manager` from your project root.

### Webpack

Run `npm i aurelia-view-manager` from your project root.

Aurelia-view-manager has submodules (currently only the authFilter). So you need to add it to the AureliaWebpackPlugin includeSubModules list.

```js
AureliaWebpackPlugin({
    includeSubModules: [
      { moduleId: 'aurelia-view-manager' }
    ]
  }),
```

## Documentation

You can find usage examples and the documentation at the [aurelia-view-manager-docs](http://aurelia-view-manager.spoonx.org/).

The [changelog](doc/changelog.md) provides you with information about important changes.

## Usage

Let's say you are writing an modal plugin for aurelia. You might use
`bootstrap` but others might prefer `foundation`. View manager enables developers to
support multiple css/html frameworks or devices while reusing the view models
they already wrote. Just follow these steps to make your plugin html/css
framework independent.

### Configration

> example taken from `aurelia-form`

```js
import {Config as ViewManagerConfig} from 'view-manager';

@inject(ViewManagerConfig)
export class Config {
  constructor(viewManagerConfig) {

    viewManagerConfig.configureNamespace('aurelia-form', {
      base: './frameworks/{{framework}}',
      location: '{{base}}/{{view}}.html',
      framework: 'bootstrap',
      map: {

        /* custom elements with a view model do not end with .html */
        actions: '{{base}}/actions',
        collection: '{{base}}/collection',

        text: '{{base}}/input.html',
        button: '{{base}}/input.html',
        color: '{{base}}/input.html',
        date: '{{base}}/input.html',
        datetime: '{{base}}/input.html',
        'datetime-local': '{{base}}/input.html',
        email: '{{base}}/input.html',
        month: '{{base}}/input.html',
        number: '{{base}}/input.html',
        password: '{{base}}/input.html',
        range: '{{base}}/input.html',
        search: '{{base}}/input.html',
        tel: '{{base}}/input.html',
        time: '{{base}}/input.html',
        url: '{{base}}/input.html',
        week: '{{base}}/input.html'
      }
    });
  }
}
```

One can also imagine the use-case where they would want to develop slightly
different views for different view widths or devices. View-manager allows one to
support this feature during application runtime.

```js

  viewManagerConfig.configureNamespace('aurelia-form', {
    device: 'mobile',
    framework: 'bootstrap',
    location: '{{device}}/{{view}}.html'
  });

```

At a point in your application lifecycle you can change the `device` configuration
to `desktop` by doing the following.

```js
  viewManagerConfig.configureNamespace('aurelia-form', {
    device: 'desktop'
  });
```

The view manager will now look in the `desktop` folder for it's templates.

### Decorator *resolvedView(namespace, view)*

This is where everything should start making sense. The `@resolvedView` enables
one to write a view model, and dynamically change the view whenever he she want
using the view manager's configuration methods.


```js

@resolvedView('modal', 'modal')
class ModalCustomElement {
  /* code */
}
```

Assuming that you have the following configurations, the `getViewStrategy`
method on the `ModalCustomElement`'s class should return
`./views/foundation/modal.html`

> The configuration for a modal.

```js
viewManagerConfig.configureNamespace('modal', {
  base: './views/{{framework}}',
  map: {
    modal: '{{base}}/{{view}}.html'
  }
});
```
