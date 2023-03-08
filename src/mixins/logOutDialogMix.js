export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    showLogOutDialog() {
      this.dialogVisible = true
    },
    logOut() {
      this.dialogVisible = false
      this.$message({
        message: '退出登录成功！',
        type: 'success'
      })
      this.$router.push('/login')
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    }
  }
}
