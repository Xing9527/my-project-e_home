<template>
  <div class="news-list">
    <div class="select">
          <el-form ref="form" :model="formData">
              <el-form-item>
                  <el-select v-model="formData.value" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :change="getTrueData"
                        :label="item.label" :value="item.value">
                        </el-option>
                  </el-select>
              </el-form-item>
              <el-form-item>
                  <el-button @click="getTrueData">查找</el-button>
              </el-form-item>
          </el-form>
      </div>
    <el-table :data="tableData"  border style="width: 100%">
      <el-table-column prop="title" label="新闻标题">
        <!-- <template slot-scope="scope"></template> -->
      </el-table-column>
      <el-table-column label="新闻头图">
        <template slot-scope="scope">
          <img :src="scope.row.img" alt="" style="max-height:100px;">
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
      </el-table-column>
      <el-table-column prop="type" label="新闻分类" width="150">
      </el-table-column>
      <el-table-column label="操作" width="280">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row._id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="del(scope.row._id)">删除</el-button>
          <el-button size="mini" type="info" @click="swiper(scope.row._id,scope.row.title,scope.row.img,scope.row.type)">生成轮播图</el-button> 
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData:[],
      options: [{
          value: '0',
          label: '全部'
        },
        {
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
        formData:{
          value:""
        }
    }
  },
  methods:{
    getData() {
      this.$axios.get('getAllNews').then(res => {
        this.tableData = res.data;
        // console.log(res.data)
      })
    },
    getTrueData() {
          console.log(this.formData.value)
          if(this.formData.value == "0") {
              this.getData()
          }else if(this.formData.value == "信工新闻眼"){
              this.$axios.get('getNewsEyes').then(res => {
                  if(res.ret) {
                      this.tableData = res.data
                  }
              })
          }else if(this.formData.value == "政治学习"){
              this.$axios.get('getPoliticaLearn').then(res => {
                  if(res.ret) {
                      this.tableData = res.data
                  }
              })
          }else if(this.formData.value == "党建一点通"){
              this.$axios.get('getMadeEasy').then(res => {
                  if(res.ret) {
                      this.tableData = res.data
                  }
              })
          }else if(this.formData.value == "党员亮身份"){
              this.$axios.get('getShowID').then(res => {
                  if(res.ret) {
                      this.tableData = res.data
                  }
              })
          }else if(this.formData.value == "随时随地学"){
              this.$axios.get('getStydy').then(res => {
                  if(res.ret) {
                      this.tableData = res.data
                  }
              })
          }else if(this.formData.value == "随时随地拍"){
              this.$axios.get('getPic').then(res => {
                  if(res.ret) {
                      this.tableData = res.data
                  }
              })
          }else if(this.formData.value == "制度建设"){
              this.$axios.get('getSystem').then(res => {
                  if(res.ret) {
                      this.tableData = res.data
                  }
              })
          }else if(this.formData.value == "特色活动"){
              this.$axios.get('getSpecialActivity').then(res => {
                  if(res.ret) {
                      this.tableData = res.data
                  }
              })
          }else if(this.formData.value == "通知早知道"){
              this.$axios.get('getInform').then(res => {
                  if(res.ret) {
                      this.tableData = res.data
                  }
              })
          }
      },
    del(id){
      this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('delNews',{id}).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            setTimeout(() => {
              this.$router.go(0)
            },1000)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    edit(id) {
      this.$router.push({path:"/news/update",query:{id}})
    },
    swiper(id,title,img,type) {
      let obj = {
        path:id,
        title:title,
        img:img,
        type:type
      }
      // console.log(obj)
      this.$axios.post('addSwiper',obj).then(res => {
        if(res.ret) {
          this.$message({
              type: 'success',
              message: '添加成功!'
            });
            setTimeout(() => {
              this.$router.push('/swiper/list')
            },1000)
        }else{
          this.$message.error('添加失败!');
        }
      })
    }
  },
  created() {
    this.getData()
  }
}
</script>
<style scoped>
.news-list{
    margin-left: 230px;
    margin-top: 40px;
    padding: 20px;
}
</style>
