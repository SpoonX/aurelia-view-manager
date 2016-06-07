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

## Setup

Aurelia-view requires some steps to get it setup.

1. Install `aurelia-view-manager` *see installation section*
2. Configure your namespace using `import {Config as ViewManagerConfig} from 'aurelia-view-manager'`
3. Decorate your custom elements with `@resolvedView` or use `viewManager.resolve('namespace', 'view')`

## Introduction

When you're introduced to aurelia the first time, you quickly learn that
a custom component has by default a view/template/html located at the same
location as its class. Good default, but what if you want different. Let's look
at the following use-case.

Let's say you are writing a custom modal plugin for aurelia. You might use
`bootstrap` but others might prefer `foundation`. Should I split up my one
project into several just support multiple view strategies? Why not reuse that
logic I defined in my class.  View manager enables developers to support
multiple css/html frameworks while reusing the view models they already wrote.

Now imagine wanting to build an application that supports multiple devices.
It is possible to define views for the different devices and let certain custom
elements load the device specific views.

```js
    viewManagerConfig.configureNamespace('aurelia-form', {
      device: 'mobile',
      location: '{{device}}/{{view}}.html'
    });
```

The view manager will now look in the `desktop` folder for it's templates. It
does not trigger a reload. Only components that are loaded afterward will start
loading the views that correspond with the altered configurations.

Or what if you have different types of users. Some of the views might have to
hide or show a bit more depending on their permissions. Aurelia-view-manager
is not a permissions system but it has your back when it comes to loading views
dynamically. You can change permission level of the user and without a hard
refresh aurelia-view-manager starts using other views that correspond with the
users permissions level.

Plugins that use aurelia view manager for getting their views enable you to
overwrite where they should get their views from. Giving you full control over
the views the plugin uses.

I know you like examples so here we go.

**register views in a plugin**

> example taken from `aurelia-form`.
> This is interesting for developers that are looking for an example on how to
> implement views in their project. It shows how a plugin should register it's
> views.

```js
    import {Config as ViewManagerConfig} from 'view-manager';

    @inject(ViewManagerConfig)
    export class Config {
      constructor(viewManagerConfig) {
        viewManagerConfig.configureNamespace('aurelia-form', {

          /* a REQUIRED and RESERVED property. Used to get the location of the view */
          location: '{{base}}/{{view}}.html',

          /* these properties are used to interpolate the location property of aurelia-form */
          base: './frameworks/{{framework}}',
          framework: 'bootstrap',

          /* you can overwrite the location default of the namespace in the map property */
          map: {

            /* property is the {{view}} and the value is the path for that specific view */
            text: '{{base}}/input.html',
            button: '{{base}}/input.html',
            color: '{{base}}/input.html',
            tel: '{{base}}/input.html',

            actions: '{{base}}/actions',
            collection: '{{base}}/collection',
          }
        });
      }
    }
```

## Defaults

Sane defaults are nice. Sane and configurable defaults are even nicer. Aurelia
view manager has a reserved namespace `defaults`. The properties defined in
this namespace are used by other namespaces when the other namespaces do not
have that property defined on them. Understanding this is essential if you want
to keep your configurations concise.

> We are going to change the default location view manager is going to resolve
> to and we are going to define some default properties..
```js
    viewManagerConfig.configureNamespace('defaults', {
      device: getDeviceType(),
      location: './views/{{view}}/{{device}}.html'
    });
```

## Overwriting

Assuming that you use aurelia-form. You have created a gorgeous datepicker and
you want to use that one instead of the one provided with aurelia-form.
Aurelia-form being a plugin that leverages view-manager, you are able to
overwrite the template it will use to render dates. You only need to know what
the namespace is. For ease of use I choose to keep it the same as the plugin's
name.

```js
    viewManagerConfig.configureNamespace('aurelia-form', {
      map: {
        /***
         * When no .html is provided it knows you are trying to load a element
         * with a view model. That feature is specific to aurelia-form.
         */
        date: 'my/views/date'
      }
    })
```

That is how you would overwrite the view of a plugin which you have installed.

**note**
Do make sure that the order in which you perform configurations is correct.
If the aurelia-form plugin is registered at a later moment in time, it will
overwrite the date property back to aurelia-form's defaults.

## Decorator *resolvedView(namespace, view)*

Leverage the power of `aurelia-view-manager` with the `@resolvedView`
decorator. Finally all that configuring will pay off and your custom element
will be using the view you told it to use.

> modal.js
```js

    /* modal.js */

    @resolvedView('modal', 'modal') // <- wow! ;)
    class ModalCustomElement {
      /* code */
    }


    /* index.js */

    export function configure(app) {
      let viewManagerConfig = app.container.get(ViewManagerConfig);
      viewManagerConfig.configureNamespace('modal', {
        base: './views/{{framework}}',
        map: {
          modal: '{{base}}/{{view}}.html'
        }
      });
    }
```

Assuming that you have the following configurations, the custom element will
look for a view in `./views/foundation/modal.html`. Cake!
