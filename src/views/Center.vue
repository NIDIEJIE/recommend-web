<template>
  <div class="personal-center">
    <el-row>
      <el-col :span="18" :offset="3">
        <el-card>
          <div slot="header" class="clearfix">
            <span>个人中心</span>
          </div>
          <el-form label-position="left" label-width="100px" :model="form" :rules="rules" ref="pass">
            <div style="text-align: center; margin: 10px 0">
              <el-upload class="avatar-uploader" action="http://localhost/file/upload" :show-file-list="false"
                :on-success="handleAvatarSuccess">
                <img v-if="form.avatar" :src="form.avatar" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </div>
            <el-form-item label="用户名">
              <el-input v-model="form.username" readonly></el-input>
            </el-form-item>
            <el-form-item label="原密码" prop="password">
              <el-input v-model="form.password" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="newPassword">
              <el-input v-model="form.newPassword" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="confirmPassword">
              <el-input v-model="form.confirmPassword" autocomplete="off" show-password></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="save">确 定 修 改</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      form: {
        avatar: ''
      },
      rules: {
        password: [
          { required: true, message: '请输入原密码', trigger: 'blur' },
          { min: 3, message: '长度不少于3位', trigger: 'blur' }
        ],
        newPassword: [
          { required: true, message: '请输入新密码', trigger: 'blur' },
          { min: 3, message: '长度不少于3位', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, message: '长度不少于3位', trigger: 'blur' }
        ],
      },
      user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
    }
  },
  created () {
    this.form.username = this.user.username
    this.form.avatar = this.user.avatarurl
  },
  methods: {
    save () {
      this.$refs.pass.validate((valid) => {
        if (valid) {  //合法
          if (this.form.newPassword !== this.form.confirmPassword) {
            this.$message.error("2次输入的新密码不相同")
            return false
          }
          this.request.post("/user/password", this.form).then(res => {
            console.log(this.form);
            if (res.code === '200') {
              this.$message.success("修改成功，请重新登录！")
              localStorage.removeItem("user")
              this.$router.push('/login')
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    handleAvatarSuccess (res) {
      // res就是文件的路径
      this.form.avatar = res
      // 获取user的值
      let user = JSON.parse(localStorage.getItem('user'));

      // 更新图像url
      user.avatarurl = res;

      // 将修改后的对象重新存储到localStorage中
      localStorage.setItem('user', JSON.stringify(user));
      user = JSON.parse(localStorage.getItem('user'));
      // 更新到数据库
      this.request.post('/user', user).then(res => {
        // 请求是异步操作所以需要进行限制，否则会读脏数据
        this.$emit('refreshUser')
      })

    }
  },
  computed: {
    ...mapState(['username']),
  }
}
</script>

<style>
.avatar-uploader {
  text-align: center;
  padding-bottom: 10px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 138px;
  height: 138px;
  line-height: 138px;
  text-align: center;
}

.avatar {
  width: 138px;
  height: 138px;
  display: block;
}
</style>
