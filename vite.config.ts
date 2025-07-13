import { defineConfig, loadEnv } from 'vite';
 import path from 'path';
 import { fileURLToPath } from 'url';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      base: '/cartolibreria-fantasia/', // Sostituisci con il nome del tuo repository se diverso
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(path.dirname(fileURLToPath(import.meta.url)), '.'),
        }
      }
    };
});
