import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element.js";
import "./assets/layout.css";
import "../node_modules/vditor/src/assets/scss/index.scss";
import Axios from "./plugins/axiosOptions.js";
import createRoutes from "./utils/createRoutes";

Vue.prototype.$axios = Axios;
Vue.config.productionTip = false;

let hasMenus = false;

router.beforeResolve((to, from, next) => {
  var isAuthenticated = localStorage.getItem("token") !== null;
  if (to.name !== "Login" && !isAuthenticated) {
    next({ name: "Login" });
  }
  if (to.name === "Home") {
    if (hasMenus) next;
    else {
      console.log("创建菜单");
      let menus = [];
      Axios.get("users/menus").then((res) => {
        menus = res.data;
      });
      const routes = createRoutes(menus);
      console.log(routes);
      router.addRoutes(routes);
      hasMenus = true;
    }
    next();
  } else next();
});

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
