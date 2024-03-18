import './assets/main.css'
import 'element-plus/dist/index.css'
import '@/styles/index.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import ElementPlus from 'element-plus'

// svg 配置
import 'virtual:svg-icons-register'

// 引入自定義全局組件
import globalComponent from '@/components'

//@ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn
})
app.use(globalComponent)
app.use(createPinia())
app.use(router)

app.mount('#app')
