import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Home from '@/components/Home'
import TrangChu from '@/components/menus/TrangChu'
import MonHoc from '@/components/menus/MonHoc'
import DangKy from '@/components/menus/DangKy'
import DanhSach from '@/components/menus/DanhSach'
import InDanhSach from '@/components/menus/InDanhSach'
import HomeAdmin from '@/components/HomeAdmin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name:'Home',
      component: Home,
      // children: [
      //   {
      //     path:
      //   }
      // ]
    },
    {
      path: '/trangchu',
      name: 'TrangChu',
      component: TrangChu
    },
    {
      path: '/monhoc',
      name: 'MonHoc',
      component: MonHoc
    },
    {
      path: '/dangky',
      name: 'DangKy',
      component: DangKy
    },
    {
      path: '/danhsach',
      name: 'DanhSach',
      component: DanhSach
    },
    {
      path: '/indanhsach',
      name: 'InDanhSach',
      component: InDanhSach
    },
    {
      path: '/homeadmin',
      name:'HomeAdmin',
      component: HomeAdmin,
      // children: [
      //   {
      //     path:
      //   }
      // ]
    },
  ]
})
