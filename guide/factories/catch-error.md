# Factoría: catchError

## Descripción

Factoría encargada de asociar la información de errores en las respuestas del API, previamente interceptadas por la factoría [`apiBuilder`](api-builder.md).

A cada llamda al API, limpia cualquier mensaje de error previamente asociado al controlador y reasigna en caso de producirse uno nuevo.

## API

### Del controlador asociado

Una vez resuelta la promesa de llamada mediante el servicio `$http`, estas propiedades se adjuntan al controlador asociado si hubo un error en la respuesta.

* `error`: booleano. Indica si se produjo un error en el API.
* `responseError`: object / string. Dependiendo del error generado, contiene el mensaje de error, propiamente dicho.

### Del servicio de consumo del API

* `alias`: propiedad encargada de la asociación de un controlador a la intercepción de errores. Debe setearse manualmente si el servicio de consumo del API se usa en un único controlador.
* `attach`: setter de la propiedad `alias`. Se usa únicamente cuando el servicio de consumo del API es compartido por varios controladores

## Implementación

Trabaja en conjunto con los servicios de consumo del API, por lo que no es necesario inyectarla en los controladores. Asignar el alias del servicio, de forma manual si este es inyectado en un único controlador o mediante el método `attach` si es compartido entre variso controladores.

```javascript
angular
  .controller('FlowController', FlowController);

function FlowController(flowService) { // ... Constructor del controlador. Inyectar el servicio de consumo del API correspondiente
  var someData = '...';

  FlowController.alias = this; // ... Asociar el controlador con el servicio de forma manual si el servicio no es compartido con otros controladores

  flowService
    .attach(this) // ... Asociar el controlador con el servicio de forma dinámica mediante el método attach si el servicio de consumo del API es compartido entre diferentes controladores
    .activate({ })
    .then(someCallback);

  // ... Hacer algo
  }
}
```
