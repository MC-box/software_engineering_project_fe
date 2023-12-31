<template>
  <h1>编辑课程窗口</h1>
  <a-divider />
  <!-- <a-tooltip placement="right"><template #title>你好</template>创建课程窗口</a-tooltip> -->
  <h1>添加课程</h1>
  <label>请输入课程名字：</label>
  <a-input
    v-model:value="coursename"
    placeholder="请输入标题"
    style="margin-bottom: 30px"
  ></a-input>
  <label>请输入课程描述：</label>
  <a-textarea
    v-model:value="courseinfo"
    placeholder="请输入课程描述"
    style="margin-bottom: 30px"
    :auto-size="{ minRows: 5, maxRows: 10 }"
  />
  <a-button type="primary" style="float: right" @click="createCourse()"
    >创建课程</a-button
  >
  <a-divider />
  <!-- 删除课程 -->
  <h1>删除课程</h1>
  <a-select
    style="width: 250px; margin-right: 30px"
    :value="value1"
    @focus="focus"
    @change="handleChange"
  >
    <a-select-option
      v-for="deleteinfo in deletecourseinfos"
      :key="deleteinfo.courseid"
      >{{
        "课程名：" + deleteinfo.name + " 课程id：" + deleteinfo.courseid
      }}</a-select-option
    >
  </a-select>

  <a-button
    type="primary"
    @click="deleteCourse()"
    :disable="value1 === disabled"
    >删除该课程</a-button
  >
  <!-- 无法使用disable -->
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeMount } from "vue";
import courseApi from "@/api/course";
import { Course } from "@/paking/store";
import userStore from "@/store/user";
import { message } from "ant-design-vue";
const store = userStore();
const coursename = ref<string>();
const courseinfo = ref<string>();
let disabled = ref<string>("请选择一个选项");
let value1 = ref<string>("请选择一个选项");
let deletecourseinfos = ref<Course.courseInfo[]>();
const createCourse = async () => {
  const course_: Course.course_create = {
    name: coursename.value,
    info: courseinfo.value,
    teacherid: store.userInfo.userid,
  };
  await courseApi.CreateCourse(course_);
  location.reload();
};

onMounted(async () => {
  if (store.userInfo.userid > 0) {
    // 老师
    const result = await courseApi.CourseList_teacher();
    deletecourseinfos.value = result;
  } // 学生
  else {
    const result = await courseApi.CourseList_student();
    deletecourseinfos.value = result;
  }
});

const focus = () => {
  console.log("focus");
};

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
  value1.value = value.toString();
};

const deleteCourse = async () => {
  console.log(value1);
  try {
    await courseApi.DeleteCourse(parseInt(value1.value));
    message.loading("删除成功，正在刷新页面...");
    location.reload();
  } catch {
    message.error("删除失败,请重试");
  }
};
</script>
