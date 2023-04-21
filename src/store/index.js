import Vue from 'vue'
import Vuex from 'vuex'
import menu from './menu'

Vue.use(Vuex)

export default new Vuex.Store({
  state () {
    return {
      // 面包屑上的路径名称
      currentPathName: '',
    }
  },
  mutations: {
    setPath (state) {
      state.currentPathName = localStorage.getItem('currentPathName')
    }
  },
  modules: {
    menu
  }
})
