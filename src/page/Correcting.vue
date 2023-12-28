<template>
  <h2>请老师批改作业:</h2>
  <a-divider />
  <h3>题目描述：</h3>
  <p
    style="
      background-color: rgba(189, 188, 188, 0.959) cec;
      padding: 20px;
      border-radius: 5px;
      margin-top: 20px;
      min-height: 100px;
    "
  >
    {{ problemcontent }}
  </p>
  <a-divider />
  <h3>学生答案：</h3>
  <div
    style="
      background-color: rgba(189, 188, 188, 0.959) cec;
      padding: 20px;
      border-radius: 5px;
      margin-top: 20px;
      min-height: 100px;
    "
  >
    {{ answercontent }}
  </div>
  <a-divider />
  <label>教师评分：</label>
  <a-input
    style="width: 10%; margin-right: 20px"
    placeholder="请输入评分"
  ></a-input>
  <a-button type="primary" v-model="point" @click="submit">提交评分</a-button>
</template>

<script setup lang="ts">
// 选择题可能有点问题，是连起来的字符串
import { ref } from "vue";
import { Attempt } from "@/paking/store";
import attemptApi from "@/api/attempt";
import { useRoute } from "vue-router";
let problemcontent = ref("");
let answercontent = ref("");
let point = ref<number>();
let rExp = new RegExp("\\d+");
const route = useRoute();
const submit = async () => {
  let pid = parseInt(rExp.exec(route.path)[0]);
  let stuid = parseInt(rExp.exec(route.path)[1]);
  const pointInfo: Attempt.attemptInfo_point = {
    problemid: pid,
    studentid: stuid,
    point: point,
  };
  await attemptApi.TeacherUpdateAttempt(pointInfo);
};
</script>
