import { createApp } from 'vue'
// import './style.css'
import Ant from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import router from './router/index.ts'
import UndrawUi from 'undraw-ui'
import 'undraw-ui/dist/style.css'
// import 

createApp(App).use(Ant).use(router).use(UndrawUi).mount('#app')
