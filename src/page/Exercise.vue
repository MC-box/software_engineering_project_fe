<template>
  <div>题目界面</div>
  <template v-if="ifMulChoice">
    <div style="background-color: #ececec; padding: 20px">
      <a @click="router.back">
        <CloseCircleOutlined :style="{ fontSize: '20px', color: '#08c' }" />
      </a>
      <a-card class="main" title="题目" :bordered="false" style="width: 70%; margin: auto">
        <span :class="difficultyColor(problem?.difficulty)">{{
          difficultyArr[problem?.difficulty - 1]
        }}</span>
        <span>题型：{{ problem?.category }}</span>
        <span>课程：{{ problem?.courseName }}</span>
        <span>通过人数：{{ problem?.Cnt }}</span>
      </a-card>
      <br />
      <section class="description">
        <div class="title">
          <span>题目描述</span>
          <a-button type="primary" style="min-width: 80px; margin-left: 83%"
            @click="reverse()">查看题解</a-button>
        </div>
        <!-- <RichTextEditor></RichTextEditor> -->
        <!-- <div class="p_">{{ problemdescription }}</div> -->
        <v-md-preview :text="problemdescription" class="p_"></v-md-preview>

        <div v-if="ifWriteUp" style="background-color: white">
          <div class="title">
            题解列表
            <PlusCircleOutlined style="margin-left: 84%" /><span
              style="margin-right: 20px; margin-left: 7px; font-size: 14px" @click="showModal">
              写题解</span>
          </div>
          <a-list item-layout="horizontal" :data-source="data" style="height: 6cm">
            <template #renderItem="{ item }">
              <a-list-item>
                <template #actions>
                  <!-- Todo: add delete button fail -->
                  <div v-if="store.userInfo.role === item.contributorid || store.userInfo.role > 0">
                    <a @click="deleteSolution(item.solutionid)">delete</a>
                  </div>
                </template>
                <a-list-item-meta :description="`题解 By ${item.author}`">
                  <template #title>
                    <span @click="
                      router.push({
                        name: 'writeup',
                        params: { id: item.solutionid },
                      })
                      " style="cursor: pointer">{{ item.name }}</span>
                    <!-- <a @click="{ router.push({ name: 'writeup', params: { id: item.key } }) }">{{ item.title }}</a> -->
                  </template>
                  <template #avatar>
                    <a-avatar src="https://joeschmoe.io/api/v1/random" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </div>
        <div v-else>
          <div class="title">题目选项</div>
          <div class="doing">
            <a-checkbox-group name="checkboxgroup" :options="selectedOptions" style="display: grid; gap: 24px"
              v-model:value="selectedAnswer" />
            <a-button type="primary" style="float: right; margin-top: 15px; width: 80px" @click="submitSelected"
              :disabled="isSubmit">提交</a-button>
          </div>
        </div>
        <!-- 这一部分需要换成router-view以展示不同题型的选项 -->
      </section>
    </div>
  </template>
  <template v-if="ifBlankFill">
    填空题 / 简答题
    <div style="background-color: #ececec; padding: 20px">
      <a @click="router.back">
        <CloseCircleOutlined :style="{ fontSize: '20px', color: '#08c' }" />
      </a>
      <a-card class="main" title="题目" :bordered="false" style="width: 70%; margin: auto">
        <span :class="difficultyColor(problem?.difficulty)">{{
          difficultyArr[problem?.difficulty - 1]
        }}</span>
        <span>题型：{{ problem.category }}</span>
        <span>课程：{{ problem?.courseName }}</span>
        <span>通过人数：{{ problem?.Cnt }}</span>
      </a-card>
      <br />
      <section class="description">
        <div class="title">
          <span>题目描述</span>
          <a-button type="primary" style="min-width: 80px; margin-left: 83%"
            @click="reverse()">查看题解</a-button>
        </div>
        <!-- <RichTextEditor></RichTextEditor> -->
        <!-- <div class="p_">{{ problemdescription }}</div> -->
        <v-md-preview :text="problemdescription" class="p_"></v-md-preview>
        <div v-if="ifWriteUp" style="background-color: white">
          <div class="title">
            题解列表
            <PlusCircleOutlined style="margin-left: 84%" /><span
              style="margin-right: 20px; margin-left: 7px; font-size: 14px" @click="showModal">
              写题解</span>
          </div>
          <a-list item-layout="horizontal" :data-source="data" style="height: 6cm">
            <template #renderItem="{ item }">
              <a-list-item>
                <template #actions>
                  <!-- Todo: add delete button fail -->
                  <div v-if="store.userInfo.role === item.contributorid || store.userInfo.role > 0">
                    <a @click="deleteSolution(item.solutionid)">delete</a>
                  </div>
                </template>
                <a-list-item-meta :description="`题解 By ${item.author}`">
                  <template #title>
                    <span @click="
                      router.push({
                        name: 'writeup',
                        params: { id: item.solutionid },
                      })
                      " style="cursor: pointer">{{ item.name }}</span>
                    <!-- <a @click="{ router.push({ name: 'writeup', params: { id: item.key } }) }">{{ item.title }}</a> -->
                  </template>
                  <template #avatar>
                    <a-avatar src="https://joeschmoe.io/api/v1/random" />
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </div>
        <div v-else>
          <div class="title">答题区</div>
          <div style="background-color: white">
            <!-- <Editor :readonly="isSubmit" v-model="BlankFillAnswer" placeholder="请输入你的答案" style="margin-top: 20px">
            </Editor> -->
            <div v-if="!isSubmit">
              <v-md-editor v-model="BlankFillAnswer"  style="margin-top: 20px" placeholder="请输入你的答案"></v-md-editor>
            </div>
            <div v-else>
              <v-md-preview :text="BlankFillAnswer"></v-md-preview>
            </div>
          </div>
          <div style="
              background-color: white;
              min-height: 40px;
              padding-bottom: 15px;
              text-align: right;
            ">
            <a-button type="primary" style="margin-right: 20px; margin-top: 15px; width: 80px" :disabled="isSubmit"
              @click="submitBlank">提交</a-button>
          </div>
        </div>
        <!-- 这一部分需要换成router-view以展示不同题型的选项 -->
      </section>
    </div>
  </template>

  <a-modal v-model:open="open" title="编写题解" :confirm-loading="confirmLoading" @ok="handleOk" width="1500px"
    :bodyStyle="{ height: '600px', overflow: 'hidden', overflowY: 'scroll' }">
    <label>请输入标题：</label>
    <a-input v-model:value="title" placeholder="请输入标题" />
    <label>请在下方编写你的题解,完成后记得点击提交</label>
    <div>
      <v-md-editor v-model="markdown" :height="height"></v-md-editor>
    </div>
  </a-modal>
</template>

<style lang="less" scoped></style>

<script setup lang="ts">
import { reactive, ref, onBeforeMount, onMounted } from "vue";
import Editor from "../components/RichTextEditor.vue";
// import { CheckboxGroup } from "ant-design-vue";
import { message } from "ant-design-vue";
import { useRouter, RouterView, useRoute } from "vue-router";
import { CloseCircleOutlined, PlusCircleOutlined } from "@ant-design/icons-vue";
import writeupApi from "@/api/writeup";
import attemptApi from "@/api/attempt";
import exerciseApi from "@/api/exercise";
import userStore from "@/store/user"
import { WriteUp, Attempt, Exercise } from "@/paking/store";

let ifWriteUp = ref(false);
const route = useRoute();
const router = useRouter();
const store = userStore();
const BlankFillAnswer = ref("");
let ifMulChoice = true; // 选择题
let ifBlankFill = false; // 填空题/简答题
let difficultyArr = reactive(["简单", "中等", "困难"]);

// const problem = ref({
//   id: 1,
//   title: "",
//   category: "选择题", // 这里改成exType
//   difficulty: 2,
//   courseName: "软件工程", //
//   Cnt: 10,
// });
interface probleminfo {
  id: number;
  title: string;
  category: string;
  difficulty: number;
  courseName: string;
  Cnt: number;
}

// const problem = ref({
//   id: 1,
//   title: "",
//   category: "选择题", // 这里改成exType
//   difficulty: 2,
//   courseName: "软件工程", //
//   Cnt: 10,
// });

let problem = ref<probleminfo>();
let title = ref<string>();
// // data
// const selectedOptions = ref([
//   {
//     label: "A. Fuck you",
//     value: "A",
//   },
//   {
//     label: "B. Cao ni ma",
//     value: "B",
//   },
//   {
//     label: "C. sha bi",
//     value: "C",
//   },
//   {
//     label: "D. nao tan",
//     value: "D",
//   },
// ]);

interface OptionsItem {
  label: string;
  value: string;
}

let selectedOptions = ref<OptionsItem[]>();
let problemdescription = ref("");
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
const isSubmit = ref<boolean>(false);
const submitSelected = async () => {
  console.log("isSubmit: " + isSubmit.value)
  if (selectedAnswer.value.length == 0) {
    message.error("请选择答案");
    return;
  }
  const result = selectedAnswer.value.join("");
  message.success("提交成功");
  // TODO: 选择题：接下来直接读取selectedAnswer的数据并与交互即可
  const pid = parseInt(rExp.exec(route.path)[0]);
  const a: Attempt.attemptInfo = {
    problemid: pid,
    content: result,
  };
  const last_attempt = await attemptApi.GetAttempt(pid, store.userInfo.userid);
  if (last_attempt !== undefined && "problemid" in last_attempt) {
    await attemptApi.StudentUpdateAttempt(a);
  } else {
    await attemptApi.CreateAttempt(a);
  }
  isSubmit.value = true;
  // 这里可以添加答案界面，即显示出分数

};

const submitBlank = async () => {
  console.log("isSubmit: " + isSubmit.value)
  if (BlankFillAnswer.value == "") {
    // 即没有填任何数据
    message.error("请选择答案");
    return;
  }
  message.success("提交成功");
  let pid = parseInt(rExp.exec(route.path)[0]);
  const a: Attempt.attemptInfo = {
    problemid: pid,
    content: BlankFillAnswer.value,
  };
  console.log(BlankFillAnswer.value);
  const last_attempt = await attemptApi.GetAttempt(pid, store.userInfo.userid);
  if (last_attempt !== undefined && "problemid" in last_attempt) {
    await attemptApi.StudentUpdateAttempt(a);
  } else {
    await attemptApi.CreateAttempt(a);
  }
  isSubmit.value = true;

  // TODO: 填空题：接下来直接读取BlankFillAnswer的数据并与后端交互即可(上传图片功能暂未解决)
};

const open = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
const markdown = ref("");
const showModal = () => {
  open.value = true;
};
let markdownText = ref("");
const height = ref("575px"); // modal高度·25px
let rExp = new RegExp("\\d+");
const handleOk = async () => {
  confirmLoading.value = true;
  setTimeout(() => {
    open.value = false;
    confirmLoading.value = false;
  }, 2000);
  console.log(route.path);
  markdownText = markdown;
  console.log(markdownText.value);
  let writeupinfo: WriteUp.WriteUpInfo_submit = {
    problemid: parseInt(rExp.exec(route.path)[0]),
    content: markdownText.value,
    contributorid: store.userInfo.userid,
    name: title.value,
  };

  const return_value = await writeupApi.CreateWriteUp(writeupinfo);
  if (return_value === "") {
    // success...
  } else {
    // failed...
  }
  const wpid = await writeupApi.GetWriteUpId(
    parseInt(rExp.exec(route.path)[0])
  );

  data.value = wpid;
};

// interface DataItem {
//   name: string;
//   solutionid: number;
//   author: string;
// }

// 静态题解信息
// const data: DataItem[] = [
//   {
//     name: "Ant Design Title 1",
//     solutionid: 1,
//     author: "你妈边哭边"
//   },
//   {
//     name: "Ant Design Title 2",
//     solutionid: 2,
//     author: "你干嘛嗨嗨哟"
//   },
// ];

// 动态题解信息
const data = ref<WriteUp.WriteupInfo[]>();

const deleteSolution = async (solutionid: number) => {
  await writeupApi.DeleteWriteUp(solutionid);
  const wpid = await writeupApi.GetWriteUpId(
    parseInt(rExp.exec(route.path)[0])
  );
  data.value = wpid;
};

const reverse = async () => {
  let pid = parseInt(rExp.exec(route.path)[0]);

  if (store.userInfo.role === 0) {
    const last_attempt = await attemptApi.GetAttempt(pid, store.userInfo.userid);
    const hasSubmited = last_attempt !== undefined && "problemid" in last_attempt;

    if (hasSubmited) {
      ifWriteUp.value = !ifWriteUp.value;
      if (ifWriteUp.value) {
        const wpid = await writeupApi.GetWriteUpId(
          parseInt(rExp.exec(route.path)[0])
        );
        console.log(wpid);
        if (wpid.length !== 0 && "solutionid" in wpid[0]) {
          data.value = wpid;
        } else {
          if ("detail" in wpid) {
            // message.error(wpid.msg);
          } else {
            // 没有找到任何题解，即为空
            // message.error();
          }
        }
      }
    } else {
      message.error("提交后才能查看题解");
    }
  } else {
    // 我是老师
    ifWriteUp.value = !ifWriteUp.value;
    if (ifWriteUp.value) {
      const wpid = await writeupApi.GetWriteUpId(
        parseInt(rExp.exec(route.path)[0])
      );
      console.log(wpid);
      if (wpid.length !== 0 && "solutionid" in wpid[0]) {
        data.value = wpid;
      } else {
        if ("detail" in wpid) {
          // message.error(wpid.msg);
        } else {
          // 没有找到任何题解，即为空
          // message.error();
        }
      }
    }
  }
};
// interface probleminfo{
//   id: number,
//   title: string,
//   category: string,
//   difficulty: number,
//   courseName: string,
//   Cnt: number,
// }
onBeforeMount(async () => {
  const result = await exerciseApi.GetExerciseInfo(
    parseInt(rExp.exec(route.path)[0])
  );
  console.log(result);
  if ("problemid" in result === false) {
    return;
  }
  console.log("success1");
  problemdescription.value = result.content;
  // problem.value = result.map((item) => {
  //   id: item.
  // })
  const {
    problemid,
    name,
    problemType,
    difficult,
    homeworkid,
  }: Exercise.exerciseInfo = result;
  problem.value = {
    id: problemid,
    title: name,
    category: problemType === "choice" ? "选择题" : "填空题/简答题",
    difficulty: difficult === "hard" ? 3 : difficult === "easy" ? 1 : 2,
    courseName: "name",
    Cnt: 1,
  };
  if (result.problemType === "choice") {
    ifMulChoice = true;
    ifBlankFill = false;
    let result2 = ref<Exercise.Choice[]>();
    result2.value = result.choice;
    selectedOptions.value = result2.value.map((item) => ({
      value: item.label,
      label: item.label + " " + item.content,
    }));
  } else {
    ifMulChoice = false;
    ifBlankFill = true;
  }

  if (store.userInfo.role > 0) {
    isSubmit.value = true;
    return;
  }
  const attempt = await attemptApi.GetAttempt(
    parseInt(rExp.exec(route.path)[0]),
    store.userInfo.userid
  );

  if ("content" in attempt) {
    if (result.problemType === "choice") {
      selectedAnswer.value = attempt.content.split(" ");
    } else {
      BlankFillAnswer.value = attempt.content;
    }
    isSubmit.value = true;
  }
  console.log(BlankFillAnswer.value)
});
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
    /* justify-content: space-between; */
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
  z-index: 100;
  /* 按需定义 */
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
