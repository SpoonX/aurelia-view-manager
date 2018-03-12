# Usage

Aurelia plugin developers can choose to make their components css/html
framework agnostic, making it easier for contributors to add support for other
css/html frameworks or to slightly alter the style and behavior of the
components. Implementing aurelia-view-manager into your projects requires the
following steps.

## Add aurelia-view-manager as a dependency\*\*

`jspm install npm:aurelia-view-manager`

## Configure the aurelia-view-manager\*\*

What view to use for what component can be set during setup or runtime. This
example shows how it's done during config. Read more about
[configuring](configuration.md) view manager.

Let's say we made a modal plugin and our github username is `spoonx`. A good
namespace would be `spoonx/modal`. This namespace is very unlikely to collide
with other people's namespaces as their username must be unique.

```js

  export function configure(aurelia) {
    aurelia.container.get(Config).configureNamespace('spoonx/modal', {
      location: './{{framework}}/{{view}}.html'
    });

    /* other component configurations */

  }

```

By default the framework is set to bootstrap. This default can be altered. Read
more about that in the [defaults](defaults.md) section.

## Decorate your custom elements with `@resolvedView`

We have defined the location of the view in the configure function of our
fictional modal plugin. [@resolvedView](decorator.md) will use these configurations to resolve
where the view is located based on those configurations.

```js
@resolvedView('spoonx/modal', 'modal')
export class ModalCustomElement {
  /* code */
}
```

