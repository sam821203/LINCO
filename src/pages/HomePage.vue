<template>
  <q-page class="layout--main">
    <h5>Home</h5>
    <button @click="gerCurrentUser">button</button>
  </q-page>
</template>

<script setup lang="ts">
import { useUserStore } from 'stores/modules/user';

defineOptions({
  name: 'HomePage'
})

const { gerCurrentUser } = useUserStore();

</script>
