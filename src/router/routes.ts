import { RouteRecordRaw } from "vue-router";
import LoginPage from "../pages/LoginPage.vue";
import SignUpPage from "../pages/SignUpPage.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUpPage,
  },
  {
    path: "/",
    name: "home",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", component: () => import("pages/HomePage.vue") },
      { path: "/friends", component: () => import("pages/FriendsPage.vue") },
      {
        path: "/companies",
        component: () => import("pages/CompaniesPage.vue"),
      },
      {
        path: "/profile",
        component: () => import("pages/ProfilePage.vue"),
        // TODO: 轉網址問題
        // children: [
        //   {
        //     path: "/profile/personalData",
        //     component: () => import("pages/profile/PersonalData.vue"),
        //   },
        // ],
      },
      {
        path: "/profile/personalData",
        component: () => import("pages/profile/PersonalData.vue"),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
