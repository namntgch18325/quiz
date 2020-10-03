/** When your routing table is too long, you can split it into small modules**/
import Layout from '@/layout';

const adminRoutes = {
  path: '/administrator',
  component: Layout,
  redirect: '/administrator/users',
  name: 'Administrator',
  alwaysShow: true,
  meta: {
    title: 'administrator',
    icon: 'admin',
    permissions: ['view menu administrator'],
  },
  children: [
    /** User managements */
    {
      path: '/quiz',
      redirect: '/quiz/index',
      meta: {
        permissions: ['view menu quizz'],
      },
      children: [
        {
          path: 'index',
          component: () => import('@/views/Quiz/index'),
          meta: {
            title: 'listquiz',
            icon: 'documentation',
          },
        },
      ],
    },
    {
      path: '/survey',
      redirect: '/survey/index',
      meta: {
        permissions: ['view menu survey'],
      },
      children: [
        {
          path: 'index',
          component: () => import('@/views/Survey/index'),
          meta: {
            title: 'listsurvey',
            icon: 'form',
          },
        },
      ],
    },
    {
      path: 'users/edit/:id(\\d+)',
      component: () => import('@/views/users/UserProfile'),
      name: 'UserProfile',
      meta: { title: 'userProfile', noCache: true, permissions: ['manage user'] },
      hidden: true,
    },
    {
      path: '/users',
      component: () => import('@/views/users/List'),
      name: 'UserList',
      meta: { title: 'users', icon: 'user', permissions: ['manage user'] },
    },
    /** Role and permission */
    {
      path: '/roles',
      component: () => import('@/views/role-permission/List'),
      name: 'RoleList',
      meta: { title: 'rolePermission', icon: 'role', permissions: ['manage permission'] },
    },
    {
      path: '/settings',
      redirect: 'noredirect',
      meta: {
        permissions: ['view menu setting'],
        title: 'settings',
        icon: 'admin',
      },
      children: [
        {
          path: 'department',
          component: () => import('@/views/Settings/Department/index'),
          meta: {
            permissions: ['view menu department'],
            title: 'department',
          },
        },
        {
          path: 'class',
          component: () => import('@/views/Settings/Class/index'),
          meta: {
            permissions: ['view menu class'],
            title: 'class',
          },
        },
        {
          path: 'tag',
          component: () => import('@/views/Settings/Tag/index'),
          meta: {
            permissions: ['view menu tag'],
            title: 'tag',
          },
        },
      ],
    },
  ],
};

export default adminRoutes;
