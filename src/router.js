import Vue from 'vue'
import Router from 'vue-router'
// 热门
import hot from './views/hot/hot.vue'
import hotdetail from './views/hot/hot_detail.vue'
// 首页
import home from './views/home/home.vue'

import test from './components/test.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active-c',
  routes: [
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path: '/',
      redirect: '/news'
    },
    {
      path: '/news',
      name: 'news',
      component: hot,
      children: [
        {
          path: 'newsd',
          name: 'hotdetail',
          component: hotdetail
        }
      ]
    }
    
    // 热门
    // {
    //   path: '/news',
    //   name: 'news',
    //   component: hot,
    //   children: [
    //     {
    //       path: ':id',
    //       name: 'hotdetail',
    //       component: hotdetail
    //     }
    //   ]
    // },
    


  ]
})