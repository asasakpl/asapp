import Vue from 'vue'
import store from './store'
import Router from 'vue-router'

// Views
import Mail from '@/views/Mail.vue'
import Login from '@/views/Login.vue'
import About from '@/views/About.vue'
import Dashboard from '@/views/Dashboard.vue'
import Settings from '@/views/Settings.vue'
import Users from '@/views/Users.vue'
import User from '@/components/User/User.vue'
import Orders from '@/views/Orders.vue'
import Sellers from '@/views/Sellers.vue'
import NewProduct from '@/components/Products/NewProduct.vue'
import Products from '@/views/Products.vue'
import Product from '@/components/Products/Product.vue'
import Order from '@/components/Orders/Order.vue'
import DashboardLayout from '@/layouts/DashboardLayout.vue'

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
      name: '',
      component: DashboardLayout,
      beforeEnter: ifAuthenticated,
      children: [
        {
          path: '',
          name: 'dashboard',
          component: Dashboard,
          beforeEnter: ifAuthenticated
        },
        {
          path: '/orders',
          name: 'orders',
          component: Orders,
          beforeEnter: ifAuthenticated
        },
        {
          path: '/orders/:id',
          name: 'order',
          component: Order,
          beforeEnter: ifAuthenticated
        },
        {
          path: '/users',
          name: 'users',
          component: Users,
          beforeEnter: ifAuthenticated
        },
        {
          path: '/users/:id',
          name: 'user',
          component: User,
          beforeEnter: ifAuthenticated
        },
        {
          path: '/products',
          name: 'products',
          component: Products,
          beforeEnter: ifAuthenticated
        },
        {
          path: '/products/:id',
          name: 'product',
          component: Product,
          beforeEnter: ifAuthenticated
        },
        {
          path: '/product/new',
          name: 'newproducts',
          component: NewProduct,
          beforeEnter: ifAuthenticated
        },
        {
          path: '/sellers',
          name: 'sellers',
          component: Sellers,
          beforeEnter: ifAuthenticated
        },
        {
          path: '/mail',
          name: 'mail',
          component: Mail,
          beforeEnter: ifAuthenticated
        },
        {
          path: '/settings',
          name: 'settings',
          component: Settings,
          beforeEnter: ifAuthenticated
        }
      ]
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
