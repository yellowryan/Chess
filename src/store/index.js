import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import getters from './getters'
import mutations from './mutations'
import actions from './action'

var articles =JSON.parse(sessionStorage.getItem('articles')||"[]") 
export default new Vuex.Store({
  state: {
    user:null,
    message:'',
    articles:{
      page:0,
      list:articles
    }
  },
  getters,
  mutations,
  actions
})
