import Cookie from 'js-cookie'
import router from '@/router'

export default {
    authorize() {
        // 前置導航守衛
        router.beforeEach((to, from, next) => {
            // 用 token 來判斷是否有登入
            const token = Cookie.get('token')
            // 如果不存在，代表用戶未登入，需導向登入頁
            // 也需要判斷說當前是否在登入頁，才不會無限循環
            if (!token && to.name !== 'login') {
                next({ name: 'login' })
            }
            // 如果存在，代表用戶已登入，應避免再次進入登入頁
            else if (token && to.name === 'login') {
                next({ name: 'home' })
            }
            // 其他情況，代表用戶已登入，且不在登入頁，可以放行
            else {
                next()
            }
        })
    },
}
