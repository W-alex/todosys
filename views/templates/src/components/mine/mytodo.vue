<template>
  <div class="mytodo">
    <div class="info">
      <input class="input" type="text"
        ref="input"
        v-model="todostr"
        @keyup.enter="addTodo"
        :placeholder='getPlaceHolder()'/>
      <div class="notice">
       <el-dropdown>
        <span class="el-dropdown-link">通知谁？<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-for="item in friends" :key="item" @click.native="handleAddNotice(item)">
            {{item.username}}
          </el-dropdown-item>
        </el-dropdown-menu>
        </el-dropdown>
      </div>
      <ul class= "todolist">
        <li v-for="(todo, index) in show" :key="todo.id" :class="todo.priority?'highlight':''">
          <div class="todostr">
            <div class="toggle">
              <input type="checkbox" :id="getFor(index)" @click="changeToDone(todo.id)">
              <label :for="getFor(index)"></label>
            </div>

            <span :class="todo.finish?'isDone':''">{{todo.todostr}}</span>
            <div class="datetime">{{todo.datetime}}</div>
            <button class="priority" @click="setPriority(todo.id)"><b></b></button>
            <button class="delete" @click="deleteTodo(todo.id)"><b></b></button>
          </div>
        </li>
        <toolbar :length="show.length" :isShow="false"
          @showAll="getAllList"  @showDone="getDoneList" @showUndo="getUndoList"
         ></toolbar>

      </ul>
    </div>
  </div>
</template>

<script>
import toolbar from '../toolbar'
import focus from '../../mixins/focus.js'
import * as api from '../../api/todo.js'
export default({
  name: 'myTodo',
  components: {toolbar},
  mixins: [focus('input')],
  data: function () {
    return {
      todolist: [],
      todostr: '',
      show: [],
      notice: []// 通知的好友
    }
  },
  props: ['friends'],
  computed: {
    uid: function () {
      return this.$store.state.id
    },
    username: function () {
      return this.$store.state.username
    },
    projectId: function () {
      return this.$store.state.projectId
    },
    projectName: function () {
      return this.$store.state.projectName
    },
    done: function () {
      if (this.todolist.length !== 0) {
        return this.todolist.filter(item => {
          return item.finish
        })
      }
      return []
    },
    undo: function () {
      if (this.todolist.length !== 0) {
        return this.todolist.filter(item => {
          return !item.finish
        })
      }
    }
  },
  watch: {
    projectId: function (newValue) {
      this.getList()
    }
  },
  methods: {
    getFor: function (index) {
      return 'checkbox' + index
    },
    getList: function () {
      api.getList(this.uid, this.projectId).then(res => {
        console.log(res)
        this.todolist = res.message
        this.show = res.message
      })
    },
    getPlaceHolder: function () {
      return '在“' + this.projectName + '”中添加任务'
    },
    getDoneList: function () {
      this.show = this.done
    },
    getUndoList: function () {
      this.show = this.undo
    },
    getAllList: function () {
      this.show = this.todolist
    },
    handleAddNotice: function (user) {
      if (user && user.id && user.username) {
        this.todostr += '@' + user.username
        this.notice.push(user.id)
      }
    },
    changeToDone: function (id) {
      console.log(id)
      api.finish(id).then(data => {
        return this.getList()
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    deleteTodo: function (id) {
      api.deleteItem(id).then(data => {
        this.$message({
          type: 'success',
          message: '删除成功！'
        })
        return this.getList()
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err.code + '-' + err.message
        })
      })
    },
    addTodo: function () {
      if (this.todostr.trim().length === 0) {
        return
      }
      let todo = {
        todostr: this.todostr,
        user: this.uid,
        notice: this.notice,
        project: this.projectId
      }
      api.add(todo).then((res) => {
        const data = res.message
        this.todostr = ''
        this.notice = []
        this.$message({
          type: 'success',
          message: '发布成功！'
        })
        this.todolist = data
        this.show = data
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    setPriority: function (id) {
      api.priority(id).then(data => {
        this.getList()
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err.message || '设置失败，请重试！'
        })
      })
    },
    deleteCompelete: function () {
      alert('yes')
      api.deleteCompelete(this.uid, this.projectId).then(data => {
        this.getList()
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err.message || '内部错误！'
        })
      })
    }
  }
})
</script>

<style lang="scss" scoped>
@import url('../../assets/customDropDown.scss');
$main_color: #a77f80;
$border_color: #965456;
$font_color: #c2bdc3;
.mytodo {
  width: 600px;
  margin: auto;
  .info {
    background-color: #fff;
  }
  .input {
    border: none;
    height: 20px;
    line-height: 60px;
    width: 460px;
    font-size: 16px;
    padding: 20px;
    :hover {
      border: inherit;
    }
  }
}

.toggle input:checked + label::after {
  content: '\2713';
  position: relative;
  right: 20px;
}
//删除按钮和置顶按钮
.priority b,
.delete b {
  display: inline-block;
  width: 30px;
  height: 30px;
  color: $font_color;
  position: absolute;
  bottom: 10px;
  cursor: pointer;
}
.priority b {
  right: 40px;
  bottom: 12px;
}
.delete b {
  right: 5px;
}
.priority:hover b,
.delete:hover b {
  color: $border_color;
}
.delete b::before {
  content: '\2715';
  font-size: 16px;
}
.priority b::before {
  content: '\21E7';
  font-size: 16px;
}
// todolist
ul.todolist {
  margin: 0;
  li {
    width: 100%;
    border: solid 1px #ddd9da;
    height: 60px;
    position: relative;
    div {
      display: inline-block;
      line-height: 60px;
      padding: 0 10px;
    }
    .todostr {
      color: $border_color;
      font-size: 17px;
      .delete,
      .priority {
        border: 0px;
        padding: 0;
        background-color: inherit;
      }
    }
    .toggle {
      label::before {
        content: '';
        height: 20px;
        width: 20px;
        border-radius: 50%;
        display: inline-block;
        border: solid 2px #826858;
        position: relative;
        top: 5px;
      }
      input {
        display: none;
        position: relative;
      }
    }
    .isDone {
      text-decoration: line-through;
    }
    .datetime {
      color: $font_color;
      font-size: 14px;
      margin-left: 15px;
      position: relative;
      float: right;
    }
  }
}
// mytodo 最后的工具栏
ul.todolist .tools {
  width: auto;
  height: 30px;
  line-height: 30px;
  font-size: 14px;
  color: $main_color;
  padding: 0 10px;
  margin: 0;
  div {
    display: inline-block;
    line-height: inherit;
    margin: 0;
  }
  .tool-buttons {
    margin: 0 40px;
    button {
      margin: 0 5px;
      border-radius: 2px;
      border: solid $font_color 1px;
      color: $main_color;
      cursor: pointer;
      :hover {
        color: $border_color;
        border: $main_color;
      }
    }
  }
  .remove-buttons {
    position: absolute;
    right: 20px;
    a:hover {
      color: $border_color;
    }
  }
}
.highlight {
  background-color: lighten(#ead1d4, 10%);
  .priority b::before {
    content: '\21E9';
  }
}
</style>
