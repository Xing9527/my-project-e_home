<template>
  <div class="add">
      <el-form ref="form" :model="formData" label-width="80px">
          <el-form-item label="标题">
              <el-input v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label="内容">
              <Editor v-model="formData.content" @getTxt="getText"></Editor>
          </el-form-item>
          <el-form-item>
              <el-button v-if="$route.name == '民主评议添加页'" @click="upData">添加</el-button>
              <el-button v-if="$route.name == '民主评议修改页'" @click="update">保存修改</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>
<script>
import Editor from "@/components/editor";
export default {
  data() {
      return {
          formData:{
              title:"",
              content:"",
              contentTxt:"",
              id:""
          }
      }
  },
  components: {
    Editor
  },
  methods:{
    getText(val) {
      this.formData.contentTxt = val;
    },
    upData() {
      this.$axios.post("addPingyi", this.formData).then(res => {
        // console.log(res.data)
        if (res.ret) {
          this.$message({
            message: '恭喜你，添加成功',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push('/pingyi/list')
          },1000)
        }else{
          this.$message.error('添加民主评议出错！！！');
        }
      });
    },
    update() {
        this.formData.id = this.$route.query.id;
      this.$axios.post("updatePingyi", this.formData).then(res => {
        if (res.ret) {
          this.$message({
            message: '恭喜你，修改成功',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push('/pingyi/list')
          },1000)
        }else{
          this.$message.error('修改出错！！！');
        }
      });
    },
  },
  created() {
    if (this.$route.name == "民主评议修改页") {
      this.$axios.get("getPingyi",{id:this.$route.query.id}).then(res => {
        this.formData = res.data[0];
        // console.log(res.data)
      });
    }
  },
  watch: {
    $route(to, from, next) {
      if (to.name == "民主评议添加页") {
        this.formData = {
          title: "",
          content: "",
          contentText: ""
        };
      }
    }
  } 
}
</script>
<style scoped>
.add {
  margin-left: 230px;
  padding: 20px 20px 180px;
  margin-top: 40px;
}
</style>
