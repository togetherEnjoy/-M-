import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import {
  fetch,
  post
} from './utils/http'
import fastclick from 'fastclick'; //移动端300ms
// px to rem 插件
import 'lib-flexible'
import Mint from 'mint-ui';

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
  List
} from 'vant';

Vue.use(Dialog)
  .use(Uploader)
  .use(DatetimePicker)
  .use(Popup)
  .use(Swipe)
  .use(SwipeItem)
  .use(Toast)
  .use(Lazyload)
  .use(PullRefresh)
  .use(List)

// 300ms延迟
// fastclick.attach(document.body);

import 'mint-ui/lib/style.css'
Vue.use(Mint);


/*第一层if判断生产环境和开发环境*/
if (process.env.NODE_ENV === 'production') {
  /*第二层if，根据.env文件中的VUE_APP_FLAG判断是生产环境还是测试环境*/
  if (process.env.VUE_APP_FLAG === 'pro') {
    //production 生产环境
    axios.defaults.baseURL = 'http://m.news.qhiwi.com';

  } else {
    //test 测试环境
    axios.defaults.baseURL = 'http://120.78.158.34/';

  }
} else {
  //dev 开发环境
  // axios.defaults.baseURL = 'http://120.78.158.34/';
}


Vue.prototype.$http = axios
Vue.prototype.$fetch = fetch
Vue.prototype.$post = post

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  // console.log(to)
  // chrome
  // document.body.scrollTop = 0
  // // firefox
  // document.documentElement.scrollTop = 0
  // // safari
  // window.pageYOffset = 0
  next()
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')