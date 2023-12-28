<template>
  <div class="card">
    <div class="left">
      <img class="profile_img" src="../assets/uuz.jpg" alt="head_image" />
      <div class="flag_wrapper" style="background-color: #fac858">
        <img
          class="flag"
          src="https://csse.szu.edu.cn/image/common/logo_collage.svg"
          alt="CSSE_logo"
        />
      </div>
    </div>
    <div class="right">
      <h2 class="name">{{ store.userInfo.username }}</h2>
      <p class="title">{{ store.userInfo.role === 0 ? "学生" : "老师" }}</p>
      <p class="information">
        <span style="margin-right: 30px"
          >手机: {{ store.userInfo.telephone }}</span
        >
        <br /><span style="margin-right: 30px"
          >邮箱: {{ store.userInfo.email }}</span
        >
        <br /><span>编号: {{ store.userInfo.userid }}</span>
      </p>
      <div class="interests">
        <p class="interests_title">Interests:</p>
        <span class="interests_item">A.I.</span>
        <span class="interests_item">Technology</span>
        <span class="interests_item">Coding</span>
        <span class="interests_item">Python</span>
        <span class="interests_item" style="margin-top: 0.5vw">Reverse</span>
      </div>
    </div>
    <div
      ref="chart"
      style="width: 20%; height: 160px; margin-left: 150px"
    ></div>
    <div
      style="width: 20%; height: 160px; margin-left: 150px; overflow-y: scroll"
    >
      当前学期所处班级:<p v-for="course in coursesInfo">{{ course.name }}<br/></p>
    </div>
  </div>
  <div style="background-color: #ececec; padding: 20px">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="我的题库" :bordered="false">
          <div class="icon_box">
            <div class="iconItem" @click="sorrymsg()">
              <FileAddTwoTone
                two-tone-color="#05b2f6"
                class="card_icon"
              ></FileAddTwoTone>
              <div class="info">上传题解</div>
            </div>
            <div class="iconItem" @click="sorrymsg()">
              <CheckCircleTwoTone
                two-tone-color="#0af545"
                class="card_icon"
              ></CheckCircleTwoTone>
              <div class="info">完成题目</div>
            </div>
            <div class="iconItem" @click="sorrymsg()">
              <ExperimentTwoTone
                two-tone-color="#d10cf0"
                class="card_icon"
              ></ExperimentTwoTone>
              <div class="info">尝试题目</div>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="我的点赞" :bordered="false">
          <div class="icon_box">
            <div class="iconItem" @click="sorrymsg()">
              <FileWordTwoTone
                two-tone-color="#0c48ed"
                class="card_icon"
              ></FileWordTwoTone>
              <div class="info">题解</div>
            </div>
            <div class="iconItem" @click="sorrymsg()">
              <MessageTwoTone
                two-tone-color="#686868"
                class="card_icon"
              ></MessageTwoTone>
              <div class="info">评论</div>
            </div>
            <div class="iconItem" @click="sorrymsg()">
              <ContainerTwoTone
                two-tone-color="#edb10c"
                class="card_icon"
              ></ContainerTwoTone>
              <div class="info">题目</div>
            </div>
          </div>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="我的荣誉" :bordered="false">
          <p style="padding-bottom: 85px">当前还没有荣誉哦，再接再厉吧！</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
  <!-- ?与:ref=的区别？ -->
</template>
<style>
/* body {
	background: linear-gradient(to right, #8e54e9, #4776e6);

	margin: 60px;
	display: flex;
	align-items: flex-start;
	justify-content: center;

	box-sizing: border-box;
} */

.card h2 {
  font-family: "Poppins";
  font-weight: 500;
  font-size: 18px;
  margin: 3px 0;
}

.card p,
.card span {
  font-family: "Avenir";
  font-size: 14px;
  color: rgba(34, 34, 34, 0.5);
  /* margin: 5px 0; */
}

.card {
  background-color: #fff;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  display: flex;
  flex-direction: row;
  padding: 30px;
  /* max-width: 400px; */
  width: 100%;
  min-height: 130px;
  margin: 20px 0;
  transition: all 0.5s ease;
}

.card:hover {
  box-shadow: 8px 28px 50px rgba(39, 44, 49, 0.07),
    1px 6px 12px rgba(39, 44, 49, 0.04);
  transform: translate3D(0, -1px, 0) scale(1.02);
  transition: all 0.5s ease;
}

.profile_img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  object-position: 50% 50%;

  border-radius: 100%;
}

.flag_wrapper {
  width: 25px;
  height: 25px;
  background-color: #f2f2f2;
  border-radius: 100%;
  position: relative;
  top: -30px;
  left: 55px;
}

.flag {
  width: 15px;
  height: 15px;
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto auto;
}

.left {
  margin-right: 12.5px;
}
.right {
  margin-left: 12.5px;
}

.interests {
  margin-top: 10px;
}

.interests_title {
  color: #222222;
  margin-bottom: 5px;
}

.interests_item {
  padding: 0 15px;
  margin-right: 5px;
  line-height: 35px;
  background-color: #e6e6e6;
  border-radius: 5px;
  display: inline-block;
}

.son_card {
  min-height: 60px;
}

.card_icon {
  font-size: 50px;
  /* margin-left: 20%; */
}

.icon_between {
  min-height: 100%;
  min-width: 20%;
}
.icon_box {
  width: calc(100% - 20px);
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 10px;
}
.iconItem {
  margin: 10px;
  cursor: pointer;
}

.info {
  text-align: center;
  color: #444;
  padding-top: 10px;
}
</style>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import initChart from "../utils/useCharts";
import {
  FileAddTwoTone,
  CheckCircleTwoTone,
  ExperimentTwoTone,
  FileWordTwoTone,
  MessageTwoTone,
  ContainerTwoTone,
} from "@ant-design/icons-vue";
import { message } from "ant-design-vue";
import userApi from "@/api/user";
import courseApi from "@/api/course";
import { User, Course } from "@/paking/store";
import userStore from "@/store/user";
// import { ref } from "vue"
const chart = initChart();
// const size = ref(10);
// import {useChart} from 'echarts';
// const { chartEle, changeChart, cardActiveKey, evaluteChartData } = useCharts()
let coursesInfo = ref<Course.courseInfo[]>();
const store = userStore();
onBeforeMount(async () => {
  try {
    const result = await courseApi.CourseList_student();
    coursesInfo.value = result;
  } catch {
    message.error("出错了，请刷新页面");
  }
});
function sorrymsg() {
  message.info("肥肠抱歉，本模块还在开发中，敬请期待.");
}
</script>
