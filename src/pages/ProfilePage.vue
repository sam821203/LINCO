<template>
  <q-page>
    <div>
      <div class="q-pa-sm">
        <q-list padding>
          <q-item>
            <q-item-section top avatar>
              <q-avatar rounded size="56px">
                <img src="https://cdn.quasar.dev/img/avatar.png">
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>Single line item</q-item-label>
              <q-item-label caption>Secondary line text. Lorem ipsum dolor sit amet, consectetur adipiscit
                elit.</q-item-label>
            </q-item-section>
          </q-item>

          <q-separator spaced />

          <q-item to="/profile/PersonalData" exact>
            <q-item-section avatar>
              <q-icon color="primary" name="eva-person-outline" />
            </q-item-section>
            <q-item-section>Personal Data</q-item-section>
            <q-item-section side>
              <q-icon name="eva-chevron-right-outline" />
            </q-item-section>
          </q-item>

          <q-separator spaced />

          <q-item @click.prevent="logOut">
            <q-item-section avatar>
              <q-icon color="primary" name="eva-log-out-outline" />
            </q-item-section>
            <q-item-section>Sign Up</q-item-section>
            <q-item-section side>
              <q-icon name="eva-chevron-right-outline" />
            </q-item-section>
          </q-item>

          <q-separator spaced />
        </q-list>
      </div>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { useUserStore } from 'stores/modules/user';
import { useRouter } from "vue-router";
import { reactive } from 'vue'

defineOptions({
  name: 'ProfilePage.vue'
})

const router = useRouter();
const { signOut } = useUserStore()
const { getCurrentUser } = useUserStore();

interface UserData {
  displayName: string;
  email: string;
  uid: string;
}

const userData: UserData = reactive({
  email: '',
  displayName: '',
  uid: '',
})

const addNewUser = () => {
  // 取得個人資料
  const currentUser = getCurrentUser();

  if (currentUser) {
    userData.email = currentUser.email || '';
    userData.displayName = currentUser.displayName || '';
    userData.uid = currentUser.uid || '';

    console.log('userData', userData);
  }
}

addNewUser()

// const directToPersonalData = () => {
//   console.log('1');
//   addNewUser()
//   router.push("/profile/PersonalData")
// }

const logOut = () => {
  signOut()
  router.push("/login");
}
</script>
