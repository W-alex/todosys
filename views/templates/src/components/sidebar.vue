<template>
  <div class="sidebar">
    <ul>
      <li><router-link to="index"><div>
        主页
        </div></router-link>
      </li>
      <li><router-link to="notice" name="notice">
        <div>@我<span class="count">{{noticeCount}}</span></div>
      </router-link></li>

      <li class="divider"></li>
      <li v-for="project in projects" :key="project.id" @click="chooseProject(project)"><div class="item">{{project.name}}</div></li>
      <li @click="handleAdd"><div class="addProject"><span><i class="el-icon-circle-plus-outline"></i>添加项目</span></div></li>
    </ul>

    <el-dialog
      title="添加项目"
      :visible.sync="addVisible"
      width="600px">
      <el-form label-width="80px" :model="project">
        <el-form-item label="项目名称:" >
          <el-input v-model="project.name"></el-input>
        </el-form-item>
        <el-form-item label="添加成员:" >
          <el-checkbox-group v-model="project.members">
            <el-checkbox v-for="item in friends"
              :key="item.id"
              :label="item.id"
              name="members">{{item.username}}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import * as projectAPI from '@/api/project.js'
import * as userAPI from '@/api/user.js'
import * as noticeAPI from '@/api/notice.js'

export default({
  name: 'sidebar',
  data: function () {
    return {
      addVisible: false,
      friends: [],
      projects: [],
      project: {
        name: undefined,
        members: [],
        charger: undefined
      },
      noticeCount: 0// 通知数量
    }
  },
  computed: {
    uid: function () {
      return this.$store.state.id
    }
  },
  created: function () {
    this.getNoticeCount()
    this.getProjectList()
  },
  methods: {
    getNoticeCount: function () {
      noticeAPI.count(this.uid).then(data => {
        this.noticeCount = data
      })
    },
    getProjectList: function () {
      projectAPI.getList(this.uid).then(data => {
        this.projects = data
        this.chooseProject(this.projects[0])
      })
    },
    chooseProject: function (project) {
      this.$store.dispatch('changeProject', project)
    },
    handleAdd: function () {
      this.addVisible = true
      userAPI.getOthers(this.uid).then((data) => {
        this.friends = data
      })
      this.project.charger = this.uid
    },
    handleSubmit: function () {
      this.addVisible = false
      if (this.project.name === undefined || this.project.name.trim().length === 0) {
        return false
      }
      projectAPI.add(this.project).then((data) => {
        this.project.name = undefined
        this.project.members = []
        this.getProjectList()
        this.$message({
          type: 'success',
          message: '添加成功！'
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  position: relative;
  width: 220px;
  height: calc(100vh - 50px);
  margin: 10px 0 0 -5px;
  border-right: solid 1px #eee;
  ul {
    height: 100%;
    background-color: #fff;
    width: 100%;
    font-size: 14px;
    li {
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      cursor: pointer;
      :hover {
        text-decoration: underline;
      }
      .count {
        margin-top: 8px;
        position: absolute;
        right: 10px;
        display: inline-block;
        width: 20px;
        height: 20px;
        line-height: 20px;
        background-color: #965456;
        color: #fff;
        border-radius: 50%;
        text-align: center;
        font-weight: bold;
      }
    }
    .divider {
      height: 0px;
      border-top: solid 1px #eee;
      margin: 0 15px;
    }
    .addProject {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 5px;
      line-height: 40px;
      height: 40px;
      text-align: center;
      margin: auto;
      border-top: solid 1px #eee;
    }
  }
}
</style>
