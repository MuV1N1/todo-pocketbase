import { defineConfig } from 'vite'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  base: "/todo-pocketabse/",
  server:{
    proxy:{
        '/api': {
            target: 'http://45.93.251.164:8090',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
    }
  },
  build:{
    target: 'esnext'
  }
})

