import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    allowedHosts: ['enochvip.consumerwellness.org', 'localhost', "api-enochvip.consumerwellness.org"],
  },
});
