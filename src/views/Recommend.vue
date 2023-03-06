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
          <el-cascader v-model="value" :options="options" @change="handleChange"></el-cascader>
        </el-form-item>
        <!--按钮触发事件-->
        <el-form-item>
          <el-button type="primary" @click="onSubmit">生成检修方案</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 右侧容器根据左侧所选择的参量显示对应的输入框 -->
    <div class="rightContainer">
      <img src="../assets/logo.png" alt="" />
      <img src="../assets/logo.png" alt="" />
      <img src="../assets/logo.png" alt="" />

      <img src="../assets/logo.png" alt="" />
      <img src="../assets/logo.png" alt="" />

      <img src="../assets/logo.png" alt="" />
      <img src="../assets/logo.png" alt="" />
      <img src="../assets/logo.png" alt="" />
    </div>
  </div>
</template>

<script>
// import keyParam from "@/assets/data/keyParam";
export default {
  name: 'Recommend',
  data() {
    return {
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
      options: []
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
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
