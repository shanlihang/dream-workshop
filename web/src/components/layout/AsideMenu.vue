<script lang="ts" setup>
import { menu } from "@/mock/menu.ts";

const props = defineProps<{
  collapse: boolean;
  mode: "level" | "group";
}>();

const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<template>
  <el-menu
    style="height: 100%"
    default-active="1"
    :collapse="props.collapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <el-menu-item index="0">
      <img
        style="width: 24px; margin-right: 12px"
        src="https://lf-web-assets.juejin.cn/obj/juejin-web/xitu_juejin_web/6c61ae65d1c41ae8221a670fa32d05aa.svg"
        alt="Element logo"
      />
      <span>梦想工坊后台管理系统</span>
    </el-menu-item>
    <template v-if="props.mode === 'level'">
      <template v-for="item in menu" :key="item.id">
        <el-sub-menu v-if="item.children.length != 0" :index="item.id">
          <template #title>
            <el-icon><component :is="item.icon" /></el-icon>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item v-for="subItem in item.children" :index="subItem.id"
            ><el-icon><component :is="subItem.icon" /></el-icon>
            <span>{{ subItem.label }}</span></el-menu-item
          >
        </el-sub-menu>
        <el-menu-item :index="item.id" v-else>
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </template>
    </template>
    <template v-else>
      <template v-for="item in menu" :key="item.id">
        <el-menu-item-group
          v-if="item.children.length != 0"
          :index="item.id"
          :title="item.label"
        >
          <el-menu-item v-for="subItem in item.children" :index="subItem.id"
            ><el-icon><component :is="subItem.icon" /></el-icon>
            <span>{{ subItem.label }}</span></el-menu-item
          >
        </el-menu-item-group>
        <el-menu-item :index="item.id" v-else>
          <el-icon><component :is="item.icon" /></el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </template>
    </template>
  </el-menu>
</template>

<style scoped></style>
