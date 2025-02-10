# Marvel Characters App 🚀

Aplicación web que permite buscar personajes de Marvel, ver sus detalles y gestionar una lista de favoritos. Desarrollada con **React, Vite, React Query, Zustand y Tailwind CSS**.

## 📌 **Características**

- 🔍 **Búsqueda** de personajes en la API de Marvel.
- 📜 **Listado de personajes** con imágenes, nombres y opción de agregar a favoritos.
- ❤️ **Gestión de favoritos** con almacenamiento persistente en el navegador.
- 🦸‍♂️ **Vista de detalles** de un personaje con información y lista de cómics en los que aparece.
- 🎨 **Interfaz responsive**, basada en el diseño de Figma.
- 🧪 **Pruebas unitarias y de integración** con Vitest y Testing Library.

---

## 🚀 **Instalación y ejecución**

### 1️⃣ **Clonar el repositorio**

```sh
git clone git@github.com:lcodecrafter/marvel-dudes.git
cd marvel-dudes
```

### 2️⃣ **Instalar dependencias**

```sh
npm install
```

### 3️⃣ Configurar variables de entorno

En el archivo `.env` se deben configurar las variables de entorno necesarias para la aplicación. Se debe crear un archivo `.env` en la raíz del proyecto con las siguientes variables:

```sh
VITE_API_BASE_URL=https://gateway.marvel.com/v1/public
VITE_API_PUBLIC_KEY=<TU_CLAVE_PUBLICA>
```

**Nota**: en este caso he dejado la clave pública de la API de Marvel para que puedas probar la aplicación sin necesidad de registrarte en la plataforma.

### 4️⃣ **Ejecutar la aplicación**

Modo de desarrollo:

```sh
npm run dev
```

La aplicación estará disponible en http://localhost:5173.

Modo de producción:

```sh
npm run build
npm run preview
```

### 🏗 Arquitectura del proyecto

📦 src
┣ 📂 components # Componentes UI reutilizables (ej. botones, iconos)  
┣ 📂 features  
┃ ┗ 📂 characters # Funcionalidad relacionada con personajes  
┃ ┣ 📂 components # Componentes específicos de personajes  
┃ ┣ 📂 pages # Páginas (ej. listado, favoritos, detalle)  
┃ ┗ 📂 services # Llamadas a la API de Marvel  
┣ 📂 store # Gestión de estado global con Zustand  
┣ 📂 tests # Configuración y mocks para pruebas  
┣ 📂 types # Tipos TypeScript compartidos  
┣ 📂 lib # Utilidades generales (ej. fetchClient)  
┣ 📂 layouts # Layouts generales (ej. Header, Footer)  
┣ 📂 hooks # Hooks reutilizables
┣ 📂 pages # Páginas generales (ej. error)  
┗ 📜 main.tsx # Punto de entrada de la aplicación

### 🛠 Tecnologías utilizadas

    •	Frontend: React 18 + Vite
    •	Estilos: Tailwind CSS
    •	Gestión de estado: Zustand
    •	Cacheo de datos: React Query
    •	Ruteo: React Router
    •	Pruebas: Vitest + Testing Library + Playwright
    •	Tipado: TypeScript

### ✅ Pruebas unitarias y e2e

Unitarias:

```sh
npm run test
```

🎭 Pruebas E2E con Playwright

Las pruebas E2E están configuradas para verificar el funcionamiento completo de la aplicación en un navegador real.
Desafortunadamente, todavia no he tenido tiempo de implementarlas todas pero he dejado unas cuantas preparadas.

Instalacion de los navegadores necesarios:

```sh
test:e2e:install
```

Ejecución de las pruebas:

```sh
npm run test:e2e
```

### 📖 Guías y convenciones

    •	Estructura basada en features 📂
    •	Uso de __tests__ para los archivos de test 🧪
    •	Configuración de Husky para ejecutar linters y tests antes de hacer push ✅
    •	Uso de variables de entorno para las claves de API 🔐
    •	Estilo de código asegurado con ESLint y Prettier 🎨
