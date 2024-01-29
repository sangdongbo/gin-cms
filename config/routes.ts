export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/settings',
    name: 'settings',
    access: 'canAdmin',
    icon: 'SettingOutlined',
    routes: [
      {
        path: '/settings/account',
        name: 'account',
        component: './Settings/Account',
      },
      // {
      //   path: '/settings/staff',
      //   name: 'staff',
      //   component: './Settings/Staff',
      // },
      {
        path: '/settings/role',
        name: 'role',
        component: './Settings/Role',
      },
      // {
      //   path: '/settings/permissions',
      //   name: 'permissions',
      //   component: './Settings/Permissions',
      // },
    ],
  },
  {
    path: '/tenant',
    name: 'tenant',
    component: './Tenant',
  },
  {
    path: '/tools',
    name: 'tools',
    component: './Tools',
  },
  {
    path: '/',
    redirect: '/tenant',
  },
  {
    path: '*',
    layout: false,
    component: './404',
  },
];
