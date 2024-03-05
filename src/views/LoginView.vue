<script setup>
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { reactive, ref, onMounted } from 'vue'
import { apiMenu, apiGetMac, apiSignIn } from '../services/apis/auth'
import { useStore } from '../stores/index'

const $q = useQuasar()
const router = useRouter()

const accept = ref(false)
const myForm = ref(null)
const macCode = ref(null)
const formData = reactive({
    username: '',
    password: '',
})

const getMenu = useStore().useMenuStore()

const change = (num) => {
    // 批樣修改方式
    // getMenu.$patch(() => {
    //     getMenu.count++
    // })
    getMenu.setCount(num)
}

const signIn = (userObj) => {
    apiSignIn(userObj, (result) => {
        console.log('result: ', result)
    })
}

const devGetMac = (uid) => {
    apiGetMac(uid, (result) => {
        macCode.value = result
        const userObj = {
            uid: formData.username,
            mac: macCode.value,
        }

        signIn(userObj)
    })
}

const onSubmit = async () => {
    if (accept.value !== true) {
        $q.notify({
            color: 'red-5',
            textColor: 'white',
            icon: 'warning',
            message: 'You need to accept the license and terms first',
        })
    } else {
        const success = await myForm.value.validate()

        if (success) {
            $q.notify({
                color: 'green-4',
                textColor: 'white',
                icon: 'cloud_done',
                message: 'Submitted',
            })

            // 表單驗證通過
            await apiMenu.getMenu(formData)

            const uid = { uid: formData.username }

            devGetMac(uid)

            // 取得菜單的資料，將其存入 store 中
            // 跳轉到首頁
            router.push('/')
        } else {
            console.log('驗證成功，用戶至少輸入了一個無效值')
        }
    }
}

const onReset = () => {
    formData.username = ''
    formData.password = ''
    accept.value = false
    myForm.value.resetValidation()
}
</script>

<template>
    <div class="login-container q-pa-md" style="max-width: 400px">
        <h6>登入系統</h6>
        <button @click="change(2)">點擊</button>
        <div>{{ getMenu.count }}</div>
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" ref="myForm">
            <q-input
                filled
                v-model="formData.username"
                label="Your username *"
                hint="Name and surname"
                lazy-rules
                :rules="[(val) => (val && val.length > 0) || 'Please type something']"
            />

            <q-input
                filled
                type="password"
                v-model="formData.password"
                label="Your password *"
                lazy-rules
                :rules="[(val) => (val !== null && val !== '') || 'Please type your password']"
            />

            <q-toggle v-model="accept" label="I accept the license and terms" />

            <div>
                <q-btn label="登入" type="submit" color="primary" />
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
    margin: 50px auto 0px;
    border-radius: 6px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: #fff;
}
</style>
