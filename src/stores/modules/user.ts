import { defineStore } from "pinia";
import { ref } from "vue";
import { firebaseAuth, usersCollection } from "../../boot/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  // signInWithRedirect,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useQuasar } from "quasar";

interface FormData {
  name: string;
  email: string;
  password: string;
}

export const useUserStore = defineStore("user", () => {
  // Create an instance of the Google provider object
  const googleProvider = new GoogleAuthProvider();

  googleProvider.addScope("https://www.googleapis.com/auth/contacts.readonly");

  const userLoggedIn = ref(false);
  const $q = useQuasar();

  const getCurrentUser = () => {
    const user = firebaseAuth.currentUser;
    if (user) {
      console.log("signed in");
      return user;
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

    // 重新載入頁面
    // window.location.reload();
  };

  // const socialLogIn = async (e) => {
  //   const {
  //     target: { name },
  //   } = e;

  //   let provider;

  //   if (name === "google") {
  //     provider = new GoogleAuthProvider();
  //   } else if (name === "facebook") {
  //     // create github provider
  //   }
  // };

  // TODO: 使用 firebase 和 axios-mock-adapter 的差別
  // firebase 可以用來儲存會員資料，但是有辦法解決 google 登入的問題嗎?
  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      console.log("result: ", result);
      // const credential = GoogleAuthProvider.credentialFromResult(result);
      // const token = credential?.accessToken;
      const user = result.user;

      // Create user collection reference
      const userDocRef = doc(usersCollection, user.uid);

      const userData = {
        name: user.displayName,
        email: user.email,
      };

      // Add user data to users collection
      await setDoc(userDocRef, userData);
    } catch (error) {
      console.log("error: ", error);
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

  return {
    userLoggedIn,
    register,
    getCurrentUser,
    authenticate,
    signOut,
    loginWithGoogle,
  };
});
