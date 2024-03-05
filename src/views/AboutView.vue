<script setup>
import { apiResponsible } from '../services/apis/responsible.js'
import { ref } from 'vue'

const data = ref(null)

apiResponsible.getResponsible((result) => {
    data.value = result
})
</script>

<template>
    <div class="about">
        <ul>
            <li v-for="sentence in data" :key="sentence.id">{{ sentence.title }}</li>
        </ul>
    </div>
</template>

<style scoped>
.about {
    display: flex;
    align-items: center;
}
</style>
