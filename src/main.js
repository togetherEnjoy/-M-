import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import axios from 'axios'
import {fetch, post} from './utils/http'
import fastclick from 'fastclick';  //移动端300ms
// px to rem 插件
import 'lib-flexible'
import Mint from 'mint-ui';

// vant 组件
import 'vant/lib/index.css';
import {
  Dialog,
  Uploader,
  DatetimePicker ,
  Popup,
  Swipe,
  SwipeItem,
  Toast,
  Lazyload
} from 'vant';

Vue.use(Dialog).use(Uploader).use(DatetimePicker).use(Popup).use(Swipe).use(SwipeItem).use(Toast).use(Lazyload)

// 300ms延迟
// fastclick.attach(document.body);

import 'mint-ui/lib/style.css'
Vue.use(Mint);

Vue.prototype.$http = axios

Vue.prototype.$fetch = fetch
Vue.prototype.$post = post

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')