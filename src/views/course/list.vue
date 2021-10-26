<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.keyword" placeholder="课程名/课程号"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchObj.collegeId" placeholder="所属学院" class="v-select patient-select" @click="getCollege">
          <el-option
            v-for="item in collegeList"
            :key="item.collegeId"
            :label="item.name"
            :value="item.collegeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchObj.type" placeholder="类型" class="v-select patient-select" @click="getType">
          <el-option
            v-for="item in typeList"
            :key="item.typeId"
            :label="item.name"
            :value="item.typeId"
          />
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>


    <el-table
      v-loading="listLoading"
      :data="courseList"
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
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="courseId" label="课程号" width="160"/>
      <el-table-column prop="name" label="课程名" width="160"/>
      <el-table-column prop="college" label="所属学院" width="160"/>
      <el-table-column prop="type" label="类型"/>
      <el-table-column prop="theoreticalHours" label="理论学时"/>
      <el-table-column prop="practicalHours" label="实践学时" width="80"/>
      <el-table-column prop="credit" label="学分" width="70"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="lock(scope.row.id, 0)">修改信息</el-button>
          <el-button type="danger" size="mini" @click="deleteCourse(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="current"
      :total="total"
      :page-size="limit"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="fetchData"
      @size-change="changeSize"
    />

  </div>
</template>

<script>
import * as courseApi from "@/api/course" ;
import {getCollegeList} from '@/api/college'

export default {
  data() {
    return {
      searchObj: {},
      majorList: [],
      courseList: [],
      typeList: [],
      collegeList: [],
      current: 1,
      total: 0,
      size: 20,
      listLoading: true
    }
  },
  created() {

  },
  methods: {
    init() {
      this.fetchData(current, size, searchObj)
    },
    fetchData(current, size, queryObj) {
      this.listLoading = true
      courseApi.getCoursePage(current, size, queryObj).then((response) => {
        this.courseList = response.data;
        this.total = response.data.total;
        this.listLoading = false
      })
    },
    getType() {
      courseApi.getTypeList().then((response) => {
        this.typeList = response.data;
      })
    },
    getCollege() {
      getCollegeList().then((response) => {
        this.collegeList = response.data;
      })
    },
    deleteCourse(id) {
      this.$confirm("确认删除").then(() => {
        courseApi.deleteById(id).then(() => {
          this.$message("删除成功")
        })
      })
    },

  }
}
</script>

<style scoped>

</style>
