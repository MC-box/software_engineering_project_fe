<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible >
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item key="1" @click="router.push({ name : 'home' })">
          <pie-chart-outlined />
          <!-- <span><router-link to="/page/Home.vue">主页面</router-link></span>
           -->
          <span>主页面</span>
        </a-menu-item>
        <a-menu-item key="2" @click="router.push({ name : 'execenter' })">
          <desktop-outlined />
          <span>查看题库</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>Course</span>
            </span>
          </template>
          <!-- <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item> -->
          <a-menu-item v-for="course in courses" :key=course.key @click="router.push({ name : 'execenter' , params: {id: course.key }})">{{course.name}}</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <template #title>
            <span>
              <team-outlined />
              <span>Team</span>
            </span>
          </template>
          <a-menu-item key="6">Team 1</a-menu-item>
          <a-menu-item key="8">Team 2</a-menu-item>
        </a-sub-menu>
        <a-menu-item key="9" @click="router.push({ name : 'discenter' })">
          <file-outlined />
          <span>交流区</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0" >
        <!-- <span style="padding-right: 20px;"><a-divider type="vertical" style="height: 20px"/></span> -->
        <span class="icon" style="font-size: 18px;"><a href="/login">登录</a></span>
        <span class="icon" style="font-size: 18px;">登出</span>
        <span class="icon" ><LogoutOutlined :style="{ fontSize: '20px'}"/></span>
        <span class="icon" ><a-divider type="vertical" style="height: 20px; background-color: rgb(97, 92, 92)" /></span>
        <span class="icon" ><SettingOutlined :style="{ fontSize: '20px'}"/></span>
        <span class="icon"><BellOutlined :style="{ fontSize: '20px'}"/></span>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb>
        <div :style="{ padding: '24px', background: '#fff', minHeight: '360px' }">
          <router-view overflow="hidden"/>
        </div>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        ©2023 Created by SOFTWARE ENGINEERING GROUP 3
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from '@ant-design/icons-vue';
import { ref } from 'vue';
import { useRouter, RouterView } from 'vue-router';
import { BellOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons-vue';
const router = useRouter()
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(['1']);

const courses = [{name : '软件工程', key : 3},
                 {name : '智能网络计算', key : 4},
                 {name : '自动机与形式语言', key : 5}
] // 须从后端接收的数据，课程信息


</script>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}
.icon{
  padding-right: 23px;
  float: right;
}
</style>


