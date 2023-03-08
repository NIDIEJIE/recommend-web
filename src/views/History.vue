<template>
  <div>
    <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">
      <el-table-column prop="time" label="时间" width="400"> </el-table-column>
      <el-table-column prop="line" label="线路"> </el-table-column>
      <el-table-column label="操作" width="210" align="center">
        <template slot-scope="scope">
          <el-button type="success">查看 <i class="el-icon-search"></i></el-button>
          <el-button type="danger">删除 <i class="el-icon-remove-outline"></i></el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[5, 10, 15, 20]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400"> </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'History',
  data() {
    const item = {
      time: '2016-05-02 xx-xx-xx',
      line: 'SH-EDG'
    }
    return {
      tableData: Array(8).fill(item),
      headerBg: 'headerBg'
    }
  }
}
</script>

<style>
.headerBg {
  background: #eee !important;
}
</style>
