<template>
  <div class="login-container q-pa-md" style="max-width: 400px">
    <h4 class="text-center">Sign Up</h4>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" ref="formElement">
      <q-input filled v-model="formData.name" label="Your username *" lazy-rules
        :rules="[val => (val && val.length > 0) || '請輸入使用者名稱']" />
      <q-input filled v-model="formData.email" label="Your email *" hint="請輸入含有 @ 的信箱地址" lazy-rules :rules="[
      val => (val && val.length > 0) || '請輸入 email 帳號',
      (val, rules) => rules.email(val) || '請輸入有效的 email 帳號'
    ]" />

      <q-input filled type="password" v-model="formData.password" label="Your password *" lazy-rules :rules="[
      (val) => (val !== null && val !== '') || '請輸入密碼',
      (val) => (val.length > 7) || '請輸入至少 8 個字元'
    ]" />

      <div>
        <q-btn class="full-width" label="Sign Up" type="submit" color="primary" rounded size="lg" />
      </div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { useUserStore } from 'stores/modules/user';

defineOptions({
  name: 'HomePage'
})

const $q = useQuasar()
const { register } = useUserStore();
const formElement = ref<HTMLFormElement | null>(null)
const router = useRouter()

const formData = reactive({
  name: '',
  email: '',
  password: ''
})

// const menuItems = ref([
//   { to: '/', icon: 'home', label: 'Home' },
//   { to: '/about', icon: 'description', label: 'About' },
//   { to: '/filter-function', icon: 'description', label: 'Filter function' }
// ])

const onSubmit = async () => {
  const success = formElement.value !== null ? await formElement.value.validate() : false
  if (success) {
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Submitted'
    })
    await register(formData)
    console.log('送出');
    router.push('/')
  } else {
    console.log('驗證失敗，用戶至少輸入了一個無效值')
  }
}

const onReset = () => {
  formData.name = ''
  formData.email = ''
  formData.password = ''

  if (formElement.value !== null) {
    formElement.value.resetValidation()
  }
}
</script>
