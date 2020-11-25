# Archived

It was fun while it lasted, but we have to stop maintaining these repositories. We haven't used these projects for quite some time and maintaining them is becoming harder to do.

You deserve better, and for that reason we've decided to archive some repositories, which includes this one.

Feel free to fork and alter the repositories, and go forth making awesome stuff.

# aurelia-view-manager

[![Build Status](https://travis-ci.org/SpoonX/aurelia-view-manager.svg?branch=master)](https://travis-ci.org/SpoonX/aurelia-view-manager)
[![Gitter](https://img.shields.io/gitter/room/nw
s/nw.js.svg?maxAge=2592000?style=plastic)](https://gitter.im/SpoonX/Dev)

> Enables the support of multiple rendering strategies and configuring view
> strategies at run time.

## Used by

Following plugins need an installation of aurelia-view-manager:

* [aurelia-pager](https://www.npmjs.com/package/aurelia-pager).
* [aurelia-datatable](https://www.npmjs.com/package/aurelia-datatable).
* [aurelia-form](https://www.npmjs.com/package/aurelia-form).

## Installation

### Aurelia-cli

Run `npm i aurelia-view-manager --save` from your project root.

Aurelia-view-manager uses [extend](https://www.npmjs.com/package/extend), so add the following to the `build.bundles.dependencies` section of `aurelia-project/aurelia.json`:

```js
"dependencies": [
   "extend",
   "aurelia-view-manager",
   //...
 ],
```

### Jspm

Run `jspm i aurelia-view-manager` from your project root.

And add following to the `bundles.dist.aurelia.includes` section of `build/bundles.js`:

```js
  "aurelia-view-manager",
```

### Webpack

Run `npm i aurelia-view-manager --save` from your project root.

And add `aurelia-view-manager` in the `coreBundles.aurelia` section of your `webpack.config.js`.

## Documentation

You can find usage examples and the documentation at the [aurelia-view-manager-docs](http://aurelia-view-manager.spoonx.org/).

The [changelog](doc/changelog.md) provides you with information about important changes.

## Contributing

Report bugs, request features, send pull requests for fixes and features and
read the [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

[MIT](./LICENSE)
