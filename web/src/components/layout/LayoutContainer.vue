<script setup lang="ts">
import AsideMenu from "./AsideMenu.vue";
import CopyRight from "./CopyRight.vue";
import { reactive, computed } from "vue";
import {
  Expand,
  Fold,
  Setting,
  FullScreen,
  Refresh,
  Search,
} from "@element-plus/icons-vue";
import type { SettingType } from "@/types";

const data = reactive({
  settingDrawer: false,
  collapseMenu: false,
});

const settingData: SettingType = reactive({
  menuMode: "group",
  openFooter: true,
  primaryColor: "#409EFF",
});

const asideWidth = computed(() => {
  return data.collapseMenu ? "64px" : "300px";
});

const beforeClose = () => {
  data.settingDrawer = false;
};

const handleOpen = () => {
  console.log("打开了抽屉");
};

const handleClosed = () => {
  console.log("关闭了抽屉");
};
</script>

<template>
  <el-container style="height: 100vh">
    <el-aside :width="asideWidth" style="transition: width 0.3s">
      <AsideMenu :collapse="data.collapseMenu" :mode="settingData.menuMode" />
    </el-aside>
    <el-container style="height: 100vh">
      <el-header style="border-bottom: 1px solid #f1f2f3">
        <el-row style="height: 100%" justify="space-between" align="middle">
          <el-space>
            <el-icon
              color="#7F7F7F"
              @click="data.collapseMenu = !data.collapseMenu"
              ><component :is="data.collapseMenu ? Expand : Fold"
            /></el-icon>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item>首页</el-breadcrumb-item>
            </el-breadcrumb>
          </el-space>
          <el-space size="large">
            <div class="icon_btn">
              <el-tooltip
                class="box-item"
                effect="dark"
                content="快捷搜索"
                placement="bottom"
              >
                <el-icon><Search /></el-icon>
              </el-tooltip>
            </div>
            <div class="icon_btn">
              <el-tooltip
                class="box-item"
                effect="dark"
                content="清理缓存"
                placement="bottom"
              >
                <el-icon><Refresh /></el-icon>
              </el-tooltip>
            </div>
            <div class="icon_btn">
              <el-tooltip
                class="box-item"
                effect="dark"
                content="系统设置"
                placement="bottom"
              >
                <el-icon
                  ><Setting @click="data.settingDrawer = true"
                /></el-icon>
              </el-tooltip>
            </div>
            <div class="icon_btn">
              <el-tooltip
                class="box-item"
                effect="dark"
                content="全屏"
                placement="bottom"
              >
                <el-icon><FullScreen /></el-icon>
              </el-tooltip>
            </div>

            <el-dropdown>
              <el-avatar style="cursor: pointer"> user </el-avatar>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>用户中心</el-dropdown-item>
                  <el-dropdown-item divided>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </el-space>
        </el-row>
      </el-header>
      <el-main style="flex: 1">Main</el-main>
      <el-footer v-if="settingData.openFooter"><CopyRight /></el-footer>
    </el-container>
  </el-container>
  <el-drawer
    v-model="data.settingDrawer"
    title="系统设置"
    size="256"
    direction="rtl"
    :before-close="beforeClose"
    @open="handleOpen"
    @close="handleClosed"
  >
    <el-divider content-position="left">导航模式</el-divider>
    <el-space>
      <el-tooltip
        class="box-item"
        effect="dark"
        content="层级菜单"
        placement="top"
      >
        <div class="outline" @click="settingData.menuMode = 'level'">
          <img
            style="width: 60px; height: 60px"
            src="@/assets/svg/level-menu.svg"
            alt="层级菜单"
          />
          <div class="menu-flag" v-show="settingData.menuMode === 'level'">
            <el-icon class="check-icon"><Check /></el-icon>
          </div>
        </div>
      </el-tooltip>

      <el-tooltip
        class="box-item"
        effect="dark"
        content="分组菜单"
        placement="top"
      >
        <div class="outline" @click="settingData.menuMode = 'group'">
          <img
            src="@/assets/svg/group-menu.svg"
            style="width: 60px; height: 60px"
            alt="分组菜单"
          />
          <div class="menu-flag" v-show="settingData.menuMode === 'group'">
            <el-icon class="check-icon"><Check /></el-icon>
          </div>
        </div>
      </el-tooltip>
    </el-space>
    <el-divider content-position="left">布局选项</el-divider>
    <el-row justify="space-between" align="middle">
      <span class="label">开启footer</span>
      <el-switch v-model="settingData.openFooter" />
    </el-row>
    <el-divider content-position="left">主题配置</el-divider>
    <el-row justify="space-between" align="middle">
      <span class="label">主题颜色</span>
      <el-color-picker v-model="settingData.primaryColor" show-alpha />
    </el-row>
    <el-divider></el-divider>
    <el-space style="width: 100%" :fill="true" direction="vertical">
      <el-button type="primary">拉取云端配置</el-button>
      <el-button type="primary">备份至云端</el-button>
      <el-button>恢复默认配置</el-button>
    </el-space>
  </el-drawer>
</template>

<style scoped>
:global(.el-drawer__header) {
  margin-bottom: 0;
}
:global(.el-drawer__body) {
  padding: 0 10px;
}
.label {
  font-size: 14px;
}
.icon_btn {
  margin-right: 6px;
  border-radius: 6px;
  transition: transform 0.2s linear;
}
.icon_btn:hover {
  transform: scale(1.2);
}

.outline {
  position: relative;
  cursor: pointer;
}
.menu-flag {
  position: absolute;
  right: 10px;
  bottom: 20px;
}
.check-icon {
  color: var(--el-color-primary);
}
</style>
