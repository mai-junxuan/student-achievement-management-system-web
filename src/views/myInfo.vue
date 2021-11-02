<template>
  <div class="app-container">
    <el-form ref="elForm" :model="myInfo" size="medium" label-width="100px">
      <el-form-item label="工号" prop="student_id">
        <el-input v-model="myInfo.teacherId" clearable :style="{width: '100%'}" disabled>
        </el-input>
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="myInfo.name"  clearable :style="{width: '100%'}" disabled></el-input>
      </el-form-item>
      <el-form-item label="学院" prop="college" >
        <el-input v-model="myInfo.collegeName"  clearable :style="{width: '100%'}" disabled></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-input v-model="myInfo.gender"  clearable :style="{width: '100%'}" disabled></el-input>
      </el-form-item>
      <el-form-item label="生日" prop="birth">
        <el-date-picker v-model="myInfo.birth" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
                        :style="{width: '100%'}"  clearable disabled></el-date-picker>
      </el-form-item>
      <el-form-item label="电话" prop="phone">
        <el-input v-model="myInfo.phone" placeholder="" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="myInfo.email" placeholder="" clearable :style="{width: '100%'}"></el-input>
      </el-form-item>
      <div class="el-footer">
        <el-button type="primary" @click="updateInfo">更新信息</el-button>
        <el-button type="primary" @click="dialogVisible=true">修改密码</el-button>
      </div>
    </el-form>

    <el-dialog title="修改密码" :visible.sync="dialogVisible">
      <el-form ref="elForm" :model="password" size="medium" label-width="100px">
        <el-form-item label="旧密码" prop="oldPassword" >
          <el-input v-model="password.oldPassword" type="password" placeholder="请输入旧密码" clearable :style="{width: '100%'}">
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="password.newPassword" type="password" placeholder="请输入新密码" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirm">
          <el-input v-model="password.confirm" type="password" placeholder="确认密码" clearable :style="{width: '100%'}"></el-input>
        </el-form-item>
      </el-form>
      <div>
        <el-button type="primary" @click="password={};dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="changePassword">修改密码</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {getById,saveOrUpdate} from "@/api/teacher";
import {changePassword} from "@/api/user";

export default {
  data() {
    return {
      myInfo: {},
      teacherId: undefined,
      dialogVisible: false,
      password: {}
    }
  },
  created() {
    this.teacherId = this.$store.state.user.teacherId
    this.fetchData()
  },
  methods: {
    fetchData(){
      getById(this.teacherId).then((response) => {
        this.myInfo = response.data
      })
    },
    updateInfo(){
      saveOrUpdate(this.myInfo).then(() => {
        this.$message("更新成功")
      })
    },
    changePassword(){
      changePassword(this.teacherId,this.password.oldPassword,this.password.newPassword).then(()=>{
        this.$message("修改成功")
        this.dialogVisible=false
        this.password={}
      })
    }
  }
}
</script>

<style scoped>

</style>
