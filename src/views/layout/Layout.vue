<script setup>
import HeaderComp from './main/Header.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'
</script>

<template>
    <q-layout view="lHh Lpr lFf" class="bg-white">
        <HeaderComp />
        <q-page-container>
            <!-- 子路由出口 -->
            <routerView />
        </q-page-container>
    </q-layout>
</template>

<style scoped></style>
