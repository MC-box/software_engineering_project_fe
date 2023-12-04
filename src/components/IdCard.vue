
<template>
    <div class="card">
		<div class="left">
			<img class="profile_img" src="https://images.summitmedia-digital.com/cosmo/images/2020/10/23/nam-joo-hyuk-start-up-min-1-1603449918.jpg" alt="">
			<div class="flag_wrapper">
				<img class="flag" src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/271/flag-south-korea_1f1f0-1f1f7.png" alt="South Korean Flag" />
			</div>
		</div>
		<div class="right">
			<h2 class="name">Nam Do-San</h2>
			<p class="title">Developer</p>
			<p class="information"><span style="margin-right:30px">手机: XXX XXX XXXXX</span><span style="margin-right:30px">邮箱: XXXXX</span><span>学号: XXX XXX XXX</span></p>
			<div class="interests">
				<p class="interests_title">Interests: </p>
				<span class="interests_item">A.I.</span>
				<span class="interests_item">Technology</span>
				<span class="interests_item">Coding</span>
				<span class="interests_item">Python</span>
								<span class="interests_item">shit</span>
			</div>
		</div>
		<div ref="chart" style="width: 20%; height: 160px; margin-left: 150px;"></div>
		<div style="width: 20%; height: 160px; margin-left: 150px; overflow-y:scroll;">当前学期所处班级:</div>
	</div>
  <div style="background-color: #ececec; padding: 20px">
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card title="我的题库" :bordered="false">
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="我的收藏" :bordered="false">
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card title="我的点赞" :bordered="false">
          <p>card content</p>
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
</style>
<script setup lang="ts">
import initChart from '../utils/useCharts'
const chart = initChart();
// import {useChart} from 'echarts';
// const { chartEle, changeChart, cardActiveKey, evaluteChartData } = useCharts()
</script>