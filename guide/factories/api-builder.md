# Factoría: apiBuilder

## Descripción

Factoría que implementa el patrón Facade. Se encarga de centralizar el flujo de servicios de cada operativa y de realizar la intercepción de errores sobre controlador asociado mediante la factoría [`catchError`](catch-error.md).

## Implementación

Debe ser inyectada en cada servicio de llamadas al API. Recibe un mapa de URLs con un verbo HTTP.

```javascript
angular
  .module('app')
  .factory('flowService', flowServiceFactory);

function activateInsuranceServiceFactory(apiBuilder) {
  var service = { // ... Mapa de URLs del API a consumir
    activate: { // ... Nombre del método, tal cual quedará expuesto al controlador u otros componentes
      method: 'post', // ... Método mediante el cuál se realizará la petición
      url: '/api/some/url' // ... URL a consultar
    },
    confirm: {
      method: 'get',
      url: '/api/some/url'
    }
    // ... Otros métodos
  };

  return apiBuilder(service); // ... Pasar el mapa de URLs a la factoría para la construcción del servicio
}
```
