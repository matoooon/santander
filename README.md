# Proyecto Ejemplo Santander

## Inicio rápido
1. Instalar Node.js. En Linux, instalar por separado el gestor de paquetes npm
* Instalar Bower y Gulp: `npm install -g bower gulp`
* Una vez clonado en repositorio, dentro del directorio del proyecto, instalar dependencias: `npm install && bower install`
* Ligar hook de validación de mensajes de commits: `ln -s ../../build-helpers/git/validate-commit-msg.js .git/hooks/commit-msg`

## Entorno de desarrollo

Tareas habituales:

| Tarea | Comando |
|---|---|
| Arrancar entorno entero y Api Rest servida con mocks | `gulp run` |
| Arrancar entorno entero y Api Rest productiva | `gulp run --env=prod` |
| Compilar proyecto para producción, sin levantar servidor y sin dynPath | `gulp build` |
| Compilar proyecto para producción, Api Rest servida con mocks y con dynPath | `gulp build-test` |
| Compilar proyecto para producción, Api Rest productiva y con dynPath | `gulp build-test --env=prod` |
| Ejecutar tests unitarios | `gulp test` |
| Reporte de complejidad ciclomática | `gulp plato` |

## Guía de contribución

### Remotos
Como norma, los `remotes` siguen la siguiente nomenclatura:
* `origin`: fork del proyecto en la cuenta del desarrollador
* `upstream`: repositorio principal (ssh://git@bitbucket.org:adesisnetlife/mx-multiasistencia-mensajes-alivio-private-front.git)

### Contenido y mensajes de los commits

####Contenido

Cada commit debe hacer referencia a un único asunto. Si hay muchos cambios que afectan a piezas distintas,
esos cambios se deben contribuir en varios commits. Si hay varios commits sobre un mismo elemento
con cambios sucesivos que se van corrigiendo a si mismos, todos esos commits deben juntarse
(squash) en un único commit antes de contribuirse.

Cada commit de fix o feature debe contener los fuentes y los tests asociados.

####Mensajes

Los mensajes deberán seguir la convención establecida en: https://github.com/ajoslin/conventional-changelog/blob/master/CONVENTIONS.md

Básicamente seguirán el formato:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

Por ejemplo:

```
fix(buscador): filtrar min/max sobre importe en lugar de saldo posterior

Closes #AABB-12345.

Los valores de min y max filtran el listado de movimientos utilizando el valor
de su importe y no su saldo posterior.
```

Los tipos válidos son:

* **feat**: Nueva feature
* **fix**: Resolución de bugs e incidencias
* **docs**: Cambio de documentación
* **style**: Cambios que no afectan al sentido del código (espacios en blanco,
formateo, punto y comas faltantes, etc.)
* **refactor**: Cambios de código que ni resuelven incidencias ni agregan funcionalidad.
* **test**: Agregar tests faltantes o corregir los existentes
* **chore**: Cambios en procesos de construcción o herramientas o librerías auxiliares
como .gitignore, .jshint, generación de documentación, etc.


### Incidencias

* Trabajar siempre en `origin` del proyecto.
* La rama `origin\develop` se utilizará para crear ramas locales.
Se mantendrá a la par con `upstream\develop`, sobre todo en el momento
de crear una rama.
* Para trabajar en una incidencia se crea una rama a partir de `develop`.
La nomenclatura recomendada es `inc-[codigo_incidencia_jira]`.
* Se resuelve la incidencia y se hace commit de los cambios, tal como se ha indicado anteriormente.
* Se hace `push` de la rama a `origin`;
* **Antes de hacer un Merge Request** se hace un **pull con rebase** de
`upstream/develop` asegurando de esta forma que los commits podrán entrar
sin problemas en la rama `develop`.
* Se realiza el Merge Request. El título debe ser descriptivo respecto a los cambios o mejoras realizadas. En el cuerpo se aportará
las informaciones oportunas para que el integrador entienda mejor el contenido
de la Merge Request y debe estructurarse de la siguiente forma, en formato markdown:

```
## <Tipo de aportación [agrupará todas las de su tipo]>

**<Operativa a la que pertenece>:**
* **<Pantalla o subelemento correspondiente [si lo hay]>:**
    * <Descripción detallada del cambio o mejora>. <Link de incidencia relacionada [si la hay]>. (_Developer: <Nombre del desarrollador> / Integrador: <Persona a la que se asigna la Merge Request>_)
    * Otro cambio [...]
* **Otra Pantalla:*
    * Otro cambio [...]
```
Por ejemplo:

```
## Bugfixes

**Cuentas Express:**
* **Preregistrar:**
    * Arregla validación de campo de beneficiario. Sólo permite ingresar caracteres alfanuméricos. Incidencia de JIRA [APF-000](https://adesismx.atlassian.net/browse/APF-000). (_Developer: Ivan Pacheco / Integrador: Eduardo Pérez_)
    * Otro cambio [...]. Incidencia de JIRA [APF-000](https://adesismx.atlassian.net/browse/APF-000). (_Developer: Ivan Pacheco / Integrador: Eduardo Pérez_)
* **Editar:**
    * Otro cambio [...]. (_Developer: Ivan Pacheco / Integrador: Eduardo Pérez_)

## Features

**Core:**
* **Directiva nombreDeLaDirectiva:**
    * Se crea directiva para [...]. (_Developer: Ivan Pacheco / Integrador: Eduardo Pérez_)
* **Servicio nombreDelServicio:**
    * Se agrega servicio que [...]. (_Developer: Ivan Pacheco / Integrador: Eduardo Pérez_)
```
El desarrollador debe asegurarse de que el mensaje se visualice correctamente, una vez redactado (se recomienda usar algún previsualizador de markdown).

El integrador podrá comentar y/o exigir rectificaciones o nuevos elementos sobre la Merge Request. Si este es el caso, se deberá trabajar sobre la Merge request, y **nunca cerrarla para crear
otra nueva**, puesto que se perdería la trazabilidad.

* Si hay que agregar nuevos commits, haciendo push a `origin`, la Merge Request
se actualiza automáticamente.
* Si hay que rehacer commits (por ejemplo, para ajustar mensajes de commits,
hacer squash o dividir commits), se sobreescribirá la historia local. Para
enviarla a la rama corresponidente en `origin` hay que hacer un push force
(`git push -f`). Al hacerlo, se actualiza automáticamente la Merge Request.
* **IMPORTANTE**: Con cada cambio, hay que mantener la Merge Request actualizada haciendo los correspondientes pull con rebase de `upstream\develop`.
