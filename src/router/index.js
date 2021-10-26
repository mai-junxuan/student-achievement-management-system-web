import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/teacher',
    component: Layout,
    name: 'teacherManage',
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/teacher/list'),
        meta: { title: '教师管理 ', icon: 'table' }
      }
    ]
  },
  {
    path: '/student',
    component: Layout,
    name: 'studentManage',
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/student/list'),
        meta: { title: '学生管理 ', icon: 'table' }
      }
    ]
  },
  {
    path: '/course',
    component: Layout,
    name: 'courseManage',
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/course/list'),
        meta: { title: '课程管理 ', icon: 'table' }
      }
    ]
  },
  {
    path: '/dict',
    component: Layout,
    name: 'courseManage',
    redirect: '/list',
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/dict/list'),
        meta: { title: '字典管理 ', icon: 'table' }
      },
      {
        path: 'list',
        name: 'List',
        hidden: true,
        component: () => import('@/views/dict/data'),
        meta: { title: '课程管理 ', icon: 'table' }
      }
    ]
  },
  {
    path: '/log',
    component: Layout,
    name: 'log',
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/log/list'),
        meta: { title: '查看日志 ', icon: 'table' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
