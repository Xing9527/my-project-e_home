<template>
  <div class="list">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.img" style="max-height:100px;" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="title" label="新闻标题" >
        </el-table-column>
        <el-table-column prop="path" label="路由">
        </el-table-column>
        <el-table-column prop="type" label="所属新闻分类">
        </el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.row._id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row._id)">删除</el-button>
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
      this.$axios.get('getSwiper').then(res => {
        this.tableData = res.data
      })
    },
    del(id) {
      this.$confirm('此操作将永久删除该新闻, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('delSwiper',{id}).then(res => {
            if(res.ret) {
                this.$message({
                type: 'success',
                message: '删除成功!'
              });
              setTimeout(() => {
                this.$router.go(0)
              },1000)
            }else{
              this.$message.error('删除失败！');
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    edit(id) {
      this.$router.push({path:"/swiper/update",query:{id}})
    }
  },
  created() {
    this.getData()
  }
};
</script>
<style scoped>
.list {
  margin: 40px 0 0 230px;
  padding: 20px;
}
</style>
