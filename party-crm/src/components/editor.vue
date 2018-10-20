<template> 
  <div id="editor"> 
    
  </div>
</template>

<script>
  import WangEditor from 'wangeditor' //引入wangeditor富文本
  import axios from "axios"
  export default {
    name: "editor",
    data() {
      return {
        editor:null,   //先定义一个变量editor
        token:"",
        url:""
      }
    },
    props:{   //子组件接收父组件传值给value
      value:{
        type:String
      }
    },
    methods:{
      getToken() {
        this.$axios.qiniuGet().then(res => {
          this.token = res.data
        })
      }
    },
    created() {  //  打开网页后执行
      this.getToken()
      let that = this;  //由于后面function中的this指向会发生变化，所以先赋值给that
      this.$nextTick(() => {    //$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，
                      //在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM 
        this.editor = new WangEditor("#editor");   //创建一个富文本
        this.editor.customConfig.onchange = function (html) { //
        // html 即变化之后的内容
          // console.log(html);
          that.$emit('input',html);
          that.$emit('getTxt',that.editor.txt.text())
        }
        this.editor.customConfig.customUploadImg = function (files, insert) {
          // files 是 input 中选中的文件列表
          // console.log(files)
          var form = new FormData();
          form.append("file",files[0]);
          form.append("token",that.token);
          // console.log(that.token)
          axios.post("https://upload-z1.qiniup.com",form).then(res => {
            // console.log(res.data)
            that.url = "http://image.yaojunrong.com/" + res.data.key;
            // console.log(that.url)
            insert(that.url)            
          })
          // insert 是获取图片 url 后，插入到编辑器的方法
          // 上传代码返回结果之后，将图片插入到编辑器中
        }
        this.editor.create()
        document.getElementById('editor').addEventListener('click', function () {
            // 如果未配置 editor.customConfig.onchange，则 editor.change 为 undefined
            that.editor.change && that.editor.change()
        })  
      })
    },
    watch:{// 监听Value的值，并将值赋值给html
      value(val){
        this.editor.txt.html(val)
      }
    }
  }
</script>

<style scoped>

</style>
