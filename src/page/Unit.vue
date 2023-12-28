<template>
    <div v-if="isTeacher">
        <a-button
              type="primary"
              style="margin-right: 20px; margin-top: 15px; width: 125px"
              @click="showModal"
              >添加homework</a-button
            >
    </div>
    <a-table :columns="columns" :data-source="data"  >
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'homeworkname'">
                <div
                    style="font-size: 15px; text-align: center; display: flex; align-items: center; justify-content: center; height: 100%;">
                    <a @click="rowClick(record)">
                        {{ record.homeworkname }}
                    </a>
                </div>
                <div v-if="store.userInfo.role > 0" style="text-align: right;">
                    <a-button type="primary" @click="DeleteCourse(record)">删除</a-button>
                </div>
            </template>
        </template>
    </a-table>
    <a-modal
    v-model:open="open"
    title="添加homework"
    :confirm-loading="confirmLoading"
    width="500px"
    :bodyStyle="{ height: '200px', overflow: 'hidden', overflowY: 'scroll' }"
    @ok="handleOk"
  >
    <label>请输入标题：</label>
    <a-input v-model:value="homeworkname" placeholder="请输入标题" style="margin-bottom: 30px;"></a-input>
    <label>请选择截止日期：</label>
    <a-date-picker v-model:value="date" style="margin-right: 30px"/>
    <div>
    </div>
  </a-modal>
</template>
<script setup lang="ts">
import router from '../router/index.ts'
import homeworkApi from '@/api/homework'
import { Homework } from '@/paking/store';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import userStore from "@/store/user"
import type { Dayjs } from 'dayjs';
const columns = [
    {
        title: '实验名称',
        dataIndex: 'homeworkname',
        align: 'center',
    }
]
let rExp = new RegExp("\\d+");
const route = useRoute();
let isTeacher = true;
const confirmLoading = ref<boolean>(false);
const open = ref<boolean>(false);
const showModal = () => {
  open.value = true;
};
let date = ref<Dayjs>()
let homeworkname = ref<string>();const store = userStore()

// const data = [
//     {   
//         homeworkid: '1',
//         homeworkname: '实验1 类',
//         duedate: "2023:02:22",
//         courseid: '3',
//     },
//     {   
//         homeworkid: '2',
//         homeworkname: '实验2 虚函数',
//         duedate: "2023:03:22",
//         courseid: '4',
//     }
// ]

const data = ref<Homework.homework_return[]>();

// let rowClick = (record, index) => {
//   return {
//     on: {

//       click: () => {
//         console.log('点击了我')
//         // router.push({ name : 'execenter', params : { id : 1 } })
//       },

//       dblclick: () => {
//        	// console.log('双击了我')
//       },

//       // ...
//     }
//   }
// }


onBeforeMount(async () => {
    const result = await homeworkApi.GetHomeworks(parseInt(rExp.exec(route.path)[0]));
    if (result.length !== 0 && "homeworkname" in result[0]) {
        data.value = result
        console.log(data)
    }
    else {
        if ("detail" in result) {
            console.log("fail")
        }
        console.log("fail")

    }
})


const rowClick = (record) => {
    router.push({ name : 'execenter', params : { id : record.homeworkid } });
    setExerciseCenterTitle();
}

// const createHomework = () => {
//     const result : Homework.homework_submit = ; 
//     homeworkApi.CreateHomework(result)
// }


const handleOk = async () => {
  confirmLoading.value = true;
  setTimeout(() => {
    open.value = false;
    confirmLoading.value = false;
  }, 2000);
    const result : Homework.homework_submit = {
        homeworkname: homeworkname.value,
        duedate: date.value.toISOString(),
        courseid: 1
    }; 
    await homeworkApi.CreateHomework(result)
    date.value = null;
    homeworkname.value = "";
    const result2 = await homeworkApi.GetHomeworks(parseInt(rExp.exec(route.path)[0]));
    if (result2.length !== 0 && "homeworkname" in result2[0])
    {
        data.value = result2
        console.log(data)
    }
    else
    {
        if ("detail" in result2)
        {
            console.log("fail")
        }
        console.log("fail")

    }
};

const DeleteCourse = async (record) => {
    console.log(record.homeworkid)
    await homeworkApi.DeleteHomework(record.homeworkid);
    data.value = await homeworkApi.GetHomeworks(parseInt(rExp.exec(route.path)[0]));
}

const setExerciseCenterTitle = (): void => {
    document.title = "题目中心";
};

</script>

<style>
.ant-table {
    min-height: 100% !important;
}
</style>