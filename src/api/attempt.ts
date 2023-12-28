import { Attempt, ValidationFail } from "../paking/store"
import service from "../paking/service.ts"


function CreateAttempt(data: Attempt.attemptInfo): Promise<ValidationFail | string | Attempt.attemptInfo_return>{
    return service({
        method: "PUT",
        url: "/api/v1/attempt/create",
        data
    })
}




const attemptApi = {
    CreateAttempt,
}

export default attemptApi