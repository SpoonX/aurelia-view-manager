# Usage

Aurelia plugin developers can choose to make their components css/html  
framework agnostic, making it easier for contributors to add support for other  
css/html frameworks or to slightly alter the style and behavior of the  
components. Implementing aurelia-view-manager into your projects requires the  
following steps.

## 1 add aurelia-view-manager as a dependency\*\*

`jspm install npm:aurelia-view-manager`

## 2 configure the aurelia-view-manager\*\*

Aurelia-view-manager uses a simple javascript string to namespace the different  
plugins. The namespace is used to prevent developers from overwritting other  
developer's aurelia-view-manager configurations. It also enables users of your  
plugin to overwrite your plugins view-manager's configurations.

Let's say we made a modal plugin and our github username is `spoonx`. A good  
namespace would be `spoonx/modal`. This namespace is very unlikely to collide  
with other people's namespaces as their username must be unique.

Now that we have a namespace we can start configuring.

```js
import {Config as ViewManagerConfig} from 'aurelia-view-manager';

    viewManagerConfig.configureNamespace('spoonx/modal', {
      map: {
        modal: ./views/{{framework}}.html
      }
    });
```

We are not setting the framework. There is a `default` namespace which contains  
the framework. This causes the `spoonx/modal` configurations to default to the  
framework property's value of the `defaults` framework. Users of your plugin  
now only have to set the framework property of the `defaults` configurations to  
'bootstrap' and it will load the view that matches the map.modal "path  
template"

## 3 Decorate your custom elements with `@resolvedView`

```js
@resolvedView('spoonx/modal', 'modal')
    export class ModalCustomElement {
      /* code */
    }
```

Aurelia-view-manager will resolve the view of the component when it is  
instantiated. It will use the `spoonx/modal` configurations first and if the  
property it is trying to fetch is not defined on it, it will check the defaults  
configurations for that property's value.

This enables users to overwrite defaults and configure namespace specifically.

