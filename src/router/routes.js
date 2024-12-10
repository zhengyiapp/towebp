export const useRoutes = () => {
  const routes = [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/index.vue'),
      meta: { title: '图片批量转webp - 动力猿 dly6.com 出品', keepAlive: true },
    },
    // {
    //   path: '/:pathMatch(.*)',
    //   redirect: '/404',
    //   hidden: true
    // },
  ]

  if (import.meta.env.DEV) {
    routes.push({
      path: '/_test',
      name: '_test',
      component: () => import('@/pages/_test.vue'),
      meta: { title: 'test', layout: 'Blank' },
    })
  }

  return routes
}

export default useRoutes