<template>
  <div class="container">
    <!-- 左侧容器输入线路、杆塔和选择输入参量 -->
    <div class="leftContainer">
      <el-form ref="form" :model="form" label-width="80px">
        <!--线路手动输入-->
        <el-form-item label="线路">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <!--根据线路生成el-option(杆塔)-->
        <el-form-item label="杆塔号">
          <el-select v-model="form.region" placeholder="请选择杆塔">
            <el-option label="1号" value="shanghai"></el-option>
            <el-option label="2号" value="beijing"></el-option>
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
          <el-dialog title="检修方案推荐" :visible.sync="dialogVisible" width="30%">
            <span>{{ text }}</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="dialogVisible = false">导出PDF</el-button>
            </span>
          </el-dialog>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧容器根据左侧所选择的参量显示对应的输入框 -->
    <div class="rightContainer">
      <ParamInput></ParamInput>
    </div>
  </div>
</template>

<script>
import * as keyParam from "@/assets/data/keyParam";
import ParamInput from "@/components/ParamInput.vue";
export default {
  components: { ParamInput },
  name: 'Recommend',
  data () {
    return {
      // 策略推荐输出dialog
      dialogVisible: false,
      text: '这是检修方案',
      // 表单数据
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      //计量选择器数据
      value: [],
      //级联选择器选项
      // TODO 添加剩余参量选项和value（因为value相同会导致多选问题）
      options: [
        // 基础
        {
          value: 'k1',
          label: keyParam.base[0],
          children: [{
            value: 'k1-1',
            label: keyParam.base[1]
          },
          {
            value: 'k2-1',
            label: keyParam.base[2]
          },
          {
            value: 'k3-1',
            label: keyParam.base[3]
          },
          {
            value: 'k4-1',
            label: keyParam.base[4]
          }
          ]
        },
        // 杆塔
        {
          value: '',
          label: keyParam.tower[0],
          children: [{
            value: '',
            label: keyParam.tower[1]
          },
          {
            value: '',
            label: keyParam.tower[2]
          },
          {
            value: '',
            label: keyParam.tower[3]
          },
          {
            value: '',
            label: keyParam.tower[4]
          },
          {
            value: '',
            label: keyParam.tower[5]
          },
          {
            value: '',
            label: keyParam.tower[6]
          },
          {
            value: '',
            label: keyParam.tower[7]
          },
          {
            value: '',
            label: keyParam.tower[8]
          },
          {
            value: '',
            label: keyParam.tower[9]
          },
          ]
        },
        // 导地线
        {
          value: '',
          label: keyParam.groundConductor[0],
          children: [{
            value: '',
            label: keyParam.groundConductor[1]
          },
          {
            value: '',
            label: keyParam.groundConductor[2]
          },
          {
            value: '',
            label: keyParam.groundConductor[3]
          },
          {
            value: '',
            label: keyParam.groundConductor[4]
          },
          {
            value: '',
            label: keyParam.groundConductor[5]
          },
          ]
        },
        // 绝缘子
        {
          value: '',
          label: keyParam.insulator[0],
          children: [{
            value: '',
            label: keyParam.insulator[1]
          },
          {
            value: '',
            label: keyParam.insulator[2]
          },
          {
            value: '',
            label: keyParam.insulator[3]
          },
          {
            value: '',
            label: keyParam.insulator[4]
          },
          {
            value: '',
            label: keyParam.insulator[5]
          },
          {
            value: '',
            label: keyParam.insulator[5]
          },
          {
            value: '',
            label: keyParam.insulator[5]
          },
          {
            value: '',
            label: keyParam.insulator[6]
          },
          {
            value: '',
            label: keyParam.insulator[7]
          },
          {
            value: '',
            label: keyParam.insulator[8]
          },
          {
            value: '',
            label: keyParam.insulator[9]
          },
          {
            value: '',
            label: keyParam.insulator[10]
          },
          ]
        },
        // 金具
        {
          value: '',
          label: keyParam.metalFittings[0],
          children: [{
            value: '',
            label: keyParam.metalFittings[1]
          },
          {
            value: '',
            label: keyParam.metalFittings[2]
          },
          {
            value: '',
            label: keyParam.metalFittings[3]
          },
          {
            value: '',
            label: keyParam.metalFittings[4]
          },
          {
            value: '',
            label: keyParam.metalFittings[5]
          },
          {
            value: '',
            label: keyParam.metalFittings[6]
          },
          ]
        },
        // 接地装置
        {
          value: '',
          label: keyParam.groundingDevice[0],
          children: [{
            value: '',
            label: keyParam.groundingDevice[1]
          },
          {
            value: '',
            label: keyParam.groundingDevice[2]
          }
          ]
        },
        // 通道环境
        {
          value: '',
          label: keyParam.channelEnvironment[0],
          children: [{
            value: '',
            label: keyParam.channelEnvironment[1]
          },
          {
            value: '',
            label: keyParam.channelEnvironment[2]
          },
          {
            value: '',
            label: keyParam.channelEnvironment[3]
          },
          ]
        },
        // 附属设施
        {
          value: '',
          label: keyParam.ancillaryFacilities[0],
          children: [{
            value: '',
            label: keyParam.ancillaryFacilities[1]
          },
          {
            value: '',
            label: keyParam.ancillaryFacilities[2]
          },
          {
            value: '',
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
      this.dialogVisible = true
      axios.get('/test').then((res) => {
        // 先请求到结果，保存策略到策略表
        // 策略保存后得到刚保存的策略id，在存到历史记录表中
        // 再刷新历史记录表
        console.log('777');
        this.text = res.data
      })
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
