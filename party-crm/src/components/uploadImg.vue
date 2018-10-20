<template>
  <div class="upload">
    <el-upload
        class="avatar-uploader"
        action="https://upload-z1.qiniup.com"
        :show-file-list="false"
        :on-success="upload"
        :data="{token:token}">
        <img v-if="img" :src="img" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>
<script>
export default {
  data() {
    return {
      img:"",
      token:""
    }
  },
  props:{
    value:{
        type:String
      }
  },
  methods:{
    upload(res) {
      // console.log(res)
      this.img = "http://image.yaojunrong.com/" + res.key;
      this.$emit("input",this.img)
    },
    getToken() {
      this.$axios.qiniuGet().then(res => {
        this.token = res.data
      })
    }
  },
  created() {
    this.getToken()
  },
  watch:{
    value(val) {
      this.img = val
    }
  }
}
</script>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
<style scoped>

</style>
