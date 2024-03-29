import { defineStore } from "pinia";
import { ref } from "vue";
import { firebaseAuth, usersCollection } from "../../boot/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useQuasar } from "quasar";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export const useUserStore = defineStore("user", () => {
  const userLoggedIn = ref(false);
  const $q = useQuasar();

  const gerCurrentUser = () => {
    const user = firebaseAuth.currentUser;
    if (user) {
      console.log("user 222: ", user);
      console.log("signed in");
    } else {
      console.log("signed out");
    }
  };

  const register = async (data: FormData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        firebaseAuth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const userDocRef = doc(usersCollection, user.uid);

      const userData = {
        name: data.name,
        email: data.email,
        password: data.password,
      };

      await setDoc(userDocRef, userData);

      await updateProfile(user, {
        displayName: data.name,
      });

      // currentUser 只會取得當前的登入狀態，也就是如果登出後，它也不會改變
      // 如果想要即時收到使用者當前的登入狀態，可以使用 onAuthStateChanged 方法
      // 監聽用戶狀態，是否為登入還是登出
      userLoggedIn.value = true;
    } catch (error) {
      console.log("error: ", error);
      $q.notify({
        color: "negative",
        textColor: "white",
        icon: "cloud_done",
        message: "errorMsg",
      });
    }
  };

  const authenticate = async (formData: {
    email: string;
    password: string;
  }) => {
    await signInWithEmailAndPassword(
      firebaseAuth,
      formData.email,
      formData.password
    );

    userLoggedIn.value = true;
  };

  const signOut = async () => {
    await firebaseAuth.signOut();

    userLoggedIn.value = false;
  };

  return { userLoggedIn, register, gerCurrentUser, authenticate, signOut };
});
