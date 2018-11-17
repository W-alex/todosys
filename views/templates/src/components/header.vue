<template>
<div class="header">
  <div class="logo">
   <span>TODOS</span>
  </div>
  <div class="info">
    <div class="notice">
      <i class="el-icon-bell"></i>
    </div>
    <div class="username">
      {{username}}
    </div>
  </div>
</div>
</template>

<script>
export default({
  name: 'header',
  data: function () {
    return {

    }
  },
  computed: {
    username: function () {
      let len = this.$store.state.username.length
      return this.$store.state.username.slice(len - 1, len)
    }

  }
})
</script>

<style lang='scss' scoped>
.header {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  margin: -10px;
  padding: 10px;
  border-bottom: solid 1px #a77f80;
}
.header div {
  display: inline-block;
}
.header .logo {
  color: #965456;
  font-size: 20px;
  position: relative;
  margin: auto;
}
.header .info {
  position: absolute;
  right: 20px;
}
.header .info .notice {
  color: #965456;
  font-weight: bold;
  margin-right: 20px;
  font-size: 24px;
}
.header .info .username {
  border-radius: 50%;
  display: inline-block;
  background-color: #a77f80;
  color: #fff;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: center;
}
</style>
