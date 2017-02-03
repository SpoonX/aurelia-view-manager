# Aurelia-view-manager

[Open on github](https://github.com/SpoonX/aurelia-view-manager)

## What is aurelia-view-manager?

> Aurelia-view-manager is a plugin that allows you to configure views by key
> using variables. This allows you to offer support for more than one framework
> (bootstrap, foundation etc). It also allows the user to provide a custom view
> without forking or overriding.

When you're introduced to aurelia the first time, you quickly learn that
a custom component has by default the view located at the same
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
    viewManagerConfig.configureNamespace('spoonx/adaptive', {
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
