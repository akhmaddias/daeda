import Vue from 'vue'
import Vuex from 'vuex'

import cart from '@/store/cart'
import user from '@/store/user'
import menu from '@/store/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  namespaced: true,
  modules: {
    cart,
    user,
    menu
  }
})
