<template>
    <div class="noticeModel">
      <ul>
        <todoitem v-for="item in show" :key="item.id" :todo="item"></todoitem>
        <toolbar :isShow="false" :length="show.length"
          @showAll="getAllList" @showDone="getDoneList" @showUndo="getUndoList"></toolbar>
      </ul>
    </div>
</template>

<script>
import todoitem from '../friends/todoitme'
import toolbar from '../toolbar'
export default({
  name: 'notice',
  components: {todoitem, toolbar},
  data: function () {
    return {
      show: [],
      notice: []
    }
  },
  computed: {
    uid: function () {
      return this.$store.state.id
    },
    done: function () {
      return this.notice.filter(item => {
        return item.finish
      })
    },
    undo: function () {
      return this.notice.filter(item => {
        return !item.finish
      })
    }
  },
  created: function () {
    this.$http.get(this.$global.server + '/notice/' + this.uid).then(res => {
      this.notice = this.show = res.data
      console.log(res.data)
    })
  },
  methods: {
    getDoneList: function () {
      this.show = this.done
    },
    getUndoList: function () {
      this.show = this.undo
    },
    getAllList: function () {
      this.show = this.notice
    }
  }
})
</script>

<style lang="scss">
.noticeModel {
  width: 600px;
  margin: auto;
  padding-top: 50px;
  .tools {
    width: 100%;
  }
}
</style>
