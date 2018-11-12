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
      this.$http.post(this.$global.server + '/login', {userid: this.userid, pwd: this.password}).then(res => {
        console.log(res.data)
        return new Promise((resolve, reject) => {
          if (res.data.code === 200) {
            // vuex 存储用户信息
            resolve(res.data.message)
          } else {
            reject(res.data.message)
          }
        })
      }).then(user => {
        this.$router.push('/')
        this.$store.dispatch('saveUser', user)
      }).catch(err => {
        console.log(err)
        this.$message({
          type: 'warning',
          message: err
        })
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
