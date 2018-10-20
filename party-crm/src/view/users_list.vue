<template>
  <div class="list">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="头像">
            <template slot-scope="scope">
                <img :src="scope.row.headerImg" alt="" style="max-height:60px;">
            </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名">
        </el-table-column>
        <el-table-column prop="idNum" label="身份证号" >
        </el-table-column>
        <el-table-column prop="sex" label="性别">
        </el-table-column>
        <el-table-column prop="politicsStatus" label="政治面貌">
        </el-table-column>
        <el-table-column prop="party" label="所属党支">
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
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
        this.$axios.get('getUsers').then(res => {
            for(var i=0;i<res.data.length;i++){
                switch(res.data[i].party){
                    case 1 : 
                        res.data[i].party = "信息工程学院教工第一党支部";
                        break;
                    case 2 :
                        res.data[i].party = "信息工程学院教工第二党支部";
                        break;
                    case 3 :
                        res.data[i].party = "信息工程学院学生党支部";
                        break;
                    case 4 :
                        res.data[i].party = "信息工程学院学生流动党支部（北京）";
                        break;
                    default :
                        res.data[i].party = "未知";
                }
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
            this.$axios.post('delUsers',{id}).then(res => {
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
.list{
    margin-left: 230px;
    margin-top: 40px;
    padding: 20px;
}
</style>
