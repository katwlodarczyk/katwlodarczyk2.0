import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';

export default defineConfig({
  site: 'https://katwlodarczyk.com',
  integrations: [alpinejs({ entrypoint: "/src/entrypoints/alpine" })],
  vite: {
    plugins: [tailwindcss()],
  },
});
