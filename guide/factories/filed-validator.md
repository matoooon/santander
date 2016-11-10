# Factoría: fieldValidator

## Descripción

Factoría axuliar en las tareas de validaciones cruzadas de campos.

Componente registrado en el módulo `app.services`.

## API

* `equals`: método que compara un valor contra uno o más valores. Recibe un valor en duro como primer argumento y un array de campos como segundo argumento. Sólo regresa `true` si el valor de todos los campos del array es igual al valor a comparar.
* `hasValue`: método que determina que un grupo de campos contenga un valor. Recibe un array de campos. Sólo regresa `true` si todos los campos del array contienen un valor.

## Implementación

Una vez inyectada la factoría en el controlador, exponer los métodos requeridos a la vista mediante el modelo.

```javascript
angular
  .controller('FlowController', FlowController);

function FlowController(fieldValidator) { // ... Constructor del controlador. Inyectar la factoría como dependencia
  this.fieldValidator = {
    hasValue: fieldValidator.hasValue // ... Exponer sólo los métodos requeridos, no la factoría completa
  };
}
```

En la vista, usar el método deseado. Puede usarse en conjunto con la directiva `ui-validate` o en cualquier lugar que se admita una expresión de AngularJS.

```jade
div(ng-controller="FlowController as main") // Inicializar controlador

  form(name="form")

    input(
      name="inputName"
      ng-if="main.fieldValidator.hasValue(['form.someField', 'form.anotherField'])" // ... Llamar al método deseado de la factoría pasando los parámetros requeridos
    )

    input(
      name="inputName"
      ui-validate="{ equals: 'main.fieldValidator.equals($value, ['field.someField'])' }" // ... Uso conjunto con directiva ui-validate
    )
```
