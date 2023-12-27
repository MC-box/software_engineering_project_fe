export function setCookie(
    name: string,
    value: string | number, // 包含账号和密码
    expires: number = 1, // 以小时为单位且最小为1
){
    let Days = expires;
    let exp = new Date();
    exp.setTime(exp.getTime() + Days * 60 * 60 * 1000);
    document.cookie = name + "=" + encodeURIComponent(value) + `expires=${exp.toUTCString()}`
    // document.cookie = encodeURIComponent(value) + `.${exp.toUTCString()}`
}   


export function getCookie(name: string){
    const reg = new RegExp("(^| )" + encodeURIComponent(name) + "expires=");
    const match = document.cookie.match(reg)
    // console.log(match)
    return match ? decodeURIComponent(match[2]) : ""
    
}

export function removeCookie(name: string){
    setCookie(name, "", -1) //相当于直接过期
}