import { RouteRecord, RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router"
import userStore from "../utils/useStore.ts"
import service from "../paking/service.ts"
import Cookies from 'js-cookie'
import { message } from "ant-design-vue"
// const Home = {template: '<div>主页面</div>'}
// const Exercise = {template: '<div>题目中心</div>'}


// const routes = [
//     {path: '/main', name: 'main', component: () => import('../Main.vue')},
//     {path: '/main/home', name: 'home', component: () => import('../page/Home.vue')},
//     {path: '/main/exercise', name: 'exercise', component: () => import('../page/Exercise.vue')},
//     {path: '/main/discussion', name: 'discussion', component: () => import('../page/DisCenter.vue')},
//     {path: '/main/discussing', name: 'discussing', component: () => import('../page/Discussion.vue')},
//     {path: '/main/execenter', name: 'execenter', component: () => import('../page/ExeCenter.vue')},
//     {path: '/login', name: 'login', component: () => import('../page/Login.vue')} 
//     // {path: '/', name: '', component: () => import('../page/')},
// ]


// const router = createRouter({
//     history: createWebHashHistory(import.meta.env.BASE_URL),
//     routes: routes,
// })

export const mainRoutes: RouteRecordRaw = {
    path: '/',
    redirect: "/home",
    component: () => import("../Main.vue"),
    children: [
        {
            path: "/home",
            name: "home",
            component: () => import("../page/Home.vue"),
            meta: {
                title: "主页面"
            }
        },
        {
            path: "/exercise/:id", // 区分题目
            name: "exercise",
            component: () => import("../page/Exercise.vue"),
            meta: {
                title: "题目"
            },
            // children: 
        },
        {
            path: "/execenter/:id", // 区分课程
            name: "execenter",
            component: () => import("../page/ExeCenter.vue"),
            meta: {
                title: "题目中心"
            }
        },
        {
            path: "/discussion/:id",
            name: "discussion",
            component: () => import("../page/Discussion.vue"),
            meta: {
                title: "帖子"
            }
        },
        {
            path: "/unit/:id",
            name: "unit",
            component: () => import("../page/Unit.vue"),
            meta: {
                title: "实验"
            }
        },
        {
            path: "/discenter",
            name: "discenter",
            component: () => import("../page/DisCenter.vue"),
            meta: {
                title: "讨论区"
            }
        },
        {
            path: "/writeup/:id",
            name: "writeup",
            component: () => import("../page/WriteUp.vue"),
            meta: {
                title: "题解"
            }
        },
        {
            path: "/edit",
            name: "edit",
            component: () => import("../page/Edit.vue"),
            meta: {
                title: "编辑题目"
            }
        },
        {
            path: "/write",
            name: "write",
            component: () => import("../components/Writewp.vue"),
            meta: {
                title: "编辑题目"
            }
        }
    ]
}

export const Loginroute: RouteRecordRaw =
  {
    path: "/login",
    component: () => import("../page/Login.vue"),
    meta: { title: "登陆界面"}
  }

export const Forgetroute: RouteRecordRaw =
  {
    path: "/forget",
    component: () => import("../page/Forget.vue"),
    meta: { title: "忘记密码界面"}
  }

export const ExerciseRoutes : RouteRecordRaw[] = 
[
    {
        path: "/exercise/id:",
        component: () => import("../Main.vue"),
        meta: { title: "做题界面" }
    }
]

// const baseRoutes: RouteRecordRaw[] = [
//     {
//       path: "/login",
//       meta: {
//         hidden: true,
//         title: "登陆页面",
//       },
//       component: () => import("@/views/Login.vue"),
//     },
//     {
//       path: "/forget",
//       meta: {
//         hidden: true,
//         title: "重置密码",
//       },
//       component: () => import("@/views/Forget.vue"),
//     },
//     {
//       path: "/register",
//       meta: {
//         hidden: true,
//         title: "注册页面",
//       },
//       component: () => import("@/views/Register.vue"),
//     },
//     // 404必须放在最后兜底
//     {
//       path: "/404",
//       meta: {
//         hidden: true,
//         title: "不存在",
//       },
//       component: () => import("@/views/404.vue"),
//     },
//     {
//       path: "/:pathMatch(.*)*",
//       redirect: "/404",
//     },
//   ]

const router = createRouter({
  history: createWebHashHistory(),
  routes: [ mainRoutes, Loginroute, Forgetroute],
})



const whitelist: string[] = ["/login", "/404", "/register"]
// const whitelist: string[] = []
let doneInfo = false
router.beforeEach((to, from, next) => {
    console.log("成功回调")
    //...
    if (whitelist.includes(to.path)) {
        next()
        console.log(1)
      } else {
        // 首先先从localStorage中查看是否有token
        // 判断是否有token
        console.log(2)
        let token = Cookies.get("access_token")
        console.log(token)
        if (!token) {
          token = sessionStorage.getItem("access_item")
          if (token)
          {
              Cookies.set("access_token", token);
          }
          else
          {
            message.error("token失效，请重新登录")
            Cookies.remove("token") // 清除cookie
            next("/login")
          }
        } else 
        {
          if (doneInfo) next()
          else {
            const store = userStore()
            const info = service({
                method: "GET",
                url: "/api/v1/user",
            })
            store.setUserInfo(info)
            doneInfo = true // 表示已经存放了数据
            next()
          }
        }
      }
})
export default router