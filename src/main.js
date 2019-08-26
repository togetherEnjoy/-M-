import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import {
  fetch,
  post,
  put
} from './utils/http'
import fastclick from 'fastclick'; //移动端300ms

// fastclick.attach(document.body);

// px to rem 插件
import 'lib-flexible'

import Meta from 'vue-meta';
Vue.use(Meta);

// vant 组件
import 'vant/lib/index.css';
import {
  Dialog,
  Uploader,
  DatetimePicker,
  Popup,
  Swipe,
  SwipeItem,
  Toast,
  Lazyload,
  PullRefresh,
  List,
  Loading,
  Overlay,
  Notify 
} from 'vant';

Vue.use(Dialog)
  .use(Uploader)
  .use(DatetimePicker)
  .use(Popup)
  .use(Swipe)
  .use(SwipeItem)
  .use(Toast)
  .use(Lazyload, {
    loading: require('./assets/images/hot/lazy.png')
  })
  .use(PullRefresh)
  .use(List)
  .use(Loading)
  .use(Overlay)
  .use(Notify)


import 'mint-ui/lib/style.css';




/*第一层if判断生产环境和开发环境*/
if (process.env.NODE_ENV === 'production') {
  /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
  if (process.env.VUE_APP_FLAG === 'pro') {
    //production 生产环境   m.qhiwi.com
    axios.defaults.baseURL = 'http://m.qhiwi.com';

  } else {
    //test 测试环境
    axios.defaults.baseURL = 'http://120.78.158.34/';

  }
} else {
  //dev 开发环境
  axios.defaults.baseURL = 'http://120.78.158.34';
}


Vue.prototype.$http = axios
Vue.prototype.$fetch = fetch
Vue.prototype.$post = post
Vue.prototype.$put = put
Vue.config.productionTip = false


Vue.filter('goTime', (value) => {
  return Math.floor(value / (24 * 3600 * 1000))
})


new Vue({
  router,
  store,
  render: h => h(App),
  mounted() {
    document.dispatchEvent(new Event('render-event')) // 预渲染
  },
}).$mount('#app')