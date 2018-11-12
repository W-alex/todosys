<template>
  <li  :class="todo.priority?'highlight':''">
          <div class="todostr">
            <b></b>
            <span :class="todo.finish?'isDone':''">{{todo.todostr}}</span>
            <div class="datetime">{{todo.datetime}}</div>
          </div>
        </li>
</template>

<script>
export default({
  name: 'todoitme',
  props: ['todo']
})
</script>

<style lang="scss" scoped>
$main_color: #a77f80;
$border_color: #965456;
$font_color: #c2bdc3;
li {
  width: 100%;
  border: solid 1px #ddd9da;
  height: 60px;
  position: relative;
  background-color: #fff;
  padding-left: 20px;
  div {
    display: inline-block;
    line-height: 60px;
    padding: 0 10px;
  }
  .todostr {
    color: $border_color;
    font-size: 19px;
    .delete,
    .priority {
      border: 0px;
      padding: 0;
      background-color: inherit;
    }
  }
}
.isDone {
  text-decoration: line-through;
}
.datetime {
  color: $font_color;
  font-size: 14px;
  margin-left: 15px;
  position: relative;
  float: right;
}
.highlight {
  background-color: lighten(#ead1d4, 10%);
}
</style>
