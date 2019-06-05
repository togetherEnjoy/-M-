import Vue from 'vue'
import Router from 'vue-router'
// 热门
import hot from './views/hot/hot.vue'
import hotdetail from './views/hot/hot_detail.vue'
// 首页
import home from './views/home/home.vue'

// 房产
import house from './views/house/house.vue'
import housedetail from './views/house/house_detail.vue'
// 移民
import immig from './views/immigrant/immigrant.vue'
import immigdetail from './views/immigrant/immigrant_detail.vue'
// 留学
import study from './views/study/study.vue'
// import {
//   resolve
// } from 'path';
Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  linkActiveClass: 'active-c',
  routes: [
    {
      path: '/test',
      component: resolve => require(['./views/test.vue'], resolve)
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/home/house",
      name: 'house',
      component: house,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/home/house/:id",
      name: 'housedetail',
      component: housedetail,
    },
    {
      path: '/',
      redirect: '/news'
    },
    {
      path: '/news',
      name: 'news',
      component: hot,
      meta: {
        keepAlive: true,
        isBack: false
      },

      // children: [
      //   {
      //     path: 'newsd',
      //     name: 'hotdetail',
      //     component: hotdetail
      //   }
      // ]
    },

    {
      path: '/news/newsd',
      name: 'hotdetail',
      component: hotdetail,
      meta: {
        title: ''
      },

    },

    {
      path: '/home/immig',
      name: 'immig',
      component: immig,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/home/immig/detail',
      name: 'immigdetail',
      component: immigdetail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/home/immigmore',
      name: 'immigmore',
      component: resolve => require(['./views/immigrant/immigrant_more.vue'], resolve)
    },
    {
      path: '/home/study',
      name: 'study',
      component: study,
      children: [],
      meta: {
        keepAlive: true
      }
    },

    {
      path: '/home/study/:id',
      name: 'studydetail',
      component: resolve => require(['./views/study/study_detail.vue'], resolve)
    },
    {
      path: '/home/studymore',
      name: 'studymore',
      component: resolve => require(['./views/study/study_more.vue'], resolve)
    },
    {
      path: '/home/studytour',
      name: 'studytour',
      component: resolve => require(['./views/studytour/studytour.vue'], resolve),
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/home/studytour/:id',
      name: 'studytourdetail',
      component: resolve => require(['./views/studytour/studytour_detail.vue'], resolve)
    },
    {
      path: '/home/merchant',
      name: 'merchant',
      component: resolve => require(['./views/merchant/merchant.vue'], resolve)
    },





  ],


  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      console.log(savedPosition)
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
       console.log(document.body.scrollTop)
        from.meta.savedPosition = document.body.scrollTop;
        // console.log(from.meta.savedPosition)
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }

})