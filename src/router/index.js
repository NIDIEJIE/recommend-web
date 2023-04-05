import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Manage.vue'),
    redirect: '/recommend',
    children: [
      {
        path: 'recommend',
        name: '',
        component: () => import('../views/Recommend.vue')
      },
      {
        path: 'history',
        name: '历史数据',
        component: () => import('../views/History.vue')
      },
      {
        path: 'center',
        name: '个人中心',
        component: () => import('../views/Center.vue')
      },
      {
        path: 'analysis',
        name: '数据分析',
        component: () => import('../views/Analysis.vue')
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
  next() // 放行路由
})

export default router
