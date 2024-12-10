import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  const port = env.VITE_PORT
  const isDev = !!env.DEV
  return {
    base: './',
    server: {
      host: '0.0.0.0',
      port,
    },
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
          }
        }
      })
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      }
    },
    // 落地页
    build: {
      cssCodeSplit: false,
      rollupOptions: {
        output: {
          // format: 'iife',
          // entryFileNames: 'assets/index-[hash].js',
          // manualChunks: undefined
          // manualChunks() {
          //   return 'everything'
          // }
          manualChunks: {
            vue: ['vue', 'vue-router', 'pinia', '@vueuse/core'],
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
        }
      }
    }
  }
})
