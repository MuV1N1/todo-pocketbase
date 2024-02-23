import { defineConfig } from 'vite'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  base: "/todo-pocketabse/",
  server:{
    proxy:{
        '/api': {
            target: 'https://remember-ring.pockethost.io/',
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
          },
    }
  },
  build:{
    target: 'esnext'
  }
})

