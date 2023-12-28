<template>
  <a-layout style="min-height: 100vh">
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item
          key="101"
          @click="
            router.push({ name: 'home' });
            setHomeTitle();
          "
        >
          <pie-chart-outlined />
          <!-- <span><router-link to="/page/Home.vue">主页面</router-link></span>
           -->
          <span>主页面</span>
        </a-menu-item>
        <a-menu-item
          key="102"
          @click="
            router.push({ name: 'edit' });
            setEditTitle();
          "
          v-if="store.userInfo.role > 0"
        >
          <desktop-outlined />
          <span>编辑课程</span>
        </a-menu-item>
        <a-sub-menu key="sub1">
          <template #title>
            <span>
              <user-outlined />
              <span>我的选课</span>
            </span>
          </template>
          <!-- <a-menu-item key="3">Tom</a-menu-item>
          <a-menu-item key="4">Bill</a-menu-item>
          <a-menu-item key="5">Alex</a-menu-item> -->
          <a-menu-item
            v-for="course in courses"
            :key="course.courseid"
            @click="
              router.push({ name: 'unit', params: { id: course.courseid } });
              setCourseTitle();
              console.log(route.path);
            "
            ><a-tooltip placement="right"
              ><template #title>你好</template>{{ course.name }}</a-tooltip
            ></a-menu-item
          >
        </a-sub-menu>
        <!-- <a-menu-item key="109" @click="router.push({ name: 'discenter' }); setDiscussionTitle()">
          <file-outlined />
          <span>交流区</span>
        </a-menu-item> -->
        <a-menu-item
          key="109"
          @click="
            router.push({ name: 'discenter' });
            setDiscussionTitle();
          "
        >
          <file-outlined />
          <span>批改页面</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <!-- <span style="padding-right: 20px;"><a-divider type="vertical" style="height: 20px"/></span> -->
        <span class="icon" style="font-size: 18px" v-if="isLogin"
          ><a href="/#/login">登录</a></span
        >
        <span class="icon" v-else @click="logout()" style="cursor: pointer">
          <LogoutOutlined :style="{ fontSize: '20px' }" />
        </span>
        <span class="icon"
          ><a-divider
            type="vertical"
            style="height: 20px; background-color: rgb(97, 92, 92)"
        /></span>
        <span class="icon">
          <SettingOutlined :style="{ fontSize: '20px' }" />
        </span>
        <span class="icon">
          <BellOutlined :style="{ fontSize: '20px' }" />
        </span>
      </a-layout-header>
      <a-layout-content style="margin: 0 16px">
        <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>NoName</a-breadcrumb-item>
        </a-breadcrumb>
        <div
          :style="{ padding: '24px', background: '#fff', minHeight: '360px' }"
        >
          <router-view overflow="hidden" />
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
} from "@ant-design/icons-vue";
import { ref, onBeforeMount, UnwrapRef } from "vue";
import { useRouter, RouterView, useRoute } from "vue-router";
import {
  BellOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons-vue";
import { Course } from "@/paking/store";
import userStore from "@/store/user";
import courseApi from "@/api/course";
import Cookies from "js-cookie";
const router = useRouter();
const route = useRoute();
const store = userStore();
const collapsed = ref<boolean>(false);
const selectedKeys = ref<string[]>(["101"]);
let isLogin: boolean;

// let menu_show = new Map([
//   ['/home', 1],
//   ['/edit', 2],
//   ['/unit/3', 3],
//   ['/unit/4', 4],
//   ['/unit/5', 5],
//   ['/discenter', 5]
// ])
// const courses = [{ name: '软件工程', courserid: 3 },
// { name: '智能网络计算', courserid: 4 },
// { name: '自动机与形式语言', courserid: 5 }
//] // 须从后端接收的数据，课程信息

let courses: UnwrapRef<Course.courseInfo>[];

function logout() {
  sessionStorage.removeItem("access_token");
  Cookies.remove("access_token");
  router.push("/login");
}

//在不同模块的跳转中设置标题
// 因为在index.tx中的meta设置貌似没有生效，在这里强制设置
document.title = "线上做题系统";
const setHomeTitle = (): void => {
  document.title = "线上做题系统";
};

const setCourseTitle = (): void => {
  document.title = "课程";
};

const setEditTitle = (): void => {
  document.title = "编辑题目";
};

const setDiscussionTitle = (): void => {
  document.title = "讨论区";
};

onBeforeMount(async () => {
  console.log(sessionStorage.getItem("access_token"));
  isLogin = sessionStorage.getItem("access_token") ? false : true;
  console.log(isLogin);
  // 获取课程信息
  if (store.userInfo.role === 0) {
    // 学生
    courses = await courseApi.CourseList_student();
  } else {
    courses = await courseApi.CourseList_teacher();
    console.log(courses);
  }
});
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

[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}

.icon {
  padding-right: 23px;
  float: right;
}
</style>
