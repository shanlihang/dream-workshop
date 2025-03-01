import { ExpandOutlined, LogoutOutlined, MessageOutlined, QuestionCircleOutlined, SearchOutlined, SettingOutlined, SyncOutlined } from '@ant-design/icons';
import { RunTimeLayoutConfig, useModel } from '@umijs/max';
import { Dropdown, Flex, Input, Tooltip, Typography } from 'antd';
import { useState } from 'react';

const { Text } = Typography;

export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'slh' };
}

export const layout: RunTimeLayoutConfig = () => {
  const { pageLoading, setPageLoading, menuPosition, menuType } = useModel('layout');
  const [menuCollapsed, setMenuCollapsed] = useState(false);

  return {
    title: '梦想工坊',
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    menu: {
      locale: false,
    },
    avatarProps: {
      src: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      size: 'small',
      title: '七妮妮',
      render: (props, dom) => {
        return (
          <Dropdown
            placement="bottom"
            menu={{
              items: [
                {
                  key: 'setting',
                  icon: <SettingOutlined />,
                  label: '个人设置',
                },
                {
                  key: 'logout',
                  icon: <LogoutOutlined />,
                  label: '退出登录',
                  danger: true,
                },
              ],
            }}
          >
            {dom}
          </Dropdown>
        );
      },
    },
    siderMenuType: menuType,
    layout: menuPosition,
    loading: pageLoading,
    actionsRender: (props) => {
      if (props?.isMobile) return null;
      return [
        props?.layout !== 'side' ? (
          <Input
            style={{
              borderRadius: 4,
              marginInlineEnd: 12,
              backgroundColor: 'rgba(0,0,0,0.03)',
            }}
            prefix={
              <SearchOutlined
                style={{
                  color: 'rgba(0, 0, 0, 0.15)',
                }}
              />
            }
            placeholder="搜索"
            variant="borderless"
          />
        ) : undefined,
        <Tooltip title="帮助中心">
          <QuestionCircleOutlined />
        </Tooltip>,
        <Tooltip title="清理缓存">
          <SyncOutlined />
        </Tooltip>,
        <Tooltip title="全屏">
          <ExpandOutlined />
        </Tooltip>,
        <Tooltip title="通知">
          <MessageOutlined />
        </Tooltip>,
      ];
    },
    menuFooterRender: (menuProps) => {
      if (menuProps?.collapsed) return null;

      return (
        <Flex justify="center">
          <Text type="secondary">Ant Design ({String(menuCollapsed)})</Text>
        </Flex>
      );
    },
    onCollapse: (collapsed) => {
      setMenuCollapsed(collapsed);
    },
    onPageChange: () => {
      setPageLoading(true);
      setTimeout(() => {
        setPageLoading(false);
      }, 500);
    },
  };
};
