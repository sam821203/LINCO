<template>
  <router-view />
</template>

<script setup lang="ts">
// import { useUserStore } from 'stores/modules/user';
// import { firebaseAuth } from "../src/boot/firebase";
// import { storeToRefs } from 'pinia'

defineOptions({
  name: 'App'
})

// const { userLoggedIn } = storeToRefs(useUserStore())
// const { getCurrentUser } = useUserStore()

// TODO: 修正 getCurrentUser，參考連結：https://firebase.google.com/docs/auth/web/manage-users
// https://ithelp.ithome.com.tw/articles/10206354
// console.log('userLoggedIn: ', userLoggedIn);
// console.log('firebaseAuth: ', firebaseAuth);
// console.log("currentUser: ", firebaseAuth.currentUser);
// if (firebaseAuth.currentUser) {
//   userLoggedIn.value = true;
// }
</script>
