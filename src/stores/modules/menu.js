import { defineStore } from 'pinia'
import { ref, reactive, computed } from 'vue'

export const useMenuStore = defineStore('menu', () => {
    const menu = reactive([1, 2])
    const count = ref(1)

    const setMenu = (value) => {
        // menu.push = value
    }

    const setCount = (num) => {
        count.value += num
    }
    return { menu, count, setCount }
})
