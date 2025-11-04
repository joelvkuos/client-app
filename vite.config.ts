import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/login': {
        target: 'https://ticket-guru-ticketguru-postgres.2.rahtiapp.fi',
        changeOrigin: true,
        secure: false,
      },
      '/tickets': {
        target: 'https://ticket-guru-ticketguru-postgres.2.rahtiapp.fi',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});


