import { LoginInfo } from "@/paking/request"
import service from "@/paking/service"
import { User } from "@/paking/store"

function login(data: LoginInfo):Promise<User.token>{
    return service({
        method: 'POST',
        url: '/api/v1/login',
        data
    })
}

function register(data: any) {
    return service({
      method: "POST",
      url: "/register",
      data,
    })
  }

function info():Promise<User.userInfo>{
  return service({
    method: "GET",
    url: "/api/v1/user/"
  })
}
const userApi = {
    login,
    register,
    info,
    // resetCaptcha,
    // resetValid,
    // resetPassword,
}
  
export default userApi









