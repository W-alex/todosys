<template>
  <div class="app">
    <customheader></customheader>
    <div class="body">
      <sidebar></sidebar>
      <div class="console">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import customheader from '@/components/header'
import sidebar from '@/components/sidebar'
export default({
  name: 'app',
  components: {customheader, sidebar}
})
</script>
<style lang="scss">
body {
  background-color: #f1edee;
  margin: 0 -10px 0 0;
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
.app {
  width: 100%;
  overflow-y: scroll;
  .body {
    display: flex;
    margin-top: -10px;
    .console {
      flex: 1;
    }
  }
}
</style>
