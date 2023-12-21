import router from './index.ts'
import { getCookie, removeCookie } from '../utils/useCookie.ts'
import { message } from "ant-design-vue"
import userStore from "../utils/useStore.ts"
import service from "../paking/service.ts"

const whitelist: string[] = ["/login", "/404", "/register"]
let doneInfo = false
router.beforeEach((to, from, next) => {
    //...
    if (whitelist.includes(to.path)) {
        next()
      } else {
        // 判断是否有token
        const token = getCookie("token")
        // if (!token) {
        //   message.error("token失效，请重新登录")
        //   removeCookie("token") // 清除cookie
        //   next("/login")
        // } else 
        {
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
      }
})