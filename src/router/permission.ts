import router from './index.ts'
import { message } from "ant-design-vue"
import userStore from "../utils/useStore.ts"
import service from "../paking/service.ts"
import Cookies from 'js-cookie'

const whitelist: string[] = ["/login", "/404", "/register"]
// const whitelist: string[] = []
let doneInfo = false
router.beforeEach((to, from, next) => {
    console.log("成功回调: ")
    console.log(to.path)
    //...
    if (whitelist.includes(to.path)) {
        console.log("In whitelist")
        next()
      } 
      else {
        // 首先先从localStorage中查看是否有token
        // 判断是否有token
        const token = Cookies.get("access_token")
        if (!token) {
          Cookies.remove('access_token')
          next('/login')
        }
        console.log("doneinfo is" + doneInfo)
        if (doneInfo) next()
        else {
          const store = userStore()
          const info = service({
              method: "GET",
              url: "/user/info",
          })
          store.setUserInfo(info)
          doneInfo = true // 表示已经存放了数据
          next()
        }
      }
})