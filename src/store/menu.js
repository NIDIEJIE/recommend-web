export default {
  // 为当前模块开启命名空间
  namespaced: true,

  // 模块的 state 数据
  state() {
    return {
      isCollapse: false,
      logoTextShow: true,
      sideWidth: 200
    }
  },

  // 模块的 mutations 方法
  mutations: {
    setAside(state) {
      state.isCollapse = !state.isCollapse
      if (state.isCollapse) {
        state.sideWidth = 64
        state.logoTextShow = false
      } else {
        state.sideWidth = 200
        state.logoTextShow = true
      }
    }
  },

  // 模块的 getters 属性
  getters: {}
}
