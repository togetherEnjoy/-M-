export const mixins = {
    data() {
        return {
            result_data: []
        }
    },
    methods: {

    }
}


/** 
 * 数据筛选项
 *
 * */

export const screen_data = {
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

            // 刷新
            comReferer: true,
        }
    },
    created() {
        this.isFirstEnter = true
        this.firstOnload = true
    },

    activated() {
        this.result_data = {}
        console.log('activated执行')
        this.merchant_id = this.$route.query.merchant_id ? this.$route.query.merchant_id : false

        // console.log(this.merchant_id)
        if (!this.$route.meta.isBack || this.isFirstEnter) {
            this.loading = true
            if (!this.firstOnload) {
                this.allListData = []
                this.page = 1
                this.onLoad()
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
                vm.merchant_id = false
                vm.url = vm.url
                vm.reload()
            })
        }



        next(
            vm => {
                vm.reload()

            }
        )
    },
    beforeRouteLeave(to, from, next) {

        if (sessionStorage.getItem('merchant_id')) {
            sessionStorage.removeItem('merchant_id')
        }

        document.body.style.overflow = 'initial'
        next()
    },
    methods: {
        reload() {
            this.comReferer = false;
            this.$nextTick(() => (this.comReferer = true));
        },
        // 获取list数据
        getAllList(box) {
            // console.log(box)
            let params = {
                page: this.page,
                limit: this.limit
            };
            if (box) {
                // console.log(box)
                let data = {};
                for (let k in box) {
                    data[k] = box[k].id;
                }
                params = Object.assign(params, data);
                // console.log(params)
            }

            const mid = this.merchant_id

            if (mid) {
                params = Object.assign(params, {
                    merchant_id: mid
                })
            }

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

        get_result(data) {
            this.result_data = data;
            // console.log(this.result_data)
            this.page = 1;
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
            if (!this.canReferer) return
            const change = this.$refs.change;
            if (this.referer_can) {
                this.referer_can = false;
                change.classList.add("refe");
                if (this.page * this.limit >= this.count) {
                    this.$toast('无更多数据')
                    this.canReferer = false
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
            this.$fetch(this.refererURL, {
                id: this.id,
                page: this.page,
                limit: this.limit
            }).then(res => {
                if (res.ErrCode == "0000") {
                    console.log(res.Result)
                    this.count = res.Result.count;
                    this.merchant_data = res.Result.data;
                    console.log(this.merchant_data);

                    if (this.merchant_data.length > 0) {
                        this.simpleName = this.merchant_data[0].companyName || '';
                        this.head_img = this.merchant_data[0].headPortrait || '';
                        this.hot = this.merchant_data[0].actualNumber;
                    }
                }
            });
        },
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