import Vue from 'vue'
import Router from 'vue-router'
// masterdata
import Infrastructure from '@/components/menus_admin/masterdata/Infrastructure'
import Student from '@/components/menus_admin/masterdata/Student'
import SubjectExam from '@/components/menus_admin/masterdata/SubjectExam'
import Kar98 from '@/components/menus_admin/masterdata/Kar98'
import SubjectFull from '@/components/menus_admin/masterdata/SubjectFull'
import User from '@/components/menus_admin/masterdata/User'
import NotEnough from '@/components/menus_admin/masterdata/NotEnough'
// not admin
import Dashboard from '@/components/Dashboard'
import Login from '@/components/menus/Login'
import Home from '@/components/menus/Home'
import Subject from '@/components/menus/Subject'
import RegisterTest from '@/components/menus/RegisterTest'
import Registed from '@/components/menus/Registed'
import Print from '@/components/menus/Print'
//admin
import DashboardAdmin from '@/components/DashboardAdmin'
import TestExam from '@/components/menus_admin/TestExam'
import HomeAdmin from '@/components/menus_admin/HomeAdmin'


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
      ]
    },
    {
      path: '/admin',
      component: DashboardAdmin,
      redirect: '/homeadmin',
      children:[
        {
          path: '/homeadmin',
          name: 'homeadmin',
          component: HomeAdmin,
        },
        {
          path: '/testexam',

          component: TestExam,
        },
        {
          path: '/infrastructure',
          component: Infrastructure,
        },
        {
          path: '/subjectexam',
          component: SubjectExam,
        },
        {
          path: '/student',
          component: Student,
        },
        {
          path: '/notenough',
          component: NotEnough,
        },
        {
          path: '/ca',
          component: Kar98,
        },
        {
          path: '/subjectfull',
          component: SubjectFull,
        },
        {
          path: '/user',
          component: User,
        },

      ]
    }
  ]
})
