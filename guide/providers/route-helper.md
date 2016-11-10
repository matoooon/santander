# Provider: RouteHelper

## Descripción

Provider encargado de la construcción de rutas de la aplicación.

Componente registrado en el módulo `app.services`.

Las rutas de la aplicación se definen en el bloque de configuración del módulo aplicativo, en el objeto `routes`. La llave es la ruta, propiamente dicha. El objeto asociado corresponde a las opciones de dicha ruta.

## API

* `createRoutes`: método encargado de la construcción de rutas, propiamente dicha. Es el método que recibe el mapa de rutas desde el bloque de configuración del módulo.
* `retrieveDeps`: método de uso interno encargado de la resolución asíncrona de dependencias (lazy load).

## Implementación

El provider recibe el objeto `routes` mediante el método `createRoutes` y construye las rutas de forma automática, incluyendo la lógica de carga de vistas de acuerdo al idioma seleccionado en la aplicación así como de lazy loading para scripts.

```javascript
angular
  .module('app.routes', ['app.commons']) // ... Declaración del módulo
  .config(routeConfig);

function routeConfig(RouteHelperProvider) { // ... Bloque de configuración. Inyectar el provider como dependencia
  var routes = {
    '/': { // ... La llave es la ruta, propiamente dicha
      deps: [ // ... Array de scripts necesarios para inicializar la pantalla, regularmente un controlador y una factoría
        'some-url.js',
        'some-url-controller.js' // ... Las dependencias son resueltas por medio de lazy loading
      ],
      templateUrl: 'some-url.html' // ... Ruta de la plantilla
    },
    '/another-url': {
      // ...
    }
  };

  RouteHelperProvider.createRoutes(routes); // ... El objeto routes es pasado al provider para la creación de las rutas
}
```
