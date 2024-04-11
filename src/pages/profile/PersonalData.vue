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
        <div class="relative-position q-pt-none">
          <q-file
            v-model="formData.image"
            label="Pick one file"
            style="opacity: 0; cursor: pointer"
            class="absolute-full q-mb-lg"
            filled
            multiple
            :filter="checkFileSize"
            @update:model-value="handleUpload"
            @rejected="onRejected"
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
import { db } from "../../boot/firebase";
import { doc, updateDoc } from "firebase/firestore";
import {
  getStorage,
  ref as storageRef,
  uploadBytesResumable,
} from "firebase/storage";

defineOptions({
  name: "PersonalData",
});

const $q = useQuasar();
const router = useRouter();
const storage = getStorage();
const { getCurrentUser } = useUserStore();

// Create the file metadata
/** @type {any} */
const metadata = {
  contentType: "image/jpeg",
};

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
const currentUser = getCurrentUser();

interface QRejectedEntry {
  failedPropValidation:
    | "accept"
    | "max-file-size"
    | "max-total-size"
    | "filter"
    | "max-files"
    | "duplicate";
  file: File;
}

interface UserForm {
  age: string;
  email: string;
  image: File | null;
  imageUrl: string;
  name: string;
}

const handleUpload = (files: File[] | FileList) => {
  // const imageFile = files[0]
  // formData.image = imageFile;
  console.log("handleUpload files: ", files[0]);
  if (formData.image) {
    formData.imageUrl = window.URL.createObjectURL(
      new Blob(formData.image, { type: "application/zip" })
    );
  }
};

// 取得目前使用者資料
const initUserData = () => {
  if (currentUser) {
    console.log("@@");
    formData.email = currentUser.email || "";
    formData.name = currentUser.displayName || "";
  }
};

initUserData();

const checkFileSize = (files: readonly File[] | FileList) => {
  if (!files) return []; // 如果 files 為空，返回空陣列
  console.log("formData: ", formData);

  console.log("files: ", files);
  // 將 FileList 轉換為陣列
  const filesArray = Array.from(files);

  // 使用 filter 方法篩選符合條件的文件
  const filteredFiles = filesArray.filter((file) => file.size < 2000000);

  return filteredFiles;
};

const onRejected = (rejectedEntries: QRejectedEntry[]): void => {
  console.log("rejectedEntries: ", rejectedEntries);
  $q.notify({
    type: "negative",
    message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
  });
};

// const getAsByteArray = async (file: File | null) => {
//   const arrBuffer = await file?.arrayBuffer();
//   console.log("arrBuffer: ", arrBuffer);
//   // return new Uint8Array(arrBuffer);
// };

const updateImageFile = () => {
  if (formData.image !== null) {
    const selectedFile = formData.image;
    const photoRef = storageRef(storage, `photos/${formData.name}`);
    console.log("photoRef: ", photoRef);
    console.log("selectedFile: ", selectedFile);

    // const fileByteArray = getAsByteArray(selectedFile);
    // console.log("fileByteArray: ", fileByteArray);

    // 'file' comes from the Blob or File API
    // 參考 voice verse 的做法
    // TODO: 上傳的不是圖片檔案
    // uploadBytes(photoRef, selectedFile).then((snapshot) => {
    //   console.log("snapshot: ", snapshot);
    //   console.log("Uploaded a blob or file!");
    // });

    const uploadTask = uploadBytesResumable(photoRef, selectedFile, metadata);
    console.log("uploadTask: ", uploadTask);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            break;
        }
      },
      (error) => {
        console.log(error.message);
      },
      async () => {
        try {
          console.log("success");
        } catch (error) {
          console.error("上傳或刪除操作錯誤：", error);
        }
      }
    );
  }
};

const updateData = async (formData: UserForm) => {
  // Add a new document in collection "users"
  // await setDoc(doc(db, "users", formData.name), {
  //   name: formData.name,
  //   email: formData.email,
  //   image: formData.image,
  //   imageUrl: formData.imageUrl,
  //   age: formData.age,
  // });

  console.log("route.params.id: ", currentUser);

  if (currentUser !== undefined) {
    const userRef = doc(db, "users", currentUser.uid);

    console.log("userRef: ", userRef);
    console.log("formData.image: ", formData.image);
    await updateDoc(userRef, {
      name: formData.name,
      email: formData.email,
      // image: formData.image,
      imageUrl: formData.imageUrl,
      age: formData.age,
    });

    updateImageFile();
  }
};

const onSubmit = () => {
  console.log("formData: ", formData);
  $q.notify({
    color: "green-4",
    textColor: "white",
    icon: "cloud_done",
    message: "Submitted",
  });

  // TODO: 送去 firebase
  updateData(formData);
};

const onReset = () => {
  formData.name = "";
  formData.age = "";
  formData.email = "";
};

// TODO: 當刷新頁面時，資料可以保存
</script>
