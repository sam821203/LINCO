import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'

const about = () => import('../views/AboutView.vue')
const mock = () => import('../views/MockView.vue')
const filterFunction = () => import('../views/FilterFunctionView.vue')

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/about',
            name: 'about',
            component: about,
        },
        {
            path: '/mock',
            name: 'mock',
            component: mock,
        },
        {
            path: '/filter-function',
            name: 'filterFunction',
            component: filterFunction,
        },
    ],
})

export default router
