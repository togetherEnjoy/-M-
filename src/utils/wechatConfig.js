import {
    fetch
} from '../utils/http'
import {
    logo
} from "../utils/config";

import wx from 'weixin-js-sdk'
import sha1 from 'sha1'

export const wechatAuth = async (authUrl, device, allowShare, shareTitle , detailsTitle, desc, imgUrl) => {
    console.log('authUrl:::::::::::',authUrl)
    console.log('您的设备是：' + device)
    let shareConfig = {
        title: detailsTitle  || shareTitle || '去海外',
        desc: desc ||  "去海外就上去海外网，全球跨境服务搜索平台。【去海外】",
        link: allowShare ? authUrl : window.location.origin,
        // link: 'http://testm.qhiwi.com',
        // imgUrl: window.location.origin + "/share.png"
        imgUrl: imgUrl || logo
    };

    console.log(shareConfig)
    console.log('window.entryUrl::::::::::',window.entryUrl)
    

    let authRes = await fetch("/dhr/wechat/jsapi/ticket", {
        reqUrl: decodeURIComponent(device == "ios" ? window.entryUrl : authUrl)
        // reqUrl: decodeURIComponent(authUrl)
        // reqUrl: 'https://www.baidu.com'
        // reqUrl: authUrl
    })

    console.log('获取appId和随机穿~',authRes.Result)

    if (authRes && authRes.ErrCode == '0000') {

        let noncestr = 'Wm3WZYTPz0wzccnW',
            timestamp = Date.parse(new Date()) / 1000,
            jsapi_ticket = authRes.Result.ticket,
            url =  window.location.href
        let string1 = `jsapi_ticket=${jsapi_ticket}&noncestr=${noncestr}&timestamp=${timestamp}&url=${url}`

        let signature = sha1(string1)
        // console.log(string1)

        wx.config({
            // debug: true,
            appId: authRes.Result.AppID,
            timestamp: Date.parse(new Date()) / 1000,
            nonceStr: noncestr,
            signature: signature,
            jsApiList: ["updateAppMessageShareData", "updateTimelineShareData", "onMenuShareAppMessage", "onMenuShareTimeline"]
        });

        wx.ready(() => {
            wx.updateAppMessageShareData({
                title: shareConfig.title,
                desc: shareConfig.desc,
                link: shareConfig.link,
                imgUrl: shareConfig.imgUrl,
                success: function () { //设置成功
                    //shareSuccessCallback();
                    console.log('updateAppMessageShareData：：：分享朋友成功')
                }
            });
            wx.updateTimelineShareData({
                title: shareConfig.title,
                link: shareConfig.link,
                imgUrl: shareConfig.imgUrl,
                success: function () { //设置成功
                    //shareSuccessCallback();
                    console.log('updateTimelineShareData：：：分享朋友圈成功')
                }
            });
            wx.onMenuShareTimeline({
                title: shareConfig.title,
                link: shareConfig.link,
                imgUrl: shareConfig.imgUrl,
                success: function () {
                    // shareSuccessCallback();
                    console.log('onMenuShareTimeline：：：分享朋友圈成功')
                }
            });
            wx.onMenuShareAppMessage({
                title: shareConfig.title,
                desc: shareConfig.desc,
                link: shareConfig.link,
                imgUrl: shareConfig.imgUrl,
                success: function () {
                    // shareSuccessCallback();
                    console.log('onMenuShareAppMessage：：：分享朋友成功')
                }
            });
        });
    }

}