import { defineConfig } from 'vite'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  server:{
    proxy:{
        '/api': {
            target: 'http://127.0.0.1:8090',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
    }
  }
})