<template>
  <div class="container">
    <!-- 左侧容器输入线路、杆塔和选择输入参量 -->
    <div class="leftContainer">
      <el-form ref="form" :model="form" label-width="80px">
        <!--线路手动输入-->
        <el-form-item label="线路">
          <el-input v-model="form.transmissionLineName"></el-input>
        </el-form-item>
        <!--根据线路生成el-option(杆塔)-->
        <el-form-item label="杆塔号">
          <el-select v-model="form.tower" placeholder="请选择杆塔">
            <el-option label="T1" value="T1"></el-option>
            <el-option label="T2" value="T2"></el-option>
            <el-option label="T3" value="T3"></el-option>
            <el-option label="T4" value="T4"></el-option>
            <el-option label="T5" value="T5"></el-option>
            <el-option label="T6" value="T6"></el-option>
            <el-option label="T7" value="T7"></el-option>
            <el-option label="T8" value="T8"></el-option>
            <el-option label="T9" value="T9"></el-option>
            <el-option label="T10" value="T10"></el-option>
          </el-select>
        </el-form-item>
        <!--参量选择-->
        <el-form-item label="参量">
          <el-cascader v-model="value" :options="options" @change="handleChange"
            :props="{ multiple: true }"></el-cascader>
        </el-form-item>
        <!--按钮触发事件-->
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 100%;">生成检修方案</el-button>
          <!-- <el-button>取消</el-button> -->
          <el-dialog title="检修方案推荐" ref="dialog" :visible.sync="dialogVisible" width="40%">
            <div v-html="text" ref="content"></div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="downloadPDF()">导出PDF</el-button>
            </span>
          </el-dialog>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧容器根据左侧所选择的参量显示对应的输入框 -->
    <div class="rightContainer">
      <div class="container" style="max-width: 100%;">
        <!-- TODO当浏览器页面缩小扩大时存在问题，改变推荐模块的布局从左右到上下即可（非严重性功能问题） -->
        <el-table :data="tableData" border stripe :header-cell-class-name="headerBg" height="95%">
          <el-table-column prop="tower" label="杆塔" width="150"> </el-table-column>
          <el-table-column prop="param" label="参量" width="400"> </el-table-column>
          <el-table-column label="输入(故障率)" width="250" align="center">
            <template slot-scope="scope">
              <el-input v-model="tableData[scope.$index].input" placeholder="请输入内容"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" align="center">
            <template slot-scope="scope">
              <el-button type="danger" @click="confirmDelete(scope.$index)">删除 <i
                  class="el-icon-remove-outline"></i></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import * as keyParam from "@/assets/data/keyParam";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
export default {
  name: 'Recommend',
  data () {
    // const item = {
    //   tower: '',
    //   param: '',
    //   input: ''
    // }
    return {
      // 策略推荐输出dialog
      dialogVisible: false,
      text: '这是检修方案',
      // 表单数据
      form: {
        transmissionLineName: '',
        tower: '',
      },
      tableData: [],
      headerBg: 'headerBg',
      //计量选择器数据
      value: [],
      //级联选择器选项
      options: [
        // 基础
        {
          value: keyParam.base[0],
          label: keyParam.base[0],
          children: [{
            value: keyParam.base[1],
            label: keyParam.base[1]
          },
          {
            value: keyParam.base[2],
            label: keyParam.base[2]
          },
          {
            value: keyParam.base[3],
            label: keyParam.base[3]
          },
          {
            value: keyParam.base[4],
            label: keyParam.base[4]
          }
          ]
        },
        // 杆塔
        {
          value: keyParam.tower[0],
          label: keyParam.tower[0],
          children: [{
            value: keyParam.tower[1],
            label: keyParam.tower[1]
          },
          {
            value: keyParam.tower[2],
            label: keyParam.tower[2]
          },
          {
            value: keyParam.tower[3],
            label: keyParam.tower[3]
          },
          {
            value: keyParam.tower[4],
            label: keyParam.tower[4]
          },
          {
            value: keyParam.tower[5],
            label: keyParam.tower[5]
          },
          {
            value: keyParam.tower[6],
            label: keyParam.tower[6]
          },
          {
            value: keyParam.tower[7],
            label: keyParam.tower[7]
          },
          {
            value: keyParam.tower[8],
            label: keyParam.tower[8]
          },
          {
            value: keyParam.tower[9],
            label: keyParam.tower[9]
          },
          ]
        },
        // 导地线
        {
          value: keyParam.groundConductor[0],
          label: keyParam.groundConductor[0],
          children: [{
            value: keyParam.groundConductor[1],
            label: keyParam.groundConductor[1]
          },
          {
            value: keyParam.groundConductor[2],
            label: keyParam.groundConductor[2]
          },
          {
            value: keyParam.groundConductor[3],
            label: keyParam.groundConductor[3]
          },
          {
            value: keyParam.groundConductor[4],
            label: keyParam.groundConductor[4]
          },
          {
            value: keyParam.groundConductor[5],
            label: keyParam.groundConductor[5]
          },
          ]
        },
        // 绝缘子
        {
          value: keyParam.insulator[0],
          label: keyParam.insulator[0],
          children: [{
            value: keyParam.insulator[1],
            label: keyParam.insulator[1]
          },
          {
            value: keyParam.insulator[2],
            label: keyParam.insulator[2]
          },
          {
            value: keyParam.insulator[3],
            label: keyParam.insulator[3]
          },
          {
            value: keyParam.insulator[4],
            label: keyParam.insulator[4]
          },
          {
            value: keyParam.insulator[5],
            label: keyParam.insulator[5]
          },
          {
            value: keyParam.insulator[6],
            label: keyParam.insulator[6]
          },
          {
            value: keyParam.insulator[7],
            label: keyParam.insulator[7]
          },
          {
            value: keyParam.insulator[8],
            label: keyParam.insulator[8]
          },
          {
            value: keyParam.insulator[9],
            label: keyParam.insulator[9]
          },
          {
            value: keyParam.insulator[10],
            label: keyParam.insulator[10]
          },
          ]
        },
        // 金具
        {
          value: keyParam.metalFittings[0],
          label: keyParam.metalFittings[0],
          children: [{
            value: keyParam.metalFittings[1],
            label: keyParam.metalFittings[1]
          },
          {
            value: keyParam.metalFittings[2],
            label: keyParam.metalFittings[2]
          },
          {
            value: keyParam.metalFittings[3],
            label: keyParam.metalFittings[3]
          },
          {
            value: keyParam.metalFittings[4],
            label: keyParam.metalFittings[4]
          },
          {
            value: keyParam.metalFittings[5],
            label: keyParam.metalFittings[5]
          },
          {
            value: keyParam.metalFittings[6],
            label: keyParam.metalFittings[6]
          },
          ]
        },
        // 接地装置
        {
          value: keyParam.groundingDevice[0],
          label: keyParam.groundingDevice[0],
          children: [{
            value: keyParam.groundingDevice[1],
            label: keyParam.groundingDevice[1]
          },
          {
            value: keyParam.groundingDevice[2],
            label: keyParam.groundingDevice[2]
          }
          ]
        },
        // 通道环境
        {
          value: keyParam.channelEnvironment[0],
          label: keyParam.channelEnvironment[0],
          children: [{
            value: keyParam.channelEnvironment[1],
            label: keyParam.channelEnvironment[1]
          },
          {
            value: keyParam.channelEnvironment[2],
            label: keyParam.channelEnvironment[2]
          },
          {
            value: keyParam.channelEnvironment[3],
            label: keyParam.channelEnvironment[3]
          },
          ]
        },
        // 附属设施
        {
          value: keyParam.ancillaryFacilities[0],
          label: keyParam.ancillaryFacilities[0],
          children: [{
            value: keyParam.ancillaryFacilities[1],
            label: keyParam.ancillaryFacilities[1]
          },
          {
            value: keyParam.ancillaryFacilities[2],
            label: keyParam.ancillaryFacilities[2]
          },
          {
            value: keyParam.ancillaryFacilities[3],
            label: keyParam.ancillaryFacilities[3]
          }
          ]
        },
      ]
    }
  },
  methods: {
    // 向后端请求结果
    onSubmit () {
      console.log('submit!')
      if (this.tableData.length === 0) {
        this.$message.error('无参量输入')
        return
      }
      // 对tableData根据杆塔号进行分类
      let groupedData = this.tableData.reduce((acc, cur) => {
        let tower = cur.tower;
        let group = acc.find(g => g.towerName === tower);
        if (group) {
          group.dataList.push({ param: cur.param, input: cur.input });
        } else {
          acc.push({ towerName: tower, dataList: [{ param: cur.param, input: cur.input }] });
        }
        return acc;
      }, []);
      // 封装发送给后端服务器的数据
      let requestData = {
        transmissionLineName: this.form.transmissionLineName,
        towerData: groupedData
      }
      this.request.post('/strategy', requestData).then((res) => {
        // console.log(requestData);
        // 先请求到结果，保存策略到策略表
        // 策略保存后得到刚保存的策略id，在存到历史记录表中
        // 再刷新历史记录表
        if (res.code === "200") {
          this.dialogVisible = true
          this.text = res.data.replace(/\n/g, "<br>");
          console.log(res);
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // 将级联选择器选择的参量行显示到右侧table中
    handleChange (res) {
      console.log(res);
      for (let i of res) {
        let parami = i[0] + ' / ' + i[1];
        let toweri = this.form.tower;
        console.log(toweri, parami);
        let num = 0;
        for (let tableDataItem of this.tableData) {
          if (tableDataItem.tower === toweri && tableDataItem.param === parami) {
            break;
          } else {
            num += 1;
          }
        }
        if (num === this.tableData.length) {
          let item = {
            tower: toweri,
            param: parami,
            input: 0.0
          }
          this.tableData.push(item)
        }
      }
    },
    // 删除选中的参量行
    confirmDelete (rownum) {
      this.tableData.splice(rownum, 1)
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
      const now = new Date(); // 创建一个新的Date对象
      const year = now.getFullYear(); // 获取当前年份
      const month = now.getMonth(); // 获取当前月份
      const date = now.getDate(); // 获取当前日期
      const hours = now.getHours(); // 获取当前小时数
      const minutes = now.getMinutes(); // 获取当前分钟数
      pdf.save(this.form.transmissionLineName + '_' + year + '-' + month + '-' + date + '-' + hours + '-' + minutes + '-' + '.pdf'); // 下载PDF文件
    },
  },
  watch: {
    // 当重新选择杆塔时清空级联选择器的已选择内容
    'form.tower': {
      handler () {
        this.value = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;

  .leftContainer {
    height: 100%;
    padding-right: 35px;
    border-right: 1px solid #ccc;
  }

  .rightContainer {
    height: 100%;
    padding-left: 35px;
    flex: 1;
  }
}
</style>
