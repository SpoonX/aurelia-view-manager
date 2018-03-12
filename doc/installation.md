# Installation

## Jspm/SytemJs

Run `jspm i aurelia-view-manager` from your project root and add it to your bundle configuration.

## Webpack

Run `npm i aurelia-view-manager --save` from your project root and add it to your bundle configuration.

## Requirejs

Run `npm i aurelia-view-manager --save` from your project root.

Add to the `build.bundles.dependencies` section of `aurelia_project/aurelia.json`:

```
    "extend",
    "aurelia-view-manager",
```

## Register plugin

After installing `aurelia-view-manager` you should not forget to register it as
a plugin in your application.

```js

  .plugin('aurelia-view-manager')

```
