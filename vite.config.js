import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),          // React Fast Refresh & JSX support
    tailwindcss()     // Tailwind CSS v4 integration
  ],
})
