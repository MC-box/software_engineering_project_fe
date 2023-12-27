import { Homework } from "../paking/store"
import service from "../paking/service.ts"

function GetHomeworks(courseid: number): Promise<Homework.homework_return[]>{
    return service({
        method: "GET",
        url: "/api/v1/homework/" + courseid.toString()
    })
}





const homeworkApi = {
    GetHomeworks,
}
export default homeworkApi