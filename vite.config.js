import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  content: ['./src/**/*.{html,js}'],
  plugins: [react()],
})
