<template>
    <a-table :columns="columns" :data-source="data" v-if="ifDisplay">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <MessageOutlined/>
            贴名
          </span>
        </template>
      </template>
  
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a @click="enter(record.key)">
            {{ record.name }}
          </a>
        </template>
        <template v-else-if="column.key === 'tags'">
          <span>
            <a-tag
              v-for="tag in record.tags"
              :key="tag"
              :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
            >
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'action'">
          <span>
            <a>Delete</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link">
              More actions
              <down-outlined />
            </a>
          </span>
        </template>
      </template>
    </a-table>
    <template>
      <RouterView v-slot="{ Component, route }" class="content-view">
          <Transition name="fade" mode="out-in" appear>
            <KeepAlive >
              <component :is="Component" :key="route.name" />
            </KeepAlive>
          </Transition>
        </RouterView>
    </template>
    <!-- 切换动画无法生效？？ -->
  </template>
  <script lang="ts" setup>
  import { useRouter, RouterView } from 'vue-router';
  const router = useRouter()
import {DownOutlined, MessageOutlined  } from '@ant-design/icons-vue';
  let ifDisplay = true;
  const enter = (key : string) => {
    ifDisplay = true;
    router.push({ name : "discussion", params: { id : key }});// 根据存放的discussing的id进行指定访问
  }  
  const columns = [
    {
      name: '题目名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '题目编号',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '课程',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '难度',
      key: 'tags',
      dataIndex: 'tags',
    },
    {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
    },
    {
      title: 'Action',
      key: 'action',
    },
  ];
  
  const data = [
    {
      key: '1',
      name: '求助各位大佬，这道题到底该怎么做啊',
      age: 32,
      address: 'Reverse',
      tags: ['nice', 'developer'],
      type: '填空题',
    },
    {
      key: '2',
      name: 'Binary Tree',
      age: 42,
      address: 'Data Structure',
      tags: ['loser'],
      type: '选择题',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
      type: '代码题',
    },
  ];
  </script>
<style>

.fade-enter-to{   /*定义进入完成后的位置 和 透明度 */
  transform: translateX(0%);
  opacity: 1; 
}
 
.fade-leave-active,.fade-enter-active {
    transition: all 0.5s ease-out;
}
 
.fade-leave-from { /* 页面离开时一开始的css样式,离开后为leave-to，经过active渐渐透明 */
  transform: translateX(0%);
  opacity: 1;
}
 
.fade-leave-to{   /* 这个是离开后的透明度通过下面的active阶段渐渐变为0 */  
  transform: translateX(100%);
  opacity: 0;
}
</style>
  <!--TODO:从数据库中提取table，然后点击贴名后即可跳转到相应的讨论区中-->
