<template>
  <div>
    <el-row :gutter="10" style="margin-bottom: 60px">
      <el-col :span="6">
        <el-card style="color: #F56C6C ">
          <div style="text-align: center; font-weight: bold">线路状态评价严重状态数量</div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold">
            {{ chartData[0] }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color: #E6A23C">
          <div style="text-align: center; font-weight: bold">线路状态评价异常状态数量</div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold">
            {{ chartData[1] }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color: #409EFF">
          <div style="text-align: center; font-weight: bold">线路状态评价注意状态数量</div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold">
            {{ chartData[2] }}
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card style="color: #67C23A">
          <div style="text-align: center; font-weight: bold">线路状态评价正常状态数量</div>
          <div style="padding: 10px 0; text-align: center; font-weight: bold">
            {{ chartData[3] }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <div id="main" style="width: 500px; height: 450px"></div>
      </el-col>

      <el-col :span="12">
        <div id="pie" style="width: 500px; height: 400px"></div>
      </el-col>
    </el-row>

  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: "analysis",
  data () {
    return {
      chartData: []
    }
  },
  mounted () {  // 页面元素渲染之后再触发
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);

    var pieDom = document.getElementById('pie');
    var pieChart = echarts.init(pieDom);

    this.request.get("/chart").then(res => {
      // 填空
      this.chartData = res.data
      // 数据准备完毕之后再set
      var option = {
        title: {
          text: '线路状态数量统计',
          subtext: '柱状图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        xAxis: {
          type: 'category',
          data: ["严重", "异常", "注意", "正常"]
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: "",
            data: [
              {
                name: '严重',
                value: this.chartData[0],
                // 设置单个柱子的样式
                itemStyle: {
                  color: '#F56C6C',
                  shadowColor: '#F56C6C',
                  borderType: 'dashed',
                }
              },
              {
                name: '异常',
                value: this.chartData[1],
                // 设置单个柱子的样式
                itemStyle: {
                  color: '#E6A23C',
                  shadowColor: '#E6A23C',
                  borderType: 'dashed',
                }
              },
              {
                name: '注意',
                value: this.chartData[2],
                // 设置单个柱子的样式
                itemStyle: {
                  color: '#409EFF',
                  shadowColor: '#409EFF',
                  borderType: 'dashed',
                }
              },
              {
                name: '正常',
                value: this.chartData[3],
                // 设置单个柱子的样式
                itemStyle: {
                  color: '#67C23A',
                  shadowColor: '#67C23A',
                  borderType: 'dashed',
                }
              }
            ],
            type: 'bar'
          },
        ]
      };
      // 饼图
      var pieOption = {
        title: {
          text: '线路状态数量统计',
          subtext: '比例图',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: "",
            type: 'pie',
            radius: '80%',
            center: ['50%', '60%'],
            label: {            //饼图图形上的文本标签
              normal: {
                show: true,
                position: 'inner', //标签的位置
                textStyle: {
                  fontWeight: 300,
                  fontSize: 14,    //文字的字体大小
                  color: "#fff"
                },
                formatter: '{c}({d}%)'
              }
            },
            data: [
              {
                name: "严重",
                value: this.chartData[0],
                itemStyle: {
                  color: '#F56C6C',
                  shadowColor: '#F56C6C',
                  borderType: 'dashed',
                }
              },
              {
                name: "异常",
                value: this.chartData[1],
                itemStyle: {
                  color: '#E6A23C',
                  shadowColor: '#E6A23C',
                  borderType: 'dashed',
                }
              },
              {
                name: "注意",
                value: this.chartData[2],
                itemStyle: {
                  color: '#409EFF',
                  shadowColor: '#409EFF',
                  borderType: 'dashed',
                }
              },
              {
                name: "正常",
                value: this.chartData[3],
                itemStyle: {
                  color: '#67C23A',
                  shadowColor: '#67C23A',
                  borderType: 'dashed',
                }
              }],  // 填空
          },
        ],
      };
      myChart.setOption(option)
      pieChart.setOption(pieOption)
    })

  }
}
</script>

<style scoped></style>