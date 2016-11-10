# Factoría: patterns

## Descripción

Factoría proveedora de expresiones regulares. Auxiliar en la validación de datos.

Componente registrado en el módulo `app.services`.

## API

* `curp`: valida formato de CURP mexicano.
* `email`: valida formato de correo electrónico.
* `numbers`: valida formato numérico.
* `password`: valida formato de contraseña de acuerdo a las reglas de negocio del proyecto.

## Implementación

Una vez inyectada la factoría en el controlador, exponer las propiedades requeridas a la vista mediante el modelo.

```javascript
angular
  .controller('FlowController', FlowController);

function FlowController(patterns) { // ... Constructor del controlador. Inyectar la factoría como dependencia
  var someData = '...';

  this.fieldValidator = {
    numbers: patterns.numbers // ... Exponer sólo los métodos requeridos, no la factoría completa
  };

  if (someData.match(patterns.curp)) { // ... La factoría puede ser usada dentro de la lógica de cualquier componente en el que se ha inyectado como dependencia
    // ... Hacer algo
  }
}
```

En la vista, usar el método deseado. Puede usarse en conjunto con la directiva `ui-validate` o en cualquier lugar que se admita una expresión de AngularJS.

```jade
div(ng-controller="FlowController as main") // Inicializar controlador

  form(name="form")

    input(
      name="inputName"
      ng-pattern="main.patterns.password" // ... Uso conjunto con la directiva ng-pattern
      type="password"
    )

    input(
      name="inputName"
      ng-minlength="10" // ... Uso conjunto con otras directivas o elementos de validación
      ng-pattern="main.patterns.numbers"
    )
```
