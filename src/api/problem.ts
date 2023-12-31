import { MessageResponse } from "../paking/request"
import { Problem } from "../paking/store"
import service from "../paking/service.ts"

function problemList(
  data: Problem.filters = {
    offset: 0,
    limit: 10,
  }
): Promise<{ problems: Problem.problem[]; problemsNumber: number }> {
  return service({
    method: "POST",
    url: "/v1/problem/allWithTag",
    data,
  })
}

function problemTags(): Promise<Problem.Tag[]> {
  return service({
    method: "GET",
    url: "/v1/problem/tag",
  })
}

function problemCreate(data: any):Promise<MessageResponse> {
  return service({
    method: "POST",
    url: "/v1/problem/create",
    data,
  })
}

function problemFavour(problemId: number): Promise<MessageResponse> {
  return service({
    method: "GET",
    url: "/v1/problem/collection",
    params: {
      problemId,
    },
  })
}

function problemCancelFavour(problemId: number): Promise<MessageResponse> {
  return service({
    method: "DELETE",
    url: "/v1/problem/collection",
    params: {
      problemId,
    },
  })
}

function problemDelete(problemId: number): Promise<MessageResponse> {
  return service({
    method: "DELETE",
    url: `/v1/problem/${problemId}`,
  })
}
/**
 * 获取具体题目详情
 */
function problemDetail(problemId: number): Promise<Problem.problem> {
  return service({
    method: "GET",
    url: `/v1/problem/${problemId}`,
  })
}

function problemModify(problemId: number, data: any): Promise<Problem.problem> {
  return service({
    method: "PUT",
    url: `/v1/problem/${problemId}`,
    data,
  })
}

function problemCommit(problemId: number): Promise<MessageResponse> {
  return service({
    method: "GET",
    url: "/v1/problem/commit",
    params: {
      problemId,
    },
  })
}

const problemApi = {
  problemList,
  problemCreate,
  problemTags,
  problemFavour,
  problemCancelFavour,
  problemDelete,
  problemDetail,
  problemModify,
  problemCommit
}

export default problemApi
