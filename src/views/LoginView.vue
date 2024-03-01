<script setup>
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { apiMenu } from '../http/apis/auth'

import Mock from 'mockjs'
import Cookie from 'js-cookie'

const $q = useQuasar()
const router = useRouter()

const name = ref(null)
const password = ref(null)
const accept = ref(false)

// 使用 apiMenu.getMenu

const onSubmit = () => {
    if (accept.value !== true) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first',
        })
    } else {
        $q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted',
        })
    }
}

const onReset = () => {
    name.value = null
    password.value = null
    accept.value = false
}

const login = () => {
    const token = Mock.Random.guid()
    // 將 token 存入 cookie，用於不同頁面的驗證
    Cookie.set('token', token)
    // 跳轉到首頁
    router.push('/')
}
</script>

<template>
    <div class="login-container q-pa-md" style="max-width: 400px">
        <h6>登入系統</h6>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
            <q-input
                filled
                v-model="name"
                label="Your name *"
                hint="Name and surname"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please type something']"
            />

            <q-input
                filled
                type="password"
                v-model="password"
                label="Your password *"
                lazy-rules
                :rules="[(val) => (val !== null && val !== '') || 'Please type your password']"
            />

            <q-toggle v-model="accept" label="I accept the license and terms" />

            <div>
                <q-btn label="登入" type="submit" color="primary" @click="login" />
                <q-btn label="清除" type="reset" color="primary" flat class="q-ml-sm" />
            </div>
        </q-form>
    </div>
</template>

<style scoped>
h6 {
    margin: 0;
    margin-bottom: 24px;
}
.login-container {
    width: 480px;
    margin: 180px auto;
    border-radius: 6px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: #fff;
}
</style>
