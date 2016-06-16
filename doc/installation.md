# Installation

## Jspm/SytemJs

Run `jspm i aurelia-view-manager` from your project root.

## Webpack

Run `npm i aurelia-view-manager` from your project root.

Aurelia-view-manager has submodules (currently only the authFilter). So you need to add it to the AureliaWebpackPlugin includeSubModules list.

```js
AureliaWebpackPlugin({
    includeSubModules: [
      { moduleId: 'aurelia-view-manager' }
    ]
  }),
```
