import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  // Dev always uses '/', production defaults to GitHub Pages' repository subpath.
  // Set VITE_BASE_PATH=/ when deploying to a custom domain/root host.
  base: command === 'serve' ? '/' : (process.env.VITE_BASE_PATH || '/portofolio/'),
}));
