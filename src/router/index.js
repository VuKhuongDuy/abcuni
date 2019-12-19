import Vue from 'vue'
import Router from 'vue-router'
// masterdata
import Room from '@/components/menus_admin/masterdata/Room'
import Student from '@/components/menus_admin/masterdata/Student'
import SubjectExam from '@/components/menus_admin/masterdata/SubjectExam'
import Kar98 from '@/components/menus_admin/masterdata/Kar98'
import SubjectFull from '@/components/menus_admin/masterdata/SubjectFull'
import User from '@/components/menus_admin/masterdata/User'
import NotEnough from '@/components/menus_admin/masterdata/NotEnough'
// SV
import Dashboard from '@/components/Dashboard'
import Login from '@/components/menus/Login'
import LoginTest from '@/components/menus/LoginTest'
import Subject from '@/components/menus/Subject'
import RegisterTest from '@/components/menus/RegisterTest'
import Registed from '@/components/menus/Registed'
import Print from '@/components/menus/Print'
//admin
import DashboardAdmin from '@/components/DashboardAdmin'
import exam from '@/components/menus_admin/exam'
import HomeAdmin from '@/components/menus_admin/HomeAdmin'
//superadmin
import DashboardSuperAdmin from '@/components/DashboardSuperAdmin'
import SuperAdmin from '@/components/menu_super_admin/SuperAdmin'
import ManageAdmin from '@/components/menu_super_admin/ManageAdmin'



Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/lt',
      component:LoginTest,
    },
    {
      path: '/',
      component: Dashboard,
      redirect: '/subject',
      children: [
        // {
        //   path: '/home',
        //   name: 'Home',
        //   props: true,
        //   component: Home,
        // },
        {
          path: '/registertest',
          component: RegisterTest
        },
        {
          path: '/subject',
          component: Subject
        },
        {
          path: '/registed',
          component: Registed
        },
        {
          path: '/print',
          component: Print
        },
      ]
    },
    {
      path: '/admin',
      component: DashboardAdmin,
      redirect: '/exam',
      children:[
        {
          path: '/exam',
          component: exam,
        },
        {
          path: '/room',
          component: Room,
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
    },
    {
      path: '/sa',
      component: DashboardSuperAdmin,
      redirect: '/superadmin',
      children:[
        {
          path: '/superadmin',
          component: SuperAdmin,
        },
        {
          path: '/manage_admin',
          component: ManageAdmin,
        },
      ]
    }
  ]
})
