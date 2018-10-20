<template>
  <div class="list">
      <el-table :data="tableData"  border style="width: 100%">
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="contentTxt" label="内容">
        </el-table-column>
        <el-table-column label="状态">
            <template slot-scope="scope">
                <el-button v-if="scope.row.status==1" @click="close(scope.row._id)" type="success" size="mini" plain>开启</el-button>
                <el-button v-if="scope.row.status==0" @click="open(scope.row._id)" type="danger" size="mini" plain>关闭</el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
            <template slot-scope="scope">
                <el-button size="mini" @click="edit(scope.row._id)">编辑</el-button>
                <el-button size="mini" type="danger" @click="del(scope.row._id)">删除</el-button>
                <el-button size="mini" type="info" @click="watch(scope.row._id)">查看</el-button>
            </template>
        </el-table-column>
        </el-table>
  </div>
</template>
<script>
export default {
  data() {
      return {
          tableData:[]
      }
  },
  methods:{
    getData() {
      this.$axios.get('getPingyi').then(res => {
        this.tableData = res.data;
      })
    },
    del(id){
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('delPingyi',{id}).then(res => {
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
      this.$router.push({path:"/pingyi/update",query:{id}})
    },
    close(id) {
        this.$axios.post('closePingyi',{id}).then(res => {
            this.getData()
        })
    },
    open(id) {
        this.$axios.post('openPingyi',{id}).then(res => {
            if(res.data=="已有一个项目开启"){
                this.$message({
                    type: 'warning',
                    message: '已有一个项目开启!'
                });
            }else{
                this.getData()                      
            }
        })        
    },
    watch(id) {
        this.$router.push({path:'/summary',query:{id}})
    }
  },
  created() {
      this.getData()
  }
}
</script>
<style scoped>
.list{
    margin-left: 230px;
    margin-top: 40px;
    padding: 20px;
}
</style>
