import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/manage',
    name: '管理',
    component: () => import('../views/Manage.vue'),
    children: [
      {
        path: 'recommend',
        name: '',
        component: () => import('../views/Recommend.vue'),
        meta: {
          requiresAuth: true // 添加 meta 字段，表示该路由需要登录后才能访问
        },
      },
      {
        path: 'history',
        name: '历史数据',
        component: () => import('../views/History.vue'),
        meta: {
          requiresAuth: true // 添加 meta 字段，表示该路由需要登录后才能访问
        },
      },
      {
        path: 'center',
        name: '个人中心',
        component: () => import('../views/Center.vue'),
        meta: {
          requiresAuth: true // 添加 meta 字段，表示该路由需要登录后才能访问
        },
      },
      {
        path: 'analysis',
        name: '数据分析',
        component: () => import('../views/Analysis.vue'),
        meta: {
          requiresAuth: true // 添加 meta 字段，表示该路由需要登录后才能访问
        },
      }
    ]
  },
  {
    path: '/login',
    name: '登录',
    component: () => import('../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  localStorage.setItem('currentPathName', to.name) // 设置当前的路由名称，为了在Header组件中去使用
  store.commit('setPath') // 触发store的数据更新

  // 判断该路由是否需要登录权限
  if (to.meta.requiresAuth) {
    // 从本地存储中获取登录状态信息
    const isAuthenticated = localStorage.getItem('user')
    // 如果用户已经登录，则允许路由跳转
    if (isAuthenticated) {
      next()
    } else { // 否则，跳转到登录页面
      next('/login')
    }
  } else { // 如果该路由不需要登录权限，则直接允许路由跳转
    next()// 放行路由
  }
})

export default router
