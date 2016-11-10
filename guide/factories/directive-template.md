# Factoría: directiveTemplate

## Descripción

Factoria encargada de la simplificar el enlace a plantillas dentro de una directiva.

## Implementación

Cuando una directiva usa una plantilla propia indicada en el objeto de definición de la misma, pasar el nombre del directorio donde está situada.

```javascript
angular
  .directive('someName', someNameDirective);

function someNameDirective(directiveTemplate) { // ... Función de la directiva. Inyectar la factoría como dependencia
  var directiveDefinitionObject = {
    templateUrl: directiveTemplate('some-name') // ... Llama a la factoría, pasando como parámetro el nombre del directorio de la directiva

    // ... Otras propiedades del objeto de definición
  };

  return directiveDefinitionObject;
}
```

El nombre del directorio pasado a la factoría es relativo a `./src/js/directives`. La plantilla debe llamarse de la misma forma que el directorio y que el propio script de la directiva.

```
+--- src
|    |--- js
|    |    |--- directives    // Directorio de directivas
|    |    |    |--- some-name    // Directorio de la directiva
|    |    |    |    |--- some-name.jade    // Plantilla de la directiva
|    |    |    |    |--- some-name.js    // Script de la directiva
```
