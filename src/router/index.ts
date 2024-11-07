import eventBus from '@/EventBus'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'redirect',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/todo',
    name: 'todo',
    meta: {requireAuth : true},
    component: () => import(/* webpackChunkName: "about" */ '../views/TodoHome.vue')
  },
  {
    path: '/home',
    name: 'home',
    meta: {requireAuth : true},
    component: () => import(/* webpackChunkName: "about" */ '../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'about',
    meta: {requireAuth : true},
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const isReqAuth:boolean | undefined = to.meta?.requireAuth ?? false;
  if(isReqAuth) {
    const token:string | null = localStorage.getItem('token');
    if(token) {
      next()
    } else { 
      next({
        path: '/login',
        name: 'login',
        query: { beforePage: to.path, errMsg: '로그인이 필요합니다.' }
      });
    }
  } else {
    next();
  }
})

router.afterEach((to) => {
  if(to.name === 'login') {
    eventBus.emit('headerEvent', false)
    eventBus.emit('footerEvent', false)
    if(to.query.errMsg) {
      eventBus.emit('modalEvent', { status: 'error', content: to.query.errMsg })
      router.replace({path: to.path, name: to.name, query: { beforePage: to.query.beforePage} })
    }
  } else {
    eventBus.emit('headerEvent', true)
    eventBus.emit('footerEvent', true)
  }
})

export default router
