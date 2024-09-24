# Shopping Cart Web

Este proyecto es el frontend para la API de carrito de compras. Está construido con React y Next.js usando TypeScript.

## Características
- Interfaz de usuario para gestionar items y carritos.
- Consultas a la API para obtener, crear, editar y eliminar items y carritos.
- Manejo de estado usando React Context (o el estado de tu preferencia).
- Diseño responsivo y accesible.
- Integración con la API desarrollada en NestJS y SQLite (puerto: `3000`).

## Requisitos
- Node.js v20 o superior.
- npm o yarn (gestor de paquetes).
- API del carrito de compras corriendo en el puerto `3000` (puedes revisar README del backend para más información).

## Configuración del proyecto
1. Clona el repositorio
```bash
git clone https://github.com/stivendk/shopping-cart-web.git
```
2. Accede al directorio del proyecto
```bash
cd shopping-cart-web
```
3. Instala las dependencias

Si utilizas npm:
```bash
npm install
```

Si utilizas yarn:
```bash
yarn install
```

4. Inicia la aplicación en desarrollo

Si utilizas npm:

```bash
npm run dev
```
Si utilizas yarn:

```bash
yarn dev
```
El proyecto estará disponible en: http://localhost:4200

## Scripts Disponibles
- dev: Inicia el entorno de desarrollo.
- build: Compila el proyecto para producción.
- start: Inicia la aplicación en producción (requiere primero npm run build).

## Interacción con la API
El frontend se comunica con la API de carrito de compras a través de los siguientes endpoints:

### Endpoints
- GET /items: Obtiene la lista de items.
- GET /items/: Obtiene un item por su ID.
- PUT /carts/: Modifica el carrito activo.
- GET /carts/active: Obtiene el carrito activo.
- PUT /cart-items/: Actualiza la cantidad de un item en el carrito.