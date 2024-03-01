import axios from 'axios'

const axiosDefaults = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        Accept: 'application/json',
        timeout: 120000,
    },
}

const apiInstance = axios.create(axiosDefaults)

// 請求前攔截器
const beforeRequest = (config) => config

// 請求中網路連線錯誤
const requestFailed = (error) => Promise.reject(error)

// 處理成功 status：201/202...
const successhandler = {
    200: (res) => {
        const data = res?.data
        if (!data) throw new Error('API Error. No data!')
        return data
    },
}

// 回傳成功攔截器
const responseSuccess = (response) => {
    const config = response?.config
    if (config.raw) return response
    if (200 <= response.status && response.status < 300) {
        return successhandler[response.status](response)
    }
    throw new Error('API Error! Invalid status code!')
}

const errorhandler = {
    401: () => '您未登錄，或登入已逾時，請先登入！',
    404: () => '您未登錄，或登入已逾時，請先登入！',
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
    const url = params ? `${name}?${new URLSearchParams(params).toString()}` : name
    return apiInstance
        .get(url, { raw: false })
        .then((response) => {
            if (callback) callback(response)
        })
        .catch((error) => {
            throw error
        })
}

export const POST = (name, callback, params) => {
    const url = params ? `${name}?${new URLSearchParams(params).toString()}` : name
    return apiInstance
        .post(url, { raw: false })
        .then((response) => {
            if (callback) callback(response)
        })
        .catch((error) => {
            throw error
        })
}
