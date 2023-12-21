import { defineStore } from "pinia"
export default defineStore("user", {
    state: () => ({
      userInfo: {
        email: "", // 邮箱
        password: "", // 密码
        username: "", // 实名
        userId: 0, // 学号/教工号
        role: 0,
        gender: "",
        major: "",
      },
    }),
    actions: {
      setUserInfo(userInfo: any) {
        this.userInfo = { ...this.userInfo, ...userInfo }
      },
    },
  })