# Decorator *resolvedView(namespace, view)*

Leverage the power of `aurelia-view-manager` with the `@resolvedView`
decorator. Finally all that configuring will pay off and your custom element
will be using the view you told it to use.

```js

    /* modal.js */

    @resolvedView('spoonx/modal', 'modal') // <- wow! ;)
    class ModalCustomElement {
      /* code */
    }

    /* index.js */

    export function configure(app) {
      let viewManagerConfig = app.container.get(ViewManagerConfig);
      viewManagerConfig.configureNamespace('spoonx/modal', {
        location: './views/{{framework}}/{{view}}.html'
      });
    }

    /* main.js *.

    export function configure(aurelia) {
      aurelia.use

        .plugin('aurelia-view-manager', view => {
          view.configureDefaults({
            framework: 'foundation'
          });
        })

        .plugin('spoonx-modal', modal => {
          /* ... */
        })

        /* ... */
    }
```

Assuming that you have the following configurations, the custom element will
look for a view in `./views/foundation/modal.html`.
