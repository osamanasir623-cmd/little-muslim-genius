import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base must stay './' so the build works on Vercel, Netlify, and from a file path
  base: './',
})
