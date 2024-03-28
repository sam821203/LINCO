<template>
  <router-view />
</template>

<script setup lang="ts">
import { useUserStore } from 'stores/modules/user';
import { firebaseAuth } from "../src/boot/firebase";
import { storeToRefs } from 'pinia'
import {
  onAuthStateChanged,
} from "firebase/auth";

defineOptions({
  name: 'App'
})

const { userLoggedIn } = storeToRefs(useUserStore())
// const { getCurrentUser } = useUserStore()

onAuthStateChanged(firebaseAuth, (user) => {
  if (user) {
    console.log("signed in");
    userLoggedIn.value = true;
  } else {
    console.log("signed out");
    userLoggedIn.value = false;
  }
});

// TODO: 修正 getCurrentUser，參考連結：https://firebase.google.com/docs/auth/web/manage-users
// https://ithelp.ithome.com.tw/articles/10206354
</script>
