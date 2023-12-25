import { RouteRecord, RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router"
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

export const route: RouteRecordRaw =
  {
    path: "/login",
    component: () => import("../page/Login.vue"),
    meta: { title: "登陆界面"}
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
  routes: [ mainRoutes, route ],
})
export default router