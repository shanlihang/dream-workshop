import { LogoutOutlined, MessageOutlined, QuestionCircleOutlined, SearchOutlined, SettingOutlined, SyncOutlined } from '@ant-design/icons';
import { RunTimeLayoutConfig, useModel } from '@umijs/max';
import { Dropdown, Input, Tooltip } from 'antd';

export async function getInitialState(): Promise<{ name: string }> {
  return { name: 'slh' };
}

export const layout: RunTimeLayoutConfig = () => {
  const { pageLoading, setPageLoading, menuPosition, menuType } = useModel('layout');

  return {
    title: 'umi',
    logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
    contentStyle: {
      padding: 0,
      margin: 0,
      height: '100vh',
      overflow: 'hidden',
    },
    menu: {
      locale: false,
    },
    breadcrumbRender: false,
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
    layout: 'side',
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
        <Tooltip title="通知">
          <MessageOutlined />
        </Tooltip>,
      ];
    },
  };
};
