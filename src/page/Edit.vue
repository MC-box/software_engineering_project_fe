<script lang="ts" setup>
import problemStore from "../store/problem";
import { message } from "ant-design-vue";
import problemApi from "../api/problem.ts";
import { reactive, onBeforeMount, ref, computed, onMounted, defineExpose } from "vue";
import { useRouter, useRoute } from "vue-router";
import RichTextEditor from "../components/RichTextEditor.vue";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons-vue"
import exerciseApi from "@/api/exercise"
import { Exercise } from "@/paking/store";

const router = useRouter();
const id = useRoute().query?.id;

const store = problemStore();
const { difficultyArr, categoryArr, courses } = store;
const tags = computed(() => store.tags.map((tag) => tag["tagName"]));

interface myproblem {
  title: string;
  question: string;
  category: string;
  difficulty: number;
  courseName: string;
  point: number;
}

// const problem = reactive({
//   title: "",
//   question: "",
//   category: "填空",
//   courseName: "",
//   difficulty: 1,
//   tags: [],
//   ans: "",
// });
const problem = ref<myproblem>({
  title: "",
  question: "",
  category: "选择",
  courseName: "",
  difficulty: 1,
  point: 0,
})

onBeforeMount(async () => {
  // const tags = await problemApi.problemTags();
  // store.setTags(tags);
  // if (id !== undefined) {
  //   const res = await problemApi.problemDetail(Number(id));
  //   console.log(res);
  //   problem.title = res.title;
  //   problem.question = res.question;
  //   problem.category = res.category;
  //   problem.courseName = res.courseName;
  //   problem.difficulty = res.difficulty;
  //   problem.tags = res.tags;
  //   problem.ans = res.ans;
  //   showTags.value = res.tags.map((tag) => tag["tagName"]);
  // }
});

onMounted( () => {
  console.log(problem)
})

const options = ref([]);
const onSearch = (searchText: string) => {
  options.value = !searchText
    ? []
    : courses
        .map((course) => (course.includes(searchText) ? { value: course } : ""))
        .filter(Boolean);
};
const onSelect = (value: string) => {
  problem.value.courseName = value;
};
const onChange = (value: string) => {
  problem.value.courseName = value;
};
// const selectTags = (tags: any[]) => {
//   // @ts-ignore
//   problem.tags = tags.map(val => ({ tagName: val }))
// }

const isSelectProblem = computed(() => {
  return problem.value.category == categoryArr[1];
});

const showTags = ref([]);
// const questionTinymce = ref(null)

//多选开关
const checked = ref<boolean>(false);
const ansNum = ref(4)
const inputValues = ref(['','','',''])
const addAns = () => {
  inputValues.value.push("")
  ansNum.value++
}
const delAns = () => {
  inputValues.value.splice(0, 1);
  ansNum.value--;
}

const route = useRoute();
let rExp = new RegExp("\\d+");

// interface problem {
//   title: string;
//   question: string;
//   category: string;
//   difficulty: string;
//   tags: string[];
//   ans: string;
// }
async function handleEdit() {
  // const isFinish = Object.values(problem).every(Boolean);
  const isFinish = true
  if (isFinish) {
    // if (id !== undefined) {
    //   const res: any = await problemApi.problemModify(Number(id), problem);
    //   if (res.code === 0) {
    //     message.success("修改成功");
    //     router.push("/problem");
    //   }
    // } else {
    //   const res: any = await problemApi.problemCreate(problem);
    //   if (res.code === 0) {
    //     message.success("新建题目");
    //     router.push("/problem");
    //   }
    // }
    interface Choice{
      content: string,
      label: string,
      iscorrect: boolean
    }
    const { title, question, category, difficulty, point} : myproblem = problem.value;
    console.log(inputValues)
    const mychoice : Choice[] = inputValues.value.map((inputValue, index) => {
        return { 
                 content: inputValue,
                 label: String.fromCharCode(index + 65),
                 iscorrect: true
                }
    })
    const input : Exercise.exerciseCreate = {
      name: title,
      content: question,
      problemType: category === "选择" ? "choice" : "blank",
      difficult: difficulty === 1 ? "简单" : difficulty === 2 ? "中等" : "困难",
      point: point,
      // todo: change
      homeworkid: parseInt(rExp.exec(route.path)[0]),
      choice: category === "选择" ? mychoice : []
    }
    console.log(input)
    const res: any = await exerciseApi.CreateExercise(input);
  } else {
    message.error("数据缺失，无法新建题目");
  }
}

defineExpose({
  handleEdit
})
</script>

<template>
  <div class="edit">
    <section>
      <div class="font-strong" style="margin-top: 20px; margin-bottom: 20px">
        题目标题
      </div>
      <AInput
        size="large"
        placeholder="请输入题目标题"
        v-model:value="problem.title"
        style="width: 57%"
      />
    </section>
    <ADivider />
    <main style="width: 80%" class="edit-problem">
      <div style="box-sizing: border-box; width: 70%">
        <div class="font-strong" style="margin-top: 20px; margin-bottom: 20px">
          题目类型
        </div>
        <ASelect
          style="width: 120px"
          size="large"
          v-model:value="problem.category"
          class="tagSelect"
        >
          <ASelectOption v-for="item in categoryArr.slice(1)" :value="item">
          </ASelectOption>
        </ASelect>
        <div class="font-strong" style="margin-top: 20px; margin-bottom: 20px">
          题目描述
        </div>
        <!-- todo: change to md -->
        <!-- <RichTextEditor
          placeholder="请输入题目描述，如需填空请使用下划线替代"
          v-model="problem.question"
          style="margin-top: 30px"
        /> -->
        <v-md-editor v-model="problem.question" aria-placeholder="请输入题目描述，如需填空请使用下划线替代" height="400px"></v-md-editor>
        <div
          v-if="isSelectProblem"
          class="font-strong"
          style="margin-top: 20px"
        >
          <!-- <div v-if="problem.category==='选择'">
            <label >多选：</label>
            <ASwitch v-model:checked="checked"></ASwitch>
          </div> -->
          <!-- <p>debug: {{ inputValues }}</p> -->
          <div v-for="(inputValue, index) in inputValues" style="margin-top: 25px; display: flex; align-items: center;" :key="index">
            <span style="width: 30px;">{{ index + 1}}.</span>
            <span style="display: flex; align-items: center;">
              <input style="background-color: #fafafa; display: inline-block; width:90%;" v-model="inputValues[index]" />
              <MinusOutlined @click="delAns" style="margin-left: 30px;" />
            </span>
          </div>
          <PlusOutlined @click="addAns" style="margin-top: 25px;"/>
        </div>
        <!-- 因无判题故修改 -->
        <!-- <div class="font-strong" style="margin-top:20px">题目答案</div>
        <RichTextEditor placeholder="请输入题目答案" v-model="problem.ans" style="margin: 20px 0;" />
        <ADivider /> -->
      </div>
      <div class="property">
        <p class="property-title">
          <span style="color: red">*</span>题目属性（必填）
        </p>
        <AForm name="Property">
          <AFormItem name="难度" label="难度">
            <ASelect
              placeholder="请选择难度"
              v-model:value="problem.difficulty"
            >
              <ASelectOption
                v-for="(item, index) in difficultyArr.slice(1)"
                :value="index + 1"
                >{{ item }}
              </ASelectOption>
            </ASelect>
          </AFormItem>
        <AFormItem name="Property">
          <p class="property-title">
            <span style="color: red">*</span>分数（必填）
          </p>
          <AInputNumber
            placeholder="请输入分数"
            v-model:value="problem.point"
            style="width: 120px">
          </AInputNumber>
        </AFormItem>
        </AForm>
      </div>
    </main>
  </div>
  <!-- 需要区分选择题和填空题，选择题需要添加选项的选择，而填空题不需要，增加单变量即可 -->
</template>

<style scoped lang="less">
.edit {
  padding: 50px;
}

.edit-problem {
  display: flex;
  width: 100%;
}

.property {
  padding-left: 50px;
  margin-top: 160px;
  border-radius: 10px;
  margin-left: 30px;
  width: 15vw;

  &-title {
    font-size: 18px;
    color: blue;
    font-weight: bold;
  }
}

.font-strong {
  font-size: 16px;
  font-weight: bold;
}
</style>
