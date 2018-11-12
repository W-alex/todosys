<template>
  <li class="tools">
          <div>共{{length}}条</div>
          <div class="tool-buttons">
            <button @click="showAll">All</button>
            <button @click="showActive">Active</button>
            <button @click="showCompeted">Competed</button>
            <div class="remove-buttons" v-show="isShow">
              <a href="" @click="deleteCompelete()">移除所有完成条目</a>
            </div>
          </div>
        </li>
</template>

<script>
export default({
  name: 'toolbar',
  props: ['isShow', 'length'],
  data: function () {
    return {
    }
  },
  methods: {
    showAll () {
      this.$emit('showAll')
    },
    showActive: function () {
      this.$emit('showUndo')
    },
    showCompeted: function () {
      this.$emit('showDone')
    }
  }
})
</script>

<style lang="scss" scoped>
$main_color: #a77f80;
$border_color: #965456;
$font_color: #c2bdc3;
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
</style>
