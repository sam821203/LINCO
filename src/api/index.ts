import axios from 'axios'
import { ElMessage } from 'element-plus'

const axiosDefaults = {
  headers: {
    'content-type': 'application/json'
  },
  timeout: 120000,
  baseURL: import.meta.env.VITE_APP_BASE_API
}

const apiInstance = axios.create(axiosDefaults)

// 請求前攔截器
// 給伺服器端帶去的公共參數放這
const beforeRequest = (config) => {
  // 進度條開始啟動
  return config
}

// 回傳成功攔截器
const responseSuccess = (response) => {
  // 進度條結束
  return response.data.data
}

// 回傳失敗攔截器，用來處理 http 網路錯誤
const responseFailed = (error) => {
  let message = ''
  const status = error.response.status
  switch (status) {
    case 401:
      message = 'Token 過期'
      break
    case 403:
      message = '無權限訪問網站'
      break
    case 404:
      message = '請求地址錯誤'
      break
    case 500:
      message = '司服器出現問題'
      break
    default:
      message = '網路出現問題'
      break
  }

  // 提示錯誤訊息
  ElMessage({
    type: 'error',
    message
  })

  return Promise.reject(error)
}

apiInstance.interceptors.request.use(beforeRequest)
apiInstance.interceptors.response.use(responseSuccess, responseFailed)

export default apiInstance
