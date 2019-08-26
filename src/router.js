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

import state from './store/state'
import {
  SEOConfig,
  hotModel
} from './utils/config'
Vue.use(Router)
console.log(state.cityJX)

let citys = JSON.parse(sessionStorage.getItem('vuex')) ? JSON.parse(sessionStorage.getItem('vuex')).cityJX : state.cityJX
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkActiveClass: 'active-c',
  routes: [{
      path: '/test',
      component: resolve => require(['./views/test.vue'], resolve)
    },
    // 登录
    {
      path: '/:city/in',
      name: 'in',
      component: resolve => require(['./views/login/personal.vue'], resolve),
      // redirect:'/:city/login/reg',
    },
    {
      path: '/:city/login',
      component: resolve => require(['./views/login/register.vue'], resolve)
    },
    // 编辑个人信息
    {
      path: '/:city/edit',
      component: resolve => require(['./views/login/editPersonal.vue'], resolve)
    },
    // 编辑姓名
    {
      path: '/:city/nickname',
      component: resolve => require(['./views/login/c_name.vue'], resolve)
    },

    // 活动
    {
      path: '/:city/hwhd',
      component: resolve => require(['./views/hd/index.vue'], resolve)
    },
    {
      path: `/:city`,
      name: 'home',
      component: home,
      meta: {
        keepAlive: true,
        homePage: true,
        allowShare: true,
        shareTitle: SEOConfig.home.title
      }
    },
    {
      path: `/:city/house`,
      name: 'house',
      component: house,
      meta: {
        keepAlive: true,
        allowShare: true,
        shareTitle: SEOConfig.house.title
      }
    },
    {
      path: "/:city/house/details",
      name: 'housedetail',
      component: housedetail,
      meta: {
        details: true,
        allowShare: true,
      }
    },
    {
      path: `/:city/house/:country`,
      name: 'house',
      component: house,
      meta: {
        keepAlive: true,
        allowShare: true,
        shareTitle: SEOConfig.house.title
      }
    },

    {
      path: "/:city/house/:country/details",
      name: 'housedetail',
      component: housedetail,
      meta: {
        details: true,
        allowShare: true
      }
    },
    {
      path: '/',
      redirect: `/${citys}`,
      meta: {
        allowShare: true,
        shareTitle: SEOConfig.home.title
      }
    },

    {
      path: '/:city/news/:other/newsd',
      name: 'hotdetail',
      component: hotdetail,
      meta: {
        title: '',
        allowShare: true
      },

    },
    {
      path: '/:city/news/newsd',
      name: 'hotdetail',
      component: hotdetail,
      meta: {
        title: '',
        allowShare: true
      },

    },
    {
      path: '/:city/news',
      name: 'news',
      component: hot,
      meta: {
        keepAlive: true,
        isBack: false,
        allowShare: true,
        shareTitle: hotModel.hours.title
      },
    },
    {
      path: '/:city/news/:country',
      name: 'news',
      component: hot,
      meta: {
        keepAlive: true,
        isBack: false,
        allowShare: true,
        shareTitle: hotModel.hours.title
      },
    },
    {
      path: '/:city/immig/detail',
      name: 'immigdetail',
      component: immigdetail,
      meta: {
        details: true,
        allowShare: true,

      }
    },
    {
      path: '/:city/immig/:country/detail',
      name: 'immigdetail',
      component: immigdetail,
      meta: {
        details: true,
        allowShare: true
      }
    },

    {
      path: '/:city/immig',
      name: 'immig',
      component: immig,
      meta: {
        keepAlive: true,
        allowShare: true,
        shareTitle: SEOConfig.immigrant.title
      }
    },
    {
      path: '/:city/immig/:country',
      name: 'immig',
      component: immig,
      meta: {
        keepAlive: true,
        allowShare: true,
        shareTitle: SEOConfig.immigrant.title
      }
    },

    {
      path: '/:city/immigmore',
      name: 'immigmore',
      component: resolve => require(['./views/immigrant/immigrant_more.vue'], resolve),
      meta: {
        allowShare: true
      }
    },
    {
      path: '/:city/study',
      name: 'study',
      component: study,
      meta: {
        keepAlive: true,
        allowShare: true,
        shareTitle: SEOConfig.study.title
      }
    },

    {
      path: '/:city/study/detail',
      name: 'studydetail',
      component: resolve => require(['./views/study/study_detail.vue'], resolve),
      meta: {
        details: true,
        allowShare: true
      }
    },
    {
      path: '/:city/study/:country/detail',
      name: 'studydetail',
      component: resolve => require(['./views/study/study_detail.vue'], resolve),
      meta: {
        details: true,
        allowShare: true
      }
    },

    {
      path: '/:city/study/:country',
      name: 'study',
      component: study,
      meta: {
        keepAlive: true,
        allowShare: true,
        shareTitle: SEOConfig.study.title
      }
    },



    {
      path: '/:city/studymore',
      name: 'studymore',
      component: resolve => require(['./views/study/study_more.vue'], resolve),
      meta: {
        allowShare: true
      }
    },

    {
      path: '/:city/studytour/detail',
      name: 'studytourdetail',
      component: resolve => require(['./views/studytour/studytour_detail.vue'], resolve),
      meta: {
        details: true,
        allowShare: true
      }
    },

    {
      path: '/:city/studytour/:country/detail',
      name: 'studytourdetail',
      component: resolve => require(['./views/studytour/studytour_detail.vue'], resolve),
      meta: {
        details: true,
        allowShare: true
      }
    },
    {
      path: '/:city/studytour',
      name: 'studytour',
      component: resolve => require(['./views/studytour/studytour.vue'], resolve),
      meta: {
        keepAlive: true,
        allowShare: true,
        shareTitle: SEOConfig.studytour.title
      }
    },
    {
      path: '/:city/studytour/:country',
      name: 'studytour',
      component: resolve => require(['./views/studytour/studytour.vue'], resolve),
      meta: {
        keepAlive: true,
        allowShare: true,
        shareTitle: SEOConfig.studytour.title
      }
    },

    {
      path: '/:city/merchant',
      name: 'merchant',
      component: resolve => require(['./views/merchant/merchant_change.vue'], resolve),
      meta: {
        keepAlive: false,
        allowShare: true
      }
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