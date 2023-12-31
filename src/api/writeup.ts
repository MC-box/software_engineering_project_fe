import { WriteUp } from "../paking/store"
import service from "../paking/service.ts"

function GetWriteUpId(problemid: number): Promise<WriteUp.WriteupInfo[]>{
    return service({
        method: "GET",
        url: "api/v1/solution/problemid/" + problemid,
    })
}

function GetWriteUp(solutionid: number): Promise<WriteUp.WriteupInfo_content>{
    return service({
        method: "GET",
        url: "api/v1/solution/" + solutionid,
    })
}



function CreateWriteUp(data: WriteUp.WriteUpInfo_submit): Promise<string>{
    return service({
        method: "PUT",
        url: "api/v1/solution/create",
        data
    })
}

function DeleteWriteUp(solutionid: number): Promise<string>{
    return service({
        method: "DELETE",
        url: "api/v1/solution/delete/" + solutionid.toString()
    })
}


const writeupApi = {
    GetWriteUp,
    GetWriteUpId,
    CreateWriteUp,
    DeleteWriteUp,
}


export default writeupApi