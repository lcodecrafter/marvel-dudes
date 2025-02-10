# Marvel Dudes 🚀

A web application that allows searching for Marvel characters, viewing their details, and managing a list of favorites. Built with React, Vite, React Query, Zustand, and Tailwind CSS.

📌 Features  
🔍 Search for characters from the Marvel API.  
📜 Character list with images, names, and an option to add to favorites.  
❤️ Favorite management with persistent storage in the browser.  
🦸‍♂️ Character detail view with information and a list of comics featuring them.  
🎨 Responsive UI, based on the Figma design.  
🧪 Unit and integration testing with Vitest and Testing Library.

---

## 🚀 **Installation & Setup**

### 1️⃣ **Clone the repository**

```sh
git clone git@github.com:lcodecrafter/marvel-dudes.git
cd marvel-dudes
```

### 2️⃣**Install dependencies**

```sh
npm install
```

### 3️⃣ **Set up environment variables**

The `.env` file must be configured with the necessary environment variables for the application. Create a `.env` file in the root directory with the following variables:

```sh
VITE_API_BASE_URL=https://gateway.marvel.com/v1/public
VITE_API_PUBLIC_KEY=<TU_CLAVE_PUBLICA>
```

**Note**: The public API key has been left available for testing purposes without requiring registration on the Marvel platform.

### 4️⃣ **Run the application**

Development mode:

```sh
npm run dev
```

The application will be available at http://localhost:5173.

Production mode:

```sh
npm run build
npm run preview
```

## 🏗 **Project Architecture**

📦 src  
┣ 📂 components # Reusable UI components (e.g., buttons, icons)  
┣ 📂 features  
┃ ┗ 📂 characters # Character-related functionality  
┃ ┣ 📂 components # Character-specific components  
┃ ┣ 📂 pages # Pages (e.g., list, favorites, details)  
┃ ┗ 📂 services # API calls to Marvel  
┣ 📂 store # Global state management with Zustand  
┣ 📂 tests # Test configuration and mocks  
┣ 📂 types # Shared TypeScript types  
┣ 📂 lib # General utilities (e.g., fetchClient)  
┣ 📂 layouts # General layouts (e.g., Header, Footer)  
┣ 📂 hooks # Reusable hooks  
┣ 📂 pages # General pages (e.g., error)  
┗ 📜 main.tsx # Application entry point

## 🛠 **Technologies Used**

- Frontend: React 18 + Vite
- Styling: Tailwind CSS
- State Management: Zustand
- Data Caching: React Query
- Routing: React Router
- Testing: Vitest + Testing Library + Playwright
- Typing: TypeScript

## ✅ **Unit & E2E Testing**

**Unit:**

Run the tests with the following command:

```sh
npm run test
```

Run the tests with coverage:

```sh
npm run test:coverage
```

**E2E**

E2E tests are set up to verify the full functionality of the application in a real browser.
**Unfortunately, I haven’t had time to implement all of them yet, but I have prepared a few.**

Install required browsers:

```sh
test:e2e:install
```

Run the tests:

```sh
npm run test:e2e
```

## 📖 **Guidelines & Conventions**

- Feature-based architecture 📂
- Use of **tests** for test files 🧪
- Husky setup to run linters and tests before pushing ✅
- Use of environment variables for API keys 🔐
- Code styling ensured with ESLint and Prettier 🎨

## 🛠 CORS Issue with Marvel API & Solution

The Marvel API blocks requests from the browser unless the request originates from an allowed source. In this case, making requests from localhost caused certain API endpoints to fail due to CORS (Cross-Origin Resource Sharing) restrictions.

✅ Solution Applied 1. Added a proxy in Vite to route requests through the development server and avoid CORS restrictions. 2. Modified fetchClient to use the proxy only in development mode.
