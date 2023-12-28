import { Homework } from "../paking/store"
import service from "../paking/service.ts"

function GetHomeworks(courseid: number): Promise<Homework.homework_return[]>{
    return service({
        method: "GET",
        url: "/api/v1/homework/" + courseid.toString()
    })
}

function CreateHomework(data: Homework.homework_submit): Promise<string>{
    return service({
        method: "PUT",
        url: "/api/v1/homework/create",
        data
    })
}

function DeleteHomework(homeworkid: number): Promise<string>{
    return service({
        method: "DELETE",
        url: "/api/v1/homework/delete/" + homeworkid.toString()
    })
}



const homeworkApi = {
    GetHomeworks,
    CreateHomework,
    DeleteHomework,
}
export default homeworkApi