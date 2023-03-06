<template>
  <div style="font-size: 15px; display: flex">
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
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Header',
  props: {},
  data() {
    return {
      username: '林孟杰',
      isCollapse: false,
      collapseBtnClass: 'el-icon-s-unfold'
    }
  },
  methods: {
    collapse() {
      this.setAside()
    },
    ...mapMutations('menu', ['setAside'])
  }
}
</script>

<style scoped></style>
