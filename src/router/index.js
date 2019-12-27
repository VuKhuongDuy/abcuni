import Vue from 'vue'
import Router from 'vue-router'
// masterdata
import Turn from '@/components/menus_admin/masterdata/Turn'
import Room from '@/components/menus_admin/masterdata/Room'
import Student from '@/components/menus_admin/masterdata/Student'
import SubjectExam from '@/components/menus_admin/masterdata/SubjectExam'
import Regist from '@/components/menus_admin/masterdata/Regist'
import SubjectFull from '@/components/menus_admin/masterdata/SubjectFull'
import User from '@/components/menus_admin/masterdata/User'

// SV
import Dashboard from '@/components/Dashboard'
import Login from '@/components/menus/Login'
import Subject from '@/components/menus/Subject'
import RegisterTest from '@/components/menus/RegisterTest'
import Registed from '@/components/menus/Registed'
import Print from '@/components/menus/Print'
import LayoutPrint from '@/components/menus/LayoutPrint'
import Password from '@/components/menus/Password'
//admin
import DashboardAdmin from '@/components/DashboardAdmin'
import Exam from '@/components/menus_admin/masterdata/Exam'
import PrintStudentOfSubject from '@/components/menus_admin/masterdata/PrintStudentOfSubject'
//superadmin
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
      path: '/',
      component: Dashboard,
      redirect: '/subject',
      children: [
        {
          path: '/password',
          name: 'Password',
          component: Password,
        },
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
          path: '/user/print',
          component: LayoutPrint
        },
      ]
    },
    {
      path: '/admin',
      component: DashboardAdmin,
      redirect: '/regist',
      children:[
        {
          path: '/exam',
          component: Exam,
        },
        {
          path: '/turn',
          component: Turn,
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
          path: '/regist',
          component: Regist,
        },
        {
          path: '/subjectfull',
          component: SubjectFull,
        },
        {
          path: '/user',
          component: User,
        },
        {
          path: '/admin/password',
          name: 'Password',
          component: Password,
        },
        {
          path: '/manage_admin',
          component: ManageAdmin,
        },
      ]
    },
    {
      path: '/print/:exam_id',
      component: Print
    },
    {
      path: '/PrintStudentOfSubject',
      component: PrintStudentOfSubject
    },
  ]
})
