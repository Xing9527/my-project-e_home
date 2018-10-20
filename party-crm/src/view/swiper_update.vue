<template>
  <div class="add">
    <el-form ref="form" :model="formData" label-width="90px">
      <el-form-item label="轮播图图片">
        <uploadImg v-model="formData.img"></uploadImg> 
      </el-form-item>
      <el-form-item label="新闻标题">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="路由">
        <el-input v-model="formData.path"></el-input>
      </el-form-item>
      <el-form-item label="新闻分类">
        <el-input v-model="formData.type"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button>
          保存修改
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import uploadImg from "@/components/uploadImg"
export default {
  data() {
    return {
      formData:{
        img:"",
        title:"",
        path:"",
        type:""
      },
      token:""
    }
  },
  components:{
    uploadImg
  },
  methods:{
    getData() {
      this.$axios.get('getSwiper',{id:this.$route.query.id}).then(res =>{
        this.formData = res.data[0]
      })
    },
    getToken() {
      this.$axios.qiniuGet().then(res =>{
        this.token = res.data
      })
    }
  },
  created() {
    this.getToken()
    this.$nextTick(() => {
      this.getData()
    })
  },
  watch:{
    $route(to, from, next) {
      if (to.name == "轮播图修改页") {
        this.formData = {
          img:"",
          title:"",
          path:"",
          type:""
        };
      }
    }
  }
}
</script>
<style scoped>
.add{
    margin: 40px 0 0 230px;
    padding: 20px;
}
</style>
