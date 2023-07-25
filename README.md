# Backend Comicskites

Backend para una aplicación de venta de comics y envío físico, llamada comicskites.  

## Integrantes grupo 7

- Lorenzo Chacano
- Paolo Landeros
- Leonardo Villagrán

1. [Prerrequisitos](#prerrequisitos)
2. [Instalación](#instalación)
3. [Configuración](#configuración)
4. [Base de Datos](#base-de-datos)
5. [Descripción de Rutas](#descripción-de-rutas)
   - [Rutas de Usuarios](#rutas-de-usuarios)
   - [Rutas de Productos](#rutas-de-productos)
   - [Rutas de Likes](#rutas-de-likes)
   - [Rutas del Carrito](#rutas-del-carrito)
   - [Rutas de Órdenes](#rutas-de-órdenes)
6. [Desarrollo](#desarrollo)

Haz clic en los enlaces para saltar directamente a la sección que deseas leer. ¡Disfruta explorando el proyecto de comicskites!

## Prerrequisitos

- Node.js

## Instalación

1. Clonar el repositorio:

```bash
git clone `https://github.com/LanderosPaolo/Backend_proyecto_final`
cd `backend_proyecto_final`
```

2. Instalar las dependencias:

```bash
npm install
```

## Configuración

Crea un archivo `.env` en el directorio raíz del proyecto y agrega las siguientes variables de entorno:
```
## Local
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=comics
JWT_SECRET=ultrasecreto
```
Nota: Los datos contenidos de las variables son solo ejemplos, generar según su configuración local.  

## Base datos: 

1. Crea una base de datos llamada comics en Postgres.
2. Ejecuta las sentencias de SQL en el archivo `comics.sql` en la raíz del backend. 

## Descripción de Rutas

A continuación se detallan las rutas disponibles en el proyecto:

### Rutas de Usuarios

- **POST** `/registrar`: Registrar un nuevo usuario. 
- **POST** `/iniciar_sesion`: Iniciar sesión de un usuario. Se verifica la credencial antes de realizar el inicio de sesión.
- **GET** `/perfil`: Obtener la información del perfil del usuario. Se requiere validación del token para acceder a esta ruta.

### Rutas de Productos

- **POST** `/nuevo_producto`: Agregar un nuevo producto. Se requiere validación del token para agregar un producto.
- **PUT** `/editar_producto/:id_producto`: Editar un producto existente. Se requiere validación del token para editar un producto.
- **GET** `/productos`: Obtener la lista de productos. Se requiere validación del token para acceder a esta ruta.
- **GET** `/detalles/:id_producto`: Obtener detalles de un producto específico. Se requiere validación del token para acceder a esta ruta.
- **GET** `/favoritos`: Obtener la lista de productos favoritos del usuario. Se requiere validación del token para acceder a esta ruta.
- **GET** `/publicaciones`: Obtener las publicaciones de productos. Se requiere validación del token para acceder a esta ruta.
- **GET** `/producto/:id_producto`: Obtener información de un producto específico para modificarlo. Se requiere validación del token para acceder a esta ruta.

### Rutas de Likes

- **POST** `/likes/:id_producto`: Agregar un like a un producto específico. Se requiere validación del token para agregar un like.
- **DELETE** `/dislikes/:id_producto`: Eliminar un like de un producto específico. Se requiere validación del token para eliminar un like.

### Rutas del Carrito

- **POST** `/carrito`: Agregar un producto al carrito. Se requiere validación del token para agregar un producto al carrito.

### Rutas de Órdenes

- **GET** `/orden_compras`: Obtener las órdenes de compra del usuario. Se requiere validación del token para acceder a esta ruta.
- **GET** `/estados`: Obtener todos los estados posibles de una orden de compra. Se requiere validación del token para acceder a esta ruta.
- **PUT** `/estado`: Actualizar el estado de una orden. Se requiere validación del token para actualizar el estado de una orden.

**Nota**: Las rutas que requieren validación del token (`middleware.tokenValidation`) implican que el usuario debe estar autenticado para acceder a ellas. Además, se debe verificar la credencial antes de iniciar sesión (`middleware.credencialVerify`).

## Uso

Para ejecutar el servidor en modo de desarrollo (con nodemon para recarga automática), usa el siguiente comando:

```bash
npm run dev
```

El servidor se ejecutará en la ruta `http://localhost:3000/`.