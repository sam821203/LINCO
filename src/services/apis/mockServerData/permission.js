import Mock from 'mockjs'

export default {
    getMenuData(config) {
        console.log('config', config)
        const { username, password } = JSON.parse(config.body)

        if (username === 'admin' && password === 'admin') {
            return {
                code: 200,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            component: 'HomeView',
                        },
                        {
                            path: '/about',
                            name: 'about',
                            component: 'AboutView',
                        },
                        {
                            path: '/mock',
                            name: 'mock',
                            component: 'MockView',
                        },
                        {
                            path: '/filter-function',
                            name: 'filterFunction',
                            component: 'FilterFunctionView',
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: 'success',
                },
            }
        } else if (username === 'chand' && password === 'chand') {
            return {
                code: 200,
                data: {
                    menu: [
                        {
                            path: '/home',
                            name: 'home',
                            component: 'HomeView',
                        },
                        {
                            path: '/about',
                            name: 'about',
                            component: 'AboutView',
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: 'success',
                },
            }
        } else {
            return {
                code: 400,
                data: {
                    message: '用户名或密碼錯誤',
                },
            }
        }
    },
}
