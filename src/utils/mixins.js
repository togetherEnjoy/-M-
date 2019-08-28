export const mixins = {
    data() {
        return {
            result_data: []
        }
    },
    methods: {

    }
}

export const phone = {
    data() {
        return {
            phone: `400-877-1008`
        }
    }
}


/** 
 * 数据筛选项
 *
 * */

import {
    SEOConfig
} from './config'
import {
    mapGetters
} from "vuex";

export const screen_data = {

    metaInfo() {
        if (!this.canmetaInfo) return

        console.log(SEOConfig[this.$options.name].title)
        return {
            title: SEOConfig[this.$options.name].title,
            meta: [{
                    name: "keywords",
                    content: SEOConfig[this.$options.name].keywords
                },
                {
                    name: "description",
                    content: SEOConfig[this.$options.name].description
                }
            ]
        };
    },
    data() {
        return {
            page: 1,
            limit: 10,
            count: "",
            loading: false,
            finished: false,
            merchant_id: '',

            allListData: [],
            result_data: {},

            // 刷新筛选组件
            comReferer: true,

            // 
            homeTop: 0,
            // 设置国家英文
            letter: '',
            canmetaInfo: true,
        }
    },
    created() {
        this.isFirstEnter = true
        this.firstOnload = true
        // this.getAllList()
    },
    computed: {
        cityJx() {
            return this.cityJX
        },
        ...mapGetters(['cityJX'])
    },

    activated() {
        console.log(this.letter)
        console.log('activated执行')
        this.merchant_id = this.$route.query.merchant_id ? this.$route.query.merchant_id : false
        if (!this.$route.meta.isBack || this.isFirstEnter) {
            console.log('isFirstEnterde')
            this.loading = true
            if (!this.firstOnload) {
                console.log('firstOnload')
                this.allListData = []
                this.page = 1
                this.getAllList()
            }
        } else {
            this.loading = false

        }
        this.finished = false
        this.firstOnload = false
        this.$route.meta.isBack = false
        this.isFirstEnter = false
    },

    beforeRouteEnter(to, from, next) {
        // console.log(from);
        // console.log(to);

        if (from.name == "merchant") {
            next(vm => {
                vm.url = vm.merchantUrl
            });
        }

        if (from.meta.details && to.meta.keepAlive) {
            to.meta.isBack = true
            next()
        }

        if (from.meta.homePage) {
            next(vm => {
                document.title = vm.HTMLTITLE
                vm.merchant_id = false
                vm.url = vm.url
                vm.reload()
            })
        }

        next((vm) => {

        })
    },
    beforeRouteLeave(to, from, next) {
        if (sessionStorage.getItem('merchant_id')) {
            sessionStorage.removeItem('merchant_id')
        }

        let app = document.getElementById('app')
        this.homeTop = app.scrollTop || 0
        console.log(this.homeTop)
        document.body.style.overflow = 'initial'
        next()
    },
    methods: {
        reload() {
            console.log('刷新')
            this.comReferer = false;
            this.$nextTick(() => (this.comReferer = true));
        },
        // 获取list数据
        getAllList(box) {
            console.log(box)
            let params = {
                page: this.page,
                limit: this.limit,
                by: "index_1",
                sort: "index_1",
            };
            if (box) {
                // console.log(box)
                let data = {};
                for (let k in box) {
                    data[k] = box[k].id;
                }
                params = Object.assign(params, data);

            }

            const mid = this.merchant_id

            if (mid) {
                params = Object.assign(params, {
                    merchant_id: mid
                })
            }

            if (this.$route.query.id) {
                Object.assign(params, {
                    'hostCountryNum': this.$route.query.id
                })
            }
            console.log(params)

            setTimeout(() => {
                this.$fetch(this.url, params).then(res => {
                    if (res.ErrCode == "0000") {
                        this.allListData = this.allListData.concat(res.Result.data);
                        console.log(this.allListData)
                        this.count = res.Result.count / 1;


                        console.log('count-----' + this.count)
                        // console.log("data----" + this.allListData.length)
                        this.loading = false;
                        this.page++;
                        if (this.allListData.length >= this.count) {
                            this.finished = true;

                            console.log("无更多数据");
                        } else {
                            this.finished = false
                        }

                    }
                });
            }, 500);
        },

        get_result(data, letter) {
            this.result_data = data;
            this.page = 1;
            /**
             * 设置国家路由名词
             */
            console.log(letter)
            this.letter = letter
        },

        empty(e) {
            let text = e.target.parentNode.parentNode;
            const type = text.getAttribute("typed");
            if (type in this.result_data) {
                this.$delete(this.result_data, type);
            }
            if (Object.keys(this.result_data).length == 1 && Object.keys(this.result_data)[0] == 'hostCountryNum') {
                this.result_data = {}
            }
            this.$children[0].sendObj = this.result_data;
            // 筛选数据
            this.page = 1;
            this.allListData = [];
            this.getAllList(this.result_data);
        },
        emptyall() {

            this.result_data = {}
            this.$children[0].sendObj = this.result_data;
            // 筛选数据
            this.page = 1;
            this.allListData = [];
            this.loading = false
            // this.finished = false
            this.getAllList(this.result_data);
        },


    }
}


/**
 * 
 * 移民、留学刷新供应商
 * 
 *  */

export const referer = {
    data() {
        return {
            count: null,
            page: 1,
            limit: 4,
            canReferer: true,
            referer_can: true,
            merchant_data: [],
            simpleName: '',
            head_img: '',
            hot: ''
        }
    },
    methods: {
        // 换一换
        referer() {

            const change = this.$refs.change;
            if (this.referer_can) {
                this.referer_can = false;
                change.classList.add("refe");
                if (this.page * this.limit >= this.count) {
                    this.$toast('无更多数据')
                    return
                }
                this.getMerchantData();
                this.page++;
                setTimeout(() => {
                    change.classList.remove("refe");
                    this.referer_can = true;
                }, 1000);
            }
        },
        // 供应商
        getMerchantData() {
            this.$fetch(this.refererURL, this.mer_params()).then(res => {
                if (res.ErrCode == "0000") {
                    console.log(res.Result)
                    this.count = res.Result.count;
                    this.merchant_data = res.Result.data;
                    console.log(this.merchant_data);

                    if (this.merchant_data.length > 0) {
                        this.simpleName = this.merchant_data[0].simpleName || '';
                        this.head_img = this.merchant_data[0].headPortrait || '';
                        this.hot = this.merchant_data[0].actualNumber;
                    }
                }
            });
        },
        // self merchant
        mer_params() {
            let merchant = this.$route.query.merchant_id
            if (merchant) {
                return {
                    id: this.id,
                    page: this.page,
                    limit: this.limit,
                    merchant_id: merchant,
                    sort: "index_1"
                }
            }
            return {
                id: this.id,
                page: this.page,
                limit: this.limit,
                sort: "index_1"
            }
        }
    }
}


// 点击率
export const clickRate = {
    methods: {
        clickRate(id) {
            this.$fetch('dhr/client/merchant_number', {
                id
            }).then(res => {
                console.log(res)
            })
        }
    }
}

// 设置国家路由
export const setCountryMode = {
    computed: {
        cityJx() {
            return this.cityJX
        },
        ...mapGetters(['cityJX'])
    },
}

// 微信分享缓存shareTitle sessionStorage

import {
    wechatAuth
} from "./wechatConfig";
export const setShareTitle = {
    data() {
        return {
            desc: {
                housed: `汇集全球房源，100%真实房源，行业资深顾问为您服务。`,
                immigd: `互联网海外服务平台，提供技术移民、投资移民、家属移民、留学移民等专业靠谱移民机构首选。`,
                studyd: `涵盖美国留学、英国留学、加拿大留学、澳新留学、欧亚留学等国家"一站式"留学服务。`,
                studytourd: `链接全球优质教育资源，与全球名校、名企直接对话!平台精心挑选,找到适合您的国际游学项目!
              `
            }
        }
    },
    methods: {
        // 通用
        iosTitleImg(title, desc, img, id = 8) {
            console.log(process.env.NODE_ENV)
            let dumain = process.env.NODE_ENV == 'production' ? 'http://testm.qhiwi.com' : 'http://testm.qhiwi.com'
            let authUrl = dumain + '/dhr/wechat/authorize?url=' + window.location.href + '&merchant_id=' + id;
            let allowShare = true;
            let sendUrl

            // 通用
            if (!!window.__wxjs_is_wkwebview) {
                // IOS
                if (window.entryUrl == "" || window.entryUrl == undefined) {
                    window.entryUrl = authUrl; // 将后面的参数去除
                }
                wechatAuth(authUrl, "ios", allowShare, null, title, desc, img);
            } else {
                // 安卓
                setTimeout(function () {
                    wechatAuth(authUrl, "android", allowShare, null, title, desc, img);
                }, 100);
            }


        }

    },
}