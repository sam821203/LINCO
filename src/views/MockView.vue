<script setup>
import { apiBusiness } from '../http/apis/business'
import { ref } from 'vue'

const data = ref(null)

apiBusiness.getMockData((result) => {
    data.value = result
    console.log('data: ', data.value)
})
</script>

<template>
    <div>
        <h4>This is an filter Mock page</h4>
    </div>
</template>

<style>
h4 {
    margin-left: 48px;
}
</style>
