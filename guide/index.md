# Multiasistencia, Mensajes de Alivio. Guía de desarrollo

## Intro

Antes de comenzar, es importante leer el `README` del proyecto en el que se encuentra la guía de inicio rápido y de contribución de código al repositorio.

## Estilo de escritura

El archivo `.editorconfig` usa el [estándar recomendado](http://editorconfig.org/) aplicable a editores de texto e IDEs modernos. Ayuda a unificar el estilo con que se de formato a los documentos de la aplicación. Los ajustes contenidos son:

* Uso de espacios en lugar de tabs para indentación
* 2 espacios por nivel de indentación
* Finales de línea de tipo LF usados en UNIX
* Codificación de caracteres UTF-8
* Eliminación de espacios en blanco en líneas vacías
* Adición de línea en blanco al final de cada archivo, útil cuando en la concatenación de múltiples scripts

En caso de usar un editor de texto o IDE sin soporte para el archivo `.editorconfig`, es responsabilidad del desarrollador setear la configuración necesaria para ajustarse a la del proyecto. Este requisito será necesario para poder realizar contribuciones al repositorio.

### IIFE y use strict

Todos los scripts que corran del lado del cliente deben estar contenidos en closures para evitar contaminar el namespace global. Este requisito no es necesario en scripts de Node.js. Adicionalmente debe inicializarse el módo estricto justo al inicio del script:

```javascript
(function wrapper() {
  'use strict';

  // ... Aquí comienza el código aportado por el desarollador
})();
```

No es necesario pasar parámetros a las IIFEs:

```javascript
(function wrapper(global, angular) {
  'use strict';

  // ... Los argumentos global y angular (en la parte superior), así como los parámetros window y angular (en la parte inferior) están de más y no deben colocarse
})(window, angular);
```

### Funciones anónimas

Ha de evitarse el uso de funciones anónimas, siempre que sea posible y por reduntante que parezca, de esta forma la traza de ejecuión será perfectamente rastreable al depurar un script, tanto en cliente como en servidor:

```javascript
(function wrapper() { // Uso de función nombrada
  'use strict';

  // ...
})();
```

```javascript
var obj = {
  myMethod: function myMethod() { // El nombre de la función es independiente del nombre del método
    // ...
  }
};
```

```javascript
$http
  .post('some-url')
  .success(function myCallback(data, status, headers, config) { // Aún al pasar callbacks como parámetros, debe otorgarse nombre a los mismos
    // ...
  });
```

### Creación de componentes de AngularJS

#### General

Los componentes de AnularJS se registran en el módulo correspondiente:

* A excepción de los controladores, el nombre del componente no debe incluir el tipo de componente.
* La función del componente debe declararse por separado.
* El nombre de la función debe incluir el tipo de componente como sufijo.
* Los nombres de los componentes que sean instancias de constructores deben comenzar con mayúscula, principalmente controladores, servicios y providers. Factorías, animaciones y filtros deben nombrarse comenzando con minúscula.

```javascript
angular
  .module('app') // Recuperar el módulo con un nivel de indentación
  .factory('someName', someNameFactory); // Al mismo nivel, registrar el componente

function someNameFactory(/* DI */) { // Declarar la función por separado
  // ...
}
```

```javascript
angular
  .module('app')
  .service('SomeName', SomeNameService); // Los servicios son instancias de constructores y se nombran con mayúscula

function SomeNameService(/* DI */) { // El constructor también debe nombrarse con mayúscula
  // ...
}
```

```javascript
angular
  .module('app')
  .controller('SomeNameController', SomeNameController); // Los controladores son los únicos componentes que deben incluir sufijo, en este caso ..Controller

function SomeNameController(/* DI */) {
  // ...
}
```

No es necesario hacer la anotación de dependencias de forma manual. La construcción del proyecto se encarga de hacerlo de forma automática. Adicionalmente, considerar el siguiente ordenamiento:

* Las dependencias deben colocarse siempre en orden alfabético.
* Siempre colocar primero las dependencias nativas de AngularJS, mismas que comienzan con `$`.
* Posteriormente dar preferencia a las dependencias cuyo nombre comienza con mayúscula.
* Finalmente colocar las dependencias nombradas con minúscula.

```javascript
angular
  .module('app')
  .controller('SomeNameController', SomeNameController);

function SomeNameController($location, $route, $routeParams, SomeComponent, anotherComponent) {
  // ...
}
```

La tarea de construcción del proyecto se encargará de agregar la anotación de dependencias:

```javascript
SomeNameController.$inject = ['$location', '$route', '$routeParams', 'SomeComponent', 'anotherComponent'];
```

#### Controladores

Los controladores deben ser prototipos de JavaScript. De esta forma, los métodos del prototipo pueden ser de 3 tipos distintos, de acuerdo a su cometido:

* Privados: no están expuestos a la vista y se colocan dentro del constructor.
* Privilegiados: acceden a las dependencias inyectadas en el controlador y están expuestos a la vista.
* Públicos: realizan operaciones que no requieren hacer uso de las dependencias inyectadas y están expuestos a la vista.

Las propiedades también pueden ser privadas (no expuestas a la vista) o públicas (siempre expuestas a la vista). Adicionalmente, a menos que sea estrictamente necesario (por ejemplo, adjuntar watchers), nunca debe inyectarse el servicio `$scope` como dependencia de un controlador. Todas las propiedades del modelo deben ser asociadas a la instancia.

```javascript
function SomeNameController($location, $route, $routeParams, SomeComponent, anotherComponent) {
  var privateProperty = { }; // Propiedad privada accesible sólo dentro del scope del controlador o mediante getters o setters que aprovechen los closures de JavaScript

  this.publicProperty = 'Hello world!'; // Propiedad pública, siempre accesible desde la vista

  function privateMethod() { // Método privado...
    // ... puede o no acceder a las dependencias pero nunca está expuesto a la vista
  }

  this.privilegedMethod = function privilegedMethod() { // Método privilegiado...
    $location.path('some-url'); // ... accede a las dependencias o hace las veces de getter / setter para propiedades privadas
  }
}

SomeNameController.prototype.publicMethod = function publicMethod() { // Método público...
  // ... nunca accede a las dependencias
};
```

Al instanciar un controlador, usar la sintaxis `controller as`. Usar alias cortos y que hagan sentido dentro del contexto de esa, y sólo de esa, pantalla:

```html
<div ng-controller="SomeNameController as main">
  {{main.publicProperty}}
</div>
```

#### Directivas

##### Script

Una directiva siempre regresa un objeto de definición. Dependiendo de su cometido puede hacer uso de algunos elementos u otros. Para más información, ver la [guía de desarrollo de directivas](https://docs.angularjs.org/guide/directive).

```javascript
angular
  .module('app')
  .directive('someName', someNameDirective)
  .controller('SomeNameDirectiveController', SomeNameDirectiveController); // Registrar controlador, caso de ser necesario, en el mismo módulo que la directiva

function SomeNameDirectiveController(/* DI */) { // Al igual que otros controladores, crear un constructor cuyo nombre sea el nombre de la directiva, comenzando con mayúscula, y agregando el sufijo ...DirectiveController
  this.someProperty = 'Hello world...'; // ... Setear otras propiedades del scope

  // ... Usar un controlador para las directivas que requieran lógica de scope. La lógica de scope nunca debe situarse dentro de la función link, a menos que sea derivada de acciones o eventos en el DOM
}

SomeNameDirectiveController.prototype.somePublicMethod = function somePublicMethod() {
  // ... Usar la misma lógica de métodos que en los controladores relacionados con pantallas
};

function someNameDirective() {
  var directiveDefinitionObject = { // Declarar el objeto de definición
    compile: compile, // ... Evitar declarar funciones en este bloque; únicamente asociarlas
    controller: 'SomeNameDirectiveController',
    controllerAs: 'alias',
    link: link,
    replace: true,
    restrict: 'E', // ... Restringir siempre a elemento, sobretodo cuando la template de la directiva hace un replace del DOM original. Sólo restringir a atributo cuando no se hace un replace desde la directiva
    scope: {
      // ... Aislar el scope sólo cuando sea estrictamente necesario

      someBinding: '=', // Usar binding bidireccional sólo cuando sea estrictamente necesario...
      someMethod: '&',
      someOptionalMethod: '&?',
      someProperty: '@' // ... de lo contrario recuperar información de forma unidireccional

      // ... Nombrar las propiedades de la misma forma que los atributos, de tal forma que los valores puedan recuperarse únicamente con =, & o @. Esto también permite convertir una atributo en opcional cuando se coloca un ? al final
    },
    templateUrl: 'some-url.html' // ... Evitar colocar templates en línea. Usar siempre un HTML por separado
  };

  function compile(element, attrs) {
    // ... Usar una función compile para ejecutar acciones antes de compilar la directiva, por ejemplo, para setear valores predeterminados en los atributos o realizar operaciones en el DOM original
  }

  function link(scope, element, attrs) {
    // ... Usar una función link para ejecutar acciones luego de compilar la directiva, por ejemplo, adjuntar eventos sobre el DOM compilado. El trabajo con el scope en una función link debe limitarse a la actualización de datos luego de un evento disparado en el DOM; lógica adicional debe trasladarse a un controlador
  }

  return directiveDefinitionObject; // Regresar el objeto de definición
}
```

##### HTML

Preferir siempre usar una etiqueta personalizada, sobretodo cuando se use una template en la directiva.

```html
<my-directive></my-directive>
```

Colocar siempre los atributos requeridos por la directiva con el prefijo `x-`. Como se indica anteriormente, usar nombres cortos y descriptivos para los mismos.

```javascript
my-directive(
  x-callback="..."
  x-config="..."
  x-model="..."
)
```

### Vistas

Las vitas del proyecto son construidas con Jade. La división de vistas, mixins, includes, blocks, etc. se deja a buen juicio del desarrollador, pero se recomienda considerar los siguientes puntos:

* Cualquier bloque que de código que se use en múltiples lugares debe pasar a ser un mixin.
* Debe evitarse hacer mixins demasiado complejos o demasiado simples.
* Si un flujo se divide en pasos o en secciones claramente definidas, es mejor separarla en includes.
* Si un bloque de código, por sencillo que sea, conlleva lógica de JavaScript, debe pasar a ser una directiva si es reutilizable o un controlador que opere sobre un elemento concreto si no es reutilizable.
* Usar una línea por cada atributo cuando se tenga más de uno en una sola etiqueta.
* En versiones reciente de Jade ya no es necesario separar los atributos con comas, por lo que deben evitarse.
* Colocar los atributos en orden alfabético. Esto también facilita el trabajo colaborativo y disminuye el riesgo de encontrar conflictos al hacer un merge.
* Para facilitar la lectura del código, colocar siempre la etiqueta correspondiente y no sólo el selector de clase o ID.
* Si un elemento tiene un ID, debe adjuntarse a la etiqueta. Nunca colocar como atributo.

```javascript
div.some-selector#my-id( // Indicar siempre la etiqueta HTML. El ID se adjunta a la etiqueta
  data-another-attr="..." // ... Ordenar los atributos alfabéticamente
  data-my-attr="..." // ... Nunca usar comas para separar los atributos
  data-some-attr="..."
) // Los paréntesis de apertura y cierre se dejan libres, tanto al principio como al final
```

### Estilos

Se usa Saas como compilador, con la sintaxis de Sass que, a diferencia de la sintaxis de SCSS, tiene delimitación por medio de espacios. Ver la [guía de desarrollo](http://sass-lang.com/guide) para más información.

## Módulos

La aplicación se encuentra dividida en los siguientes módulos de AngularJS, cada uno con un objetivo particular:

### Aplicativos

Son los módulos que, a la postre, inicializarán una aplicación de AngularJS en la vista mediante el atributo `ng-app`. En ellos se registran únicamente los controladores y factorías específicas de las pantallas de la aplicación. Los scripts de dichos controladores y factorías se cargan de forma asíncrona y bajo demanda, al acceder a cada ruta.

* `app`: Define la aplicación principal del proyecto. Contiene todos los flujos del área privada, una vez que el usuario ha iniciado sesión.
* `access`: Define la aplicación secuandaria del proyecto. Contiene los flujos del área pública, antes de que el usuario inicie sesión.

### Contenedores

* `app.commons`: Hace las veces de contender de módulos de terceros que posteriormente deben ser inyectados como dependencias en los módulos aplicativos.
* `app.constants`: Módulo dedicado a almacenado de constantes que son usadas a lo largo de la aplicación.
* `app.directives`: Las directivas de la aplicación se encuentran contenidas en este módulo.
* `app.routes` y `access.routes`: Contienen todas las configuraciones necesarias para las rutas de la aplicación.
* `app.services`: En este módulo se registran los servicios, providers y factorías globales de la aplicación.

## Estructura de directorios

El proyecto está estructurado de la siguiente forma:

```
+--- .git    // Respositorio Git
|
+--- .sass-cache    // Directorio caché de Sass. Incluido en .gitignore
|
+--- bower_components    // Directorio de instalación de dependencias de Bower. Incluido en .gitignore
|
+--- build    // Directorio de compilación del proyecto. Incluido en .gitignore
|
+--- build-helpers    // Directorio de archivos de construcción del proyecto
|    |--- git    // Directorio de hooks de Git
|    |--- gulp    // Directorio de tareas de Gulp. Cada script es una tarea independiente
|
+--- guide    // Directorio de documentación
|    |--- index.md    // Índice de la guía
|
+--- node_modules    // Directorio de instalación de dependencias de Node.js. Incluido en .gitignore
|
+--- reports    // Directorio de reportes de Plato. Incluido en .gitignore
|
+--- src    // Código fuente del proyecto
|    |--- app    // Directorio de archivos de flujos / pantallas del proyecto
|    |    |--- some-flow    // Un directorio por cada flujo. Contiene los scripts necesarios para dicho flujo: controladores y, regularmente, un solo servicio
|    |
|    |--- assets    // Directorio de estáticos
|    |    |--- fonts    // Directorio de webfonts
|    |    |--- img    // Directorio de imágenes
|    |
|    |--- js    // Directorio de archivos de JavaScript
|    |    |--- controllers    // Controladores comunes
|    |    |--- constants    // Constantes comunes
|    |    |--- directives    // Directivas de la aplicación
|    |    |--- factories    // Factorías comunes
|    |    |--- modules    // Directorio de módulos
|    |    |    |--- app.js    // Módulo principal
|    |    |--- providers    // Providers
|    |    |--- services    // Servicios comunes
|    |
|    |--- styles
|    |    |--- directives    // Directorio de estilos de directivas
|    |    |--- includes    // Directorio de includes de estilos
|    |    |--- access.sass    // Hoja de estilos del módulo access
|    |    |--- main.sass    // Hoja de estilos del módulo app
|    |
|    |--- views    // Directorio de vistas
|    |    |--- includes    // Vistas comunes, globales o reutilizables en toda la aplicación
|    |    |--- mixins    // Mixins de Jade
|    |    |--- some-flow    // Un directorio por cada flujo. Contiene las vistas necesarias para dicho flujo. Puede contender un subdirectorio includes propio, mismo que es excluido de la tarea de compilación
|    |
|    |--- access.jade    // Documento secundario. Inicializa el módulo access
|    |
|    |--- index.jade    // Documento principal. Inicializa el módulo app
|    |
|    |--- local.js    // Script alternativo a server-info.js con variables personalizadas definidas o alteradas por el programador. Al arrancar el proyecto en desarrollo, si este archivo existe, tiene preferencia sobre server-info.js. Incluido en .gitignore
|    |
|    |--- server-info.js    // Script que contiene la variable global $serverInfo, emulando diversos parámetros recibidos por parte del servidor
|
+--- tests    // Directorio de tests unitarios. A nivel interno conserva la misma estructura que el directorio ./src
|
+--- .editorconfig    // Archivo de configuración del editor de texto
|
+--- .gitignore    // Archivo de exclusiones de Git
|
+--- .jshintrc    // Archivo de configuración de validación de scripts mediante JSHint
|
+--- bower.json    // Paquete Bower y dependencias de librerías de front
|
+--- contributors.txt    // Registro de contribuyentes del proyecto
|
+--- gulpfile.js    // Archivo de inicialización de Gulp
|
+--- karma.conf.js    // Archivo de configuración de tests unitarios con Karma
|
+--- package.json    // Paquete npm y dependencias de Node.js
|
+--- README.md    // Guía de inicio rápido y contribución al proyecto
```
