<template>
  <el-aside :width="sideWidth + 'px'">
    <el-menu router :default-openeds="['1', '3']" style="min-height: 100vh; overflow-x: hidden"
      background-color="rgb(48, 65, 86)" text-color="#fff" :collapse-transition="false" :collapse="isCollapse">
      <div>
        <div style="height: 60px; line-height: 60px; text-align: center">
          <img src="../assets/logo.png" alt="" style="width: 20px; position: relative; top: 5px" />
          <b style="color: white" v-show="logoTextShow">检修策略推荐系统</b>
        </div>
      </div>
      <el-menu-item index="/manage/recommend">
        <i class="el-icon-house"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/manage/history">
        <i class="el-icon-coin"></i>
        <span slot="title">历史数据</span>
      </el-menu-item>
      <el-menu-item index="/manage/analysis">
        <i class="el-icon-data-line"></i>
        <span slot="title">数据分析</span>
      </el-menu-item>
      <el-menu-item index="/manage/center">
        <i class="el-icon-user"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
      <el-menu-item @click.native="showLogOutDialog()">
        <i class="el-icon-switch-button"></i>
        <span slot="title">退出登录</span>
      </el-menu-item>
    </el-menu>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span><i class="el-icon-warning" style="color: red"></i> 确定注销并退出系统</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logOut">确 定</el-button>
      </span>
    </el-dialog>
  </el-aside>
</template>

<script>
import { mapState } from 'vuex'
import logOutDialogMix from '../mixins/logOutDialogMix.js'

export default {
  name: 'Aside',
  mixins: [logOutDialogMix],
  data () {
    return {}
  },
  computed: {
    ...mapState('menu', ['sideWidth', 'isCollapse', 'logoTextShow'])
  }
}
</script>

<style scoped></style>
