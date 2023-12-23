import { createApp } from 'vue'
// import './style.css'
import Ant from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import App from './App.vue'
import router from './router/index.ts'
import UndrawUi from 'undraw-ui'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import 'undraw-ui/dist/style.css'
import '../node_modules/vditor/dist/index.css'
// import 
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
VueMarkdownEditor.use(vuepressTheme, {
    Prism,
});

createApp(App).use(Ant).use(router).use(UndrawUi).use(ElementPlus).use(createPinia).use(VueMarkdownEditor).mount('#app')
