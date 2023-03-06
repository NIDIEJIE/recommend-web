<template>
  <el-container style="min-height: 100vh">
    <!--边导航栏-->
    <Aside></Aside>
    <!--右侧容器-->
    <el-container>
      <!-- 头部-->
      <el-header>
        <Header></Header>
      </el-header>
      <!--主体内容-->
      <el-main>
        <router-view></router-view>
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
  data() {
    return {}
  },
  methods: {}
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
