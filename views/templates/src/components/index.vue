<template>
  <div >
    <div class="index">
      <template>
        <el-tabs v-model="current"  @tab-click="handleTabClick">
          <el-tab-pane label="我的" name="my">
            <my-todo :friends="friends"></my-todo>
          </el-tab-pane>
          <el-tab-pane v-for="(item) in friends"
            :label="item.username" :name="item.id" :key="item.id">
              <friends-todo :uid="item.id"></friends-todo>
          </el-tab-pane>
        </el-tabs>
        <el-button @click="handleAddMember" size="small" style="position: absolute;top: 68px;right: 40px;">成员变更</el-button>
        <div class="projectName"><span>{{projectName}}</span></div>
      </template>
    </div>
    <el-dialog
      title="成员变更"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form>
        <el-form-item label="添加成员:">
          <el-checkbox-group v-model="form.addMember">
            <el-checkbox v-for="item in addMembers" :key="item.id" :label="item.id" name="addMember">{{item.username}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <hr>
        <el-form-item label="移除成员:">
          <el-checkbox-group v-model="form.removeMember">
            <el-checkbox v-for="item in friends" :label="item.id" :key="item.id" name="removeMember">{{item.username}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button  size="small" type="primary" @click="handleMemberSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import myTodo from '@/components/mine/mytodo'
import friendsTodo from '@/components/friends/friendstodo'
import other from '@/components/other'
import * as projectAPI from '@/api/project.js'
import * as userAPI from '@/api/user.js'
import {getList} from '@/api/todo.js'

export default({
  name: 'index',
  components: {myTodo, friendsTodo, other},
  data: function () {
    return {
      current: 'my',
      friends: [], // 同一个项目组中的同事
      members: [], // 系统中所有的同事
      addMembers: [],
      dialogVisible: false,
      form: {
        addMember: [],
        removeMember: [],
        projectid: undefined
      }
    }
  },
  computed: {
    uid: function () {
      return this.$store.state.id
    },
    projectid: function () {
      return this.$store.state.projectId
    },
    projectName: function () {
      return this.$store.state.projectName
    }
  },
  watch: {
    projectid: function (newValue) {
      this.getFriends()
      this.current = 'my'
    }
  },
  mounted () {
    if (this.projectid !== null) {
      this.getFriends()
    }
  },
  methods: {
    getTodoList: function (uid) {
      getList(uid, this.projectid).then(data => {
        return data
      })
    },
    getFriends: function () {
      projectAPI.getFriends(this.uid, this.projectid).then(data => {
        this.friends = data
      })
    },
    getMembers: function () {
      userAPI.getOthers(this.uid).then(data => {
        this.members = data
      })
    },
    getAddMembers: function () {
      this.getMembers()
      this.getFriends()
      this.addMembers = this.members.filter(item => {
        let flag = 0
        this.friends.forEach(ele => {
          if (ele.id === item.id) {
            flag++
          }
        })
        return flag === 0
      })
    },
    handleTabClick: function (tab, event) {
      console.log(tab.name)
      const uid = tab.name
      if (uid !== 'my') {
        this.getTodoList(uid)
      }
    },
    handleAddMember: function () {
      this.getAddMembers()
      this.dialogVisible = true
    },
    handleMemberSubmit: function () {
      this.dialogVisible = false
      this.form.projectid = this.projectid
      // http
      projectAPI.changeMember(this.form).then((data) => {
        this.form.addMember = []
        this.form.removeMember = []
        this.getFriends()
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
</script>
<style lang="scss">
@import url('../assets/customNav.scss');
$main_color: #a77f80;
$border_color: #965456;
$font_color: #c2bdc3;

.index {
  width: 100%;
  margin: 10px auto;
  height: calc(100vh - 60px);
  a h1 {
    color: $main_color;
    text-align: center;
    font-size: 40px;
  }
  .projectName {
    position: absolute;
    right: 10px;
    bottom: 0;
    color: #ddd;
    font-size: 30px;
  }
}

.el-tabs__item {
  background-color: #fff;
}
</style>
