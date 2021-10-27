import { asyncRoutes } from "@/router";

// 将菜单信息转成对应的路由信息 动态添加
export default function createRoutes(data) {
  var routes = buildRoutes(data, asyncRoutes);
  routes.push({ path: "*", redirect: { name: "404" } });
  return routes;
}

function buildRoutes(userRoutes = [], allRoutes = []) {
  var realRoutes = [];
  allRoutes.forEach((v, i) => {
    userRoutes.forEach((item, index) => {
      if (item.name === v.name) {
        if (item.children && item.children.length > 0) {
          v.children = buildRoutes(item.children, v.children);
        }
        realRoutes.push(v);
      }
    });
  });
  return realRoutes;
}
