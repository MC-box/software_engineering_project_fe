import { Exercise, ValidationFail } from "../paking/store"
import service from "../paking/service.ts"


function GetExercises(homeworkid: number): Promise<Exercise.exercisesInfo[]>{
    return service({
        method: "GET",
        url: "/api/v1/problem/homework/" + homeworkid.toString()
    })
}

function GetExerciseInfo(problemid: number): Promise<Exercise.exerciseInfo>{
    return service({
        method: "GET",
        url: "/api/v1/problem/" + problemid.toString()
    })
}


function CreateExercise(data: Exercise.exerciseCreate): Promise<string | ValidationFail>{
    return service({
        method: "PUT",
        url: "/api/v1/problem/create",
        data
    })
}








const exerciseApi = {
    GetExercises,
    GetExerciseInfo,
    CreateExercise,

}

export default exerciseApi