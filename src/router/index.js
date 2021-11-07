import { createRouter, createWebHistory } from "vue-router";
import store from "../store";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { requiresAuth: true, title: "Home" },
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
    meta: { requiresAuth: true, title: "About" },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { title: "Login" },
  },
  {
    path: "/clients",
    name: "Client",
    component: () => import("../views/Client.vue"),
    meta: { requiresAuth: true, title: "Clients" },
  },
  {
    path: "/client/:id/edit",
    name: "Edit",
    component: () => import("../views/Edit.vue"),
    meta: { requiresAuth: true, title: "Edit" },
  },
  {
    path: "/client/:id",
    name: "Details",
    component: () => import("../views/Details.vue"),
    meta: { requiresAuth: true, title: "Details" },
  },
  {
    path: "/client",
    name: "AddClient",
    component: () => import("../views/AddClient.vue"),
    meta: { requiresAuth: true, title: "Create Client" },
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters.isAuthenticated;
  if (to.matched.some((record) => record.meta.requiresAuth))
    if (!isAuthenticated) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  else {
    next();
  }
});
router.afterEach((to) => {
  if (to.meta.title) {
    document.title = `${to.meta.title} - Vite App`;
  }
});
export default router;
