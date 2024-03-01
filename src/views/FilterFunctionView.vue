<script setup>
import { apiBusiness } from '../http/apis/business'
import { ref } from 'vue'

const data = ref(null)

apiBusiness.getFilterFunction(
    (result) => {
        data.value = result
    },
    { functionId: 1000 }
)
</script>

<template>
    <div class="filter-function">
        <h4>This is an filter function page</h4>
    </div>
</template>

<style>
h4 {
    margin-left: 48px;
}
</style>
