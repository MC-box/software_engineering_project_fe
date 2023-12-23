<template>
  <div>题目界面</div>
  <template v-if="ifMulChoice">
    <div style="background-color: #ececec; padding: 20px">
      <a @click="router.back">
        <CloseCircleOutlined :style="{ fontSize: '20px', color: '#08c' }" />
      </a>
      <a-card
        class="main"
        title="题目"
        :bordered="false"
        style="width: 70%; margin: auto"
      >
        <span :class="difficultyColor(problem?.difficulty)">{{
          difficultyArr[problem?.difficulty - 1]
        }}</span>
        <span>题型：{{ problem.category }}</span>
        <span>课程：{{ problem?.courseName }}</span>
        <span>通过人数：{{ problem?.Cnt }}</span>
      </a-card>
      <br />
      <section class="description">
        <div class="title">题目描述</div>
        <!-- <RichTextEditor></RichTextEditor> -->
        <div class="p_">123</div>
        <div class="title">题目选项</div>
        <div class="doing">
          <a-checkbox-group
            name="checkboxgroup"
            :options="selectedOptions"
            style="display: grid; gap: 24px"
            v-model:value="selectedAnswer"
          />
          <a-button
            type="primary"
            style="float: right; margin-top: 15px; width: 80px"
            @click="submitSelected"
            >提交</a-button
          >
        </div>
        <RouterView></RouterView>
        <!-- 这一部分需要换成router-view以展示不同题型的选项 -->
      </section>
    </div>
  </template>
  <template v-if="ifBlankFill">
    填空题 / 简答题
    <div style="background-color: #ececec; padding: 20px">
      <a-card
        class="main"
        title="题目"
        :bordered="false"
        style="width: 70%; margin: auto"
      >
        <span :class="difficultyColor(problem?.difficulty)">{{
          difficultyArr[problem?.difficulty - 1]
        }}</span>
        <span>题型：{{ problem.category }}</span>
        <span>课程：{{ problem?.courseName }}</span>
        <span>通过人数：{{ problem?.Cnt }}</span>
      </a-card>
      <br />
      <section class="description">
        <div class="title">题目描述</div>
        <!-- <RichTextEditor></RichTextEditor> -->
        <div class="p_">123</div>
        <div class="title">答题区</div>
        <div style="background-color: white">
          <Editor
            v-model="BlankFillAnswer"
            placeholder="请输入你的答案"
            style="margin-top: 20px"
          ></Editor>
        </div>
        <div
          style="
            background-color: white;
            min-height: 40px;
            padding-bottom: 15px;
            text-align: right;
          "
        >
          <a-button
            type="primary"
            style="margin-right: 20px; margin-top: 15px; width: 80px"
            @click="submitBlank"
            >提交</a-button
          >
        </div>
        <!-- 这一部分需要换成router-view以展示不同题型的选项 -->
      </section>
    </div>
  </template>
</template>

<style lang="less" scoped></style>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Editor from "../components/RichTextEditor.vue";
// import { CheckboxGroup } from "ant-design-vue";
import { message } from "ant-design-vue";
import { useRouter, RouterView } from "vue-router";
import { CloseCircleOutlined } from "@ant-design/icons-vue";
const router = useRouter();
const BlankFillAnswer = ref("");
let ifMulChoice = false; // 选择题
let ifBlankFill = true; // 填空题/简答题
let difficultyArr = reactive(["简单", "中等", "困难"]);
const problem = reactive({
  id: 1,
  title: "",
  category: "选择题", // 这里改成exType
  difficulty: 2,
  courseName: "软件工程", //
  Cnt: 10,
});

// data
const selectedOptions = ref([
  {
    label: "A. Fuck you",
    value: "A",
  },
  {
    label: "B. Cao ni ma",
    value: "B",
  },
  {
    label: "C. sha bi",
    value: "C",
  },
  {
    label: "D. nao tan",
    value: "D",
  },
]);

const selectedAnswer = ref([]);

// function
// 难度样式
function difficultyColor(difficulty: number) {
  switch (difficulty) {
    case 1:
      return "easy";
    case 2:
      return "medium";
    case 3:
      return "hard";
  }
}

const submitSelected = () => {
  if (selectedAnswer.value.length == 0) {
    message.error("请选择答案");
    return;
  }
  message.success("提交成功");
  // TODO: 选择题：接下来直接读取selectedAnswer的数据并与交互即可
};

const submitBlank = () => {
  console.log(BlankFillAnswer.value);
  if (BlankFillAnswer.value == "<p><br></p>") {
    // 即没有填任何数据
    message.error("请选择答案");
    return;
  }
  message.success("提交成功");
  // TODO: 填空题：接下来直接读取BlankFillAnswer的数据并与后端交互即可(上传图片功能暂未解决)
};
</script>

<style>
.easy {
  color: green;
}
.medium {
  color: orange;
}
.hard {
  color: red;
}
.main span {
  margin: 10px;
}
.description {
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
  div.p_ {
    min-height: 100px;
    background-color: white;
    align-items: center;
    padding-left: 20px;
    padding-right: 20px;
    /* vertical-align: center; */
    display: flex;
  }
  .doing {
    min-height: 300px;
    background-color: white;
    /* align-items: center; */
    padding: 20px;
    /* vertical-align: center; */
    /* display:flex; */
  }
}

#editor—wrapper {
  border: 1px solid #ccc;
  z-index: 100; /* 按需定义 */
}
#toolbar-container {
  border-bottom: 1px solid #ccc;
}
#editor-container {
  height: 500px;
}
/* .ant-checkbox-inner {
        width: 40px;
        height: 40px;
        font-size: 20px;
} */
/* 用于修改全局checkbox的大小 */
</style>
