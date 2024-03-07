import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'
import Cookie from 'js-cookie'

export const useMenuStore = defineStore('menu', () => {
    const menu = ref([])
    const count = ref(1)

    const setMenu = (value) => {
        menu.value = value
        Cookie.set('menu', JSON.stringify(value))
    }

    const setCount = (num) => {
        count.value += num
    }

    return { menu, count, setMenu, setCount }
})
