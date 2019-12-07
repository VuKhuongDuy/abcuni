import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import Home from '@/components/Home'
import RegisterTest from '@/components/RegisterTest'

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
        }
      ]
      // children: [
      //   {
      //     path:
      //   }
      // ]
    }
  ]
})
