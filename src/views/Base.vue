<template>
  <el-container style="min-height: 100vh">
    <!--边导航栏-->
    <el-aside :width="sideWidth + 'px'">
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
    </el-aside>
    <!--右侧容器-->
    <el-container>
      <!-- 头部-->
      <el-header style="font-size: 15px; display: flex">
        <div style="flex: 1; font-size: 20px">
          <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
        </div>
        <el-dropdown style="width: 70px; cursor: pointer">
          <span>{{ username }}</span>
          <i class="el-icon-arrow-down" style="margin-left: 5px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>历史数据</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <!--主体内容-->
      <el-main>
        <RecommendBase></RecommendBase>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import RecommendBase from '@/views/RecommendBase'
export default {
  name: 'Base',
  components: {
    RecommendBase
  },
  data() {
    return {
      username: '林孟杰',
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true
    }
  },
  methods: {
    collapse() {
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      } else {
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
    }
  }
}
</script>

<style scoped lang="less">
// el-main 内置padding为20px
.el-main {
  // padding: 0px;
  // margin: 20px;
  // border: 1px solid #ccc;
}
.el-header {
  border-bottom: 1px solid #ccc;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  //background-color: @aside-menu-background;
  .el-menu {
    background-color: @aside-menu-background;
  }
}
</style>
