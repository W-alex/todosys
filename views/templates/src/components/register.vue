<template>
  <div class="register">
    <el-form>
      <el-form-item>
        <el-input placeholder="你的登录名" v-model="userid"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="你的名字" v-model="username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="你的密码" v-model="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="再输一遍" v-model="repassword" @keyup.enter.native="register"></el-input>
      </el-form-item>
      <el-button @click="register">注册</el-button>
    </el-form>
  </div>
</template>

<script>
export default({
  name: 'register',
  data: function () {
    return {
      userid: '',
      username: '',
      password: '',
      repassword: ''
    }
  },
  methods: {
    register: function () {
      this.$http.post(this.$global.server + '/register',
        {userid: this.userid, username: this.username, password: this.password, repassword: this.repassword}).then(res => {
        const data = res.data
        return new Promise((resolve, reject) => {
          if (data.code === 200) {
            resolve()
          } else { reject(data) }
        })
      }).then(data => {
        this.$router.push('/login')
      }).catch(err => {
        this.$message({
          type: 'warning',
          message: err.code + '-' + err.message
        })
      })
    }
  }
})
</script>

<style>
.register {
  width: 500px;
  margin: 100px auto;
}
</style>
