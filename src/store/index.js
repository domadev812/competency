import Vue from 'vue'
import Vuex from 'vuex'
//import axios from 'axios'
import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

import auth from './modules/auth'

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

const state = {
  loading: false
}

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  modules: {
    auth,
  },
  strict: debug
})