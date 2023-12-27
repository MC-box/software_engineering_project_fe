import { Attempt, ValidationFail } from "../paking/store"
import service from "../paking/service.ts"


function CreateAttempt(problemid: number, data: string): Promise<ValidationFail | string | Attempt.attemptInfo_return>{
    return service({
        method: "PUT",
        url: "/api/v1/attempt/problem/" + problemid.toString(),
        data
    })
}




const attemptApi = {
    CreateAttempt,
}

export default attemptApi