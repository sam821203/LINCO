<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-white text-grey-10" bordered>
      <q-toolbar class="layout--main">
        <q-toolbar-title class="text-roboto-condensed text-bold">
          LINCO
        </q-toolbar-title>
        <q-btn
          class="large-screen-only"
          flat
          @click="drawer = !drawer"
          round
          dense
          icon="menu"
          padding="xs"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="200" :breakpoint="600">
      <q-scroll-area
        style="
          height: calc(100% - 150px);
          margin-top: 150px;
          border-right: 1px solid #ddd;
        "
      >
        <q-list padding>
          <q-item v-ripple to="/" exact>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>
            <q-item-section> Home </q-item-section>
          </q-item>

          <q-item v-ripple to="/friends">
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>
            <q-item-section> Friends </q-item-section>
          </q-item>

          <q-item v-ripple to="/profile">
            <q-item-section avatar>
              <q-icon name="person" />
            </q-item-section>
            <q-item-section> Profile </q-item-section>
          </q-item>

          <q-item v-ripple to="/companies">
            <q-item-section avatar>
              <q-icon name="eva-briefcase-outline" />
            </q-item-section>
            <q-item-section> Companies / Orgs </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <q-img
        class="absolute-top"
        src="https://cdn.quasar.dev/img/material.png"
        style="height: 150px"
      >
        <div class="absolute-bottom bg-transparent">
          <q-avatar size="56px" class="q-mb-sm">
            <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
          </q-avatar>
          <div class="text-weight-bold">Razvan Stoenescu</div>
          <div>@rstoenescu</div>
        </div>
      </q-img>
    </q-drawer>

    <q-footer class="bg-white small-screen-only" bordered>
      <q-tabs
        class="text-grey-10"
        active-color="primary"
        indicator-color="transparent"
      >
        <q-route-tab icon="eva-home-outline" to="/" />
        <q-route-tab icon="eva-people-outline" to="/friends" />
        <q-route-tab icon="eva-person-outline" to="/profile" />
        <q-route-tab icon="eva-briefcase-outline" to="/companies" />
      </q-tabs>
    </q-footer>

    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from "vue";

defineOptions({
  name: "MainLayout",
});

const drawer = ref(false);
</script>

<style lang="scss" scoped>
.q-footer {
  .q-tab__icon {
    font-size: 20px;
  }
}

.q-toolbar {
  @media (min-width: $breakpoint-sm-min) {
    height: 78px;
  }
}

.q-toolbar__title {
  font-size: 30px;

  @media (max-width: $breakpoint-xs-max) {
    text-align: center;
  }
}
</style>
