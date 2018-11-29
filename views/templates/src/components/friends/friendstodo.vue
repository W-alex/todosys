<template>
  <div class="friendstodo">
    <ul>
      <todoitem v-for="item in show" :key="item.id" :todo="item"></todoitem>
      <toolbar
        :isShow="false" :length="show.length"
        @showAll="getAllList" @showDone="getDoneList" @showUndo="getUndoList">
      </toolbar>
    </ul>
  </div>
</template>

<script>
import todoitem from './todoitme'
import toolbar from '../toolbar'
import * as api from '../../api/todo.js'
export default({
  name: 'friendsTodo',
  props: ['uid'],
  components: {todoitem, toolbar},
  data: function () {
    return {
      todolist: [],
      show: []
    }
  },
  computed: {
    projectid: function () {
      return this.$store.state.projectId
    },
    doneList: function () {
      return this.todolist.filter(item => {
        return item.finish
      })
    },
    undoList: function () {
      return this.todolist.filter(item => {
        return !item.finish
      })
    }
  },
  created: function () {
    this.getList()
  },
  methods: {
    getList: function () {
      api.getList(this.uid, this.projectid).then((data) => {
        this.todolist = data.message
        this.show = data.message
      })
    },
    getDoneList: function () {
      this.show = this.doneList
    },
    getUndoList: function () {
      this.show = this.undoList
    },
    getAllList: function () {
      this.show = this.todolist
    }
  }
})
</script>

<style lang='scss' scoped>
$main_color: #a77f80;
$border_color: #965456;
$font_color: #c2bdc3;
.friendstodo {
  width: 600px;
  margin: auto;
  .tools {
    width: 100%;
  }
}
</style>
