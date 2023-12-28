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

function CreateCourse(data: Course.course_create): Promise<string>{
    return service({
        method: "POST",
        url: "/api/v1/course/create",
        data
    })
}

function DeleteCourse(courseid: number): Promise<string>{
    return service({
        method: "DELETE",
        url: "/api/v1/course/delete/" + courseid.toString()
    })
}

function SelectCourse(courseid: number): Promise<string>{
    return service({
        method: "PUT",
        url: "/api/v1/courseselect/" + courseid.toString()
    })
}

function cancelSelect(courseid: number, userid: number): Promise<string>{
    return service({
        method: "DELETE",
        url: "/api/v1/courseselect",
        data: {
            courseid: courseid,
            userid: userid,
        
        }
    })
}

const courseApi = {
    CourseList_student,
    CourseList_teacher,
    CreateCourse,
    DeleteCourse,
    SelectCourse,
    cancelSelect,
    // resetCaptcha,
    // resetValid,
    // resetPassword,
}
  
export default courseApi