import { asyncRoutes } from "@/router";

// 将菜单信息转成对应的路由信息 动态添加
export default function createRoutes(data) {
  const result = [];
  const routes = [];

  data.map((item) => {
    generateRoutes(routes, item);
  });

  // 最后添加404页面 否则会在登陆成功后跳到404页面
  //   result.push({ path: "*", redirect: "/404" });

  return routes;
}

var i = 1;

function generateRoutes(routes, item) {
  var route = asyncRoutes.find((route) => route.name === item.name);
  var children = [];
  if (route !== undefined) {
    item.children.map((child) => {
      var childRoute = route.children.find((r) => r.name === child.name);
      if (childRoute !== undefined) {
        children.push(childRoute);
      }
    });
    route.children = children;
    routes.push(route);
  }
}
