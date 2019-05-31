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
            // console.log('获取数据:')
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