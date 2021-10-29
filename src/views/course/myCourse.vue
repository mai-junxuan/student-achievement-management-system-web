<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="searchObj.keyword" placeholder="课程名/课程号"/>
      </el-form-item>
      <el-form-item>
        <el-select clearable v-model="searchObj.collegeId" placeholder="所属学院" class="v-select patient-select"
                   @click.native="getCollege">
          <el-option
            v-for="item in collegeList"
            :key="item.collegeId"
            :label="item.name"
            :value="item.collegeId"
          />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-select clearable v-model="searchObj.type" placeholder="类型" class="v-select patient-select"
                   @click.native="getType">
          <el-option
            v-for="item in typeList"
            :key="item.typeId"
            :label="item.name"
            :value="item.typeId"
          />
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="getPage">查询</el-button>
      <el-button type="default" @click="resetData">清空</el-button>
      <el-button type="default" @click="resetData">导出</el-button>
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
          {{ (current - 1) * size + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="courseId" label="课程号" width="160"/>
      <el-table-column prop="name" label="课程名" width="160"/>
      <el-table-column prop="collegeName" label="所属学院" width="160"/>
      <el-table-column prop="type" label="类型"/>
      <el-table-column prop="theoreticalHours" label="理论学时"/>
      <el-table-column prop="practicalHours" label="实践学时" width="80"/>
      <el-table-column prop="regularRatio" label="平时成绩比例" width="80"/>
      <el-table-column prop="endtermRatio" label="期末成绩比例" width="80"/>
      <el-table-column  label="任课老师" width="80">
        <template slot-scope="scope">
          <p v-for="(teacher) in scope.row.teachers">{{teacher.name}}</p>
        </template>
      </el-table-column>
      <el-table-column prop="managerTeacher.name" label="主管老师" width="80"/>
      <el-table-column prop="credit" label="学分" width="70"/>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/myCourse/data/' + scope.row.courseId">
            <el-button type="primary" size="mini">查看学生</el-button>
          </router-link>
          <el-button type="primary" size="mini" @click="updateCourser(scope.row.courseId)">修改信息</el-button>
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


    <el-dialog title="课程信息" :visible.sync="dialogVisible">
      <el-form ref="elForm" :model="courseInfo" size="medium" label-width="100px">
        <el-form-item label="课程编号" prop="student_id">
          <el-input v-model="courseInfo.courseId" placeholder="请输入课程编号"  :style="{width: '100%'}" disabled>
          </el-input>
        </el-form-item>
        <el-form-item label="课程名" prop="name">
          <el-input v-model="courseInfo.name"  :style="{width: '100%'}" disabled></el-input>
        </el-form-item>
        <el-form-item label="学院" prop="major">
          <el-select clearable v-model="courseInfo.collegeId" placeholder="所属学院" class="v-select patient-select">
            <el-option
              v-for="item in collegeList"
              :key="item.collegeId"
              :label="item.name"
              :value="item.collegeId"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="课程类型" prop="gender">
          <el-input v-model="courseInfo.type"  :style="{width: '100%'}" disabled></el-input>
        </el-form-item>
        <el-form-item label="理论学时" prop="birth">
          <el-input v-model="courseInfo.theoreticalHours"
                    :style="{width: '100%'}" disabled></el-input>
        </el-form-item>
        <el-form-item label="理论学时" prop="birth">
          <el-input v-model="courseInfo.practicalHours"
                    :style="{width: '100%'}" disabled></el-input>
        </el-form-item>
        <el-form-item label="学分" prop="birth">
          <el-input v-model="courseInfo.credit"  :style="{width: '100%'}" disabled></el-input>
        </el-form-item>
        <el-form-item label="平时成绩比例" prop="regularRatio">
          <el-input v-model="courseInfo.regularRatio" @input="calculateRatio">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="期末成绩比例" prop="endtermRatio" >
          <el-input  v-model="courseInfo.endtermRatio">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
        <el-form-item label="课程老师" prop="teacherIds">
          <el-cascader
            v-model="courseInfo.teacherLists"
            :options="teacherGroupList"
            :props="props" disabled></el-cascader>
        </el-form-item>
        <el-form-item label="管理老师" >
          <el-cascader
            v-model="courseInfo.managerTeacherName"
            :options="teacherGroupList"
            :props="props2" disabled></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible=false">取消</el-button>
        <el-button type="primary" @click="saveCourse">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import * as courseApi from "@/api/course" ;
import {getCollegeList} from '@/api/college'
import * as studentApi from "@/api/student";
import {group} from "@/api/teacher";

export default {
  data() {
    return {
      props: { multiple: true, value: 'teacherId', label: 'name',children: 'teachers',emitPath: false},
      props2: {  value: 'teacherId', label: 'name',children: 'teachers',emitPath: false},
      searchObj: {},
      majorList: [],
      courseList: [],
      typeList: [],
      collegeList: [],
      current: 1,
      total: 0,
      size: 20,
      listLoading: true,
      dialogVisible: false,
      courseInfo: {},
      teacherGroupList: {}
    }
  },
  created() {
    this.getPage()

  },
  methods: {
    getPage() {
      this.current = 1
      this.searchObj = {}
      this.fetchData(this.$store.state.user.teacherId)
    },
    fetchData(teacherId) {
      this.listLoading = true
      courseApi.getByTeacherId(teacherId).then((response) => {
        this.courseList = response.data;
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
          this.getPage()
        })
      })
    },
    resetData() {
      this.searchObj = {}
    },
    loadDialog() {
      this.getCollege()
      this.getGroup()
      this.dialogVisible = true
    },
    saveCourse() {
      console.log(this.courseInfo)

      courseApi.saveOrUpdate(this.courseInfo).then(() => {
        this.$message({
          type: "success",
          message: "添加成功"
        })
        this.courseInfo = {}
        this.dialogVisible = false
        this.getPage()
      })
    },
    updateCourser(id) {
      this.getCollege()
      this.getGroup()
      courseApi.getById(id).then((response) => {
        this.courseInfo = response.data;
        this.courseInfo.managerTeacherName=[this.courseInfo.managerTeacher.collegeId,this.courseInfo.managerTeacher.teacherId]
        this.courseInfo.teacherLists=[]
        for (let i = 0; i < this.courseInfo.teachers.length; i++) {
          this.courseInfo.teacherLists.push(this.courseInfo.teachers[i].teacherId)
        }
        this.dialogVisible = true
      })
    },
    calculateRatio(){
      this.courseInfo.endtermRatio=100-this.courseInfo.regularRatio
    },
    getGroup() {
      group().then(response => {
        this.teacherGroupList=response.data
      })
    },

  }
}
</script>

<style scoped>

</style>
