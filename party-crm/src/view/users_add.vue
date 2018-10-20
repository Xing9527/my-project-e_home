<template>
  <div class="add">
      <el-form ref="form" :model="formData" label-width="80px">
          <el-form-item label="姓名">
              <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="身份证号">
              <el-input v-model="formData.idNum"></el-input>
          </el-form-item>
          <el-form-item label="密码">
              <el-input v-model="formData.pwd" type="password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
              <el-input v-model="formData.pwdAgain" type="password"></el-input>
          </el-form-item>
          <el-form-item label="性别">
                <el-radio v-model="formData.sex" label="男">男</el-radio>
                <el-radio v-model="formData.sex" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="政治面貌">
            <el-select v-model="formData.politicsStatus" placeholder="请选择">
                <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="所属党支">
            <el-select v-model="formData.party" placeholder="请选择">
                <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
              <el-button @click="register">注册</el-button>
          </el-form-item>
      </el-form>
  </div>
</template>
<script>
export default {
  data() {
      return {
          formData:{
              name:"",
              idNum:"",
              pwd:"",
              pwdAgain:"",
              sex:"",
              politicsStatus:"",
              party:null
          },
        options1: [{
          value: '党员',
          label: '党员'
            }, {
            value: '预备党员',
            label: '预备党员'
            }, {
            value: '积极分子',
            label: '积极分子'
        }],
        options2: [{
            value: '1',
            label: '信息工程学院教工第一党支部'
            }, {
            value: '2',
            label: '信息工程学院教工第二党支部'
            }, {
            value: '3',
            label: '信息工程学院学生党支部'
            }, {
            value: '4',
            label: '信息工程学院学生流动党支部（北京）'
        }]
      }
  },
  methods:{
      register() {
          this.$axios.post('register',this.formData).then(res => {  
            if (res.ret) {
            this.$message({
                message: '恭喜你，注册成功',
                type: 'success'
            });
            setTimeout(() => {
                this.$router.push('/users/list')
            },1000)
            }else{
            this.$message.error('注册用户失败！！！');
            }
          })
      }
  }
}
</script>
<style scoped>
.add{
    margin-left: 230px;
    margin-top: 40px;
    padding: 20px;
}
</style>
