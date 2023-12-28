<template>
    <div id="login">
        <div id="contain">
            <div id="left_card">
                <h1>一键开启题海漫游</h1>
                <span>Welcome to CSSE world</span>
            </div>
            <div id="right_card">
                <el-card class="el-card">
                    <h2>欢迎登录</h2>
                    <form class="login" action="">
                        <input v-shake type="text" v-model="loginForm.account" placeholder="请输入账号(邮箱)">
                        <input v-shake type="password" v-model="loginForm.password" placeholder="请输入密码">
                    </form>
                    <!-- <div class="remember">
                        <input type="radio" name="" id="psd" class="radio"><label for="psd"></label>记住密码
                    </div> -->
                    <span style="float: left; margin: 10px 0 0 35px"><a href="/#/forget">修改密码</a></span>
                    <a-checkbox v-model:checked="checked" style="margin: 8px 0 0 55px;">记住密码</a-checkbox>

                    <!-- <div class="message">
                        <span v-html="error"></span>
                    </div> -->
                    <div id="btn">
                        <a href="/#/home"><button class="retbtn">返回</button></a>
                        <button class="loginbtn" @click="handleLogin" style="cursor: pointer;">登陆</button>
                    </div>
                </el-card>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ref } from '@vue/runtime-core'
import  userApi  from '../api/user.ts'
import { LoginInfo } from "@/paking/request"
import type { UnwrapRef } from 'vue';
import { message } from "ant-design-vue";
import userStore from "@/store/user"
import Cookies from 'js-cookie'

const router = useRouter()
const store = userStore() // ???
const checked = ref(false)
// export default {
//     name: "appLogin",
//     setup() {
//         let userLoginForm = reactive({
//             username: "",
//             password: ""
//         })
//         const store = useStore()
//         const router = useRouter()
//         const { proxy } = getCurrentInstance()
//         let error = ref('')
//         //获取用户登录信息
//         async function usreList() {

//         }
//         //获取用户信息
//         async function getUserInfo() {

//         }
//         return {
//             userLoginForm, error,
//             usreList, getUserInfo,
//         }
//     }
// }

// 获得账号和密码
const loginForm: UnwrapRef<LoginInfo> = {
    account: '',
    password: ''
}



const handleLogin = async () => {
    const res = await userApi.login(loginForm);
    console.log(res)
    if (res !== undefined && "access_token" in res){
        // console.log(res.access_token)
        Cookies.set('access_token', res.access_token)
        // setCookie('access_token', res.access_token);
        await message.loading("登陆成功，跳转中...", 0.5);
        // res中添加userid;
        const userInfo = await userApi.info();
        store.setUserInfo(userInfo);
        sessionStorage.setItem("access_token", res.access_token)
        router.push("/home");
    }
    else
    {
        await message.error("密码或账号错误，请重新输入", 0.5);
    }
} 



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

#login {
    position: relative;
    width: 100vw;
    height: 100vh;
    background-image: url(./../assets/wallhaven-9deddx.png);
    background-size: 100% 100%;
    background-color: #a7a8bd;

    #contain {
        height: 400px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 25px;
        border: 1px solid black;
        background-color: rgba(255, 255, 255, 0.1) !important;
        backdrop-filter: blur(5px);
        box-shadow: -5px -5px 10px rgb(39, 65, 65),
            5px 5px 20px aqua;
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
        width: 500px;

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

    .login {
        input {
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
        input:checked+label::after {
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

    .loginbtn {
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

}</style>

    