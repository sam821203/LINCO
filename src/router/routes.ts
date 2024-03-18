import HomeView from '../views/HomeView.vue'

const loginView = () => import('../views/LoginView.vue')
const ErrorView = () => import('../views/ErrorView.vue')

export const constantRoute = [
  {
    path: '/',
    name: 'layout',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: loginView
  },
  {
    path: '/error',
    name: 'error',
    component: ErrorView
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/error',
    name: 'Any'
  }
]
