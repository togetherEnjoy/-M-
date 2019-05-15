import wx from 'weixin-js-sdk'
import * as http from '../utils/http'
import sha1 from 'sha1'

const wxApi = {
    /**
     * [wxRegister 微信Api初始化]
     * @param  {Function} callback [ready回调函数]
     */
    wxRegister(callback) {
        // 这边的接口请换成你们自己的
        http.fetch('/dhr/wechat/jsapi/ticket', {
            reqUrl: window.location.href
        }).then((res) => {
            console.log(res)
           // PS: 这里根据你接口的返回值来使用
           let noncestr = 'Wm3WZYTPz0wzccnW',
           timestamp = new Date().getTime(),
           jsapi_ticket = res.Result.ticket,
           url = location.href.split('#')[0]

            let string1 = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`
            
            let signature = sha1(string1)
           console.log(signature)
            wx.config({
                debug: false, // 开启调试模式
                appId: res.AppID, // 必填，公众号的唯一标识
                timestamp: timestamp, // 必填，生成签名的时间戳
                nonceStr: noncestr, // 必填，生成签名的随机串
                signature: signature, // 必填，签名，见附录1
                jsApiList: [
                    'onMenuShareTimeline',
                    'onMenuShareAppMessage'
                ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            })
        }).catch((error) => {
            console.log(error)
        })
        wx.ready((res) => {
            // 如果需要定制ready回调方法
            if (callback) {
                callback()
            }
        })
    },
    /**
     * [ShareTimeline 微信分享到朋友圈]
     * @param {[type]} option [分享信息]
     * @param {[type]} success [成功回调]
     * @param {[type]} error   [失败回调]
     */
    ShareTimeline(option) {
        wx.onMenuShareTimeline({
            title: option.title, // 分享标题
            link: option.link, // 分享链接
            imgUrl: option.imgUrl, // 分享图标
            success() {
                // 用户成功分享后执行的回调函数
                option.success()
            },
            cancel() {
                // 用户取消分享后执行的回调函数
                option.error()
            }
        })
    },
    /**
     * [ShareAppMessage 微信分享给朋友]
     * @param {[type]} option [分享信息]
     * @param {[type]} success [成功回调]
     * @param {[type]} error   [失败回调]
     */
    ShareAppMessage(option) {
        wx.onMenuShareAppMessage({
            title: option.title, // 分享标题
            desc: option.desc, // 分享描述
            link: option.link, // 分享链接
            imgUrl: option.imgUrl, // 分享图标
            success() {
                // 用户成功分享后执行的回调函数
                option.success()
            },
            cancel() {
                // 用户取消分享后执行的回调函数
                option.error()
            }
        })
    }
}
export default wxApi