import { MessageResponse } from "../paking/request"
import { Course } from "../paking/store"
import service from "../paking/service.ts"

function CourseList_student():Promise<Course.courseInfo[]> {
    return service({
        method: 'GET',
        url: '/api/v1/course/student',
    })
}

function CourseList_teacher():Promise<Course.courseInfo[]> {
    return service({
        method: 'GET',
        url: '/api/v1/course/teacher',
    })
}



const courseApi = {
    CourseList_student,
    CourseList_teacher,
    // resetCaptcha,
    // resetValid,
    // resetPassword,
}
  
export default courseApi