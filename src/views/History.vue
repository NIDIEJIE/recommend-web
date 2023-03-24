<template>
  <div>
    <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">
      <el-table-column prop="time" label="时间" width="400"> </el-table-column>
      <el-table-column prop="line" label="线路"> </el-table-column>
      <el-table-column label="操作" width="210" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="check()">查看 <i class="el-icon-search"></i></el-button>

          <el-button type="danger" @click=confirmDelete()>删除 <i class="el-icon-remove-outline"></i></el-button>

        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
        :page-sizes="[5, 10, 15, 20]" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="400">
      </el-pagination>
    </div>
    <el-dialog title="检修方案推荐" :visible.sync="dialogVisibleCheck" width="30%" :before-close="handleClose">
      <span>{{ text }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleCheck = false">取消</el-button>
        <el-button type="primary" @click="dialogVisibleCheck = false">导出PDF</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span><i class="el-icon-warning" style="color: red"></i> 确定删除此条历史记录</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'History',
  data () {
    const item = {
      time: '2016-05-02 xx-xx-xx',
      line: 'SH-EDG'
    }
    return {
      tableData: Array(8).fill(item),
      headerBg: 'headerBg',
      dialogVisible: false,
      dialogVisibleCheck: false,
      text: '这是检修方案',
    }
  },
  methods: {
    check () {
      this.dialogVisibleCheck = true
    },
    // 删除历史记录的提示框
    confirmDelete () {
      this.dialogVisible = true;
    }
  }
}
</script>

<style>
.headerBg {
  background: #eee !important;
}
</style>
