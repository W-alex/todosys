<template>
  <div class="index">
    <h1>TODOS</h1>
    <template>
      <el-tabs v-model="current"  type="card" tab-position="left" @tab-click="handleClick">
        <el-tab-pane label="我的" name="my">
          <my-todo></my-todo>
        </el-tab-pane>
        <template v-for="(item, index) in friends" v-key="item.id">
           <el-tab-pane :label="item.username" :name="index" :key="item.id">
            <friends-todo :uid="item.id"></friends-todo>
          </el-tab-pane>
        </template>
      </el-tabs>
    </template>
  </div>
</template>

<script>
import myTodo from '@/components/mine/mytodo'
import friendsTodo from '@/components/friends/friendstodo'
export default({
  name: 'index',
  components: {myTodo, friendsTodo},
  data: function () {
    return {
      current: 'my',
      friends: []
    }
  },
  computed: {
    uid: function () {
      return this.$store.state.id
    }
  },
  created: function () {
    this.$http.get(this.$global.server + '/user/other?id=' + this.uid).then((res) => {
      this.friends = res.data
    }).catch(() => {
      this.$message({
        type: 'warning',
        message: '获取信息失败！'
      })
    })
  },
  methods: {
    handleClick: function (tab, event) {
      console.log(tab)
      console.log(event)
    }
  }
})
</script>
<style lang="scss">
$main_color: #a77f80;
$border_color: #965456;
$font_color: #c2bdc3;
body {
  background-color: #f1edee;
}
a {
  text-decoration: none;
  color: inherit;
}
ul {
  margin: 0;
  padding: 0;
}
li {
  margin: 0;
  list-style-type: none;
}
input::-webkit-input-placeholder {
  color: #ddd;
}
.index {
  width: 600px;
  margin: auto;
  h1 {
    color: $main_color;
    text-align: center;
    font-size: 40px;
  }
}

.el-tabs__item {
  background-color: #fff;
}
</style>
