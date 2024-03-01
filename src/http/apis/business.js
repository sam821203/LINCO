import { GET } from '../index'

export const apiBusiness = {
    getBusinessItem(callback, params) {
        return GET('/api', callback, params)
    },
    getMockData(callback, params) {
        return GET('/api/home/getData', callback, params)
    },
    getFilterFunction(callback, params) {
        return GET('/cpi/api/permissions/roles/filter-function', callback, params)
    },
}
