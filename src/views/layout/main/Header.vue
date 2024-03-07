<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import Cookie from 'js-cookie'
import { useStore } from '../../../stores/index'

const props = defineProps(['leftDrawerOpen'])
const emit = defineEmits(['toggleLeftDrawerEmit'])
const router = useRouter()
const getMenu = useStore().useMenuStore()

const menuData = computed(() => (Cookie.get('menu') ? JSON.parse(Cookie.get('menu')) : getMenu.menu))

const leftDrawerOpen = ref(false)

const toggleLeftDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
}

const logout = () => {
    Cookie.remove('token')
    // 跳轉到登入頁面
    router.push('/login')
}
</script>

<template>
    <q-header elevated class="bg-cyan">
        <q-toolbar>
            <q-btn flat dense round aria-label="Menu" icon="menu" @click="toggleLeftDrawer" />
            <q-toolbar-title> Quasar App </q-toolbar-title>
            <q-btn flat color="white" icon="logout" label="登出" @click="logout" />
        </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-2">
        <q-list>
            <q-item-label header>Essential Links</q-item-label>
            <q-item v-for="item in menuData" :to="item.to" :key="item.to">
                <q-item-section avatar>
                    <q-icon :name="item.icon" />
                </q-item-section>
                <q-item-section>
                    <q-item-label>{{ item.label }}</q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </q-drawer>
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
