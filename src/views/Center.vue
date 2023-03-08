<template>
  <div class="personal-center">
    <el-row>
      <el-col :span="18" :offset="3">
        <el-card>
          <div slot="header" class="clearfix">
            <span>个人中心</span>
          </div>
          <el-form label-position="left" label-width="100px" :model="form">
            <el-form-item label="用户名">
              <el-input v-model="form.username" readonly></el-input>
            </el-form-item>
            <el-form-item label="头像">
              <el-avatar class="avatar" :src="form.avatar"></el-avatar>
              <input type="file" accept="image/*" @change="uploadAvatar" />
            </el-form-item>
            <el-form-item label="修改密码">
              <el-input type="password" v-model="form.oldPassword" placeholder="旧密码"></el-input>
              <el-input type="password" v-model="form.newPassword" placeholder="新密码"></el-input>
              <el-input type="password" v-model="form.confirmPassword" placeholder="确认密码"></el-input>
              <el-button type="primary" @click="changePassword">确认修改</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        avatar: '',
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }
  },
  methods: {
    uploadAvatar(event) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => {
        this.form.avatar = reader.result
      }
    },
    changePassword() {
      // 修改密码逻辑
      this.$message({
        message: '密码修改成功！',
        type: 'success'
      })
    }
  }
}
</script>

<style>
.avatar {
  width: 80px;
  height: 80px;
  margin-right: 20px;
}
</style>
