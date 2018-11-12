<template>
  <div class="mytodo">
    <div class="info">
      <input class="input" type="text" v-model="todostr" @keyup.enter="addTodo" :placeholder='getPlaceHolder()'/>
      <ul>
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
        <toolbar :length="show.length" :isShow="true"
          @showAll="getAllList"  @showDone="getDoneList" @showUndo="getUndoList"></toolbar>

      </ul>
    </div>
  </div>
</template>

<script>
import toolbar from '../toolbar'
export default({
  name: 'myTodo',
  components: {toolbar},
  data: function () {
    return {
      todolist: [],
      todostr: '',
      show: []
    }
  },
  created: function () {
    this.getList()
  },
  computed: {
    uid: function () {
      return this.$store.state.id
    },
    username: function () {
      return this.$store.state.username
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
  methods: {
    getFor: function (index) {
      return 'checkbox' + index
    },
    getList: function () {
      this.$http.get(this.$global.server + '/todo?id=' + this.uid).then(res => {
        this.todolist = res.data
        this.show = res.data
      })
    },
    getPlaceHolder: function () {
      return this.username + '你要做什么？'
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
    changeToDone: function (id) {
      console.log(id)
      this.$http.post(this.$global.server + '/todo/done', {todo: id}).then(data => {
        return new Promise((resolve, reject, next) => {
          if (data.data.code === 200) {
            resolve(data.data.message)
          } else {
            reject(data.data.message)
          }
        })
      }).then(() => {
        return this.getList()
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err
        })
      })
    },
    deleteTodo: function (id) {
      this.$http.delete(this.$global.server + '/todo?id=' + id).then(res => {
        const data = res.data
        return new Promise((resolve, reject) => {
          if (data.code === 200) {
            resolve(data.message)
          } else {
            reject(data)
          }
        })
      }).then(message => {
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
      this.$http.post(this.$global.server + '/todo', {todostr: this.todostr, user: this.uid}).then(res => {
        return new Promise((resolve, reject) => {
          if (res.data.code === 200) {
            resolve(res.data.message)
          }
        }).then((data) => {
          this.todostr = ''
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
      })
    },
    setPriority: function (id) {
      this.$http.post(this.$global.server + '/todo/priority', {id: id}).then(res => {
        const data = res.data
        return new Promise((resolve, reject) => {
          if (data.code === 200) {
            resolve()
          } else {
            reject(data)
          }
        })
      }).then(() => {
        this.getList()
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err.message || '设置失败，请重试！'
        })
      })
    },
    deleteCompelete: function () {
      this.$http.delete(this.$global.server + '/todo/finish?id=' + this.uid).then(res => {
        const data = res.data
        return new Promise((resolve, reject) => {
          if (data.code !== 200) {
            reject(data)
          }
          resolve()
        })
      }).then(() => {
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
$main_color: #a77f80;
$border_color: #965456;
$font_color: #c2bdc3;
.mytodo {
  width: 100%;
  margin: 0;
  .info {
    background-color: #fff;
  }
  .input {
    height: 20px;
    line-height: 60px;
    width: 100%;
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
ul {
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
      font-size: 19px;
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
ul .tools {
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
}
</style>
