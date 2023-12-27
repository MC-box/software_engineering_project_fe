import { defineStore } from 'pinia'

export default defineStore("user", {
    state: () => ({
        userInfo: {
            userid: 0,
            username: "",
            password: "",
            email: "",
            role: 0,
            telephone: "",
            major: ""
        }
    }),
    actions: {
        setUserInfo(userInfo: any){
            this.userInfo = { ...this.userInfo, ...userInfo }
        }
    }
})