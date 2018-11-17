<template>
  <div class="other">
    <circle-name name="我的"></circle-name>
    <circle-name name="美丽"></circle-name>
    <circle-name name="+"></circle-name>
  </div>
</template>

<script>
import circleName from './circleName'
export default({
  name: 'other',
  components: {circleName},
  data: function () {
    return {}
  },
  created: function () {

  }
})
</script>
<style>
.other {
  height: 40px;
  padding: 10px;
  width: 100%;
  background-color: #fff;
  margin-top: 10px;
}
</style>
