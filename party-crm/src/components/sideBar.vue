<template>
  <div class="side-bar">
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true">
        <el-submenu index="">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>用户信息</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/users/list">用户列表</el-menu-item>
            <el-menu-item index="/users/add">用户注册</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true">
        <el-submenu index="">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>新闻</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/news/list">新闻列表</el-menu-item>
            <el-menu-item index="/news/add">新闻添加</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
      <el-menu
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true">
        <el-submenu index="">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>轮播图</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="/swiper/list">轮播图列表</el-menu-item>
            <el-menu-item index="/swiper/update">轮播图修改</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true">
      <el-submenu index="">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>图片</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/imgs/list">图片列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true">
      <el-submenu index="">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>民主评议</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/pingyi/list">民主评议列表</el-menu-item>
          <el-menu-item index="/pingyi/add">民主评议添加</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true">
      <el-submenu index="">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>留言</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/message">留言列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
export default {

};
</script>
<style>
.el-menu{
    border-right: none;
}
</style>

<style scoped>
.side-bar{
    position: fixed;
    left:0;
    top: 0;
    bottom:0;
    width: 230px;
    background: #545c64;
    box-sizing: border-box;
}
</style>
