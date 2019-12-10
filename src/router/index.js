import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Login from '@/components/menus/Login'
import Home from '@/components/menus/Home'
import Subject from '@/components/menus/Subject'
import RegisterTest from '@/components/menus/RegisterTest'
import Registed from '@/components/menus/Registed'
import Print from '@/components/menus/Print'
import HomeAdmin from '@/components/menus/HomeAdmin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      component: Dashboard,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home,
        },
        {
          path: '/registertest',
          name: 'Registertest',
          component: RegisterTest
        },
        {
          path: '/subject',
          name: 'Subject',
          component: Subject
        },
        {
          path: '/registed',
          name: 'Registed',
          component: Registed
        },
        {
          path: '/print',
          name: 'Print',
          component: Print
        },
        {
          path: '/homeadmin',
          name:'HomeAdmin',
          component: HomeAdmin
        }
      ]
    }
  ]
})
