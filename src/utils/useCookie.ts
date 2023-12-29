export function setCookie(
    name: string,
    value: string | number, // 包含账号和密码
    expires: number = 15, // 以小时为单位且最小为1
){
    let Minutes = expires; // Change variable name to Minutes
    let exp = new Date();
    exp.setTime(exp.getTime() + Minutes * 60 * 1000); // Change calculation to minutes
    document.cookie = name + "=" + encodeURIComponent(value) + `expires=${exp.toUTCString()}`
    // document.cookie = encodeURIComponent(value) + `.${exp.toUTCString()}`
}