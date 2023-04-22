<template>
  <div>
    <el-table :data="tableData" border stripe :header-cell-class-name="headerBg">
      <el-table-column prop="date" label="时间" width="400"> </el-table-column>
      <el-table-column prop="linename" label="线路"> </el-table-column>
      <el-table-column label="操作" width="210" align="center">
        <template slot-scope="scope">
          <el-button type="success" @click="check(scope.row)">查看 <i class="el-icon-search"></i></el-button>

          <el-button type="danger" @click="confirmDelete(scope.row)">删除 <i class="el-icon-remove-outline"></i></el-button>

        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageNum"
        :page-sizes="[5, 6, 7, 8]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="检修方案推荐" ref="dialog" :visible.sync="dialogVisibleCheck" width="40%">
      <div v-html="text" ref="content"></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisibleCheck = false">取消</el-button>
        <el-button type="primary" @click="downloadPDF()">导出PDF</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <span><i class="el-icon-warning" style="color: red"></i> 确定删除此条历史记录</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteItem()">确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import request from '@/utils/request'
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export default {
  name: 'History',
  data () {
    const item = {
      time: '2016-05-02 xx-xx-xx',
      line: 'SH-EDG'
    }
    return {
      tableData: [],
      total: 0,
      // 删除项id
      itemId: 0,
      pageNum: 1,
      pageSize: 8,
      headerBg: 'headerBg',
      dialogVisible: false,
      dialogVisibleCheck: false,
      text: '这是检修方案',
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {},
      transmissionLineName: '',
      date: ''
    }
  },
  created () {
    // 请求历史数据
    this.load()
  },
  methods: {
    check (rowData) {
      this.dialogVisibleCheck = true
      this.itemId = rowData.id
      this.transmissionLineName = rowData.linename
      this.date = rowData.date
      request.get("/history/" + this.itemId).then((res) => {
        this.text = res.data;
        console.log(res);
      })
    },
    // 删除历史记录的提示框
    confirmDelete (rowData) {
      this.dialogVisible = true
      this.itemId = rowData.id
      console.log(this.itemId);
    },
    // 删除数据
    deleteItem () {
      // 发送删除数据请求并重新加载数据
      request.delete("/history/" + this.itemId).then((res) => {
        if (res) {
          this.$message({
            message: '删除记录成功！',
            type: 'success'
          })
          this.load()
        }
      })
      this.dialogVisible = false
    },
    // 加载数据
    load () {
      request.get("/history/page?pageNum=" + this.pageNum + "&pageSize=" + this.pageSize + "&id=" + this.user.id).then((res) => {
        this.tableData = res.data
        this.total = res.total
      })
    },
    handleSizeChange (pageSize) {
      this.pageSize = pageSize;
      this.load()
    },
    handleCurrentChange (pageNum) {
      this.pageNum = pageNum;
      this.load()
    },
    //导出为pdf
    async downloadPDF () {
      console.log(1);
      const dialog = this.$refs.content; // 获取Dialog元素
      const canvas = await html2canvas(dialog); // 将Dialog渲染为Canvas
      const imgData = canvas.toDataURL('image/png'); // 将Canvas转换为图像数据

      const pdf = new jsPDF({
        orientation: 'p', // 纵向
        unit: 'mm',
        format: 'a4',
      });

      pdf.addImage(imgData, 'PNG', 10, 10); // 添加图像到PDF中
      pdf.save(this.transmissionLineName + '_' + this.date + '.pdf'); // 下载PDF文件
    },
  },
  watch: {
  }
}
</script>

<style>
.headerBg {
  background: #eee !important;
}
</style>
