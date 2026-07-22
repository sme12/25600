import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const config = defineConfig({
  base: '/',
  plugins: [tailwindcss(), viteReact()],
});

export default config;
