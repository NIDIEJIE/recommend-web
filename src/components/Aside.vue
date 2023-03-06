<template>
  <el-aside :width="sideWidth + 'px'">
    <el-menu router :default-openeds="['1', '3']" style="min-height: 100vh; overflow-x: hidden" background-color="rgb(48, 65, 86)" text-color="#fff" :collapse-transition="false" :collapse="isCollapse">
      <div>
        <div style="height: 60px; line-height: 60px; text-align: center">
          <img src="../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px" />
          <b style="color: white" v-show="logoTextShow">检修策略推荐系统</b>
        </div>
      </div>
      <el-menu-item index="/">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/center">
        <i class="el-icon-user"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-menu-item index="/history">
        <i class="el-icon-coin"></i>
        <span slot="title">历史数据</span>
      </el-menu-item>
      <el-menu-item index="/login">
        <i class="el-icon-delete"></i>
        <span slot="title">退出登录</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Aside',
  data() {
    return {}
  },
  computed: {
    ...mapState('menu', ['sideWidth', 'isCollapse', 'logoTextShow'])
  }
}
</script>

<style scoped></style>
