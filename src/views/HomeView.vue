<script setup>
import { apiBusiness } from '../http/apis/business'
import { ref } from 'vue'

const data = ref(null)

apiBusiness.getBusinessItem((result) => {
    data.value = result
})
</script>

<template>
    <main>
        <ul>
            <li v-for="(item, index) in data" :key="index">
                <h6>{{ item.Business_Item }}</h6>
                <p>{{ item.Business_Item_Content }}</p>
            </li>
        </ul>
    </main>
</template>

<style scoped>
ul {
    list-style: none;
}
h6 {
    margin-bottom: 4px;
}
</style>
