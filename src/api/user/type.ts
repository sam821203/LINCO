// 登入參數型別
export interface loginForm {
  username: string
  password: string
}

interface dataType {
  token: string
}

// 登入回傳型別
export interface loginResponse {
  code: number
  data: dataType
}

interface userInfo {
  userId: number
  avatar: string
  username: string
  password: string
  desc: string
  roles: string[]
  buttons: string[]
  routes: string[]
  token: string
}

interface user {
  checkUser: userInfo
}

// 定義司服器端回傳的相關資料型別
export interface userResponseData {
  code: number
  data: user
}
