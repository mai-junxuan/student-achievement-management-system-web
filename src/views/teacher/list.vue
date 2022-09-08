<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.keyword" placeholder="姓名/工号"/>
      </el-form-item>

      <el-form-item>
        <el-select clearable v-model="searchObj.collegeId" placeholder="学院" class="v-select patient-select"
                   @click.native="getCollege">
          <el-option
            v-for="item in collegeList"
            :key="item.collegeId"
            :label="item.name"
            :value="item.collegeId"
          />
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getPage()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
      <el-button type="success" @click="loadDialog">新增</el-button>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="teacherList"
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
      <el-table-column prop="teacherId" label="工号" width="160" align="center"/>
      <el-table-column prop="name" label="姓名" width="160" align="center">

        <template slot-scope="scope">
          {{ scope.row.name }}
          <el-tag size="medium"
                  v-if="scope.row.teacherId===$store.state.user.teacherId"
                  slot="content">我
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="collegeName" label="所属学院" width="160" align="center"/>
      <el-table-column prop="gender" label="性别" width="100" align="center">
        <template slot-scope="scope">
          <el-tag size="medium"
                  :type="scope.row.gender === 1 ? 'primary' : 'danger'"
                  slot="content">
            {{ scope.row.gender === 1 ? '男' : '女' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="birth" label="生日" width="140" align="center"/>
      <el-table-column prop="phone" label="手机号" width="140" align="center"/>
      <el-table-column prop="email" label="邮箱" width="140" align="center"/>
      <el-table-column prop="remark" label="备注" width="80" align="center"/>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="updateTeacher(scope.row.teacherId)">修改</el-button>
          <el-button v-if="scope.row.teacherId!==$store.state.user.teacherId" type="danger" size="mini" @click="deleteTeacher(scope.row.teacherId)">删除</el-button>
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


    <el-dialog title="教师信息" :visible.sync="dialogVisible">
      <el-form ref="elForm" :model="teacherInfo" size="medium" label-width="100px">
        <el-form-item label="工号" prop="teacherId">
          <el-input v-model="teacherInfo.teacherId" placeholder="请输入工号" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="teacherInfo.name" placeholder="请输入姓名" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="collegeId">
          <el-select clearable v-model="teacherInfo.collegeId" placeholder="所属学院" class="v-select patient-select"
                     @click.native="getCollege">
            <el-option
              v-for="item in collegeList"
              :key="item.collegeId"
              :label="item.name"
              :value="item.collegeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-radio-group v-model="teacherInfo.gender" size="medium">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生日" prop="birth">
          <el-date-picker v-model="teacherInfo.birth" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                          :style="{width: '100%'}" placeholder="请选择日期生日" clearable></el-date-picker>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="teacherInfo.phone" placeholder="" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="teacherInfo.email" placeholder="" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="teacherInfo.remark" placeholder="请输入备注" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false;teacherInfo={}">取消</el-button>
        <el-button type="primary" @click="saveTeacher">确定</el-button>
      </div>
    </el-dialog>


  </div>
</template>

<script>
import * as teacherApi from '@/api/teacher'
import {getCollegeList} from '@/api/college'
import * as courseApi from "@/api/course";
import * as studentApi from "@/api/student";

export default {
  data() {
    return {
      searchObj: {},
      collegeList: [],
      current: 1,
      total: 0,
      size: 20,
      teacherList: [],
      listLoading: true,
      teacherInfo: {},
      dialogVisible: false
    }
  },
  created() {
    this.getPage()
  },
  methods: {
    getPage() {
      this.current = 1
      this.fetchData(this.current, this.size, this.searchObj)
    },
    fetchData(current, size, queryObj) {
      this.listLoading = true
      teacherApi.getTeacherPage(current, size, queryObj).then(response => {
        this.teacherList = response.data.records
        this.total=response.data.total
        this.listLoading = false
      })
    },
    getCollege() {
      getCollegeList().then((response) => {
        this.collegeList = response.data
      })
    },
    deleteTeacher(id) {
      this.$confirm('确认删除?').then(() => {
        teacherApi.deleteById(id).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功'
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
    saveTeacher() {
      teacherApi.saveOrUpdate(this.teacherInfo).then(() => {
        this.$message({
          type: "success",
          message: "保存成功"
        })
        this.teacherInfo = {}
        this.dialogVisible = false
        this.getPage()
      })
    },
    updateTeacher(id) {
      teacherApi.getById(id).then((response) => {
        this.teacherInfo = response.data;
        this.dialogVisible = true
      })
    }
  }
}
</script>

<style>
</style>
