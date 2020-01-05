import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import Login from './views/Login.vue'
import About from './views/About.vue'
import Dashboard from './views/Dashboard.vue'
import Default from './layouts/Default.vue'

Vue.use(Router)

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isLoggedIn) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isLoggedIn) {
    next()
    return
  }
  next('/login')
}

let router = new Router({
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter: ifNotAuthenticated
    },
    {
      path: '/about',
      name: 'about',
      component: About,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      beforeEnter: ifAuthenticated
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/login')
  } else {
    next()
  }
})

export default router
