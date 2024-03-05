import axios from 'axios'
import Cookie from 'js-cookie'

const axiosDefaults = {
    headers: {
        'content-type': 'application/json',
    },
    timeout: 120000,
    // baseURL: '/cpi',
}

const apiInstance = axios.create(axiosDefaults)

// 請求前攔截器
const beforeRequest = (config) => config

// 請求中網路連線錯誤
const requestFailed = (error) => Promise.reject(error)

const successhandler = {
    200: (res) => {
        const data = res?.data
        if (!data) throw new Error('API Error. No data!')
        return data
    },
}

// 回傳成功攔截器
const responseSuccess = (response) => successhandler[response.status](response)

const errorhandler = {
    401: () => '您未登錄，或登入已逾時，請先登入！',
    404: () => '找不到資源！',
    500: () => '伺服器內部錯誤！',
    default: () => '系統異常，請重新登入！',
}

// 回傳失敗攔截器
const responseFailed = (error) => {
    if (error && error.response) {
        const config = error?.config
        const status = error.response.status || 'default'
        const errorMsg = errorhandler[status](error.response)
        // 確認是否手動修改錯誤訊息
        return config.raw ? Promise.reject(error.message) : Promise.reject(new Error(errorMsg))
    }
}

apiInstance.interceptors.request.use(beforeRequest, requestFailed)
apiInstance.interceptors.response.use(responseSuccess, responseFailed)

export const GET = (name, callback, params) => {
    const data = new URLSearchParams(params).toString()
    const url = data ? `${name}?${data}` : name
    return apiInstance
        .get(url, {
            // data,
            // requireBase: 'AA',
            // headers: {
            //     'X-Auth-token': 'fd091a4321c9d42d5f0ed817d7e90ed7c82820ab1011864c40034559274713b1',
            // },
            raw: false,
        })
        .then((response) => {
            if (callback) callback(response)
        })
        .catch((error) => {
            throw error
        })
}

export const POST = (name, data) => {
    return apiInstance
        .post(name, data)
        .then((response) => {
            // TODO: 整理放置 token 的位置
            Cookie.set('token', response.token, {
                expires: 1,
            })
        })
        .catch((error) => {
            throw error
        })
}
