<template>
    <div>题目页面</div>
    <template v-if="ifMulChoice">
        <div style="background-color: #ececec; padding: 20px">
            <a-card class="main" title="题目" :bordered="false" style="width: 70%; margin: auto">
            <span :class="difficultyColor(problem?.difficulty)">{{ difficultyArr[problem?.difficulty - 1] }}</span>
            <span>题型：{{ problem.category }}</span>
            <span>课程：{{ problem?.courseName}}</span>
            <span>通过人数：{{ problem?.Cnt }}</span>
            </a-card>
            <br/>
            <section class="description">
                <div class="title">题目描述</div>
                <!-- <RichTextEditor></RichTextEditor> -->
                <p>123</p>
                <div class="title">题目选项</div>
                <div class="doing">
                    <a-checkbox-group name="checkboxgroup" :options="plainOptions" style="display: grid;gap: 24px;"/>
                </div>
            </section>
        </div>
            
        <section>

        </section>
    </template>
    <template v-if="ifBlankFill">
        填空题
    </template>
    <template v-if="ifCode">
        代码题
    </template>
</template>
<script setup lang="ts">
import {reactive} from "vue"
let ifMulChoice = true; // 选择题
let ifBlankFill = false // 填空题
let ifCode = false // 代码题
let difficultyArr = reactive(["简单", "中等", "困难"])
const problem = reactive({
    id: 1,
    title: '',
    category: '选择题',
    difficulty: 1,
    courseName: "软件工程", 
    Cnt: 10,

})
// import UpTable from "../components/UpTable.vue"
// import test from "../test.vue"
// import RichTextEditor from "@/components/RichTextEditor.vue";
// 难度样式
function difficultyColor(difficulty: number) {
  switch (difficulty) {
    case 1: return "easy"
    case 2: return "medium"
    case 3: return "hard"
  }
}
const plainOptions = ['Apple', 'Pear', 'Orange'];
</script>
<style>
.easy{
    color: green
}
.medium{
    color: orange
}
.hard{
    color: red
}
.main span{
    margin: 10px;
}
.description{
    width: 70%;
    margin: auto;
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.19);
    /* x 偏移量 | y 偏移量 | 阴影模糊半径 | 阴影扩散半径 | 阴影颜色 */
    .title {
    width: 100%;
    border-left: 5px solid #d0d0d0;
    background-color: #f5f7f9;
    padding: 10px;
    font-size: 17px;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  p{
    min-height: 100px;
    background-color: white;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    /* vertical-align: center; */
    display:flex;
  }
  .doing{
    min-height: 300px;
    background-color: white;
    /* align-items: center; */
    padding: 20px;
    /* vertical-align: center; */
    /* display:flex; */
  }
}
</style>

