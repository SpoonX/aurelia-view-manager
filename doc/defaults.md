# Defaults

Sane defaults are nice. Sane and configurable defaults are nicer. Aurelia
view manager has the reserved namespace `defaults`. The properties defined in
this namespace are used by other namespaces when the other namespaces do not
have that property defined on them. Understanding this is essential if you want
to keep your configurations concise.

The following defaults are defined in the `defaults` namespace.

```js
{
  location : '{{framework}}/{{view}}.html',
  framework: 'bootstrap',
  map      : {}
}
```

Without having altered the configurations at all, let's see what path the
following would resolve to.

> The `viewManager` in this example is an injected instance of the ViewManager class.

```js

  viewManager.resolve('my/namespace', 'hello-world') === 'bootstrap/hello-world.html' // => true;

```

Now let's overwrite some configurations and see how we can alter the path.

```js
  viewManagerConfig.configureNamespace('defaults', {
    location: 'views/{{framework}}/{{view}}.html',
    device  : 'mobile'
  });

  viewManager.resolve('my/namespace', 'hello-world') === 'views/bootstrap/hello-world.html' // => true;
```

## Conclusion

Defaults are used whenever the namespace is not configured.

It's possible to overwrite the default defaults so it follows your project's
conventions.
