<template>
  <div class="msg">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="头像">
          <template slot-scope="scope">
            <img :src="scope.row.headerImg" style="max-height:40px;" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" >
        </el-table-column>
        <el-table-column prop="message" label="留言" >
        </el-table-column>
        <el-table-column prop="createTime" label="时间">
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button size="mini" @click="watch(scope.row._id)">查看回复</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="留言回复" :visible.sync="show">
        <el-table :data="reply">
            <el-table-column label="头像" width="150">
                <template slot-scope="scope">
                    <img :src="scope.row.img" alt="" style="max-height:40px;">      
                </template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" >
            </el-table-column>
            <el-table-column prop="reply" label="回复" >
            </el-table-column>
            <el-table-column prop="createTime" label="时间">
            </el-table-column>
        </el-table>
      </el-dialog>
  </div>
</template>
<script>
import timeTrans from '../../util/timeTrans';
export default {
  data() {
      return {
         show:false,
         tableData:[],
         reply:[]        
      }
  },
  methods:{
      getData() {
          this.$axios.get('getMessages').then(res => {
              for(var i=0;i<res.data.length;i++) {
                  res.data[i].createTime = timeTrans(res.data[i].createTime)
              }
              this.tableData = res.data
          })
      },
      del(id) {
          this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('delMessages',{id}).then(res => {
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
      watch(id) {
          this.show = true;
          this.$axios.get('getMessages',{id}).then(res => {
              for(var i=0;i<res.data[0].reply.length;i++) {
                  res.data[0].reply[i].createTime = timeTrans(res.data[0].reply[i].createTime)
              }
              this.reply = res.data[0].reply;
          })
      }
  },
  created() {
      this.getData()
  }
}
</script>
<style scoped>
.msg{
    padding: 79px 20px 20px 250px;
}
</style>
