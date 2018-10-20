<template>
  <div class="login">
      <h1>管理员登录</h1>
      <div class="form">
          <el-form :model="formData" label-width="80px">
              <el-form-item label="用户名：">
                  <el-input v-model="formData.username" size="mini" ></el-input>
              </el-form-item>
              <el-form-item label="密码：">
                  <el-input v-model="formData.pwd" size="mini" type="password"
                  @keyup.enter.native="login"></el-input>
              </el-form-item>
              <el-form-item label-width="0">
                  <el-button size="mini" class="btn1" @click="login">登录</el-button>
              </el-form-item>
          </el-form>
      </div>
  </div>
</template>
<script>
export default {
  data() {
      return {
          formData:{
              username:"",
              pwd:""
          }
      }
  },
  methods:{
      login() {
          this.$axios.post('adminLogin',this.formData).then(res => {
              if(res.code == 200){
                  this.$message({
                    message: '登陆成功！',
                    type: 'success'
                  });
                  setTimeout(() => {
                      this.$router.push('/')
                  },1000)
              }else{
                  this.$message({
                    message: '登录失败！',
                    type: 'warning'
                  });
              }
          })
      }
  }
}
</script>
<style>
.btn1{
    background-color: rgba(255, 255, 255, .3);
}
*{
    margin: 0;
    padding: 0;
}
</style>

<style scoped>

.login{
    padding: 50px;
    box-sizing:border-box;
    width: 100%;
    height: 635px;
    background: url(.././imgs/login-background.jpg);
}
.form{
    padding: 40px 20px;
    width: 350px;
    height: 250px;
    position: absolute;
    top:50%;
    bottom:50%;
    right:50%;
    left:50%;
    margin: -125px 0 0 -175px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-sizing: border-box;
    text-align: center;
}
h1{
    height: 30px;
    font-size:35px;
    color:#ccc;
}
</style>
