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
          {{ record.point }}
      </template>
    </template>
  </a-table>
</template>
<script setup lang="ts">
import { onBeforeMount, ref} from "vue";
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
];

let data = ref<Attempt.attemptInfo_return[]>();
onBeforeMount(async () => {
  let pid = parseInt(rExp.exec(route.path)[0]);
  const result = await attemptApi.GetAttemptByProblemid(pid);
  // 检测一下
  data.value = result;
  console.log(data);
});
const enter = (record: any) => {
    router.push( { name: "correcting", params: { id: record.problemid, stuid: record.studentid } } );
}   
</script>
