# Overwriting

Assuming that you use aurelia-form. You have created a gorgeous datepicker and
you want to use that one instead of the one provided with aurelia-form.
Aurelia-form being a plugin that leverages view-manager, you are able to
overwrite the template it will use to render dates. You only need to know what
the namespace is. For ease of use I choose to keep it the same as the plugin's
name.

```js
    viewManagerConfig.configureNamespace('spoonx/form', {
      map: {
        /***
         * When no .html is provided it knows you are trying to load a element
         * with a view model. That feature is specific to aurelia-form.
         */
        date: '/my/views/date'
      }
    });
```

That is how you would overwrite the view of a plugin which you have installed.

**note**
Do make sure that the order in which you perform configurations is correct.
If the aurelia-form plugin is registered at a later moment in time, it will
overwrite the date property back to aurelia-form's defaults.
