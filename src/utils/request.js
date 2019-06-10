import axios from 'axios'
// import { Message } from 'element-ui'
import {
    Toast
} from 'vant'

// import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
    baseURL: process.env.BASE_API, // api 的 base_url
    // baseURL: 'localhost:8888',
    timeout: 10000, // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
    config => {
        // if (getToken()) {
        //     config.headers['X-Token'] = getToken()
        // }
        // console.log(config)
        return config
    },
    error => {
        // console.log(error)
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(response => {
        const res = response.data
        console.log(res)
        if (res.ErrCode != '0000') {
            console.log(res)
            // Message({
            //     message: res.msg,
            //     type: 'error',
            //     duration: 5 * 1000
            // })
            Toast.fail('失败文案')
            return Promise.reject('error log')
        } else {
            return response.data
        }
    },
    error => {
        console.log('err' + error) // for debug
        // Message({
        //     message: error.message,
        //     type: 'error',
        //     duration: 5 * 1000
        // })

        return Promise.reject(error)
    }
)


export function fetch(url, params = {}) {
    return new Promise((resolve, reject) => {
        service.get(url, {
                params: params
            }).then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        service.post(url, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err)
            })
    })
}


export default service