import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    // Allow the Arena live-preview proxy host (e.g. 3000-<id>.e2b.app)
    allowedHosts: true,
  },
});
