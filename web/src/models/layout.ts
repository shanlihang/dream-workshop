import { useState } from 'react';

interface Settings {
  colorPrimary: string;
  layout: 'side' | 'top' | 'mix';
  contentWidth: 'Fluid' | 'Fixed';
  fixedHeader: boolean;
  fixSiderbar: boolean;
  menu: { locale: boolean };
  title: string;
  pwa?: boolean;
  iconfontUrl: string;
  colorWeak: boolean;
}

const useLayout = () => {
  const [pageLoading, setPageLoading] = useState(false); // 页面加载状态
  const [menuPosition, setMenuPosition] = useState<'side' | 'top' | 'mix'>('mix'); // 菜单布局
  const [menuType, setMenuType] = useState<'sub' | 'group'>('sub'); // 菜单类型
  const [layoutSetting, setLayoutSetting] = useState<Settings>({
    colorPrimary: '#1890ff',
    layout: 'side',
    contentWidth: 'Fluid',
    fixedHeader: false,
    fixSiderbar: false,
    menu: { locale: false },
    title: 'Ant Design Pro',
    pwa: false,
    iconfontUrl: '',
    colorWeak: false,
  }); // 布局设置
  return {
    pageLoading,
    menuType,
    menuPosition,
    layoutSetting,
    setPageLoading,
    setMenuType,
    setMenuPosition,
    setLayoutSetting,
  };
};

export default useLayout;
