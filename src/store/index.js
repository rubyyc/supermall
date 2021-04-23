import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import state from './state'
import getters from './getters'
Vue.use(Vuex)

const store = new Vuex.Store({
  state,
  mutations,
  getters,
  actions
})

export default store
