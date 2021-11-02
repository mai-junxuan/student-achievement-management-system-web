<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-button type="default" @click="exportExcel">导出</el-button>
      <el-button type="success" @click="loadDialog2" v-if="$store.state.user.roles[0] === 'ADMIN'">添加学生</el-button>
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
      <el-table-column prop="major" label="专业" width="100"/>
      <el-table-column prop="gender" label="性别" width="100">
        <template slot-scope="scope">
          <el-tag size="medium"
                  :type="scope.row.gender === 1 ? 'primary' : 'danger'"
                  slot="content">
            {{ scope.row.gender === 1 ? '男' : '女' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="regularGrade" label="平时成绩" width="100"/>
      <el-table-column prop="endtermGrade" label="期末成绩" width="100"/>
      <el-table-column prop="score" label="总成绩" width="100"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button  type="primary" size="mini" @click="loadDialog(scope.row)">输入成绩</el-button>
          <el-button type="danger" size="mini" @click="backCourse(courseId,scope.row.studentId)">退课</el-button>
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
    <el-dialog title="成绩" :visible.sync="dialogVisible">
      <el-form ref="elForm" :model="scoreInfo" size="medium" label-width="100px">
        <el-form-item label="平时成绩" prop="student_id">
          <el-input v-model="scoreInfo.regularGrade" placeholder="请输入平时成绩" :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="期末成绩" prop="student_id">
          <el-input v-model="scoreInfo.endtermGrade" placeholder="请输入期末成绩" :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="updateScore">确定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="新增学生" :visible.sync="dialogVisible2">
      <el-cascader
        v-model="newStudentIds"
        :options="studentCascade"
        :props="{multiple: true, expandTrigger: 'hover',label: 'name',emitPath: false}"></el-cascader>
      <div slot="footer" class="dialog-footer">
        <el-button @click="newStudentIds=[];dialogVisible2=false;">取消</el-button>
        <el-button type="primary" @click="addStudent">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import * as studentApi from '@/api/student'
import {back} from '@/api/course'
import {addStudents, saveOrUpdate} from "@/api/score";
import {getCascade} from "@/api/student";
import {getStudentInfoExcel} from "@/api/statistic";

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
      courseId: undefined,
      scoreInfo:{},
      sow:{},
      studentCascade:[],
      dialogVisible2: false,
      newStudentIds: []
    }
  },
  created() {
    this.courseId = this.$route.params.courseId
    this.getPage()
    this.getStudentCascade()
  },
  mounted() {

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
    backCourse(courseId, studentId) {
      back(courseId, studentId).then(() => {
        this.$message("退课成功!")
        this.getPage()
      })
    },
    loadDialog(row) {
      this.row=row
      this.dialogVisible = true
    },
    updateScore(){
      this.dialogVisible = true
      this.scoreInfo.studentId=this.row.studentId
      this.scoreInfo.courseId=this.courseId
      saveOrUpdate(this.scoreInfo).then(()=>{
        this.$message("保存成功")
        this.row={}
        this.getPage()
        this.dialogVisible=false
      })
    },
    getStudentCascade(){
      getCascade().then((response)=>{
        this.studentCascade=response.data
      })
    },
    loadDialog2() {
      this.dialogVisible2 = true
    },
    addStudent(){
      console.log(this.newStudentIds)
      addStudents(this.courseId,this.newStudentIds).then(()=>{
        this.$message("保存成功")
        this.getPage()
        this.dialogVisible2 = false
        this.newStudentIds=[]
      })
    },
    exportExcel(){
      window.location.href="http://localhost:8080/statistic/getStudentInfoExcel/"+this.courseId
      //getStudentInfoExcel(this.courseId)
    }
  }
}
</script>

<style scoped>

</style>
