import { POST, GET } from '../index'

export const apiMenu = {
    getMenu(params, callback) {
        return POST('/api/permission/getMenu', params, callback)
    },
}
// requestBase 寫在前面當參數
// export const apiGetMac = (params, callback) => {
//     return GET(`/cpi/bcrm-sso`, callback, params)
// }

// export const apiSignIn = (params, callback) => {
//     console.log('123')
//     return POST(`/cpi/auth/login-sso`, callback, params)
// }
