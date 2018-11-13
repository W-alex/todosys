<template>
  <div class="header">
    <div class="logo">TODOS</div>
    <div class="user">{{username}}</div>
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
      return this.$store.state.username
    }

  }
})
</script>

<style lang='scss' scoped>
.header {
  width: 100%;
  height: 50px;
  line-height: 50px;
  background-color: inherit;
  .logo {
    margin: auto;
    display: inline-block;
    width: 100px;
  }
  .user {
    position: relative;
    right: 20px;
  }
}
</style>
