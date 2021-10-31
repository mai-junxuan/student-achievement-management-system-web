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
      <el-button type="success" @click="loadDialog">新增</el-button>
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
      <el-table-column prop="studentId" label="学号" width="160" align="center"/>
      <el-table-column prop="name" label="姓名" width="160" align="center"/>
      <el-table-column prop="college" label="学院" width="160" align="center"/>
      <el-table-column prop="major" label="专业" align="center"/>
      <el-table-column prop="gender" label="性别" width="100" align="center">
        <template slot-scope="scope">
          <el-tag size="medium"
                  :type="scope.row.gender === 1 ? 'primary' : 'danger'"
                  slot="content">
            {{ scope.row.gender === 1 ? '男' : '女' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="birth" label="生日" width="130" align="center"/>
      <el-table-column prop="remark" label="备注" width="130" align="center"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="updateStudent(scope.row.studentId)">修改信息</el-button>
          <el-button type="danger" size="mini" @click="deleteStudent(scope.row.studentId)">删除</el-button>
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

    <el-dialog title="学生信息" :visible.sync="dialogVisible">
      <el-form ref="elForm" :model="studentInfo" size="medium" label-width="100px">
        <el-form-item label="学号" prop="student_id">
          <el-input v-model="studentInfo.studentId" placeholder="请输入学号" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="studentInfo.name" placeholder="请输入姓名" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="专业班级" prop="major" >
          <el-cascader
            v-model="studentInfo.majorId"
            :options="majorList"
            :props="{ expandTrigger: 'hover',label:'name',emitPath: false }"></el-cascader>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="studentInfo.gender" size="medium">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日" prop="birth">
          <el-date-picker v-model="studentInfo.birth" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                          :style="{width: '100%'}" placeholder="请选择日期生日" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="studentInfo.remark" placeholder="请输入备注" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false;studentInfo={}">取消</el-button>
        <el-button type="primary" @click="saveStudent">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as studentApi from '@/api/student'
import {getAll, getCascade} from '@/api/major'

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
      studentInfo: {}
    }
  },
  created() {
    this.getPage()
    this.getMajorList()
  },
  methods: {
    getPage() {
      this.current = 1
      this.searchObj = {}
      this.fetchData(this.current, this.size, this.searchObj)
    },
    fetchData(current, size, queryObj) {
      this.listLoading = true
      studentApi.getStudentPage(current, size, queryObj).then((response) => {
        this.studentList = response.data.records;
        this.total = response.data.total
        this.listLoading = false
      })
    },
    getMajorList() {
      getCascade().then((response => {
        this.majorList = response.data;
      }))
    },
    deleteStudent(id) {
      this.$confirm("确认删除?").then(() => {
        studentApi.deleteById(id).then(() => {
          this.$message({
            type: "success",
            message: "删除成功"
          })
          this.getPage()
        })
      })
    },
    resetData() {
      this.searchObj = {}
    },
    loadDialog() {
      this.dialogVisible = true
    },
    saveStudent() {
      studentApi.saveOrUpdate(this.studentInfo).then(() => {
        this.$message({
          type: "success",
          message: "添加成功"
        })
        this.studentInfo = {}
        this.dialogVisible = false
        this.getPage()
      })
    },
    updateStudent(id) {
      studentApi.getById(id).then((response) => {
        this.studentInfo = response.data;
        this.dialogVisible = true
      })
    }
  }
}
</script>

<style scoped>

</style>
