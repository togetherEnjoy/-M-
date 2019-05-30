export const http = {
    method: 'get',
    baseURL: 'http://120.78.158.34/',
    // 请求头信息
    headers: {
        'Content-Type': 'application/json;charset=UTF-8'
    },
    timeout: 6000,
    // 跨域
    withCredentials: true,
    responseType: 'json'
}

export const BSConfigX = {
    scrollX: true,
    eventPassthrough: "vertical",
    bounceTime: 400,
    click: true,
}

export const BSConfigY = {
    // eventPassthrough: "vertical",
    bounceTime: 400,
    click: true
}