
import * as types from './mutation-type'
import { stat } from 'fs';
import { type } from 'os';
const mutations = {
    [types.SET_LIST](state, list) {
        state.list[list.pageName] = {
            list: list.list,
            page: list.page,
            count: list.count
        }
    },
    [types.SET_TITLE](state, tit) {
        state.title = tit
    },
    [types.SCREEN_RESULT](state, screen) {
        state.screen = screen
    },
    [types.HOUSE_MENU](state, menu) {
        state.house_menu = menu
    },
    [types.IMMIG_MENU](state, menu) {
        state.immig_menu = menu
    },
    [types.SET_NUMBER] (state, numberAndJX) {
        console.log(numberAndJX)
        state.number = numberAndJX.num
        state.cityJX = numberAndJX.jx
        state.cityName= numberAndJX.cityName
    },
    [types.SET_COUNTRY] (state,  country) {
        state.set_country = country
    },
    [types.SET_SHARETITLE_IMG](state, all){
        state.shareTitle = all.shareTitle
        state.shareImg = all.shareImg||''
    },

    // 是否 登录 
    [types.Login](state,  val) {
        state.isLogin = val
    },
    [types.USERINFO](state, val) {
        state.userInfo = val
    },
    [types.HEADIMG](state, val) {
        state.headImg = val
    },

}


export default mutations