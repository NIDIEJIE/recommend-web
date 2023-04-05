<template>
  <div style="font-size: 15px; display: flex">
    <div style="flex: 1; font-size: 20px">
      <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
      <el-breadcrumb style="display: inline-block; margin-left: 10px">
        <el-breadcrumb-item :to="'/'">首页</el-breadcrumb-item>
        <el-breadcrumb-item>{{ currentPathName }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown style="width: 110px; cursor: pointer">
      <div style="display: flex; align-items: center;">
        <img :src="user.avatarurl" alt="" style="width: 40px; border-radius: 50%; position: relative; right: 5px">
        <span>{{ user.username }}<i class="el-icon-arrow-down" style="margin-left: 5px"></i></span>
      </div>
      <el-dropdown-menu slot="dropdown">
        <router-link to="/center">
          <el-dropdown-item>个人中心</el-dropdown-item>
        </router-link>
        <el-dropdown-item @click.native="showLogOutDialog()">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dialog style="line-height: normal" title="提示" :visible.sync="dialogVisible" width="30%"
      :before-close="handleClose">
      <span><i class="el-icon-warning" style="color: red"></i> 确定注销并退出系统</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="logOut">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import logOutDialogMix from '../mixins/logOutDialogMix.js'

export default {
  name: 'Header',
  mixins: [logOutDialogMix],
  props: {
    user: Object
  },
  data () {
    return {
      // user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  methods: {
    collapse () {
      this.setAside()
    },
    ...mapMutations('menu', ['setAside'])
  },
  computed: {
    ...mapState('menu', ['collapseBtnClass']),
    currentPathName () {
      return this.$store.state.currentPathName //需要监听的数据
    }
  }
}
</script>

<style></style>
