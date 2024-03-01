<script setup>
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => (leftDrawerOpen.value = !leftDrawerOpen.value)
</script>

<template>
    <q-layout view="lHh Lpr lFf" class="bg-white">
        <q-header elevated>
            <q-toolbar>
                <q-btn flat dense round @click="toggleLeftDrawer" aria-label="Menu" icon="menu" />
                <q-toolbar-title> Quasar App </q-toolbar-title>
            </q-toolbar>
        </q-header>
        <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
            <q-list>
                <q-item-label header>Essential Links</q-item-label>
                <q-item to="/">
                    <q-item-section avatar>
                        <q-icon name="home" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Home</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item to="/about">
                    <q-item-section avatar>
                        <q-icon name="description" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>About</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item to="/filter-function">
                    <q-item-section avatar>
                        <q-icon name="description" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Filter function</q-item-label>
                    </q-item-section>
                </q-item>
                <q-item to="/mock">
                    <q-item-section avatar>
                        <q-icon name="description" />
                    </q-item-section>
                    <q-item-section>
                        <q-item-label>Mock Data</q-item-label>
                    </q-item-section>
                </q-item>
            </q-list>
        </q-drawer>
        <q-page-container>
            <router-view />
        </q-page-container>
    </q-layout>
</template>

<style lang="scss" scoped>
header {
    width: 100%;
    .wrapper {
        display: flex;
        place-items: flex-start;
        flex-wrap: wrap;
        background-color: rgb(255, 255, 255);
    }
}

nav {
    width: 100%;
    padding: 1rem;
    font-size: 1rem;
    text-align: center;
    a {
        display: inline-block;
        border-left: 1px solid var(--color-border);
        &:first-of-type {
            border: 0;
        }
        &.router-link-exact-active {
            color: var(--color-text);
            &:hover {
                background-color: transparent;
            }
        }
    }
}
</style>
