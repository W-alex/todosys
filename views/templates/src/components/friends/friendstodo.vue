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
    this.$http.get(this.$global.server + '/todo/' + this.uid).then((res) => {
      this.todolist = res.data.message
      this.show = res.data.message
    })
  },
  methods: {
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
  .tools {
    background: #fff;
    border: solid 1px #eee;
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
}
</style>
