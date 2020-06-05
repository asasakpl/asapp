import Vue from 'vue'
import store from './store'
import Router from 'vue-router'

// Login page
import Login from '@/pages/Login/Index.vue'

// About page
import About from '@/pages/About/Index.vue'

// Admin
import Admins from '@/pages/Admins/Index.vue'
import Admin from '@/pages/Admins/_id.vue'
import NewAdmin from '@/pages/Admins/New.vue'

// Mailing
import Mail from '@/pages/Mailing/Index.vue'
import M35 from '@/pages/Mailing/m35/Index.vue'
import NewM35 from '@/pages/Mailing/m35/New.vue'
import Asasak from '@/pages/Mailing/asasak/Index.vue'
import NewAsasak from '@/pages/Mailing/asasak/New.vue'
import NewAsasakSubscriber from '@/pages/Mailing/asasak/Subscribers/New.vue'
import AsasakSubscribers from '@/pages/Mailing/asasak/Subscribers/Index.vue'

// Product
import Products from '@/pages/Products/Index.vue'
import ProductsList from '@/pages/Products/List/List.vue'
import Product from '@/pages/Products/List/_id.vue'
import NewProduct from '@/pages/Products/New.vue'

// Shipping
import Shipping from '@/pages/Shipping/Index.vue'
import NewShipping from '@/pages/Shipping/New.vue'
import ShippingMethod from '@/pages/Shipping/_id.vue'

// Payments
import Payments from '@/pages/Payments/Index.vue'
import Payment from '@/pages/Payments/_id.vue'
import NewPayment from '@/pages/Payments/New.vue'

// Order
import Orders from '@/pages/Orders/Index.vue'
import Order from '@/pages/Orders/_id.vue'

// Dashboard
import Dashboard from '@/pages/Dashboard/Index.vue'

// Changelog
import Changelog from '@/pages/Changelog/Index.vue'

// Settings
import Settings from '@/pages/Settings/Index.vue'

// User
import Users from '@/pages/Users/Index.vue'
import User from '@/pages/Users/_id.vue'

// Sellers
import Sellers from '@/pages/Sellers/Index.vue'

// Layouts
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
      component: Login
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
          component: DashboardLayout,
          children: [
            {
              path: '',
              name: 'orders',
              component: Orders,
              beforeEnter: ifAuthenticated
            },
            {
              path: '/orders/:id',
              name: 'order',
              component: Order,
              beforeEnter: ifAuthenticated
            }
          ]
        },
        {
          path: '/users',
          component: DashboardLayout,
          children: [
            {
              path: '',
              name: 'users',
              component: Users,
              beforeEnter: ifAuthenticated
            },
            {
              path: '/users/:id',
              name: 'user',
              component: User,
              beforeEnter: ifAuthenticated
            }
          ]
        },
        {
          path: '/products',
          component: DashboardLayout,
          children: [
            {
              path: '',
              name: 'products',
              component: Products,
              beforeEnter: ifAuthenticated
            },
            {
              path: '/list',
              name: 'products_list',
              component: ProductsList,
              beforeEnter: ifAuthenticated
            },
            {
              path: '/products/new',
              name: 'newproducts',
              component: NewProduct,
              beforeEnter: ifAuthenticated
            },
            {
              path: '/products/:id',
              name: 'product',
              component: Product,
              beforeEnter: ifAuthenticated
            }
          ]
        },
        {
          path: '/payments',
          component: DashboardLayout,
          children: [
            {
              path: '',
              name: 'payments',
              component: Payments,
              beforeEnter: ifAuthenticated
            },
            {
              path: '/payments/new',
              name: 'new_payment',
              component: NewPayment,
              beforeEnter: ifAuthenticated
            },
            {
              path: '/payments/:id',
              name: 'payment',
              component: Payment,
              beforeEnter: ifAuthenticated
            }
          ]
        },
        {
          path: '/shipping',
          component: DashboardLayout,
          children: [
            {
              path: '',
              name: 'shipping',
              component: Shipping,
              beforeEnter: ifAuthenticated
            },
            {
              path: '/shipping/new',
              name: 'new_shipping',
              component: NewShipping,
              beforeEnter: ifAuthenticated
            },
            {
              path: '/shipping/:id',
              name: 'shipping_method',
              component: ShippingMethod,
              beforeEnter: ifAuthenticated
            }
          ]
        },
        {
          path: '/sellers',
          component: DashboardLayout,
          children: [
            {
              path: '',
              name: 'sellers',
              component: Sellers,
              beforeEnter: ifAuthenticated
            }
          ]
        },
        {
          path: '/mail',
          component: DashboardLayout,
          children: [
            {
              path: '',
              name: 'mail',
              component: Mail,
              beforeEnter: ifAuthenticated
            }
          ]
        },
        {
          path: '/asasak',
          component: DashboardLayout,
          children: [
            {
              path: '',
              name: 'asasak',
              component: Asasak,
              beforeEnter: ifAuthenticated
            },
            {
              path: '/asasak/new',
              name: 'new_asasak',
              component: NewAsasak,
              beforeEnter: ifAuthenticated
            },
            {
              path: '/asasak/subscribers',
              name: 'asasak_subscribers',
              beforeEnter: ifAuthenticated,
              component: AsasakSubscribers
            },
            {
              path: '/asasak/subscribers/new',
              name: 'asasak_new_subscriber',
              beforeEnter: ifAuthenticated,
              component: NewAsasakSubscriber
            }
          ]
        },
        {
          path: '/m35',
          component: DashboardLayout,
          children: [
            {
              path: '',
              name: 'm35',
              component: M35,
              beforeEnter: ifAuthenticated
            },
            {
              path: '/m35/new',
              name: 'new_m35',
              component: NewM35,
              beforeEnter: ifAuthenticated
            }
          ]
        },
        {
          path: '/admins',
          component: DashboardLayout,
          children: [
            {
              path: '',
              name: 'admins',
              component: Admins,
              beforeEnter: ifAuthenticated
            },
            {
              path: '/admins/new',
              name: 'newadmin',
              component: NewAdmin,
              beforeEnter: ifAuthenticated
            },
            {
              path: '/admins/:id',
              name: 'admin',
              component: Admin,
              beforeEnter: ifAuthenticated
            }
          ]
        },
        {
          path: '/settings',
          name: 'settings',
          component: Settings,
          beforeEnter: ifAuthenticated
        },
        {
          path: '/changelog',
          name: 'changelog',
          component: Changelog,
          beforeEnter: ifAuthenticated
        }
      ]
    }
  ]
})

export default router
