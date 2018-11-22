<template>
  <div >
    <div class="index">
      <template>
        <el-tabs v-model="current"  @tab-click="handleClick">
          <el-tab-pane label="我的" name="my">
            <my-todo :friends="friends"></my-todo>
          </el-tab-pane>
          <el-tab-pane v-for="(item, index) in friends" v-key="item.id"
            :label="item.username" :name="index" :key="item.id">
              <friends-todo :uid="item.id"></friends-todo>
          </el-tab-pane>
        </el-tabs>
        <button @click="handleAddNumber">成员变更</button>
      </template>
    </div>
    <el-dialog
      title="成员变更"
      :visible.sync="dialogVisible"
      width="50%">
      <el-form>
        <el-form-item label="添加成员:">
          <el-checkbox-group v-model="form.addMumber">
            <el-checkbox v-for="item in addMumbers" :key="item.id" :label="item.id" name="addMumber">{{item.username}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <hr>
        <el-form-item label="移除成员:">
          <el-checkbox-group v-model="form.removeMumber">
            <el-checkbox v-for="item in friends" :label="item.id" :key="item.id" name="removeMumber">{{item.username}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button  size="small" type="primary" @click="handleNumberSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import myTodo from '@/components/mine/mytodo'
import friendsTodo from '@/components/friends/friendstodo'
import other from '@/components/other'
export default({
  name: 'index',
  components: {myTodo, friendsTodo, other},
  data: function () {
    return {
      current: 'my',
      friends: [], // 同一个项目组中的同事
      mumbers: [], // 系统中所有的同事

      dialogVisible: true,
      form: {
        addMumber: [],
        removeMumber: [],
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
    }
  },
  methods: {
    getFriends: function () {
      this.$http.get(this.$global.server + '/project/' + this.projectid + '?userid=' + this.uid).then(res => {
        const data = res.data
        this.friends = data
      })
    },
    getMumbers: function () {
      this.dialogVisible = true
      this.$http.get(this.$global.server + '/user/other?id=' + this.uid).then(data => {
        this.mumbers = data.data
      })
    },
    handleClick: function (tab, event) {
      console.log(tab)
      console.log(event)
    },
    handleAddNumber: function () {
      this.getMumbers()
      this.getFriends()
      this.addMumbers = this.mumbers.filter(item => {
        let flag = 0
        this.friends.forEach(ele => {
          console.log(ele.id)
          if (ele.id === item.id) {
            flag++
          }
        })
        return flag === 0
      })
    },
    handleNumberSubmit: function () {
      this.dialogVisible = false
      this.form.projectid = this.projectid
      this.$http.post(this.$global.server + '/project/numbers', this.form).then(res => {
        const data = res.data
        return new Promise((resolve, reject) => {
          if (data.code === 200) {
            resolve()
          } else {
            reject(data)
          }
        })
      }).then(() => {
        this.form.addMumber = []
        this.form.removeMumber = []
        this.getFriends()
      }).catch(err => {
        this.$message({
          type: 'error',
          message: err.message || '网络链接失败，请重试！'
        })
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
  position:a h1 {
    color: $main_color;
    text-align: center;
    font-size: 40px;
  }
}

.el-tabs__item {
  background-color: #fff;
}
</style>
