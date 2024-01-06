<template>
  <h2>请老师批改作业:</h2>
  <a-button type="primary" style="float: right" @click="router.back()">返回</a-button>
  <label style="margin-right: 50px;">当前分数：{{ attemptInfo.point === -1 ? '暂无分数' : attemptInfo.point }}</label>
  <label>总分: {{ exerciseInfo.point }}</label>  
  <a-divider />
  <h3>题目描述：</h3>
  <!-- <p
    style="
      background-color: rgba(189, 188, 188, 0.959) cec;
      padding: 20px;
      border-radius: 5px;
      margin-top: 20px;
      min-height: 100px;
    "
  >
    {{ exerciseInfo.content }}
  </p> -->
  <v-md-preview :text="exerciseInfo.content"></v-md-preview>
  <a-divider />
  <h3>学生答案：</h3>
  <!-- <div
    style="
      background-color: rgba(189, 188, 188, 0.959) cec;
      padding: 20px;
      border-radius: 5px;
      margin-top: 20px;
      min-height: 100px;
    "
  >
    {{ attemptInfo.content }}
  </div> -->
  <div v-if="exerciseInfo.problemType === 'choice'">
    <div class="doing">
      <a-checkbox-group name="checkboxgroup" :options="selectedOptions" style="display: grid; gap: 24px" v-model:value="selectedAnswer"
        disabled="true" />
    </div>
  </div>
  <div v-else>
    <v-md-preview :text="attemptInfo.content"></v-md-preview>
  </div>
  <a-divider />
  <label>教师评分：</label>
  <a-input style="width: 10%; margin-right: 20px" placeholder="请输入评分" v-model:value="point"></a-input>
  <a-button type="primary" @click="submit">提交评分</a-button>
</template>

<script setup lang="ts">
// 选择题可能有点问题，是连起来的字符串
import { ref, onBeforeMount, reactive } from "vue";
import { Attempt, Exercise } from "@/paking/store";
import attemptApi from "@/api/attempt";
import exerciseApi from "@/api/exercise";
import { useRoute, useRouter } from "vue-router";
import { isNumber } from "undraw-ui";
import { message } from "ant-design-vue";

const point = ref<number>();
const route = useRoute();
const pid = parseInt(route.params.id.toString());
const stuid = parseInt(route.params.stuid.toString());
const router = useRouter();


const attemptInfo = reactive<Attempt.attemptInfo_return>({
  problemid: 0,
  studentid: 0,
  content: "",
  point: 0,
});

const exerciseInfo = reactive<Exercise.exerciseInfo>({
  problemid: 0,
  name: "",
  problemType: "",
  difficult: "",
  point: 0,
  content: "",
  choice: [],
  homeworkid: 0,
});

onBeforeMount(async () => {
  const res = await attemptApi.GetAttempt(pid, stuid);
  attemptInfo.problemid = res.problemid;
  attemptInfo.studentid = res.studentid;
  attemptInfo.content = res.content;
  attemptInfo.point = res.point;

  const res1 = await exerciseApi.GetExerciseInfo(pid);
  exerciseInfo.problemid = res1.problemid;
  exerciseInfo.name = res1.name;
  exerciseInfo.problemType = res1.problemType;
  exerciseInfo.difficult = res1.difficult;
  exerciseInfo.point = res1.point;
  exerciseInfo.content = res1.content;
  exerciseInfo.choice = res1.choice;
  exerciseInfo.homeworkid = res1.homeworkid;

  selectedOptions.value = res1.choice.map((item) => ({
    value: item.label,
    label: item.label + " " + item.content,
  }));
  selectedAnswer.value = attemptInfo.content.split(" ");
})

const submit = async () => {

  console.log("point is " + point.value);
  console.log(point.value)
  if (point.value === undefined || !isNumber(point.value) || point.value < 0 || point.value > exerciseInfo.point) {
    alert("请输入正确的评分");
    return;
  }
  const pointInfo: Attempt.attemptInfo_point = {
    problemid: pid,
    studentid: stuid,
    point: point.value,
  };
  await attemptApi.TeacherUpdateAttempt(pointInfo);

  const res = await attemptApi.GetAttempt(pid, stuid);
  attemptInfo.problemid = res.problemid;
  attemptInfo.studentid = res.studentid;
  attemptInfo.content = res.content;
  attemptInfo.point = res.point;

  point.value = undefined;
  message.success("评分成功");
  router.back();
};

interface OptionsItem {
  label: string;
  value: string;
}

const selectedOptions = ref<OptionsItem[]>();
const selectedAnswer = ref([]);

</script>
