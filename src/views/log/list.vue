<template>
  <el-table ref="tables" v-loading="loading" :data="list" @selection-change="handleSelectionChange" :default-sort="defaultSort" @sort-change="handleSortChange">
    <el-table-column type="selection" width="55" align="center" />
    <el-table-column label="访问编号" align="center" prop="infoId" />
    <el-table-column label="用户名称" align="center" prop="userName" :show-overflow-tooltip="true" sortable="custom" :sort-orders="['descending', 'ascending']" />
    <el-table-column label="登录地址" align="center" prop="ipaddr" width="130" :show-overflow-tooltip="true" />
    <el-table-column label="登录地点" align="center" prop="loginLocation" :show-overflow-tooltip="true" />
    <el-table-column label="浏览器" align="center" prop="browser" :show-overflow-tooltip="true" />
    <el-table-column label="操作系统" align="center" prop="os" />
    <el-table-column label="操作信息" align="center" prop="msg" />
    <el-table-column label="登录日期" align="center" prop="loginTime" sortable="custom" :sort-orders="['descending', 'ascending']" width="180">
      <template slot-scope="scope">
        <span>{{ parseTime(scope.row.loginTime) }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: "list"
}
</script>

<style scoped>

</style>
