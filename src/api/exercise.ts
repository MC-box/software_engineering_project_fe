import { Exercise } from "../paking/store"
import service from "../paking/service.ts"


function GetExercises(homeworkid: number): Promise<Exercise.exerciseInfo[]>{
    return service({
        method: "GET",
        url: "/api/v1/problem/homework/" + homeworkid.toString()
    })
}









const exerciseApi = {
    GetExercises,
}

export default exerciseApi