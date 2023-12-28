<template>
  <div style="margin-bottom: 20px;" @click="router.back();">
    <ArrowLeftOutlined two-tone-color="#686868" style="font-size: 20px;" />
    &nbsp;<span style="margin-top:10px;">返回</span>
  </div>
    <a-table :columns="columns" :rowKey="record=>record.problemid" :data-source="data" v-if="ifDisplay">
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <smile-outlined />
            题目名称
          </span>
        </template>
      </template>
  
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'name'">
          <a @click="enter(record.problemid)"> 
            {{ record.name }}
          </a>
        </template>
        <template v-else-if="column.key === 'difficult'">
          <span>
            <a-tag
              :key="record.difficult"
              :color="record.difficult === 'hard' ? 'volcano' : record.difficult === 'middle' ? 'geekblue' : 'green'">
              {{ record.difficult.toUpperCase() }}
            </a-tag>
          </span>
        </template>
        <template v-else-if="column.key === 'problemType'">
            {{ record.problemType }}
        </template> 
      </template> 
    </a-table>
    <RouterView>
    </RouterView>
  </template>
  <script lang="ts" setup>
  import { useRouter, RouterView, useRoute } from 'vue-router';
  const router = useRouter()
  const route = useRoute()
  import { SmileOutlined, ArrowLeftOutlined } from '@ant-design/icons-vue';
  import { ref, onBeforeMount } from 'vue'
  import { Exercise } from '@/paking/store'
  import  exerciseApi  from '@/api/exercise'
  let ifDisplay = true;
  const enter = (key : string) => {
    ifDisplay = true;
    router.push({ name : "exercise", params : { id : key }});// 根据存放的exercise的id进行指定访问
  }  


  // 表格头
  const columns = [
    {
      title: '题目编号',
      dataIndex: 'problemid',
      key: 'problemid',
    },
    {
      title: '题目名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      key: 'problemType',
      dataIndex: 'problemType',
    },
    {
      title: '分数',
      key: 'point',
      dataIndex: 'point',
    },
    {
      title: '难度',
      key: 'difficult',
      dataIndex: 'difficult',
    },
  ];
  
  // // 须从后端接收的数据
  // const data = [
  //   {
  //     key: '1',
  //     name: 'CrackMe',
  //     age: 32,
  //     tags: ['nice', 'developer'],
  //     type: '填空题',
  //   },
  //   {
  //     key: '2',
  //     name: 'Binary Tree',
  //     age: 42,
  //     tags: ['loser'],
  //     type: '选择题',
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     tags: ['cool', 'teacher'],
  //     type: '代码题',
  //   },
  // ];

const data = ref<Exercise.exercisesInfo[]>()
let rExp = new RegExp("\\d+");
onBeforeMount( async () => {
  const result = await exerciseApi.GetExercises(parseInt(rExp.exec(route.path)[0]));
  if (result.length !== 0 && 'problemType' in result[0])
  {
    data.value = result
  }
})


  </script>
  
  
  