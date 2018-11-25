<template>
  <div class="test">
    <input type="text" v-model="message">
    <span>{{message}}</span>
  </div>
</template>

<script>
export default({
  name: 'test',
  data: function () {
    return {
      message: 'hello test'
    }
  },
  beforeCreate: function () {
    console.log('Before created')
  },
  created: function () {
    console.log('created')
  },
  beforeMount: function () {
    console.log('before mounted')
  },
  mounted: function () {
    console.log('mounted')
  },
  beforeUpdate: function () {
    console.log('before update')
  },
  updated: function () {
    console.log('updated')
  },
  beforeDestroy: function () {
    console.log('before destroy')
    console.log('before destory')
  },
  destroyed: function () {
    console.log('destroyed')
  }
})
</script>
