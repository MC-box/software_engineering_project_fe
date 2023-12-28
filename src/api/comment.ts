import { Solution } from "../paking/store"
import service from "../paking/service.ts"

function GetComments(solutionid: number): Promise<Solution.Comment[]>{
    return service({
        method: "GET",
        url: "/api/v1/comment/solution/" + solutionid.toString()
    })
}

function CreateComment(solutionid: number, comment: Solution.CommentReq) {
    return service({
        method: "PUT",
        url: "/api/v1/comment/solution/" + solutionid.toString(),
        data: comment
    })

}

function DeleteComment(commentid: number) {
    return service({
        method: "DELETE",
        url: "/api/v1/comment/" + commentid.toString()
    })
}



const commentApi = {
    GetComments,
    CreateComment,
    DeleteComment,
}
export default commentApi