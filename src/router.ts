import Vue from 'vue'
import store from './store'
import Router from 'vue-router'
import Login from './views/Login.vue'
import About from './views/About.vue'
import Dashboard from './views/Dashboard.vue'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: About
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,

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