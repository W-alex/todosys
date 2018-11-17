<template>
  <div class="sidebar">
    <ul>
      <li><div class="itme">全部</div></li>
      <li><div class="itme">已完成</div></li>
      <li><div class="itme">未完成</div></li>
      <li><div class="itme">@我</div></li>
      <li class="divider"></li>
      <li><div class="item">项目一</div></li>
      <li><div class="item">项目二</div></li>
      <li><div class="addProject"><span><i class="el-icon-circle-plus-outline"></i>添加项目</span></div></li>
    </ul>
  </div>
</template>

<script>
export default({
  name: 'sidebar',
  computed: {

  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  width: 220px;
  height: calc(100vh - 50px);
  margin: 10px 0 0 -5px;
  position: relative;
  border-right: solid 1px #eee;
  ul {
    height: 100%;
    background-color: #fff;
    width: 100%;
    font-size: 14px;
    li {
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
    }
    .divider {
      height: 0px;
      border-top: solid 1px #eee;
      margin: 0 15px;
    }
    .addProject {
      position: absolute;
      width: 100%;
      left: 0;
      bottom: 5px;
      line-height: 40px;
      height: 40px;
      text-align: center;
      margin: auto;
      border-top: solid 1px #eee;
    }
  }
}
</style>
