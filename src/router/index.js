import { createRouter, createWebHistory } from 'vue-router'
import { useRoutes } from './routes'
import NProgress from '@/components/nprogress'

export default (store) => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      ...useRoutes(),
    ]
  })

  router.beforeEach((from, to, next) => {
    NProgress.start()

    // 客户端动态设置页面title
    if (from.meta.title) {
      document.title = from.meta.title
    }
    next()
  })

  router.afterEach((to, from) => {
    NProgress.end()
  })

  return router
}
