import {  createRouter, createWebHashHistory } from 'vue-router'

// 公共路由
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true
  },
  {
    path: '/home',
    component: () => import('@/views/home'),
    hidden: true
  }
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes: constantRoutes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
});

export default router;
