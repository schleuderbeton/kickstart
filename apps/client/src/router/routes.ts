import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') }]
  },
  {
    path: '/timerecords',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Timerecords.vue') }]
  },
  {
    path: '/todos',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Todos.vue') }]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
