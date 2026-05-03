# Contexto Inicial:

Somos un equipo de 5 estudiantes de master en ingeniería de software que estamos desarrollando una aplicación web para la materia de Desarrollo Web Fullstack.
La aplicación se llama "Relatos de Papel" y es una un e-commerce de libros fisicos y digitales.
El proyecto tiene dos partes:

- Frontend: React
- Backend: Spring

Actualmetne el frontend utiliza las siguientes tecnologias: {{PEGAR_AQUI_EL_CONTENIDO_DEL_ARCHIVO package.json}}

# Tareas:

## 1. Definir el estilo de la aplicación

Segun lo informado en clase, es posible utilizar librerias de UI. Se debe elegir una y configurarla en el proyecto para poder continuar con el desarrollo.
Se consulto la expertise del equipo la cual es {{RESULTADO_DE_REUNION}}. Basandonos en esta expertise, sugiere que herramientas son mas optimas para un desarrollo
de nivel produccion, pero que permita una rapida iteracion y desarrollo, y con una curva de aprendizaje acorde a la experiencia del equipo.

## 2. Configurar la libreria de UI elegida

Hemos decidido implementar MUI como libreria de UI. Configuralo en el proyecto. Necesito lo siguiente:

1. Comando para instalar todas las dependencias necesarias
2. Crear un archivo de configuracion para el theme de MUI
3. Crear un archivo palette utilizando Primary: navy profundo #1B1F3A (banner superior, hero, logo, "Ficción" activo)
   Secondary: durazno cálido #D9A77D (botón "Buscar", badges Bestseller, acentos) como guia, agrega toda la paleta y el color de contraste, luego agregar estos colores a la configuracion de MUI
4. Instalar las fonts necesarias para el proyecto, de tal manera que en una SPA no haya problemas al cargar las fuentes, las cuales deban ser Inter para el cuerpo y Caveats para los titulos, ambas de Google Fonts.

## Prompts enviados en esta iteracion

### Prompt 1

````text
Analiza toda la aplicacion actual y creame los siguientes dos archivos (.github/copilot-instructions.md y .cursorrules) basados en lo que ya configurado y armado, ademas del contexto de siguiente actividad:
Datos del estudiante

### Prompt 6

```text
arregla esto  npm run lint:fix
````

Nombre y apellidos Nombre y apellidos del estudiante

Actividad 1 (Exclusivamente Grupal).
Desarrollo front-end: SPA con React

La composicion del grupo debe quedar registrada en la seccion de equipos de esta actividad. Dicha seccion sera visible unos dias antes de la entrega de la actividad. No registrar el grupo podria conllevar la no evaluacion de la actividad.

Enunciado general (aplica a las tres actividades)

Las tres actividades que se llevaran a cabo en la asignatura Desarrollo Web: Full Stack tienen como objetivo:

Desarrollar un front-end (SPA) haciendo uso de HTML5, CSS3, JavaScript y React, incluyendo en el ultimo caso el uso de los hooks mas prominentes de la libreria, asi como el desarrollo de custom hooks. Se utilizara la ultima version disponible con soporte de React.
Desarrollar un back-end con una arquitectura orientada a microservicios, donde cada uno expondra una API RESTful por medio de Java y Spring, integrando comunicacion asincrona basada en eventos y utilizando tambien el protocolo WebSocket. Ademas, se hara uso de Elasticsearch como motor de busqueda para operaciones consultivas de alto coste y se integrara la aplicacion con servicios de mensajeria externa SMTP (Gmail) y API de IA (Gemini). La autenticacion se llevara a cabo mediante token opaco (phantom token pattern) usando tambien tokens JWT.
Integrar ambas partes y desplegar el front-end y back-end tanto de forma local como publica. Las plataformas recomendadas para el despliegue publico son Vercel y Railway, pero la eleccion final es libre.

Enunciado especifico de esta actividad

Esta primera actividad consiste en la realizacion del front-end de la aplicacion web que se construira tomando como base el proyecto transversal del master. Por ello, esta actividad permite poner en practica lo estudiado:

Creacion de paginas con HTML5.
Manejo de JavaScript (ECMAScript V6).
Uso de la libreria React:
Orientacion a componentes.
Hooks principales: useState, useEffect, useContext.
React Router V6.
Despliegue en Vercel

Uso de inteligencia artificial

El uso de inteligencia artificial (IA) es obligatorio. Para ello, se podra utilizar un asistente de IA generativa (recomendado ChatGPT) o el modo agente de GitHub Copilot PRO (gratis para estudiantes de UNIR, recomendado algun modelo de Claude) para las siguientes tareas:

Estilizado de la aplicacion.
Generacion de datos de prueba.

Pautas de elaboracion

El front-end desarrollado debera hacer uso de los principales conceptos que se han estudiado:

Uso de la libreria React para construir un frontal que utilice componentes funcionales (minimo diez) y que haga uso de de JSX (por ende, HTML).
Uso de useState, useEffect y useContext.
Implementacion de un custom hook a eleccion.
Uso de React Router para implementar diferentes rutas en la aplicacion (minimo cuatro).

La tematica de la aplicacion girara obligatoriamente en torno al proyecto transversal del master. Asi pues, la funcionalidad minima necesaria que se debe cubrir es la siguiente:

Vista de acceso: muestra una landing.
Vista de inicio de sesion: muestra un sencillo formulario para iniciar sesion en la aplicacion.
Vista de pagina principal: muestra una pagina principal donde se puedan encontrar algunos de los libros que se venden en la aplicacion web.
Vista de libro: muestra los detalles de un libro en concreto y permite añadirlo al carrito.
Carrito: sera visible tanto en la vista de la pagina principal como en la de libro.
Vista de checkout: esta vista es protegida.
Vista de perfil: esta vista es protegida.

Tambien usa los siguientes links:
https://cursor.directory/
https://cursor.com/docs
https://dotcursorrules.com/
https://code.visualstudio.com/docs/copilot/customization/custom-instructions
https://github.com/github/awesome-copilot/blob/main/docs/README.instructions.md
https://github.com/devbyray/github-copilot-starter

````

### Prompt 2

```text
Continua y quiero que esos dos archivos tengan un scope de cada carpeta y documento , presente y posibe futuro a crear, basado en lo que te pase anteriormente como contexto. Dejalos muy detallados para que cualquiera que realice cambios con IA tenga  el mismo contexto. Ademas, no me avises nada hasta que termines estas tareas por completo
````

### Prompt 3

```text
Creame 1000 libros en los mocks y usa esta api para obtenerlos :https://openlibrary.org/developers/api
https://openlibrary.org/swagger/docs
```

### Prompt 4

```text
Actualizame los mocks de books, les sobra y falta informacion
```

## Regla de mantenimiento con IA

Cada iteracion asistida por IA que modifique el repositorio debe terminar actualizando [.github/copilot-instructions.md](.github/copilot-instructions.md), [.cursorrules](.cursorrules), [README.md](README.md) y [prompts.md](prompts.md) para mantener sincronizados el contexto interno y la guia de uso del proyecto.
