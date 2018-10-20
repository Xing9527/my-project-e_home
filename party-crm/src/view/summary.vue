<template>
  <div class="summary">
      <el-table :data="tableData"  border style="width: 100%">
        <el-table-column label="个人总结">
            <template slot-scope="scope">
                <img :src="scope.row.userImg" alt="" style="max-height:60px;">
            </template>
        </el-table-column>
        <el-table-column prop="userName" label="用户名">
        </el-table-column>
        <el-table-column label="状态">
            <template slot-scope="scope">
                <el-button v-if="scope.row.status==1" type="success" size="mini" plain>通过审核</el-button>
                <el-button v-if="scope.row.status==0" type="danger" size="mini" plain>等待审核</el-button>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="280">
            <template slot-scope="scope">    
                <el-button size="mini" type="info" @click="watch(scope.row._id)">查看</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-dialog title="个人总结" :visible.sync="show">
          <div class="info">
              <img :src="summary.userImg" alt="" style="width:30px;float:left;margin-right:20px;">
              <h3>{{summary.userName}}</h3>
          </div>
          <div class="img">
              <img :src="summary.img" alt="" style="max-height:400px;">          
          </div>
          <div style="text-align:right;">
              <el-button size="mini" @click="pass(summary._id)" v-if="summary.status==0">通过审核</el-button>
              <el-button size="mini" type="danger" @click="del(summary._id)">删除</el-button>
          </div>
        <el-table :data="summary.evaluate">
            <el-table-column label="头像" width="150">
                <template slot-scope="scope">
                    <img :src="scope.row.headerImg" alt="" style="max-height:40px;">      
                </template>
            </el-table-column>
            <el-table-column property="name" label="姓名" width="200"></el-table-column>
            <el-table-column label="评价">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.evaluate==1" type="success" size="mini" plain>优</el-button>
                    <el-button v-if="scope.row.evaluate==2" type="warning" size="mini" plain>良</el-button>
                    <el-button v-if="scope.row.evaluate==3" type="info" size="mini" plain>中</el-button>
                    <el-button v-if="scope.row.evaluate==4" type="danger" size="mini" plain>差</el-button>                  
                </template>
            </el-table-column>
        </el-table>
      </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
      return {
          tableData:[],
          show:false,
          summary:{
              img:"",
              userName:'',
              userImg:"",
              evaluate:[],
              _id:"",
              status:0
          }
      }
  },
  methods:{
      getSummary() {
          this.$axios.get('getSummary',{pingyiID:this.$route.query.id}).then(res => {
              this.tableData = res.data
          })
      },
      watch(id) {
          this.show = true;
          this.$axios.get('getSummary',{id}).then(res => {
              this.summary = res.data[0]
          })
      },
      pass(id) {
          this.$axios.post('passSummary',{id}).then(res => {
              if(res.ret) {
                  this.getSummary();
                  this.show = false;
              }
          })
      },
      del(id) {
          this.$axios.post('delSummary',{id}).then(res => {
              if(res.ret) {
                  this.getSummary();
                  this.show = false;
              }
          })
      }
  },
  created() {
      this.getSummary()
  }
}
</script>
<style scoped>
.summary{
    padding: 90px 20px 20px 250px;
}
</style>
