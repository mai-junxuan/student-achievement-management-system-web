<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.keyword" placeholder="姓名/学号/备注"/>
      </el-form-item>
      <el-form-item>
        <el-form-item label="专业班级" prop="major">
          <el-cascader
            v-model="studentInfo.majorId"
            :options="majorList"
            :props="{ expandTrigger: 'hover' }"></el-cascader>
        </el-form-item>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getPage">查询</el-button>
      <el-button type="default" @click="resetData">清空</el-button>
    </el-form>

    <!--列表-->
    <el-table
      v-loading="listLoading"
      :data="studentList"
      border
      fit
      highlight-current-row
    >
      <el-table-column
        label="序号"
        width="60"
        align="center"
      >
        <template slot-scope="scope">
          {{ (current - 1) * size + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="studentId" label="学号" width="160"/>
      <el-table-column prop="name" label="姓名" width="160"/>
      <el-table-column prop="college" label="学院" width="160"/>
      <el-table-column prop="major" label="专业"/>
      <el-table-column prop="gender" label="性别" width="100"/>
      <el-table-column prop="regularGrade" label="平时成绩" width="100"/>
      <el-table-column prop="endtermGrade" label="期末成绩" width="100"/>
      <el-table-column prop="score" label="总成绩" width="100"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="updateStudent(scope.row.studentId)">输入成绩</el-button>
          <el-button type="danger" size="mini" @click="backCourse(this.courseId,scope.row.studentId)">退课</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="current"
      :total="total"
      :page-size="size"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="getPage"
      @size-change="getPage"
    />
  </div>
</template>

<script>
import * as studentApi from '@/api/student'
import {back} from '@/api/course'

export default {
  data() {
    return {
      searchObj: {},
      majorList: [],
      studentList: [],
      current: 1,
      total: 0,
      size: 20,
      listLoading: true,
      dialogVisible: false,
      studentInfo: {},
      courseId: undefined
    }
  },
  created() {
    this.courseId=this.$route.params.courseId
    this.getPage()
  },
  methods: {
    getPage() {
      this.current = 1
      this.searchObj = {}
      this.fetchData(this.courseId)
    },
    fetchData(courseId) {
      this.listLoading = true
      studentApi.getByCourse(courseId).then((response) => {
        this.studentList = response.data;
        this.listLoading = false
      })
    },
    resetData() {
      this.searchObj = {}
    },
    loadDialog() {
      this.dialogVisible = true
    },
    backCourse(courseId, studentId) {
      back(courseId,studentId).then(()=>{
        this.$message("退课成功!")
      })
    }
  }
}
</script>

<style scoped>

</style>
