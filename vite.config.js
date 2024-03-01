import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { quasar, transformAssetUrls } from '@quasar/vite-plugin'

export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    quasar({
      sassVariables: 'src/assets/css/quasar-variables.sass'
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target:
          'https://data.gcis.nat.gov.tw/od/data/api/FCB90AB1-E382-45CE-8D4F-394861851E28?$format=json',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      '/bpi': {
        target: 'https://jsonplaceholder.typicode.com/todos',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/bpi/, '')
      },
      '/cpi': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/cpi/, '')
      }
    }
  }
})
