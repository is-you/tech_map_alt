import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const prjServerPath = ''

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  return {
    base: command === 'build' ? prjServerPath : '',
    plugins: [react()],
  }
})
