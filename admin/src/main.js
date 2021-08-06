import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Cookies from "js-cookie";
Vue.config.productionTip = false;
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) {
    console.log("jinlai???");
    // 判断该路由是否需要登录权限
    if (Cookies.get("token") == "1") {
      next();
    } else {
      next({
        name: "Login",
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
