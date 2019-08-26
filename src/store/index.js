import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'
import createLogger from 'vuex/dist/logger'

import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    plugins: [createLogger(), createPersistedState({
        storage: window.sessionStorage,
        reducer(val) {
            return {
            // number
            number: val.number,
            cityJX: val.cityJX,
            cityName:val.cityName,
            isLogin: val.isLogin,
            userInfo: val.userInfo,
            headImg: val.headImg
          }
       }
    })]
})