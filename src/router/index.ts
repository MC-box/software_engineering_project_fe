import { createRouter, createWebHashHistory } from "vue-router"
// const Home = {template: '<div>主页面</div>'}
// const Exercise = {template: '<div>题目中心</div>'}


const routes = [
    {path: '/home', name: 'home', component: () => import('../page/Home.vue')},
    {path: '/exercise', name: 'exercise', component: () => import('../page/Exercise.vue')},
    // {path: '/', name: '', component: () => import('../page/')},
]


const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: routes,
})

export default router