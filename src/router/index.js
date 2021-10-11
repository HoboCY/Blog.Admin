import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import CategoryList from '../views/Category/CategoryList.vue';
import EditPost from '../views/Post/EditPost.vue';
import PostList from '../views/Post/PostList.vue';
import Login from '../views/Login/Login.vue';
import UserList from '../views/User/UserList.vue';
import RoleList from '../views/Role/RoleList.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/Post/Category',
        name: 'CategoryList',
        component: CategoryList
      },
      {
        path: '/Post/Edit',
        name: 'EditPost',
        component: EditPost
      },
      {
        path: '/Post/List',
        name: 'PostList',
        component: PostList
      },
      {
        path: '/User/List',
        name: 'UserList',
        component: UserList
      },
      {
        path: '/Role/List',
        name: 'RoleList',
        component: RoleList
      }
    ]
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
});

export default router;
