import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("user", () => {
  const userLoggedIn = ref(false);

  const register = async () => {};

  return { userLoggedIn };
});
