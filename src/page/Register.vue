<template>
  <div id="forget">
    <div id="contain">
      <div id="left_card">
        <h1>欢迎加入我们！</h1>
        <span>welcome!</span>
      </div>
      <div id="right_card">
        <el-card class="el-card">
          <h2>用户注册</h2>
          <form class="forget" action="">
            <input
              v-shake
              type="text"
              v-model="userRegisterForm.userid"
              placeholder="请输入6位学号"
            />
            <input
              v-shake
              type="text"
              v-model="userRegisterForm.username"
              placeholder="请输入用户名"
            />
            <input
              v-shake
              type="password"
              v-model="userRegisterForm.password"
              placeholder="请输入密码"
            />
            <input
              v-shake
              type="text"
              v-model="userRegisterForm.email"
              placeholder="请输入邮箱"
            />
            <input
              v-shake
              type="text"
              v-model="userRegisterForm.telephone"
              placeholder="请输入电话"
            />
            <input
              v-shake
              type="text"
              v-model="userRegisterForm.major"
              placeholder="请输入专业"
            />
            <select name="selected">
              <option value="0">学生</option>
              <option value="1">老师</option>
            </select>
          </form>
          <div class="message">
            <span v-html="error"></span>
          </div>
          <div id="btn">
            <a href="/#/login"><button class="retbtn">返回</button></a>
            <button class="submitbtn" @click="submit">提交</button>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
// import { useStore } from 'vuex'
import { useRouter } from "vue-router";
import { ref } from "@vue/runtime-core";
import { Register } from "@/paking/store";
import userApi from "@/api/user";
import { message } from "ant-design-vue";
// let userRegisterForm = reactive({
//     username: "",
//     password: "",
//     email: "",
//     phone: "",
//     major: "",
//     role: -1,
// })

let userRegisterForm = ref<Register.registerInfo>({
  userid: null,
  username: "",
  password: "",
  email: "",
  telephone: "",
  major: "",
  role: 0,
});
// const store = useStore()
const router = useRouter();
// const { proxy } = getCurrentInstance()
let error = ref("");
// //获取用户登录信息
// async function usreList() {

// }
// //获取用户信息
// async function getUserInfo() {

// }

const submit = async () => {
  if (
    userRegisterForm.value.username === "" ||
    userRegisterForm.value.password === "" ||
    userRegisterForm.value.email === "" ||
    userRegisterForm.value.telephone === "" ||
    userRegisterForm.value.major === ""
  ) {
    message.error("输入数据不完整,请重新输入!");
    return;
  }
  const registerInfo: Register.registerInfo = userRegisterForm.value;
  // 注册成功？获取token？
  try {
    await userApi.register(registerInfo);
    message.loading("注册成功，跳转到登录页面...", 0.5);
    router.push("/login");
  } catch {
    message.error("注册失败，请重新输入...", 0.5);
  }
};
</script>

<style lang="less" scoped>
@keyframes animate {
  0% {
    filter: hue-rotate(0deg);
  }

  100% {
    filter: hue-rotate(360deg);
  }
}

#forget {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-image: url(./../assets/wallhaven-9deddx.png);
  background-size: 100% 100%;
  background-color: #a7a8bd;

  #contain {
    height: 550px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 25px;
    border: 1px solid black;
    background-color: rgba(255, 255, 255, 0.1) !important;
    backdrop-filter: blur(5px);
    box-shadow: -5px -5px 10px rgb(39, 65, 65), 5px 5px 20px aqua;
    /* 5秒 infinite循环播放无限次 linear匀速  */
    animation: animate 5s linear infinite;
  }
}

#contain {
  display: flex;
  flex-direction: row;
  text-align: center;
  align-items: center;

  #left_card {
    width: 300px;
    padding-left: 70px;

    h1 {
      color: white;
      white-space: nowrap;
    }

    span {
      font-size: 1.2rem;
      text-align: center;
      color: white;
      white-space: nowrap;
    }
  }

  #right_card {
    width: 400px;

    .el-card {
      margin: 0 45px;
      border-radius: 25px;
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}

#right_card {
  display: flex;
  justify-content: center;
  align-items: center;

  h2 {
    margin-bottom: 5px;
  }

  .forget {
    input,
    select {
      width: 80%;
      height: 45px;
      margin-top: 10px;
      border: 1px solid white;
      background-color: rgba(255, 255, 255, 0.5);
      border-radius: 10px;
      font-size: inherit;
      padding-left: 20px;
      outline: none;
    }
  }

  .remember {
    float: right;
    height: 26px;
    text-align: center;
    font-size: 1rem;
    position: relative;

    .radio {
      height: 1rem;
      width: 1rem;
      vertical-align: middle;
      margin-top: -2px;
      opacity: 0;
    }

    label {
      position: absolute;
      left: -2px;
      top: 5px;
      height: 1rem;
      width: 1rem;
      vertical-align: middle;
      margin-top: -2px;
      border-radius: 50%;
      border: 1px solid black;
    }

    //radio选中后修改labe内的内容 :after 选择器在被选元素的内容后面插入内容。
    input:checked + label::after {
      content: "";
      width: 0.6rem;
      height: 0.6rem;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      background-color: rgba(207, 38, 38, 0.8);
      border: 1px solid rgba(207, 38, 38, 0.8);
    }
  }

  .message {
    margin-top: 26px;
    font-size: 0.9rem;
    color: red;
  }

  .submitbtn {
    width: 35%;
    height: 35px;
    margin: 10px 0 5px 0;
    border-radius: 10px;
    background-color: rgba(207, 38, 38, 0.8);
    color: black;
  }

  .retbtn {
    margin: 0 25px 5px -5px;
    width: 35%;
    height: 35px;
    margin-top: 10px;
    border-radius: 10px;
    background-color: rgba(253, 253, 253, 0.8);
    color: black;
  }
}
</style>
