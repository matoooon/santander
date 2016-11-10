# Directiva: nav

## Descripción

Directiva auxiliar en la construcción de vínculos internos de la aplicación.

Esta directiva es necesaria cuando se incluye una etiqueta `<base />` de HTML para consumo de archivos estáticos desde otro path distinto, por lo que los atributos `href` de las etiquetas `<a />` apuntan las URLs relativas al valor del atributo `href` de la etiqueta `<base />`.

Al usar esta directiva, se generan atributos `href` en los vínculos funcionando como relativos respecto al documento actual de la URL.

## Implementación

La directiva está restringida a ser usada como atributo, comunmente en etiquetas `<a />`.

```jade
a(nav="/#!/some-url") // ... El atributo nav recibe una URL comenzando con / que posteriormente se traducirá en el atriburo href correspondiente
```
