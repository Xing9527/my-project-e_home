<template>
  <div class="add">
      <el-form ref="form" :model="formData" label-width="80px">
          <el-form-item label="新闻标题">
              <el-input v-model="formData.title"></el-input>
          </el-form-item>
          <el-form-item label="新闻头图"  >
              <uploadImg v-model="formData.img"></uploadImg>
          </el-form-item>
          <el-form-item label="主体内容">
              <Editor v-model="formData.content" @getTxt="getText"></Editor>
          </el-form-item>
          <el-form-item label="新闻分类" style="margin-bottom:80px;">
              <el-select v-model="formData.type" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button v-if="$route.name == '新闻添加页'" @click="upData">添加</el-button>
              <el-button v-if="$route.name == '新闻修改页'" @click="update">保存修改</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>
<script>
import uploadImg from "@/components/uploadImg";
import Editor from "@/components/editor";
export default {
  data() {
    return {
      formData: {
        title: "",
        img: "",
        content: "",
        contentText: "",
        type: ""
      },
      options: [{
          value: '信工新闻眼',
          label: '信工新闻眼'
        }, {
          value: '政治学习',
          label: '政治学习'
        }, {
          value: '党建一点通',
          label: '党建一点通'
        }, {
          value: '党员亮身份',
          label: '党员亮身份'
        }, {
          value: '随时随地学',
          label: '随时随地学'
        }, {
          value: '随时随地拍',
          label: '随时随地拍'
        }, {
          value: '制度建设',
          label: '制度建设'
        }, {
          value: '特色活动',
          label: '特色活动'
        }, {
          value: '通知早知道',
          label: '通知早知道'
        }],
    };
  },
  components: {
    uploadImg,
    Editor
  },
  methods: {
    getText(val) {
      this.formData.contentText = val;
    },
    upData() {
      this.$axios.post("addNews", this.formData).then(res => {
        // console.log(res.data)
        if (res.ret) {
          this.$message({
            message: '恭喜你，添加成功',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push('/news/list')
          },1000)
        }else{
          this.$message.error('添加新闻出错！！！');
        }
      });
    },
    update() {
      this.$axios.post("updateNews", this.formData).then(res => {
        if (res.ret) {
          this.$message({
            message: '恭喜你，修改成功',
            type: 'success'
          });
          setTimeout(() => {
            this.$router.push('/news/list')
          },1000)
        }else{
          this.$message.error('修改新闻出错！！！');
        }
      });
    },
    
  },
  created() {
    if (this.$route.name == "新闻修改页") {
      this.$axios.get("getNews",{id:this.$route.query.id}).then(res => {
        this.formData = res.data;
        // console.log(res.data)
      });
    }
  },
  watch: {
    $route(to, from, next) {
      if (to.name == "新闻添加页") {
        this.formData = {
          title: "",
          img: "",
          content: "",
          contentText: "",
          type: ""
        };
      }
    }
  }
};
</script>
<style scoped>
.add {
  margin-left: 230px;
  padding: 20px 20px 180px;
  margin-top: 40px;
}
</style>
