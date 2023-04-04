<template>
  <el-container style="min-height: 100vh">
    <!--边导航栏-->
    <Aside></Aside>
    <!--右侧容器-->
    <el-container>
      <!-- 头部-->
      <el-header>
        <Header :user="user"></Header>
      </el-header>
      <!--主体内容-->
      <el-main>
        <router-view @refreshUser="getUser"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Aside from '@/components/Aside'
import Header from '@/components/Header'
export default {
  name: 'Base',
  components: {
    Aside,
    Header
  },
  data () {
    return {
      user: {}
    }
  },
  created () {
    // 从后台获取最新的User数据
    this.getUser()
  },
  methods: {
    getUser () {
      let id = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")).id : ""
      if (id) {
        // 从后台获取User数据
        this.request.get("/user/" + id).then(res => {
          // 重新赋值后台的最新User数据
          console.log(res.data);
          this.user = res.data
        })
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
</style>
