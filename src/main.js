import './assets/main.css'
// Import icon libraries
import '@quasar/extras/material-icons/material-icons.css'
// Import Quasar css
import 'quasar/src/css/index.sass'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar, Notify } from 'quasar'
import App from './App.vue'
import router from './router'
import './services/apis/mock'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Quasar, {
    plugins: {
        Notify,
    },
})

app.mount('#app')
