<template>
    <a-table :columns="columns" :data-source="data" :customRow="rowClick" >
        <template #bodyCell="{ column, text }">
            <template v-if="column.dataIndex === 'name'">
                <div style="font-size: 15px;">{{ text }}</div>
            </template>
        </template>
    </a-table>
</template>
<script setup lang="ts">
import router from  '../router/index.ts'
const columns = [
    {
        title: '实验名称',
        dataIndex: 'name',
        align: 'center',
    }
]

const data = [
    {   
        key: '1',
        name: '实验1 类',
    },
    {   
        key: '2',
        name: '实验2 虚函数',
        
    }
]

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

const rowClick = (record) => {
    return {
        onClick: () => {
            router.push({ name : 'execenter', params : { id : record.key } })
        }
    }
}
</script>

<style>
.ant-table {
      min-height: 100% !important;
}
</style>