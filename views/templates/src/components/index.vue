<template>
  <div >
    <div class="index">
      <template>
        <el-tabs v-model="current"  @tab-click="handleClick">
          <el-tab-pane label="我的" name="my">
            <my-todo></my-todo>
          </el-tab-pane>
          <template v-for="(item, index) in friends" v-key="item.id">
            <el-tab-pane :label="item.username" :name="index" :key="item.id">
              <friends-todo :uid="item.id"></friends-todo>
            </el-tab-pane>
          </template>
          <el-tab-pane><i class="el-icon-plus"></i></el-tab-pane>
        </el-tabs>
      </template>
    </div>
  </div>
</template>

<script>
import customHeader from '@/components/header'
import myTodo from '@/components/mine/mytodo'
import friendsTodo from '@/components/friends/friendstodo'
import other from '@/components/other'
export default({
  name: 'index',
  components: {myTodo, friendsTodo, customHeader, other},
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
@import url('../assets/customNav.scss');
$main_color: #a77f80;
$border_color: #965456;
$font_color: #c2bdc3;

.index {
  width: 100%;
  margin: 10px auto;

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
