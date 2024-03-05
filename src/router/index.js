import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import Layout from '../views/layout/Layout.vue'
import Auth from './auth'

const about = () => import('../views/AboutView.vue')
const mock = () => import('../views/MockView.vue')
const filterFunction = () => import('../views/FilterFunctionView.vue')

export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/',
            name: 'main',
            redirect: '/home',
            component: Layout,
            children: [
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
        },
    ],
})

export default router

Auth.authorize()
