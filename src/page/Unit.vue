<template>
    <a-table :columns="columns" :data-source="data">
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
</template>
<script setup lang="ts">
import router from '../router/index.ts'
import homeworkApi from '@/api/homework'
import { Homework } from '@/paking/store';
import { onBeforeMount } from 'vue';
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import userStore from "@/store/user"
const columns = [
    {
        title: '实验名称',
        dataIndex: 'homeworkname',
        align: 'center',
    }
]
let rExp = new RegExp("\\d+");
const route = useRoute();
const store = userStore()

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
    router.push({ name: 'execenter', params: { id: record.homeworkid } });
    setExerciseCenterTitle();
}

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