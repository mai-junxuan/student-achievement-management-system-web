<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.keyword" placeholder="专业编号"/>
      </el-form-item>
      <el-form-item>
        <el-select v-model="searchObj.collegeId" placeholder="学院" class="v-select patient-select">
          <el-option
            v-for="item in majorList"
            :key="item.status"
            :label="item.comment"
            :value="item.status"
          />
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
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
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="studentId" label="专业编号" width="160"/>
      <el-table-column prop="name" label="专业班级" width="160"/>
      <el-table-column prop="college" label="学院" width="160"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="lock(scope.row.id, 0)">修改信息</el-button>
          <el-button type="danger" size="mini" @click="lock(scope.row.id, 1)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      :current-page="page"
      :total="total"
      :page-size="size"
      :page-sizes="[5, 10, 20, 30, 40, 50, 100]"
      style="padding: 30px 0; text-align: center;"
      layout="sizes, prev, pager, next, jumper, ->, total, slot"
      @current-change="fetchData"
      @size-change="changeSize"
    />

  </div>
</template>

<script>
export default {
  data() {
    return {
      searchObj: {},
      majorList: [],
      page: 1,
      total: 0,
      size: 20,
      listLoading: true
    }
  },
  created() {

  }
}
</script>

<style scoped>

</style>
