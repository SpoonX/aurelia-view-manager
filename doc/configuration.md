# Configuration

Aurelia view manager mainly allows one to configure the location of a custom
element's view. Aurelia view manager is therefore a configuration plugin
combined with some logic for fetching the correct view based on those
configurations.

Configuration is done using the Config of aurelia-view-manager. It exposes
several methods. All these methods do not overwrite, but merge the config
object passed with the existing configurations.

## Properties

A config object has two special property names `location`, `map` and `view`. The
location property contains the information necessary to render the path. The
view property should not be used in the configuration object. It represents the
value passed to the resolve method. You can read more about the resolve method
in the [usage](usage.md) section.

### View

Do not define the view in your configuration object. It's a dynamic value which
is the value passed as second argument in the resolvedView decorator, and in the
resolve method on the ViewManager class. e.g.

```js
@resolvedView('my/namespace', 'checkbox')
@customElement('my-checkbox')
class CheckBox {...}
```

In this case the value of view would be checkbox.

### Location

Location allows you to define the actual path of the view. The
[default](defaults.md) location property is `{{framework}}{{view}}.html`. With
the default configurations we would get the following path when resolving
a view.

```js
  viewManager.resolve('my/component', 'datepicker') === 'bootstrap/datepicker.html' // => true
```

You might notice `bootstrap`. We at spoonx have chosen this default which can
be overwritten easily. Read more about how to do that in the
[defaults](defaults.md) section.

### Map

The map property is handy for when you want to define a path for a specific
view. An example of when this might be handy is when
[overwritting](overwritting.md) specific elements. View manager will check if
a component has a specific path defined. If not it will use the location
property of the namespace. e.g.

```js
config.configureNamespace('spoonx/form', {

  // most of the components are defined here
  location: 'components/form/{{view}}.html',

  // our confirm element is defined somewhere different.
  map: {
    confirm: 'component/custom/confirm.html'
  }

});
```

When resolving the `spoonx/form`'s confirm view it will try and load the
component/custom/confirm.html template

## Methods

The `Config` class of aurelia-view-manager gives you several methods to
configure defaults, a single namespace or multiple namespaces.

It might be handy to know that the [default](defaults.md) configurations are defined on the
`defaults` namespace.

### configureDefaults(configs)

Altering your defaults allows you to determine your own convention.

> config is an injected instance of the `Config` class

```js

  config.configureDefaults({
    location: 'my/new/location/{{view}}.html'
  });

```

### configureNamespace(name, configs = {map: {}})

Same as the above but instead you can give the name of the namespace you want
configure.

```js

  config.configureNamespace('spoonx/autocomplete', {
    location: 'components/{{framework}}/autocomplete.html'
  });

```

### configure(config)

```js
  config.configure({
    'spoonx/autocomplete': {
      location: 'components/{{framework}}/autocomplete.html'
    }
  });
```

## Conclusion

The location property uses a mustache looking string to define the path of
components.

The view property is dynamic and when following convention it should have the
same name as the component.

The default configurations are defined on the `defaults` namespace.

When a namespace is not, or partially configured, it defaults to the default
values.

