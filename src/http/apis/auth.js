import { POST } from '../index'

export const apiMenu = {
    getMenu(callback, params) {
        return POST('/api/permission/getMenu', callback, params)
    },
}
