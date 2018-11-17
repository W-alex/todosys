<template>
  <div class="app">
    <custom-header></custom-header>
    <div class="body">
      <sidebar></sidebar>
      <div class="console">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
import customHeader from '@/components/header'
import sidebar from '@/components/sidebar'
export default({
  name: 'app',
  components: {customHeader, sidebar}
})
</script>
<style lang="scss">
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
.app {
  width: 100%;
  .body {
    display: flex;
    .console {
      flex: 1;
    }
  }
}
</style>
