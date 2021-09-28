import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import Category from '../views/Category/Category.vue'
import Post from '../views/Post/Post.vue'
import MyPosts from '../views/Post/MyPosts.vue'
import Login from '../views/Login/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/post',
      name: 'Post',
      component: Post
    },
    {
      path: '/postlist',
      name: 'MyPosts',
      component: MyPosts
    }]
  },
  {
    path: '/',
    name: "Login",
    component: Login
  },
]

const router = new VueRouter({
  routes, mode: "history"
})

export default router
