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

## Contributing

Report bugs, request features, send pull requests for fixes and features and
read the [CONTRIBUTING.md](./CONTRIBUTING.md)

## License
[MIT](./LICENSE)
