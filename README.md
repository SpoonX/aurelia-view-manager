# aurelia-view-manager

> Enables the support of multiple rendering strategies and configuring view
> strategies at run time.

This library is part of the [Aurelia](http://www.aurelia.io/) platform and implements a modern databinding library for JavaScript and HTML.

> To keep up to date on [Aurelia](http://www.aurelia.io/), please visit and subscribe to [the official blog](http://blog.durandal.io/) and [our email list](http://durandal.us10.list-manage1.com/subscribe?u=dae7661a3872ee02b519f6f29&id=3de6801ccc). We also invite you to [follow us on twitter](https://twitter.com/aureliaeffect). If you have questions, please [join our community on Gitter](https://gitter.im/aurelia/discuss). If you would like to have deeper insight into our development process, please install the [ZenHub](https://zenhub.io) Chrome or Firefox Extension and visit any of our repository's boards. You can get an overview of all Aurelia work by visiting [the framework board](https://github.com/aurelia/framework#boards).

## Building The Code

To build the code, follow these steps.

1. Ensure that [NodeJS](http://nodejs.org/) is installed. This provides the platform on which the build tooling runs.
2. From the project folder, execute the following command:

  ```shell
  npm install
  ```
3. Ensure that [Gulp](http://gulpjs.com/) is installed. If you need to install it, use the following command:

  ```shell
  npm install -g gulp
  ```
4. To build the code, you can now run:

  ```shell
  gulp build
  ```
5. You will find the compiled code in the `dist` folder, available in three module formats: AMD, CommonJS and ES6.

6. See `gulpfile.js` for other tasks related to generating the docs and linting.

## Running The Tests

To run the unit tests, first ensure that you have followed the steps above in order to install all dependencies and successfully build the library. Once you have done that, proceed with these additional steps:

1. Ensure that the [Karma](http://karma-runner.github.io/) CLI is installed. If you need to install it, use the following command:

  ```shell
  npm install -g karma-cli
  ```
2. Ensure that [jspm](http://jspm.io/) is installed. If you need to install it, use the following commnand:

  ```shell
  npm install -g jspm
  ```
3. Install the client-side dependencies with jspm:

  ```shell
  jspm install
  ```

4. You can now run the tests with this command:

  ```shell
  gulp test
  ```

## Usage

Let's say you are writing an modal plugin for aurelia. You might use
`bootstrap` but others might prefer `foundation`. View manager enables developers to
support multiple css/html frameworks or devices while reusing the view models
they already wrote. Just follow these steps to make your plugin html/css
framework independent.

### Configration

> example taken from `aurelia-form`

```javascript
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

```javascript

  viewManagerConfig.configureNamespace('aurelia-form', {
    device: 'mobile',
    framework: 'bootstrap',
    location: '{{device}}/{{view}}.html'
  });

```

At a point in your application lifecycle you can change the `device` configuration
to `desktop` by doing the following.

```javascript
  viewManagerConfig.configureNamespace('aurelia-form', {
    device: 'desktop'
  });
```

The view manager will now look in the `desktop` folder for it's templates.

### Decorator *resolvedView(namespace, view)*

This is where everything should start making sense. The `@resolvedView` enables
one to write a view model, and dynamically change the view whenever he she want
using the view manager's configuration methods.


```javascript

@resolvedView('modal', 'modal')
class ModalCustomElement {
  /* code */
}
```

Assuming that you have the following configurations, the `getViewStrategy`
method on the `ModalCustomElement`'s class should return
`./views/foundation/modal.html`

> The configuration for a modal.

```javascript
viewManagerConfig.configureNamespace('modal', {
  base: './views/{{framework}}',
  map: {
    modal: '{{base}}/{{view}}.html'
  }
});
```
