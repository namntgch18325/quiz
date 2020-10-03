import Vue from 'vue';
import Router from 'vue-router';

/**
 * Layzloading will create many files and slow on compiling, so best not to use lazyloading on devlopment.
 * The syntax is lazyloading, but we convert to proper require() with babel-plugin-syntax-dynamic-import
 * @see https://doc.laravue.dev/guide/advanced/lazy-loading.html
 */

Vue.use(Router);

/* Layout */
import Layout from '@/layout';

/* Router for modules */

import adminRoutes from './modules/admin';
// import permissionRoutes from './modules/permission';
/**
 * Sub-menu only appear when children.length>=1
 * @see https://doc.laravue.dev/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin', 'editor']   Visible for these roles only
    permissions: ['view menu zip', 'manage user'] Visible for these permissions only
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb (default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/
import errorRouter from './modules/error';

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index'),
      },
      {
        path: '/profile',
        component: () => import('@/views/Profile/index'),
        name: 'Profile',
        meta: {
          title: 'profile',
        },
        hidden: true,
      },
      {
        path: '/users',
        component: () => import('@/views/users/List'),
        name: 'UserList',
        meta: { title: 'users', icon: 'user', permissions: ['manage user'] },
      },
      {
        path: '/roles',
        component: () => import('@/views/role-permission/List'),
        name: 'RoleList',
        meta: { title: 'rolePermission', icon: 'role', permissions: ['manage permission'] },
      },
    ],
  },
  {
    path: '/azurelogin',
    component: () => import('@/views/redirect/azure/index'),
    name: 'azurelogin',
    hidden: true,
    meta: { title: 'azurelogin', icon: 'dashboard', noCache: false },
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true,
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/AuthRedirect'),
    hidden: true,
  },
  {
    path: '/404',
    redirect: { name: 'Page404' },
    component: () => import('@/views/error-page/404'),
    hidden: true,
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true,
  },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: false },
      },
      {
        path: 'classselector',
        component: () => import('@/views/SelectClass/index'),
        name: 'Class Selector',
        hidden: true,
        meta: { title: 'classselector', icon: 'dashboard', noCache: false },
      },
      {
        path: 'surveyselector',
        component: () => import('@/views/SurveySelector/index'),
        name: 'Survey Selector',
        hidden: true,
        meta: { title: 'surveyselector', icon: 'dashboard', noCache: false },
      },
      {
        path: 'quizing',
        component: () => import('@/views/Quizing/index'),
        name: 'Quizing',
        hidden: true,
        meta: { title: 'quizing', icon: 'dashboard', noCache: false },
      },
    ],
  },
  {
    path: '/quiz',
    component: Layout,
    redirect: '/quiz/index',
    meta: {
      permissions: ['view menu quizz'],
    },
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/Quiz/index'),
        name: 'Quiz',
        meta: {
          title: 'listquiz',
          icon: 'documentation',
        },
      },
    ],
  },
  {
    path: '/survey',
    component: Layout,
    redirect: '/survey/index',
    meta: {
      permissions: ['view menu survey'],
    },
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/Survey/index'),
        name: 'Survey',
        meta: {
          title: 'listsurvey',
          icon: 'form',
        },
      },
    ],
  },
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    meta: {
      permissions: ['manage user'],
    },
    hidden: true,
    children: [
      {
        path: 'index',
        component: () => import('@/views/User/index'),
        name: 'User',
        meta: {
          permissions: ['manage user'],
          title: 'user',
          icon: 'admin',
        },
      },
    ],
  },
  {
    path: '/settings',
    component: Layout,
    redirect: 'noredirect',
    name: 'Settings',
    hidden: true,
    meta: {
      permissions: ['view menu setting'],
      title: 'settings',
      icon: 'admin',
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/Settings/Role/index'),
        name: 'Role',
        meta: {
          permissions: ['view menu role'],
          title: 'role',
        },
      },
      {
        path: 'department',
        component: () => import('@/views/Settings/Department/index'),
        name: 'Department',
        meta: {
          permissions: ['view menu department'],
          title: 'department',
        },
      },
      {
        path: 'class',
        component: () => import('@/views/Settings/Class/index'),
        name: 'Class',
        meta: {
          permissions: ['view menu class'],
          title: 'class',
        },
      },
      {
        path: 'tag',
        component: () => import('@/views/Settings/Tag/index'),
        name: 'Tag',
        meta: {
          permissions: ['view menu tag'],
          title: 'tag',
        },
      },
    ],
  },
  errorRouter,
  {
    path: '*',
    redirect: { name: 'Page404' },
  },
];

export const asyncRoutes = [
  adminRoutes,
];

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  base: process.env.MIX_LARAVUE_PATH,
  routes: constantRoutes,
});

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
