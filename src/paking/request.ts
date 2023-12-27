export interface MessageResponse {
    code: number // 执行结果，1为成功，0为失败
    message: string // 结果说明
}

export interface LoginInfo{
    account: string // 账号
    password: string // 密码
}