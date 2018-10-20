<template>
  <div class="homepage">
      <Header></Header>
      <sideBar></sideBar>
      <router-view></router-view>
  </div>
</template>
<script>
import sideBar from "../components/sideBar";
import Header from "../components/header"
export default {
  components:{
      sideBar,
      Header
  },
  methods:{
    isLogin() {
      this.$axios.get('adminIsLogin').then(res => {
        if(!res.ret) {
          this.$router.push('/admin')
        }
      })
    }
  },
  created() {
    this.isLogin()
  }
}
</script>
<style scoped>

</style>
