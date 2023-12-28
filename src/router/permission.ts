import router from './index.ts'
import { message } from "ant-design-vue"
import userStore from "../utils/useStore.ts"
import service from "../paking/service.ts"
import Cookies from 'js-cookie'

// const whitelist: string[] = ["/login", "/404", "/register"]
const whitelist: string[] = []
let doneInfo = false
router.beforeEach((to, from, next) => {
    console.log("成功回调")
    //...
    if (whitelist.includes(to.path)) {
        next()
      } else {
        // 首先先从localStorage中查看是否有token
        // 判断是否有token
        let token = Cookies.get("access_token")
        if (!token) {
          token = sessionStorage.getItem("access_item")
          if (token)
          {
              Cookies.set("access_token", token);
          }
          else
          {
          // message.error("token失效，请重新登录")
          // removeCookie("token") // 清除cookie
          // next("/login")
          }
        } else 
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