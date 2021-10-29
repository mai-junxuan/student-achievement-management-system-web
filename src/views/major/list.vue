<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.keyword" placeholder="专业编号/专业名"/>
      </el-form-item>
      <el-form-item>
        <el-select clearable v-model="searchObj.collegeId" placeholder="学院" class="v-select patient-select"
                   @click.native="getCollege">
          <el-option v-for="item in collegeList" :key="item.collegeId" :label="item.name" :value="item.collegeId"/>
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getPage">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
      <el-button type="success" @click="loadDialog">新增</el-button>
    </el-form>

    <!--列表-->
    <el-table
      v-loading="listLoading"
      :data="majorList"
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
      <el-table-column prop="majorId" label="专业编号" width="160"/>
      <el-table-column prop="name" label="专业班级" width="160"/>
      <el-table-column prop="collegeName" label="学院" width="160"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="updateMajor(scope.row.majorId)">修改信息</el-button>
          <el-button type="danger" size="mini" @click="deleteMajor(scope.row.majorId)">删除</el-button>
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
      <el-form ref="elForm" :model="majorInfo" size="medium" label-width="100px">
        <el-form-item label="编号" prop="student_id">
          <el-input v-model="majorInfo.majorId" placeholder="请输入专业编号" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="专业班级" prop="name">
          <el-input v-model="majorInfo.name" placeholder="请输入专业班级名" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="collegeId">
          <el-select v-model="majorInfo.collegeId" value-key="collegeId" placeholder="所属学院"
                     class="v-select patient-select">
            <el-option
              v-for="item in collegeList"
              :key="item.collegeId"
              :label="item.name"
              :value="item.collegeId"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false;majorInfo = {}">取消</el-button>
        <el-button type="primary" @click="saveMajor">确定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import * as majorApi from "@/api/major";
import {getCollegeList} from "@/api/college";
import * as studentApi from "@/api/student";

export default {
  data() {
    return {
      searchObj: {},
      majorList: [],
      collegeList: [],
      current: 1,
      total: 0,
      size: 20,
      listLoading: true,
      dialogVisible: false,
      majorInfo: {
      }
    }
  },
  created() {
    this.getPage()
    this.getCollege()
    console.log(this.collegeList)
  },
  methods: {
    getPage() {
      this.current = 1
      this.searchObj = {}
      this.fetchData(this.current, this.size, this.searchObj)

    },
    fetchData(current, size, queryObj) {
      this.listLoading = true
      majorApi.getMajorPage(current, size, queryObj).then((response) => {
        this.majorList = response.data.records;
        this.total = response.data.total;
        this.listLoading = false
      })
    },
    getCollege() {
      getCollegeList().then((response) => {

        this.collegeList = response.data;
        console.log(this.collegeList)
      })
    },
    deleteMajor(id) {
      this.$confirm("确认删除").then(() => {
        majorApi.deleteById(id).then(() => {
          this.$message("删除成功")
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
    saveMajor() {
      majorApi.saveOrUpdate(this.majorInfo).then(() => {
        this.$message({
          type: "success",
          message: "保存成功"
        })
        this.majorInfo = {}
        this.dialogVisible = false
        this.getPage()
      })
    },
    updateMajor(id) {
      majorApi.getById(id).then((response) => {
        this.majorInfo = response.data
        this.dialogVisible = true
      })
    }
  }
}
</script>

<style scoped>

</style>
