import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import studentData from "@/views/course/studentData";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/',
    name: 'StudentData',
    component: Layout,
    children: [{
      path: 'studentData/:courseId',
      component: () => import('@/views/course/studentData'),
      meta: {title: '课程学生 ', noCache: true},
      hidden: true
    }],
  },
  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]
export const asyncRoutes = [
  {
    path: '/teacher',
    component: Layout,
    name: 'teacherManage',
    meta: {title: '教师管理 ', icon: 'teacher', roles: ['ADMIN']},
    children: [
      {
        path: 'list',
        name: 'teacherList',
        component: () => import('@/views/teacher/list'),
        meta: {title: '教师管理 ', icon: 'teacher', roles: ['ADMIN']}
      }
    ]
  },
  {
    path: '/student',
    component: Layout,
    name: 'studentManage',
    meta: {title: '学生管理 ', icon: 'student', roles: ['ADMIN']},
    children: [
      {
        path: 'list',
        name: 'studentList',
        component: () => import('@/views/student/list'),
        meta: {title: '学生管理 ', icon: 'student', roles: ['ADMIN']}
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    name: 'courseManage',
    meta: {title: '课程管理 ', icon: 'course', roles: ['ADMIN']},
    children: [
      {
        path: 'list',
        name: 'courseList',
        component: () => import('@/views/course/list'),
        meta: {title: '课程管理 ', icon: 'course', roles: ['ADMIN']}
      },

    ]
  },
  {
    path: '/major',
    component: Layout,
    name: 'majorManage',
    meta: {title: '专业管理 ', icon: 'major', roles: ['ADMIN']},
    children: [
      {
        path: 'list',
        name: 'majorList',
        component: () => import('@/views/major/list'),
        meta: {title: '专业管理', icon: 'major', roles: ['ADMIN']}
      }
    ]
  },
  {
    path: '/myCourse',
    component: Layout,
    name: 'majorManage',
    meta: {title: '我的课程', icon: 'course',roles: ['TEACHER']},
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/course/myCourse'),
        meta: {title: '课程列表', icon: 'course', roles: ['TEACHER']},
      },


    ]
  }
]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
