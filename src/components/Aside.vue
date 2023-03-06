<template>
  <el-menu :default-openeds="['1', '3']" style="min-height: 100vh; overflow-x: hidden" background-color="rgb(48, 65, 86)" text-color="#fff" :collapse-transition="false" :collapse="isCollapse">
    <div>
      <div style="height: 60px; line-height: 60px; text-align: center">
        <img src="../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px" />
        <b style="color: white" v-show="logoTextShow">检修策略推荐系统</b>
      </div>
    </div>
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-message"></i>
        <span slot="title">首页</span>
      </template>
    </el-submenu>
    <el-submenu index="2">
      <template slot="title">
        <i class="el-icon-user"></i>
        <span slot="title">个人中心</span>
      </template>
    </el-submenu>
    <el-submenu index="3">
      <template slot="title"><i class="el-icon-setting"></i> <span slot="title">历史数据</span></template>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title"><i class="el-icon-delete"></i> <span slot="title">退出登录</span></template>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "Aside",
  props: {
    isCollapse: Boolean,
    logoTextShow: Boolean
  }
}
</script>

<style scoped>

</style>