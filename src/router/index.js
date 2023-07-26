import Vue from 'vue'
import Router from 'vue-router'

import Cart from '@/components/Cart'
import Menu from '@/components/Menu'
import Admin from '@/components/Admin'
import Contacts from '@/components/Contacts'
import Login from '@/components/Login'
import About from '@/components/About'
import Delivery from '@/components/Delivery'
import MenuWeek from '@/components/menuWeek'
import Corporate from '@/components/Corporate'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: Menu
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: Contacts
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/delivery',
      name: 'Delivery',
      component: Delivery
    },
    {
      path: '/menu-week',
      name: 'MenuWeek',
      component: MenuWeek
    },
    {
      path: '/korp-eda',
      name: 'Corporate',
      component: Corporate
    }
  ]
})

export default router