import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch((err) => err);
};

Vue.use(VueRouter);

const commonRoutes = [
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login/Login")
  },
  {
    path: "/PostManage",
    name: "PostManage",
    component: Home,
    redirect: { name: "PostList" },
    children: [
      {
        path: "/Post/Category",
        name: "CategoryList",
        component: () => import("../views/Category/CategoryList")
      },
      {
        path: "/Post/Edit",
        name: "EditPost",
        component: () => import("../views/Post/EditPost")
      },
      {
        path: "/Post/List",
        name: "PostList",
        component: () => import("../views/Post/PostList")
      }
    ]
  },
  {
    path: "/404",
    name: "404",
    component: () => import("../views/error-pages/404")
  }
];

export const asyncRoutes = [
  {
    path: "/PermissionManage",
    name: "PermissionManage",
    component: Home,
    redirect: { name: "UserList" },
    children: [
      {
        path: "/User/List",
        name: "UserList",
        component: () => import("../views/User/UserList")
      },
      {
        path: "/Role/List",
        name: "RoleList",
        component: () => import("../views/Role/RoleList")
      },
      {
        path: "/Menu/List",
        name: "MenuList",
        component: () => import("../views/Menu/MenuList")
      }
    ]
  }
];

const createRouter = () =>
  new VueRouter({
    routes: commonRoutes,
    mode: "history"
  });

const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher;
}

export default router;
