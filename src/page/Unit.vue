<template>
    <a-table :columns="columns" :data-source="data" :customRow="rowClick" >
        <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'homeworkname'">
                <div style="font-size: 15px;" >{{ record.homeworkname }}</div>
            </template>
        </template>
    </a-table>
</template>
<script setup lang="ts">
import router from  '../router/index.ts'
import homeworkApi from '@/api/homework'
import { Homework } from '@/paking/store';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'
const columns = [
    {
        title: '实验名称',
        dataIndex: 'homeworkname',
        align: 'center',
    }
]
let rExp = new RegExp("\\d+");
const route = useRoute();

// const data = [
//     {   
//         homeworkid: '1',
//         homeworkname: '实验1 类',
//     },
//     {   
//         homeworkid: '2',
//         homeworkname: '实验2 虚函数',
        
//     }
// ]

let data : Homework.homework_return[];

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


onMounted( async () => {
    const result = await homeworkApi.GetHomeworks(parseInt(rExp.exec(route.path)[0]));
    if (result.length !== 0 && "homeworkname" in result[0])
    {
        data = result
        console.log(data)
    }
    else
    {
        if ("detail" in result)
        {
            console.log("fail")
        }
        console.log("fail")

    }
}) 


const rowClick = (record) => {
    return {
        onClick: () => {
            router.push({ name : 'execenter', params : { id : record.homeworkid } });
            setExerciseCenterTitle();
        }
    }
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