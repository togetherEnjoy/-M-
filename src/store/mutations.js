
import * as types from './mutation-type'
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

}


export default mutations