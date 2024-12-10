import './assets/styles/main.scss'
import './assets/styles/style.scss'
import './assets/styles/icon.scss'
import { createApp } from 'vue'
import App from './App.vue'
import createRouter from './router'
import store, { globalStore } from '@/store'
import createDirectives from './directives'

!(async () => {
  const app = createApp(App)

  globalStore.asyncData()

  createDirectives(app)
  app.use(store)

  const router = createRouter(store)
  app.use(router)

  router.isReady().then(() => {
    app.mount('#app')
  })
})();