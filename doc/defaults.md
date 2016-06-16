# Defaults

Sane defaults are nice. Sane and configurable defaults are nicer. Aurelia
view manager has the reserved namespace `defaults`. The properties defined in
this namespace are used by other namespaces when the other namespaces do not
have that property defined on them. Understanding this is essential if you want
to keep your configurations concise.

> We are going to change the default location view manager is going to resolve
> to and we are going to define some default properties..

```js
    viewManagerConfig.configureNamespace('defaults', {
      device: getDeviceType(),
      permissions: 'user'
    });
```

For all namespace configurations that do not have a device specified on their
configurations aurelia-view-manager will user the ones defined in the defaults.
If these are also not defined it will return the javascript `undefined`.
