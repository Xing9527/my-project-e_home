<template>
  <div class="add">
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
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.img" style="max-height:100px;" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="audit" label="是否通过审核" >
        </el-table-column>
        <el-table-column prop="name" label="姓名" >
        </el-table-column>
        <el-table-column prop="idNum" label="身份证号">
        </el-table-column>
        <el-table-column prop="type" label="分类">
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row._id)">通过审核</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
  </div>
</template>
<script>
export default {
  data(){
      return {
         tableData:[],
         options: [{
          value: '0',
          label: '全部'
        }, {
          value: '1',
          label: '思想汇报'
        }, {
          value: '2',
          label: '心得总结'
        }, {
          value: '3',
          label: '个人总结'
        }],
        formData:{
            value:""
        }
      }
  },
  methods:{
      getData() {
          this.$axios.get('getImg').then(res => {
            for(var i = 0;i< res.data.length;i++){
                if(res.data[i].audit){
                    res.data[i].audit = "已通过"
                }else{
                    res.data[i].audit = "未通过"
                }
            }
            this.tableData = res.data
            //   console.log(res.data)     
          })
      },
      getTrueData() {
          console.log(this.formData.value)
          if(this.formData.value == "0") {
              this.getData()
          }else if(this.formData.value == "1"){
              this.$axios.get('getSi').then(res => {
                  if(res.ret) {
                      this.tableData = res.data
                  }
              })
          }else if(this.formData.value == "2"){
              this.$axios.get('getXin').then(res => {
                  if(res.ret) {
                      this.tableData = res.data
                  }
              })
          }else{
              this.$axios.get('getGe').then(res => {
                  if(res.ret) {
                      this.tableData = res.data
                  }
              })
          }
      },
      edit(id) {
          this.$axios.post('passImg',{id}).then(res => {
              if(res.ret) {
                  this.$message({
                    type: 'success',
                    message: '通过审核成功!'
                    });
                    setTimeout(() => {
                    this.$router.go(0)
                    },1000)
              }else{
                  this.$message.error('操作失败!');
              }
          })
      },
      del(id) {
          this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            }).then(() => {
            this.$axios.post('delImg',{id}).then(res => {
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
      }
  },
  created() {
      this.getData()
  }
}
</script>


<style scoped>
.add{
    margin: 40px 0 0 230px;
    padding: 20px;
}
.select{
    margin: 20px auto;
}
</style>
