<template>
  <a-table :columns="columns" :data-source="data">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'id'">
        <a @click="enter(record)">
          {{ record.studentid }}
        </a>
      </template>
      <template v-else-if="column.key === 'condition'">
        {{ record.point === -1 ? "未批改" : "已批改" }}
      </template>
      <template v-else-if="column.key === 'point'">
        <div v-if="record.point === -1">
          暂无分数
        </div>
        
        <div v-else>
          {{ record.point }}
        </div>
      </template>
      <template v-else-if="column.key === 'delete'">
        <a-button type="primary" danger @click="deleteAttempt(record)">删除</a-button>
      </template>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { onBeforeMount, ref } from "vue";
import attemptApi from "@/api/attempt";
import { Attempt } from "@/paking/store";
import { useRoute, useRouter } from "vue-router";
let rExp = new RegExp("\\d+");
const route = useRoute();
const router = useRouter();
let columns = [
  {
    title: "学生编号",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "状态",
    dataIndex: "condition",
    key: "condition",
  },
  {
    title: "分数",
    dataIndex: "point",
    key: "point",
  },
  {
    title: "",
    dataIndex: "delete",
    key: "delete",
  }
];

let data = ref<Attempt.attemptInfo_return[]>();
onBeforeMount(async () => {
  const pid = parseInt(rExp.exec(route.path)[0]);
  const result = await attemptApi.GetAttemptByProblemid(pid);
  // 检测一下
  data.value = result;
  console.log(data);
});
const enter = (record: any) => {
  router.push({ name: "correcting", params: { id: record.problemid, stuid: record.studentid } });
}

const deleteAttempt = async (record: any) => {
  await attemptApi.DeleteAttempt(record.problemid, record.studentid);
  const pid = parseInt(rExp.exec(route.path)[0]);
  const result = await attemptApi.GetAttemptByProblemid(pid);
  // 检测一下
  data.value = result;
  console.log(data);
} 
</script>
