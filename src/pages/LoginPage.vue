<template>
  <div class="login-container q-pa-md" style="max-width: 400px">
    <h4 class="text-center">Login</h4>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md" ref="formElement">
      <q-input filled v-model="formData.username" label="Your username *" hint="Name and surname" lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']" />

      <q-input filled type="password" v-model="formData.password" label="Your password *" lazy-rules
        :rules="[(val) => (val !== null && val !== '') || 'Please type your password']" />

      <div>
        <q-btn class="full-width" label="Login" type="submit" color="primary" rounded size="lg" />
        <div class="text-center q-pa-lg text-grey-6">or connect with</div>
        <div class="text-center q-gutter-md">
          <q-btn round color="white">
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="">
          </q-btn>
          <q-btn round color="white">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" class="q-pa-sm"
              alt="">
          </q-btn>
          <q-btn round color="white">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg" class="q-pa-sm" alt="">
          </q-btn>
        </div>
      </div>
      <div class="text-center q-pa-lg q-mt-xl text-grey-6">Don't have an account?<span class="text-weight-bold
 text--underline"> Sign
          up</span></div>
    </q-form>
  </div>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'

defineOptions({
  name: 'HomePage'
})

const $q = useQuasar()
const router = useRouter()

const formElement = ref<HTMLFormElement | null>(null)

const formData = reactive({
  username: '',
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
    router.push('/')
  } else {
    console.log('驗證失敗，用戶至少輸入了一個無效值')
  }
}

const onReset = () => {
  formData.username = ''
  formData.password = ''

  if (formElement.value !== null) {
    formElement.value.resetValidation()
  }
}
</script>
