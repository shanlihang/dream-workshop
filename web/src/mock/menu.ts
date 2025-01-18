export const menu = [
  {
    id: "1",
    label: "工作台",
    icon: "DataLine",
    href: "/dashboard",
    children: [],
  },
  {
    id: "2",
    label: "系统管理",
    icon: "Monitor",
    href: "/system",
    children: [
      {
        id: "3",
        label: "用户管理",
        icon: "User",
        href: "/system/user",
        children: [],
      },
      {
        id: "4",
        label: "角色管理",
        icon: "Operation",
        href: "/system/role",
        children: [],
      },
      {
        id: "5",
        label: "权限管理",
        icon: "Connection",
        href: "/system/permission",
        children: [],
      },
    ],
  },
  {
    id: "6",
    label: "运维管理",
    icon: "Odometer",
    href: "/maintenance",
    children: [
      {
        id: "7",
        label: "日志管理",
        icon: "Document",
        href: "/maintenance/log",
        children: [],
      },
      {
        id: "8",
        label: "反馈管理",
        icon: "Notebook",
        href: "/maintenance/feedback",
        children: [],
      },
      {
        id: "9",
        label: "服务器管理",
        icon: "Cpu",
        href: "/maintenance/server",
        children: [],
      },
    ],
  },
];
