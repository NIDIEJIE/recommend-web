<template>
  <div class="container" style="max-width: 100%;">
    <!-- TODO当浏览器页面缩小扩大时存在问题，改变推荐模块的布局从左右到上下即可（非严重性功能问题） -->
    <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" height="99%">
      <el-table-column prop="tower" label="杆塔" width="200"> </el-table-column>
      <el-table-column prop="param" label="参量" width="400"> </el-table-column>
      <el-table-column label="输入" width="250" align="center">
        <template slot-scope="scope">
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    const item = {
      tower: '1',
      param: 'xxxxxxx'
    }
    return {
      tableData: Array(20).fill(item),
      headerBg: 'headerBg',
      input: ''
    }
  }
}
</script>
<style scoped></style>
