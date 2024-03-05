import { GET } from '../index'

export const apiResponsible = {
    getResponsible(callback, params) {
        return GET('/bpi', callback, params)
    },
}
