import apiInstance from '..'
import type { loginForm, loginResponse, userResponseData } from './type'

enum API {
  LOGIN_URL = 'user/login',
  USERINFO_URL = 'user/info'
}

// 登入 API
export const reqLogin = (data: loginForm) => {
  // 请求的参数可以是任意类型的数据（any），而返回的数据必须符合 loginResponse 类型定义
  return apiInstance.post<any, loginResponse>(API.LOGIN_URL, data)
}

// 取得用戶訊息 API
export const reqUserInfo = () => {
  return apiInstance.get<userResponseData>(API.USERINFO_URL)
}
