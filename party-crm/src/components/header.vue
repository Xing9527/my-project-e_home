<template>
  <div class="header">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in routeList" :to="item.path" :key="index">{{item.name}}</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="logout">
        <el-button type="danger" size="mini" @click="logout">退出登录</el-button>
      </div>
  </div>
</template>
<script>
export default {
  data(){
    return {
      routeList:[]
    }
  },
  methods:{
    getRouteList() {
      this.routeList = this.$route.matched.filter(item => item.name)
      // console.log(this.routeList)
    },
    logout() {
      this.$axios.get('adminLogout').then(res => {
        if(res.ret) {
          this.$message({
            showClose: true,
            message: '退出登录成功',
            type:'success'
          });
          setTimeout(() => {
            this.$router.push('/admin')
          },1000)
        }else{
          this.$message({
            showClose: true,
            message: '退出登录失败',
            type: 'error'
          });
        }
      })
    }
  },
  watch:{
    $route() {
      this.getRouteList()
    }
  },
  created(){
    this.getRouteList()
  }
};
</script>
<style scoped>
.header{
    position: fixed;
    left:230px;
    top:0;
    right:0;
    padding: 10px 20px;
    border-bottom: 1px solid #aaa;
    background: #fff;
    z-index: 999;
}
.logout{
  float: right;
  margin: -15px 50px 0 0;
}
</style>
