<template>
  <q-page class="layout--main q-pa-lg">
    <div>
      <div class="row items-center justify-between q-mb-lg">
        <q-icon
          size="36px"
          name="eva-arrow-back-outline text-left"
          class="col-3 content-start"
          @click="router.go(-1)"
        />
        <div class="col-6 text-center">Personal Data</div>
        <div class="col-3"></div>
      </div>
      <div class="text-center">
        <q-img
          :src="formData.imageUrl"
          spinner-color="white"
          style="height: 72px; max-width: 72px"
          rounded
          class="q-mb-md"
        ></q-img>
        <div class="relative-position">
          <!-- <q-file
            v-model="formData.image"
            label="Pick one file"
            filled
            style=""
            class="q-mb-lg"
            @update:model-value="handleUpload()"
          ></q-file> -->
          <q-file
            v-model="formData.image"
            label="Pick one file"
            filled
            style="opacity: 0; cursor: pointer"
            @update:model-value="handleUpload()"
            multiple
            class="absolute-full"
          ></q-file>
          <q-icon
            name="attachment"
            class="q-absolute-full clickable"
            style="pointer-events: none"
            size="48px"
          ></q-icon>
        </div>
      </div>
      <!-- TODO: 思考這裡該如何用成編輯 -->
      <!-- 作為一個使用者，我可以新增個人和公司的檔案 -->
      <!--
        1.姓名
        2.email
        3.年紀
        4.職業
        5.公司名稱
       -->
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-sm"
        ref="myForm"
      >
        <q-input
          filled
          v-model="formData.name"
          label="Your name *"
          lazy-rules
        />
        <q-input
          filled
          type="email"
          v-model="formData.email"
          label="Your email *"
          lazy-rules
        />
        <q-input
          filled
          type="number"
          v-model="formData.age"
          label="Your age *"
          lazy-rules
        />
        <q-select filled v-model="model" :options="options" label="Filled" />
        <div class="q-gutter-sm">
          <q-btn
            label="儲存"
            type="submit"
            color="primary"
            class="full-width"
          />
          <q-btn
            label="清除"
            type="reset"
            color="primary"
            outline
            class="full-width q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useQuasar } from "quasar";
import { ref, reactive } from "vue";
import { useUserStore } from "../../stores/modules/user";
import { useRouter } from "vue-router";

defineOptions({
  name: "PersonalData",
});

const $q = useQuasar();
const router = useRouter();
const { getCurrentUser } = useUserStore();

const formData = reactive({
  name: "",
  age: "",
  email: "",
  image: null,
  imageUrl:
    "https://voice-verse.vercel.app/assets/default-cover-photo-3ab09c3b.png",
});

const model = ref(null);

const options = reactive(["Google", "Facebook", "Twitter", "Apple", "Oracle"]);

const handleUpload = () => {
  console.log("handleUpload is triggered");
  console.log("formData.image: ", formData.image);
  if (formData.image) {
    formData.imageUrl = window.URL.createObjectURL(
      new Blob(formData.image, { type: "application/zip" })
    );
  }
};

// 取得目前使用者資料
const initUserData = () => {
  const currentUser = getCurrentUser();

  if (currentUser) {
    console.log("@@");
    formData.email = currentUser.email || "";
    formData.name = currentUser.displayName || "";
  }
};

initUserData();

// const checkFileSize = (files: FileList | null) => {
//   if (!files) return []; // 如果 files 為空，返回空陣列

//   // 將 FileList 轉換為陣列
//   const filesArray = Array.from(files);

//   console.log("filesArray: ", filesArray);
//   // 使用 filter 方法篩選符合條件的文件
//   const filteredFiles = filesArray.filter((file) => file.size < 5120);

//   return filteredFiles;
// };

// const onRejected = (rejectedEntries) => {
//   // Notify plugin needs to be installed
//   // https://quasar.dev/quasar-plugins/notify#Installation
//   $q.notify({
//     type: "negative",
//     message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
//   });
// };

const onSubmit = () => {
  console.log("formData: ", formData);
  $q.notify({
    color: "green-4",
    textColor: "white",
    icon: "cloud_done",
    message: "Submitted",
  });
};

const onReset = () => {
  formData.name = "";
  formData.age = "";
  formData.email = "";
};
</script>
