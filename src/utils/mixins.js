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

            allListData: [],
            result_data: {}
        }
    },
    methods: {
        // 获取list数据
        getAllList(box) {
            let params = {
                page: this.page,
                limit: this.limit
            };
            if (box) {
                let data = {};
                for (let k in box) {
                    data[k] = box[k].id;
                }
                params = Object.assign(params, data);
            }
            setTimeout(() => {
                this.$fetch(this.url, params).then(res => {
                    if (res.ErrCode == "0000") {
                        this.allListData = this.allListData.concat(res.Result.data);
                        console.log(this.allListData)
                        this.count = res.Result.count / 1;
                        // console.log('count-----' + this.count)
                        // console.log("data----" + this.allListData.length)
                        this.loading = false;
                        if (this.allListData.length >= this.count) {
                            this.finished = true;
                            console.log("无更多数据");
                        } else {
                            this.finished = false
                        }
                        this.page++;
                    }
                });
            }, 500);
        },

        get_result(data) {
            this.result_data = data;
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
                }, 4000);
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
                    this.count = res.Result.count;
                    this.merchant_data = res.Result.data;
                    console.log(this.merchant_data);



                    this.simpleName = this.merchant_data[0].merchantName;
                    this.head_img = this.merchant_data[0].img;
                    this.hot = this.merchant_data[0].hot;
                }
            });
        },
    }
}