<template>
  <div class="login">
    <el-form>
      <el-form-item>
        <el-input v-model="userid" placeholder="input userid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="password" type="password" placeholder="password" @keyup.enter.native="login"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="login">登录</el-button>
        <router-link to="/register">去注册！</router-link>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as api from '@/api/user.js'
export default({
  name: 'login',
  data: function () {
    return {
      userid: 'wjy',
      password: '111222'
    }
  },
  methods: {
    login: function () {
      const user = {userid: this.userid, pwd: this.password}
      api.login(user).then(data => {
        const user = data.message
        this.$router.push('/')
        this.$store.dispatch('saveUser', user)
      }).catch(err => {
        console.log(err)
      })
    }
  }
})
</script>
<style>
.login {
  width: 400px;
  margin: 100px auto;
}
</style>
