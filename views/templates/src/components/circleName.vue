<template>
  <div class="circlename" @click="handleClick" :class="active">
    {{name}}
  </div>
</template>
<script>
export default({
  name: 'circleName',
  props: ['name', 'id'],
  data: function () {
    return {
      active: false
    }
  },
  methods: {
    handleClick: function () {
      this.active = false
    }
  }

})
</script>

<style lang="scss">
$back-color: #cacadd;
$font-color: #8a95a7;

.circlename {
  width: 40px;
  height: 40px;
  display: inline-block;
  line-height: 40px;
  text-align: center;
  background-color: $back-color;
  color: $font-color;
  font-weight: bold;
  font-size: 14px;
  border-radius: 50%;
  cursor: pointer;
  // :hover {
  //   background-color: darken($back-color, 20%);
  //   color: lighten($font-color, 20%);
  // }
}

.active {
  background-color: darken($back-color, 10%);
  color: lighten($font-color, 20%);
}
</style>
