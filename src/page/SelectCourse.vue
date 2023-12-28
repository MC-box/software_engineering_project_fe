<template>
<el-table :data="courses" style="margin: auto; width: 50%;">
    <el-table-column prop="courseid" label="课程号" />
    <el-table-column prop="name" label="课程名" />
    <el-table-column prop="teachername" label="教师名" />
    <el-table-column prop="info" label="课程信息" />
    <el-table-column>
        <template #default="scope">
            <el-button type="primary" @click="selectCourse(scope.row)">选课</el-button>
        </template>
    </el-table-column>
</el-table>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue'
import { ElTable } from 'element-plus';
import { Course } from '@/paking/store';
import courseApi from '@/api/course';

const courses = ref<Course.selectCourseInfo[]>()
const get_course = async () => {
    courses.value = await courseApi.getUnselectedCourse()
}

onBeforeMount(async () => {
    await get_course()
})

const selectCourse = async (course: Course.selectCourseInfo) => {
    await courseApi.SelectCourse(course.courseid)
    await get_course()
}


</script>