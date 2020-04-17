import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    meta: {
      requireAuth: true,
    },
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  {
    path: "/about",
    name: "About",
    meta: {
      requireAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
  },
  {
    path: "/articlelist",
    name: "ArticleList",
    meta: {
      requireAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/ArticleList.vue"),
  },
  {
    path: "/article/:id",
    name: "Article",
    meta: {
      requireAuth: true,
    },
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Article.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: "/admin",
  routes
});

export default router;
