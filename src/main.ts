import { createApp } from 'vue'
// import './style.css'
import Ant from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import router from './router/index.ts'
// import 

createApp(App).use(Ant).use(router).mount('#app')
