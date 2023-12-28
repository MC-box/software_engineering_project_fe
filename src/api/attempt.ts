import { Attempt, ValidationFail } from "../paking/store"
import service from "../paking/service.ts"

function GetAttemptByProblemid(problemid: number): Promise<Attempt.attemptInfo_return[]>{

    return service({
        method: "GET",
        url: "/api/v1/attempt/" + problemid.toString()
    })
}

function GetAttempt(problemid: number, studentid: number): Promise<Attempt.attemptInfo_return>{

    return service({
        method: "GET",
        url: "/api/v1/attempt",
        params: {
            problemid: problemid.toString(),
            studentid: studentid.toString()
        }
    })
}

function CreateAttempt(data: Attempt.attemptInfo): Promise<ValidationFail | string | Attempt.attemptInfo_return>{
    return service({
        method: "PUT",
        url: "/api/v1/attempt/create",
        data
    })
}

function StudentUpdateAttempt(data: Attempt.attemptInfo): Promise<string>{
    return service({
        method: "POST",
        url: "/api/v1/attempt/update",
        data
    })
}

function TeacherUpdateAttempt(data: Attempt.attemptInfo_point): Promise<string>{
    return service({
        method: "POST",
        url: "/api/v1/attempt/updatepoint",
        data
    })
}

const attemptApi = {
    GetAttemptByProblemid,
    GetAttempt,
    CreateAttempt,
    StudentUpdateAttempt,
    TeacherUpdateAttempt,
}

export default attemptApi