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

router.beforeEach(async (to, from, next) => {
  var isAuthenticated = localStorage.getItem("token") !== null;
  if (to.name !== "Login" && !isAuthenticated) {
    return next({ name: "Login" });
  } else if (to.name === "PostList" && from.name === "Login") {
    if (hasMenus) return next();
    else {
      let menus = [];
      await Axios.get("users/menus").then((res) => {
        menus = res.data;
      });
      const routes = createRoutes(menus);
      router.addRoutes(routes);
      hasMenus = true;
      return next({ name: "PostList" });
    }
  } else return next();
});

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app");
