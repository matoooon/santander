# Directiva: toggle

## Descripción

Directiva auxiliar al mostrar y ocultar elementos del DOM mediante clics del usuario. Evita delegar este tipo de lógica a la vista o al controlador, incluso a otras directivas.

Notar que esta directiva sólo muestra u oculta los elementos deseados, no los remueve o inserta en el DOM.

Componente registrado en el módulo `app.directives`.

## API

### Atributos del elemento controlador

* `toggle`: cualquier selector de CSS. Requerido. Indica el elemento que se mostrará u ocultará al hacer clic. Es recomendable pasar un selector de ID, ya que comunmente se operará sobre un único elemento.
* `x-exchange`: booleano. Opcional. Funciona únicamente si existen elementos relacionados (indicados mediante el atributo `x-related`). Indica si el elemento a controlar debe intercambiar visibilidad con sus elementos relacionados. Posibles valores:
  * `false` (predeterminado): Al desplegar el elemento a controlar, los elementos relacionados se ocultarán.
  * `true`: Adicional al comportamiento predeterminado, al ocultar el elemento a controlar, los elementos relacionados de desplegarán.
* `x-related`: cualquier selector de CSS. Opcional. Indica los elementos relacionados con el elemento sobre el que se operará. Este atributo debe indicarse cuando se requiere mantener un sólo elemento de su tipo desplegado a la vez. Es decir, si un elemento relacionado se encuentra visible, al desplegar otro del mismo tipo, el anterior se ocultará, de lo contrario ambos estarán visibles.
* `x-toggle-class`: string. Opcional. Indica un nombre de clase para agregar / quitar al hacer clic sobre el elemento.

### Atributos de elemento a controlar

* `data-animation`: Opcional. Indica el tipo de animación que se aplicará al mostrar u ocultar el elemento. Posibles valores:
  * `default` (predeterminado): Muestra o oculta el elemento sin más.
  * `fade`: Muestra u oculta el elemento de forma gradual jugando con la opacidad.
  * `upDown`: Muestra el elemento desplegándolo de arriba hacia abajo. Lo oculta replegándolo de abajo hacia arriba.
* `data-exit`: booleano. Opcional. Indica si el elemento dede ocultarse el hacer clic en cualquier lugar fuera de él mismo. Posibles valores:
  * `false` (predeterminado): El elemento sólo será controlado la hacer clic sore el elemento controlador.
  * `true`: El elemento sólo se mostrará mediante el elemento controlador, pero puede ocultarse también al hacer clic fuera de él mismo.
* `data-speed`: número. Opcional. Indica el valor en milisegundos para la animación al mostrar u ocultar el elemento.
* `data-visible`: booleano. Opcional. Indica si el elemento debe encontrarse visible o no al instanciar la directiva. Posibles valores:
  * `false` (predeterminado): el elemento aparecerá oculto en primera instancia.
  * `true`: el elemento aparecerá visible de forma predeterminada.
* `data-auto-hide`: booleano. Opcional. Indica si el elemento debe ocultarse al interactuar con algún elemento hijo, por default es false (no se oculta).

## Implementación

La directiva está restringida a ser usada como atributo, dado la amplia variedad de posbilidades y plantillas sobre las que puede ser aplicada.

Requiere un elemento controlador y uno a ser controlado.

```jade
a( // ... Elemento controlador. Al hacer clic sobre él, el elemento a controlar se mostrará u ocultará
  toggle="#my-elem1" // ... Indica el elemento a controlar
  x-echange="true" // ... Indica si los elementos relacionados, adicional a ocultarse cuando el elemento a controlar se despliega, deben desplegarse al ocultarlo
  x-related=".someGroup" // ... Indica los elementos relacionados (si los hay) con el elemento a controlar de tal forma que sólo uno de ellos pueda permanecer desplegado a la vez
  x-toggle-class="opened" // ... Indica un nombre de clase que se agregará y / o quitará cuando se haga clic sobre el elemento
)

div.some-group#my-elem1(
  data-animation="fade" // ... Indica el tipo de animación a realizar sobre el elemento
  data-exit="true" // ... Indica si el elemento debe ocultarse al hacer clic en cualquier área fuera de él mismo
  data-speed="200" // ... Indica la duración en milisegundos a aplicar a la animación
  data-visible="true" // ... Indica si el elemento debe ser visible al inicializar la directiva
)
  // ... Contenido

div.some-group#my-elem2 // ... Elemento relacionado
div.some-group#my-elem3 // ... Elemento relacionado
div.some-group#my-elem4 // ... Elemento relacionado
```
