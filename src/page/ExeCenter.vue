<template>
  <div style="margin-bottom: 20px;" >
    <ArrowLeftOutlined two-tone-color="#686868" style="font-size: 20px;" />
    &nbsp;<span style="margin-top:10px;" @click="router.back();">返回</span>
    <a-button v-if="store.userInfo.role > 0"
              type="primary"
              style="margin-right: 20px; margin-top: 15px; width: 125px; float: right"
              @click="showModal"
              >添加题目</a-button
            >
    </div>
  <a-table :columns="columns" :rowKey="record => record.problemid" :data-source="data" v-if="ifDisplay">
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
          <a-tag :key="record.difficult"
            :color="record.difficult === 'hard' ? 'volcano' : record.difficult === 'middle' ? 'geekblue' : 'green'">
            {{ record.difficult.toUpperCase() }}
          </a-tag>
        </span>
      </template>
      <template v-else-if="column.key === 'problemType'">
        {{ record.problemType }}
      </template>
      <template v-else-if="column.dataIndex === 'deletebutton' && store.userInfo.role > 0">
        <a-button @click="{ router.push( { name : "correct", params : { id : record.problemid } })}" type="primary" primary style="margin-right: 20px;">批改</a-button>
        <a-button @click="DeleteProblem(record)" type="primary" danger>删除</a-button>
      </template>
    </template>
  </a-table>
  <RouterView>
  </RouterView>
  <a-modal
    v-model:open="open"
    title="添加homework"
    :confirm-loading="confirmLoading"
    width="1300px"
    :bodyStyle="{ height: '1000px', overflow: 'hidden', overflowY: 'scroll' }"
    @ok="handleOk"> 
    <Edit></Edit>
    </a-modal>
</template>
<script lang="ts" setup>
import { useRouter, RouterView, useRoute } from 'vue-router';
const router = useRouter()
const route = useRoute()
import userStore from "@/store/user"
import { SmileOutlined, ArrowLeftOutlined } from '@ant-design/icons-vue';
import { ref, onBeforeMount } from 'vue'
import { Exercise } from '@/paking/store'
import exerciseApi from '@/api/exercise'
import Edit from "@/page/Edit.vue"
let ifDisplay = true;
const enter = (key: string) => {
  ifDisplay = true;
  router.push({ name: "exercise", params: { id: key } });// 根据存放的exercise的id进行指定访问
}

const store = userStore()
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
  {
    title: '',
    dataIndex: 'deletebutton',
  }
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
onBeforeMount(async () => {
  const result = await exerciseApi.GetExercises(parseInt(rExp.exec(route.path)[0]));
  if (result.length !== 0 && 'problemType' in result[0]) {
    data.value = result
  }
})

const DeleteProblem = async (record: Exercise.exercisesInfo) => {
  await exerciseApi.DeleteExercise(record.problemid);
  data.value = await exerciseApi.GetExercises(parseInt(rExp.exec(route.path)[0]));
}

const handleOk = async () => {
  confirmLoading.value = true;
  setTimeout(() => {
    open.value = false;
    confirmLoading.value = false;
  }, 2000);
};

const confirmLoading = ref<boolean>(false);
const open = ref<boolean>(false);
const showModal = () => {
  open.value = true;
};
</script>
  
  
  