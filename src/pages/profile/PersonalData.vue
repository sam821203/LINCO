<template>
  <q-page class="layout--main row items-center justify-evenly">
    <div>
      <q-avatar rounded size="56px">
        <img src="https://cdn.quasar.dev/img/avatar.png">
      </q-avatar>
      <!-- TODO: 思考這裡該如何用成編輯 -->
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input filled v-model="name" label="Your name *" hint="Name and surname" lazy-rules
          :rules="[val => val && val.length > 0 || 'Please type something']" />

        <q-input filled type="number" v-model="age" label="Your age *" lazy-rules :rules="[
        val => val !== null && val !== '' || 'Please type your age',
        val => val > 0 && val < 100 || 'Please type a real age'
      ]" />

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">

defineOptions({
  name: 'PersonalData'
})

</script>
