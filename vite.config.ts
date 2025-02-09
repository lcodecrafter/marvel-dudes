import { defineConfig } from 'vitest/config';
import { loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/tests/vitest-setup.ts',
      exclude: ['**/e2e/**', '**/node_modules/**', '**/dist/**'],
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_MARVEL_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
