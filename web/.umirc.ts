import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {},
  conventionLayout: false,
  routes: [
    {
      path: '/',
      redirect: '/dashboard/workspace',
    },
    {
      name: '仪表盘',
      path: '/dashboard',
      routes: [
        {
          name: '工作台',
          path: '/dashboard/workspace',
          component: './dashboard/Workspace',
        },
        {
          name: '数据面板',
          path: '/dashboard/dataPanel',
          component: './dashboard/DataPanel',
        },
      ],
    },
    {
      name: '系统管理',
      path: '/system',
      routes: [
        {
          name: '用户管理',
          path: '/system/user',
          component: './system/User',
        },
        {
          name: '角色管理',
          path: '/system/role',
          component: './system/Role',
        },
      ],
    },
    {
      name: '运维管理',
      path: '/operation',
      routes: [
        {
          name: '日志管理',
          path: '/operation/logger',
          component: './operation/Logger',
        },
        {
          name: '设备管理',
          path: '/operation/device',
          component: './operation/Device',
        },
        {
          name: '用户反馈',
          path: '/operation/feedback',
          component: './operation/Feedback',
        },
      ],
    },
    {
      name: '认证管理',
      path: '/verify',
      routes: [
        {
          name: '企业认证',
          path: '/verify/company',
          component: './verify/Company',
        },
        {
          name: '服务商认证',
          path: '/verify/provider',
          component: './verify/Provider',
        },
      ],
    },
  ],
  npmClient: 'pnpm',
});
